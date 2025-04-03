<template>
  <div>
    <BaseAlert
      v-if="alertMessage"
      :message="alertMessage"
      :type="alertType"
      :show-actions="confirmingDelete"
      :duration="confirmingDelete ? 0 : 2500"
      @confirm="deleteConfirmedOrder"
      @cancel="cancelDelete"
      @close="alertMessage = ''"
    />

    <header class="header">
      <router-link to="/adminmain">
        <img src="../assets/logo.png" class="navlogo"/>
      </router-link>
      <div class="navigation">
        <router-link to="/admin" class="nav-link">Admin</router-link>
        <router-link to="/adminmain" class="nav-link">Főoldal</router-link>
        <router-link to="/adminproductsn" class="nav-link">Termékek</router-link>
      </div>

      <div class="hamburger-menu" v-if="isMobile" @click="toggleMenu">
        &#9776;
      </div>
      
      <div class="mobile-menu" v-if="menuOpen">
        <router-link to="/mainloggedin" class="mobile-nav-link" @click="closeMenu">Főoldal</router-link>
        <router-link to="/productsloggedin" class="mobile-nav-link" @click="closeMenu">Termékek</router-link> 
        <router-link to="/cartloggedin" class="mobile-nav-link" @click="closeMenu">Kosár</router-link>
      </div>
    </header>

    <div class="loggedin-container">
      <header>
        <h1>Üdvözöllek, {{ username }}!</h1>
        <p>Örülünk, hogy újra itt vagy.</p>
      </header>

      <div class="profile-info">
        <h2>Profil adatok</h2>
        <p><strong>Felhasználónév:</strong> {{ username }}</p>
        <p><strong>Email:</strong> {{ email }}</p>

        <button @click="showPasswordChange = !showPasswordChange" v-if="!showPasswordChange" class="change-password">Jelszó megváltoztatása</button>
        
        <div v-if="showPasswordChange">
          <div class="input-group">
            <label for="new-password">Új jelszó</label>
            <input type="password" v-model="newPassword" id="new-password" required />
          </div>
          <div class="input-group">
            <label for="confirm-password">Új jelszó mégegyszer</label>
            <input type="password" v-model="confirmPassword" id="confirm-password" required />
          </div>
          <div class="password-buttons">
            <button @click="saveNewPassword" class="save-password">Mentés</button>
            <button @click="cancelPasswordChange" class="cancel-change">Mégse</button>
          </div>
        </div>
      </div>

      <h2>A rendeléseid</h2>
      <div v-if="orders.length === 0">
        <p>Nincsenek rendeléseid.</p>
      </div>
      <div v-else>
        <div v-for="order in orders" :key="order.order_id" class="order-card">
          <h3>Rendelés száma: {{ order.order_id }}</h3>
          <p><strong>Név:</strong> {{ order.name }}</p>
          <p><strong>Cím:</strong> {{ order.address }}</p>
          <p><strong>Fizetési mód:</strong> {{ order.payment_method }}</p>
          <p><strong>Szállítási mód:</strong> {{ getShippingMethodName(order.shipping_method) }}</p>
          <p><strong>Rendelés ideje:</strong> {{ formatDate(order.order_date) }}</p>
          
          <h4>Termékek:</h4>
          <ul>
            <li v-for="item in order.items" :key="item.product_name">
              {{ item.product_name }} - {{ item.quantity }} db - {{ formatPrice(item.price) }} Ft/db
            </li>
          </ul>
          <p><strong>Szállítási költség:</strong> {{ formatPrice(order.shipping_cost) }} Ft</p>
          <p><strong>Végösszeg:</strong> {{ formatPrice(order.total_price + (order.shipping_cost || 0)) }} Ft</p>
          <button @click="confirmDelete(order.order_id)" class="delete-button">Rendelés törlése</button>
        </div>
      </div>

      <div class="actions">
        <button class="logout-button" @click="logout">Kijelentkezés</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import BaseAlert from '/src/pages/BaseAlert.vue';

export default {
  components: {
    BaseAlert
  },
  data() {
    return {
      username: "",
      email: "",
      showPasswordChange: false,
      newPassword: "",
      confirmPassword: "",
      orders: [],
      alertMessage: "",
      alertType: "",
      orderIdToDelete: null,
      confirmingDelete: false,
      isMobile: window.innerWidth < 768,
      menuOpen: false
    };
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.username = user.username;
      this.email = user.email;
      this.fetchOrders(user.user_id);
    }
  },
  methods: {
    async saveNewPassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.alertMessage =`A két jelszó nem egyezik.`;
        this.alertType = 'error';
        return;
      }

      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.put(`http://localhost:8000/api/update-password`, {
          user_id: user.user_id,
          newPassword: this.newPassword,
        });

        if (response.status === 200) {
          this.alertMessage =`Jelszó sikeresen módosítva.`;
          this.alertType = 'success';
          this.showPasswordChange = false;
        } else {
          this.alertMessage =`Hiba történt a jelszó módosítása során.`;
          this.alertType = 'error';
        }
      } catch (error) {
        console.error("Hiba történt:", error);
        this.alertMessage =`Belső hiba történt.`;
        this.alertType = 'error';
      }
    },

    cancelPasswordChange() {
      this.showPasswordChange = false;
      this.newPassword = "";
      this.confirmPassword = "";
    },

    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    },
    handleResize() {
      this.isMobile = window.innerWidth < 768;
      if (!this.isMobile) this.menuOpen = false;
    },
    getShippingMethodName(method) {
      const shippingMethods = {
        gls: "GLS (+1500 Ft)",
        foxpost: "Foxpost (+1200 Ft)",
        personal: "Személyes átvétel (ingyenes)"
      };
      return shippingMethods[method] || "Nincs adat";
    },

    async fetchOrders(userId) {
      try {
        const response = await axios.get(`http://localhost:8000/api/orders/${userId}`);
        this.orders = response.data.map(order => ({
          ...order,
          shipping_method: order.shipping_method || 'Házhozszállítás'
        }));
      } catch (error) {
        console.error("Hiba a rendelési adatok lekérésekor:", error);
      }
    },

    confirmDelete(orderId) {
      this.orderIdToDelete = orderId;
      this.confirmingDelete = true;
      this.alertMessage = "Biztosan törlöd ezt a rendelést?";
      this.alertType = "warning";
    },

    cancelDelete() {
      this.confirmingDelete = false;
      this.alertMessage = "";
      this.orderIdToDelete = null;
    },

    async deleteConfirmedOrder() {
      try {
        await axios.delete(`http://localhost:8000/api/orders/${this.orderIdToDelete}`);
        this.orders = this.orders.filter(order => order.order_id !== this.orderIdToDelete);
        this.alertMessage = "🗑️ A rendelésedet sikeresen töröltük!";
        this.alertType = "success";
      } catch (error) {
        console.error('Hiba a rendelés törlésekor:', error);
        this.alertMessage = `❌ Hiba a törlés során: ${error.message}`;
        this.alertType = "error";
      } finally {
        this.confirmingDelete = false;
        this.orderIdToDelete = null;
      }
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString('hu-HU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },

    formatPrice(price) {
      return new Intl.NumberFormat('hu-HU').format(price);
    },

    logout() {
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.$router.push("/main");
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>

  <style scoped>
  .password-buttons {
    display: inline-flex;
    gap: 10px;
    justify-content: center;
    margin: 0 auto;
  }

  .cancel-change,
  .save-password,
  .change-password {
    font-size: 18px;
    font-weight: 700;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.3s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .change-password {
    background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(56, 249, 215, 0.4);
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 15px 30px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    opacity: 0.6;
    transition: background-color 0.3s, transform 0.3s;
  }

  .change-password:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(56, 249, 215, 0.6);
    background-color: #388e3c;
    transform: scale(1.05);
  }

  .save-password {
    background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(56, 249, 215, 0.4);
    background-color: #4caf50;
    color: white;
    padding: 15px 30px;
    border: none;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    opacity: 0.6;
    transition: background-color 0.3s, transform 0.3s;
  }

  .save-password:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(56, 249, 215, 0.6);
    background-color: #388e3c;
    transform: scale(1.05);
  }

  .cancel-change {
    background: linear-gradient(135deg, #ff6a6a 0%, #ff0000 100%);
    box-shadow: 0 4px 10px rgba(255, 0, 0, 0.3);
    background-color: #f44336;
    color: white;
    border: none;
    padding: 15px 30px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
  }

  .cancel-change {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(255, 0, 0, 0.5);
    background-color: #d32f2f;
  }


  .delete-button {
    background: linear-gradient(45deg, #f44336, #ff7961);
    color: white;
    padding: 8px 12px;
    border: none;
    cursor: pointer;
    margin-top: 10px;
    border-radius: 5px;
  }

  .delete-button:hover {
    background: linear-gradient(45deg, #d32f2f, #ff5252);
    transform: scale(1.05);
  }

  .order-card {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    background-color: #f9f9f9;
}

  .auth-container {
    animation: fadeInAll 0.75s ease-out;
  }

  .change-password {
    animation: fadeInButton 0.75s ease-out forwards;
  }
  
  .save-password {
    animation: fadeInButton 0.75s ease-out forwards;
  }

  .cancel-change {
    animation: fadeInButton 0.75s ease-out forwards;
  }

  .header {
  background-color: #fff;
  color: #333;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid #ddd;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  animation: fadeInHeader 0.75s ease-out;
  }
  
  .header img {
    height: 60px;
  }
  
  .navigation {
    display: flex;
    gap: 30px;
  }
  
  .nav-link {
    color: #333;
    text-decoration: none;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 1px;
    transition: color 0.3s, transform 0.3s, letter-spacing 0.3s;
    animation: fadeInLink 0.75s ease-out forwards;
  }
  
  .nav-link:hover {
    color: #e91e63;
    transform: scale(1.1);
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
    letter-spacing: 3px;
  }

  .hamburger-menu {
  display: none;
  font-size: 30px;
  cursor: pointer;
}

.mobile-menu {
  position: absolute;
  top: 70px;
  right: 20px;
  z-index: 1000;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 150px;
  padding: 10px;
}

.mobile-nav-link {
  padding: 15px;
  text-decoration: none;
  color: #333;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  letter-spacing: 1px;
  font-size: 18px;
  transition: color 0.3s, transform 0.3s, letter-spacing 0.3s;
  animation: fadeInLink 0.75s ease-out forwards;
}

.mobile-nav-link:hover {
  color: #e91e63;
  transform: scale(1.1);
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  letter-spacing: 3px;
}

@media (max-width: 768px) {
  .navigation {
    display: none;
  }
  .hamburger-menu {
    display: block;
  }
}
  
  .form-container {
    max-width: 600px;
    margin: 50px auto;
    padding: 30px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    animation: fadeInForm 0.75s ease-out;
  }
  
  header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  h1 {
    font-size: 28px;
    font-weight: 600;
    animation: fadeInText 0.75s ease-out forwards;
  }
  
  .input-group {
    margin-bottom: 20px;
    max-width: 500px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    max-width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    box-sizing: border-box;
    opacity: 0;
    animation: fadeInInput 0.75s ease-out forwards;
  }

  .input-group label {
    font-weight: 600;
    margin-bottom: 5px;
  }
  
  .actions {
    display: flex;
    justify-content: center;
  }
  
  .logout-button {
    display: inline-block;
    padding: 10px 20px;
    background: linear-gradient(45deg, #f44336, #ff7961);
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
    transition: background 0.3s, transform 0.3s;
    animation: fadeInButton 0.75s ease-out forwards;
  }
  
  .logout-button:hover {
    background: linear-gradient(45deg, #d32f2f, #ff5252);
    transform: scale(1.05);
  }
  
  .redirect {
    text-align: center;
    margin-top: 20px;
  }
  
  .redirect a {
    color: #4caf50;
    text-decoration: none;
    opacity: 0;
    animation: fadeInLink 0.75s ease-out forwards;
  }
  
  .redirect a:hover {
    text-decoration: underline;
  }
  
  @keyframes fadeInAll {
    0% { opacity: 0; transform: translateY(-30px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fadeInHeader {
    0% { opacity: 0; transform: translateY(-50px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fadeInLink {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fadeInForm {
    0% { opacity: 0; transform: translateY(-50px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fadeInText {
    0% { opacity: 0; transform: translateY(-20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fadeInInput {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fadeInButton {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  </style>
  