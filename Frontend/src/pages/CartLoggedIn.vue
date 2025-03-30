<template>
  <div class="cart-container">
    <header class="header">
      <router-link to="main"><img src="../assets/logo.png" class="navlogo" /></router-link>
      <div class="navigation">
        <router-link to="/mainloggedin" class="nav-link">Főoldal</router-link>
        <router-link to="/productsloggedin" class="nav-link">Termékek</router-link>
        <router-link to="loggedin" class="nav-link">Profil</router-link>
      </div>
    </header>

    <main class="main">
      <h1>Kosár</h1>
      <div v-if="cart.length === 0" class="empty-cart">
        <p>A kosár jelenleg üres. Helyezd a termékeket a kosárba!</p>
      </div>
      <div v-else>
        <div v-for="(item, index) in cart" :key="index" class="cart-item">
          <p>Termék: {{ item.name }}</p>
          <p>Ár: {{ item.price }} Ft</p>
          <p>Mennyiség: {{ item.quantity }}</p>
        </div>
        <div class="cart-summary">
          <p>Termékek száma: {{ cart.length }}</p>
          <button @click="clearCart" class="clear-cart-button">Kosár ürítése</button>
          <button @click="showOrderForm = true" class="place-order">Rendelés leadása</button>
        </div>
      </div>

      <div v-if="showOrderForm" class="order-form">
        <h2>Rendelési Adatok</h2>
        <form @submit.prevent="submitOrder">
          <label for="name">Név:</label>
          <input type="text" v-model="orderDetails.name" required />

          <label for="address">Cím:</label>
          <input type="text" v-model="orderDetails.address" required />

          <label for="paymentMethod">Fizetési mód:</label>
          <select v-model="orderDetails.paymentMethod" required>
            <option value="creditCard">Bankkártya</option>
            <option value="cash">Készpénz</option>
          </select>

          <button type="submit">Rendelés leadása</button>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cart: [],
      showOrderForm: false,
      user: null,
      orderDetails: {
        name: '',
        address: '',
        paymentMethod: 'creditCard',
        email: '',
        username: '',
      },
    };
  },
  async mounted() {
    this.loadCart();
    await this.getUserDetails();
  },
  methods: {
    loadCart() {
      this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    },
    async getUserDetails() {
      try {
        const response = await axios.get(`http://localhost:8000/api/user/${this.user.id}`, { withCredentials: true });

        if (response.data) {
          this.user = response.data;
          this.orderDetails.email = this.user.email || '';
          this.orderDetails.username = this.user.username || '';
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    },

    async submitOrder() {
      const order = {
        userDetails: this.orderDetails,
        products: this.cart,
      };

      if (this.user) {
        order.userDetails.user_id = this.user.user_id;
      }

      try {
        const response = await axios.post('http://localhost:8000/api/orders', order);
        if (response.status === 200) {
          alert('Rendelés sikeresen leadva!');
          this.clearCart();
          this.showOrderForm = false;
        } else {
          alert(`Hiba történt: ${response.data.message}`);
        }
      } catch (error) {
        console.error('Hiba:', error);
        alert('Nem sikerült kapcsolódni a szerverhez.');
      }
    },


    clearCart() {
      this.cart = [];
      localStorage.removeItem('cart');
      alert('A kosár sikeresen kiürítve.');
    },
  },
};
</script>


<style scoped>
/* Animációk gyorsítása */
@keyframes fadeInHeader {
  0% { opacity: 0; transform: translateY(-50px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInLink {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInCartItem {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInSummary {
  0% { opacity: 0; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes fadeInButton {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* Fejléc animáció */
.header {
  animation: fadeInHeader 0.75s ease-out;
}

/* Kosár elemek animációja */
.cart-item {
  animation: fadeInCartItem 0.75s ease-out forwards;
}

/* Kosár összegzése animáció */
.cart-summary {
  animation: fadeInSummary 0.75s ease-out forwards;
}

/* Kosár rendelés gomb animáció */
.place-order {
  animation: fadeInButton 0.75s ease-out forwards;
}

/* Linkek animáció a regisztráció oldalán */
.nav-link {
  animation: fadeInLink 0.75s ease-out forwards;
}

/* Alap stílusok */
body {
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f7f7f7;
  color: #333;
}

.header {
  background-color: #fff;
  color: #333;
  padding: 20px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 3px solid #ddd;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
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
}

.nav-link:hover {
  color: #e91e63;
  transform: scale(1.1);
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  letter-spacing: 3px;
}

.main {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.cart-content {
  display: flex;
  justify-content: space-between;
}

.cart-left {
  width: 70%;
}

.cart-item {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.cart-summary {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.place-order {
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

.place-order:hover {
  background-color: #388e3c;
  transform: scale(1.05);
}

.place-order:disabled {
  background-color: #b0bec5;
  cursor: not-allowed;
}

.clear-cart-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s, transform 0.3s;
}

.clear-cart-button:hover {
  background-color: #d32f2f;
  transform: scale(1.05);
}

/* Sidebar (Jobb oldali sáv) */
.cart-sidebar {
  width: 28%;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.cart-sidebar h2 {
  font-size: 22px;
  margin-bottom: 15px;
}

.cart-summary p {
  font-size: 18px;
  margin-bottom: 10px;
}
.order-form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 20px auto;
}

.order-form h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.order-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.order-form input[type="text"],
.order-form select {
  width: calc(100% - 22px);
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.order-form button[type="submit"] {
  background-color: #28a745;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.order-form button[type="submit"]:hover {
  background-color: #218838;
}

/* Mobil eszközök */
@media (max-width: 768px) {
  .cart-content {
    flex-direction: column;
  }
  .cart-left,
  .cart-sidebar {
    width: 100%;
  }
}
</style>