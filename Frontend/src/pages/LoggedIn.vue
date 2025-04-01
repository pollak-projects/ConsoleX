<template>
  <div>
    <!-- Erősítés vagy visszajelzés -->
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
      <router-link to="/adminlogin">
        <router-link to="/mainloggedin">
          <img src="../assets/logo.png" class="navlogo"/>
        </router-link>
      </router-link>
      <div class="navigation">
        <router-link to="/mainloggedin" class="nav-link">Főoldal</router-link>
        <router-link to="/productsloggedin" class="nav-link">Termékek</router-link>
        <router-link to="/cartloggedin" class="nav-link">Kosár</router-link> 
      </div>
    </header>

    <div class="loggedin-container">
      <header>
        <h1>Üdvözöllek, {{ username }}!</h1>
        <p>Örülünk, hogy újra itt vagy.</p>
      </header>

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
          <p><strong>Rendelés ideje:</strong> {{ new Date(order.order_date).toLocaleString() }}</p>
          <h4>Termékek:</h4>
          <ul>
            <li v-for="item in order.items" :key="item.product_name">
              {{ item.product_name }} - {{ item.quantity }} db - {{ item.price }} Ft/db
            </li>
          </ul>
          <p><strong>Végösszeg:</strong> {{ order.total_price }} Ft</p>
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
      orders: [],
      alertMessage: "",
      alertType: "",
      orderIdToDelete: null,
      confirmingDelete: false
    };
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.username = user.username;
      this.fetchOrders(user.user_id);
    }
  },
  methods: {
    fetchOrders(userId) {
      axios.get(`http://localhost:8000/api/orders/${userId}`)
        .then(response => {
          this.orders = response.data;
        })
        .catch(error => {
          console.error("Hiba a rendelési adatok lekérésekor:", error);
        });
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

    logout() {
      localStorage.removeItem('username');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.$router.push("/main");
    }
  }
};
</script>






  <style scoped>
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
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 96%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    opacity: 0;
    animation: fadeInInput 0.75s ease-out forwards;
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
  