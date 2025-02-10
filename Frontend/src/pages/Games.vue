<template>
  <div class="games-container">
    <header class="header">
      <img alt="Konzolvilág logo" src="https://placehold.co/150x50" id="navlogo" />
      <div class="search-container">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Keresés játékok között..."
          @input="filterProducts"
        />
      </div>
      <div class="navigation">
        <router-link to="/main" class="nav-link">Főoldal</router-link>
        <router-link to="/login" class="nav-link">Bejelentkezés</router-link>
        <router-link to="/register" class="nav-link">Regisztráció</router-link>
        <router-link to="/cart" class="nav-link">Kosár</router-link>
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
        <img alt="PS5 Pro advertisement" src="https://placehold.co/800x200" />
        <h1>Játékok</h1>
        <p>1–24 / 880 termék a Játékok kategóriában</p>

        <div class="products">
          <div class="product" v-for="product in filteredProducts" :key="product.id">
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
export default {
  data() {
    return {
      searchQuery: '',
      categories: ['Akció', 'PlayStation', 'Xbox', 'PC'],
      selectedCategories: [],
      selectedPriceMin: 0, // Minimum ár
      selectedPriceMax: 25000, // Maximum ár
      maxPrice: 25000, // Maximális ár, amit a csúszkákhoz használunk
      products: [
        { id: 1, name: "Marvel's Spider-Man 2", price: 19990, image: "https://placehold.co/200x300", category: ['PlayStation', 'Akció'] },
        { id: 2, name: "Marvel's Spider-Man 2 (használt)", price: 15990, image: "https://placehold.co/200x300", category: ['PlayStation', 'Akció'] },
        { id: 3, name: "Marvel's Spider-Man Miles Morales Ultimate Edition", price: 19990, image: "https://placehold.co/200x300", category: ['PlayStation', 'Akció'] },
        { id: 4, name: "Marvel's Spider-Man: Miles Morales", price: 17990, image: "https://placehold.co/200x300", category: ['PlayStation', 'Akció'] },
        { id: 5, name: "Call of Duty: Modern Warfare II", price: 24990, image: "https://placehold.co/200x300", category: ['PlayStation', 'Akció'] },
        { id: 6, name: "FIFA 24", price: 15990, image: "https://placehold.co/200x300", category: ['PC', 'Sport'] },
        { id: 7, name: "Halo Infinite", price: 19990, image: "https://placehold.co/200x300", category: ['Xbox', 'Akció'] },
      ],
      filteredProducts: [],
    };
  },
  computed: {
    filteredProducts() {
      let filtered = this.products;

      // Keresés
      if (this.searchQuery) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      // Kategóriák szűrése
      if (this.selectedCategories.length) {
        filtered = filtered.filter(product =>
          this.selectedCategories.every(category => product.category.includes(category))
        );
      }

      // Ár szűrés
      filtered = filtered.filter(product => product.price >= this.selectedPriceMin && product.price <= this.selectedPriceMax);

      return filtered;
    },
  },
  methods: {
    addToCart(product) {
      console.log("Added to cart:", product.name);
    },
    filterProducts() {
      // A csúszkák és egyéb szűrők alapján frissíti a filteredProducts tömböt
    },
  },
  mounted() {
    this.filteredProducts = this.products;
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
  }

  .header {
    background-color: #fff;
    color: #333;
    padding: 20px 30px;
    display: flex;
    justify-content: space-between; /* A navigációt jobbra helyezi */
    align-items: center;
    border-bottom: 3px solid #ddd;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }

  .header img {
    height: 60px;
  }

  .search-container {
    flex: 1;
    display: flex;
    justify-content: center; /* Középre igazítja a keresőt */
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
    transition: color 0.3s, transform 0.3s;
  }

  .nav-link:hover {
    color: #e91e63;
    transform: scale(1.1);
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  }

  .main {
    display: flex;
    padding: 20px;
    max-width: 1400px; /* Tágabb elrendezés */
    margin: 0 auto;
  }

  .navlogo{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }

  .sidebar {
    width: 25%;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid #ddd;
    margin-right: 20px;
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

  .input-price{
    border: 1px solid;
    border-color: #ddd;
    height: 20px;
    width: 100px;
  }
</style>
