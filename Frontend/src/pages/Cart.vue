<template>
  <div class="cart-container">
    <header class="header">
      <router-link to="main"><img src="../assets/logo.png" class="navlogo" /></router-link>
      <div class="navigation">
        <router-link to="/main" class="nav-link">Főoldal</router-link>
        <router-link to="/products" class="nav-link">Termékek</router-link>
        <router-link to="/profile" class="nav-link">Profil</router-link>
      </div>

      <div class="hamburger-menu" v-if="isMobile" @click="toggleMenu">
        &#9776;
      </div>
      
      <div class="mobile-menu" v-if="menuOpen">
        <router-link to="/main" class="mobile-nav-link" @click="closeMenu">Főoldal</router-link>
        <router-link to="/products" class="mobile-nav-link" @click="closeMenu">Termékek</router-link> 
        <router-link to="/profile" class="mobile-nav-link" @click="closeMenu">Profil</router-link>
      </div>
    </header>

    <main class="main">
      <BaseAlert v-if="alert.visible" :message="alert.message" :type="alert.type" :duration="2200" />

      <h1>Kosár</h1>
      <div v-if="cart.length === 0" class="empty-cart">
        <p>A kosár jelenleg üres. Helyezd a termékeket a kosárba!</p>
      </div>
      <div v-else>
        <div v-for="(item, index) in cart" :key="index" class="cart-item">
          <p>Termék: {{ item.name }}</p>
          <p>Ár: {{ item.price }} Ft</p>
          <p>
            Mennyiség:
            <button @click="decreaseQuantity(index)" class="quantity-button">−</button>
            {{ item.quantity }}
            <button @click="increaseQuantity(index)" class="quantity-button">+</button>
          </p>
        </div>
        <div class="cart-summary">
          <p>Összes termék darabszám: {{ totalQuantity }}</p>
          <p>Végösszeg: {{ totalPrice }} Ft</p>
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

          <label for="shippingMethod">Futárszolgálat:</label>
          <select v-model="orderDetails.shippingMethod" @change="updateShippingCost" required>
            <option value="gls">GLS (+1500 Ft)</option>
            <option value="foxpost">Foxpost (+1200 Ft)</option>
            <option value="personal">Személyes átvétel (ingyenes)</option>
          </select>

          <p>Szállítási díj: {{ shippingCost }} Ft</p>
          <p>Végösszeg szállítással: {{ totalWithShipping }} Ft</p>

          <button type="submit">Rendelés leadása</button>
        </form>
      </div>
    </main>
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
      cart: [],
      showOrderForm: false,
      alert: {
        visible: false,
        message: '',
        type: 'success'
      },
      orderDetails: {
        name: '',
        address: '',
        paymentMethod: 'creditCard',
        shippingMethod: 'personal',
        shippingCost: '0',
        user_id: null,
      },
      shippingCost: 0,
      isMobile: window.innerWidth < 768,
      menuOpen: false
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    totalQuantity() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },
    totalWithShipping() {
      return this.totalPrice + this.shippingCost;
    }
  },
  mounted() {
    this.loadCart();
    this.loadUser();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
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
    showAlert(message, type = 'success') {
      this.alert.message = message;
      this.alert.type = type;
      this.alert.visible = true;
      setTimeout(() => {
        this.alert.visible = false;
      }, 3000);
    },
    loadCart() {
      this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    },
    loadUser() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.user_id) {
        this.orderDetails.user_id = user.user_id;
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    },
    increaseQuantity(index) {
      this.cart[index].quantity += 1;
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    decreaseQuantity(index) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity -= 1;
      } else {
        this.cart.splice(index, 1);
      }
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    updateShippingCost() {
      const shippingPrices = {
        gls: 1500,
        foxpost: 1200,
        personal: 0,
      };
      this.shippingCost = shippingPrices[this.orderDetails.shippingMethod];
    },
    async submitOrder() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.user_id) {
        this.orderDetails.user_id = user.user_id;
      } else {
        this.orderDetails.user_id = null;
      }

      const order = {
        userDetails: this.orderDetails,
        products: this.cart,
      };

      try {
        const response = await axios.post('http://localhost:8000/api/orders', order);
        if (response.status === 200) {
          this.clearCart(false);
          this.showAlert('A rendelésed sikeresen beérkezett! Köszönjük a vásárlást!', 'success');
          this.showOrderForm = false;
        } else {
          this.showAlert(`❌ Hiba történt: ${response.data.message}`, 'error');
        }
      } catch (error) {
        console.error('Hiba:', error);
        this.showAlert('⚠️ Nem sikerült kapcsolódni a szerverhez. Próbáld meg később újra!', 'error');
      }
    },
    clearCart(showAlert = true) {
  this.cart = [];
  localStorage.removeItem('cart');
  this.showOrderForm = false;
  if (showAlert) {
    this.showAlert('🛒 A kosár kiürítve! Készen állsz egy új bevásárlásra.', 'info');
  }
}

  },
};
</script>

<style scoped>
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
.place-order {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  color: white;
  padding: 14px 28px;
  font-size: 18px;
  font-weight: 700;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(56, 249, 215, 0.4);
  transition: transform 0.2s, box-shadow 0.3s;
}

.place-order:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(56, 249, 215, 0.6);
}

.clear-cart-button {
  background: linear-gradient(135deg, #ff6a6a 0%, #ff0000 100%);
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(255, 0, 0, 0.3);
  margin-top: 15px;
  transition: transform 0.2s, box-shadow 0.3s;
}

.clear-cart-button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(255, 0, 0, 0.5);
}

.quantity-button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  border: none;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.quantity-button:hover {
  background-color: #0056b3;
  transform: scale(1.1);
}

.cart-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  align-items: center;
  gap: 20px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 12px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
}

.cart-item:hover {
  transform: scale(1.02);
}

.cart-item p {
  margin: 0;
  font-size: 16px;
}

.cart-item .quantity-button {
  font-size: 18px;
}

.cart-summary {
  text-align: center;
  background-color: #f0f4f8;
  border-radius: 10px;
  padding: 25px;
  margin-top: 30px;
}

.cart-summary p {
  font-size: 18px;
  margin-bottom: 10px;
}

.empty-cart {
  background-color: #fff8f8;
  padding: 30px;
  text-align: center;
  font-size: 18px;
  border: 2px dashed #ffbaba;
  border-radius: 10px;
  color: #d32f2f;
}

.header {
  animation: fadeInHeader 0.75s ease-out;
}

.cart-item {
  animation: fadeInCartItem 0.75s ease-out forwards;
}

.cart-summary {
  animation: fadeInSummary 0.75s ease-out forwards;
}

.place-order {
  animation: fadeInButton 0.75s ease-out forwards;
}

.nav-link {
  animation: fadeInLink 0.75s ease-out forwards;
}

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

@media (max-width: 768px) {
  .cart-content {
    flex-direction: column;
  }
  .cart-left,
  .cart-sidebar {
    width: 100%;
  }
}

.quantity-button {
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 16px;
  font-weight: bold;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.quantity-button:hover {
  background-color: #1565c0;
  transform: scale(1.1);
}

</style>