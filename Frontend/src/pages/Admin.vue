<template>
  <div class="admin-container">
    <header class="header">
      <router-link to="main"><img src="../assets/logo.png" class="navlogo"/></router-link>
      <div class="search-container"></div>
      <div class="navigation">
        <router-link to="/main" class="nav-link">Főoldal</router-link>
        <router-link to="/games" class="nav-link">Játékok</router-link>
        <router-link to="/cart" class="nav-link">Kosár</router-link>
        <router-link to="/profile" class="nav-link">Profil</router-link>
      </div>
    </header>

    <div class="form-container">
      <header>
        <h1>Új termék hozzáadása</h1>
      </header>
      <form @submit.prevent="addProduct">
        <div class="input-group">
          <label for="name">Termék neve</label>
          <input type="text" v-model="product.name" id="name" required />
        </div>
        <div class="input-group">
          <label for="price">Ár</label>
          <input type="number" v-model="product.price" id="price" required />
        </div>
        <div class="input-group">
          <label for="image">Kép URL</label>
          <input type="text" v-model="product.image" id="image" />
        </div>
        <div class="input-group">
          <label for="category">Kategória</label>
          <input type="text" v-model="product.category" id="category" required />
        </div>
        <div class="actions">
          <button type="submit">Hozzáadás</button>
        </div>
      </form>
    </div>

    <section class="section">
    <div class="form-container">
      <header>
        <h1>Termékek törlése</h1>
      </header>
      <div class="products">
        <div class="product" v-for="product in products" :key="product.product_id">
            <img :alt="product.name" :src="product.image" />
            <h2>{{ product.name }}</h2>
            <p class="price">{{ product.price }} Ft</p>
            <div class="actions">
              <button @click="deleteProduct(product.product_id)">Törlés</button>
            </div>
          </div>
        </div>
    </div>
  </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      product: {
        name: '',
        price: '',
        image: '',
        category: ''
      },
      products: []
    };
  },

  methods: {
    async addProduct() {
      try {
        const response = await axios.post('http://localhost:8000/api/admin', this.product, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        alert(`Sikeres feltöltés: ${response.data.message}`);
        this.fetchProducts();
      } catch (error) {
        console.error('Hiba történt:', error);
        alert(`Belső hiba történt a termék hozzáadása során: ${error.message}`);
      }
    },

    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:8000/api/products');
        this.products = response.data.products;
      } catch (error) {
        console.error('Hiba történt a termékek lekérése közben:', error);
      }
    },


    async deleteProduct(productId) {
      try {
        const response = await axios.delete(`http://localhost:8000/api/admin/${productId}`);
        alert("Termék sikeresen törölve!");
        this.fetchProducts();
      } catch (error) {
        console.error('Hiba történt a termék törlésekor:', error);
        alert(`Belső hiba történt a termék törlése során: ${error.message}`);
      }
    }
  },

  created() {
    this.fetchProducts();
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
  animation: fadeInAll 1s ease-out; /* Az egész oldal animációja */
}

/* Fejléc */
.header {
  background-color: #fff;
  color: #333;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between; /* A navigációt jobbra helyezi */
  align-items: center;
  border-bottom: 3px solid #ddd;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  animation: fadeInHeader 0.75s ease-out; /* Fejléc animáció */
}

.header img {
  height: 60px;
}

.search-container {
  flex: 1;
  display: flex;
  justify-content: center;
}

.search-container input {
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 5px;
  width: 250px;
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
  animation: fadeInLink 0.75s ease-out forwards; /* Linkek animációja */
}

.nav-link:hover {
  color: #e91e63;
  transform: scale(1.1);
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  letter-spacing: 3px;
}

.main {
  display: flex;
  padding: 20px;
  max-width: 1400px; /* Tágabb elrendezés */
  margin: 0 auto;
  animation: fadeInContent 0.75s ease-out; /* Tartalom animációja */
}

.sidebar {
  width: 25%;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-right: 20px;
  animation: fadeInSidebar 0.75s ease-out; /* Oldalsáv animációja */
}

.sidebar h2 {
  font-size: 22px;
  margin-bottom: 10px;
}

.filter-category {
  margin-bottom: 20px;
}

.filter-category h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.sidebar label {
  display: block;
  margin-bottom: 10px;
}

.content {
  flex: 1;
  animation: fadeInContentFromTop 1s ease-out; /* Fentről lefelé betöltés animációja */
}

.content img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 20px;
}

.content h1 {
  font-size: 28px;
  margin-bottom: 10px;
  font-weight: 600;
}

.content .products {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  width: 23%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: fadeInProduct 0.75s ease-out; /* Termékek animációja */
}

.product img {
  width: 100%;
  border-radius: 5px;
}

.product h2 {
  font-size: 18px;
  margin: 10px 0;
}

.product .price {
  font-size: 16px;
  color: #e91e63;
  margin: 10px 0;
}

.product .actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product .actions button {
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.product .actions button:hover {
  background-color: #45a049;
}

.product .actions .wishlist {
  color: #e91e63;
  cursor: pointer;
}

@media (max-width: 768px) {
  .main {
    flex-direction: column;
  }

  .sidebar, .content {
    width: 100%;
  }

  .product {
    width: 48%;
  }
}

@media (max-width: 480px) {
  .product {
    width: 100%;
  }
}

.input-price {
  border: 1px solid;
  border-color: #ddd;
  height: 20px;
  width: 100px;
}

/* Animációk */
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

@keyframes fadeInContent {
  0% { opacity: 0; transform: translateY(50px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInContentFromTop {
  0% { opacity: 0; transform: translateY(-50px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInSidebar {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInProducts {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInProduct {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

</style>