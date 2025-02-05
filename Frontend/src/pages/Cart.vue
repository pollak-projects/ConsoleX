<template>
  <div class="cart-container">
    <header class="header">
      <img alt="Konzolvilág logo" src="https://placehold.co/150x50" />
      <div class="navigation">
        <router-link to="/games" class="nav-link">Játékok</router-link>
        <router-link to="/login" class="nav-link">Bejelentkezés</router-link>
        <router-link to="/" class="nav-link">Főoldal</router-link>
        <router-link to="/register" class="nav-link">Regisztráció</router-link>
      </div>
    </header>

    <main class="main">
      <h1>Kosár</h1>
      <div class="empty-cart">
        <p>A kosár jelenleg üres. Helyezd a termékeket a kosárba!</p>
      </div>

      <div class="cart-actions">
        <button @click="clearCart" class="clear-cart" disabled>Kosár ürítése</button>
        <button @click="placeOrder" class="place-order" disabled>Rendelés leadása</button>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: [],  // A kosár most üres
    };
  },
  methods: {
    clearCart() {
      alert("Kosár törlés nem elérhető még.");
    },
    placeOrder() {
      alert("Rendelés leadása nem elérhető még.");
    }
  }
};
</script>

<style scoped>
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
    transition: color 0.3s, transform 0.3s;
  }

  .nav-link:hover {
    color: #e91e63;
    transform: scale(1.1);
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  }

  .main {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  h1 {
    font-size: 28px;
    margin-bottom: 20px;
    font-weight: 600;
  }

  .empty-cart {
    font-size: 18px;
    color: #555;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
  }

  .cart-actions {
    display: flex;
    gap: 20px;
    margin-top: 30px;
  }

  .clear-cart, .place-order {
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

  .clear-cart:hover, .place-order:hover {
    background-color: #388e3c;
    transform: scale(1.05);
  }

  .clear-cart:disabled, .place-order:disabled {
    background-color: #b0bec5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    .main {
      padding: 15px;
    }
    
    .cart-actions {
      flex-direction: column;
    }
  }
</style>
