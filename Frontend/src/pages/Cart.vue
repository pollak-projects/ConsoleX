<template>
  <div class="cart-container">
    <header class="header">
      <img alt="Konzolvilág logo" src="https://placehold.co/150x50" />
      <div class="navigation">
        <router-link to="/main" class="nav-link">Főoldal</router-link>
        <router-link to="/games" class="nav-link">Játékok</router-link>
        <router-link to="/login" class="nav-link">Bejelentkezés</router-link>
        <router-link to="/register" class="nav-link">Regisztráció</router-link>
      </div>
    </header>

    <main class="main">
      <div class="cart-content">
        <div class="cart-left">
          <h1>Kosár</h1>

          <div v-if="cart.length === 0" class="empty-cart">
            <p>A kosár jelenleg üres. Helyezd a termékeket a kosárba!</p>
          </div>

          <div v-else>
            <!-- Termékek listája -->
            <div v-for="(item, index) in cart" :key="index" class="cart-item">
              <p>{{ item.name }} - {{ item.quantity }} x {{ item.price }} Ft</p>
              <p>Összesen: {{ item.quantity * item.price }} Ft</p>
            </div>

            <!-- Kosár összegzése -->
            <div class="cart-summary">
              <p>Termékek száma: {{ cart.length }}</p>
              <p>Végösszeg: {{ totalAmount }} Ft</p>
              <button @click="placeOrder" class="place-order" :disabled="cart.length === 0">Rendelés leadása</button>
            </div>
          </div>
        </div>

        <!-- Sidebar (Jobb oldali sáv) -->
        <div class="cart-sidebar">
          <h2>Összegzés</h2>
          <div class="cart-summary">
            <p>Termékek száma: {{ cart.length }}</p>
            <p>Végösszeg: {{ totalAmount }} Ft</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Kezdetben üres kosár
      cart: [],
    };
  },
  computed: {
    // Végösszeg számítása
    totalAmount() {
      return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
  },
  methods: {
    // Kosár ürítése
    clearCart() {
      this.cart = [];
    },

    // Rendelés leadása
    placeOrder() {
      alert("Rendelés leadása nem elérhető még.");
    },

    // Példa termék hozzáadása a kosárhoz
    addProductToCart(product) {
      const existingProduct = this.cart.find(item => item.name === product.name);
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        this.cart.push(product);
      }
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

/* Mobil eszközök */
@media (max-width: 768px) {
  .cart-content {
    flex-direction: column;
  }

  .cart-left, .cart-sidebar {
    width: 100%;
  }
}
</style>
