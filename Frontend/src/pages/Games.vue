<template>
  <div class="games-container">
    <header class="header">
      <img alt="Konzolvilág logo" src="https://placehold.co/150x50" class="navlogo" />
      <div class="search-container">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Keresés játékok között..."
          @input="filterProducts"
        />
      </div>
      <div class="navigation">
        <router-link to="/admin" class="nav-link">Admin</router-link>
        <router-link to="/main" class="nav-link">Főoldal</router-link>
        <router-link to="/cart" class="nav-link">Kosár</router-link> 
        <router-link to="/profile" class="nav-link">Profil</router-link>
      </div>
    </header>

    <main class="main">
      <div class="sidebar">
        <h2>Szűrők</h2>
        <div class="filter-category">
          <h3>Kategória</h3>
          <label v-for="filter in categories" :key="filter">
            <input type="checkbox" v-model="selectedCategories" :value="filter" @change="filterProducts" />
            {{ filter }}
          </label>
        </div>
        <div class="filter-category">
          <h3>Ár</h3>
          <div class="slider-container">
            <input
              type="range"
              v-model="selectedPriceMin"
              :max="maxPrice"
              :step="500"
              @input="filterProducts"
            />
            <input
              type="range"
              v-model="selectedPriceMax"
              :max="maxPrice"
              :step="500"
              @input="filterProducts"
            />
            <div class="price-range">
              <input class="input-price"
                type="number"
                v-model="selectedPriceMin"
                @input="updatePriceFromInput('min')"
                :max="selectedPriceMax"
                min="0"
                step="500"
              />Ft
              <span> - </span>
              <input class="input-price"
                type="number"
                v-model="selectedPriceMax"
                @input="updatePriceFromInput('max')"
                :min="selectedPriceMin"
                max="25000"
                step="500"
              />Ft
            </div>
          </div>
        </div>
      </div>

      <section class="content">
        <img alt="advertisement" src="https://media.licdn.com/dms/image/v2/D4E16AQG-UxmGle8URA/profile-displaybackgroundimage-shrink_200_800/profile-displaybackgroundimage-shrink_200_800/0/1700322321372?e=2147483647&v=beta&t=Jgkb9WaAazLPhQHA0AgNhnlOWEx4pduESM460LMlQ4M" />
        <h1>Játékok</h1>

        <div class="products">
          <div class="product" v-for="product in filteredProducts" :key="product.product_id">
            <img :alt="product.name" :src="product.image" />
            <h2>{{ product.name }}</h2>
            <p class="price">{{ product.price }} Ft</p>
            <div class="actions">
              <button @click="addToCart(product)">Kosárba</button>
              <i class="fas fa-heart wishlist"></i>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: '',
      categories: ['Használt', 'PlayStation', 'Xbox', 'PC'],
      selectedCategories: [],
      selectedPriceMin: 0,
      selectedPriceMax: 25000,
      maxPrice: 25000,
      products: [],
      cart: [],
    };
  },
  computed: {
    filteredProducts() {
      let filtered = this.products;

      if (this.searchQuery) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      if (this.selectedCategories.length) {
        filtered = filtered.filter(product =>
          this.selectedCategories.every(category => product.category.includes(category))
        );
      }

      filtered = filtered.filter(product => product.price >= this.selectedPriceMin && product.price <= this.selectedPriceMax);
      return filtered;
    },
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:8000/api/products');
        this.products = response.data.products;
      } catch (error) {
        console.error('Hiba történt a termékek lekérése közben:', error);
      }
    },
    addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProduct = cart.find(item => item.product_id === product.product_id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        product.quantity = 1;
        cart.push(product);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Termék hozzáadva a kosárhoz.');
    },
    updatePriceFromInput(type) {
      if (type === 'min' && this.selectedPriceMin > this.selectedPriceMax) {
        this.selectedPriceMin = this.selectedPriceMax;
      }
      if (type === 'max' && this.selectedPriceMax < this.selectedPriceMin) {
        this.selectedPriceMax = this.selectedPriceMin;
      }
      this.filterProducts();
    },
    filterProducts() {
      // Filter products based on search query, categories, and price range
    },
  },
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
