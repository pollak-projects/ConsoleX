<template>
  <div>
    <header class="header">
      <img alt="Konzolvilág logo" src="https://placehold.co/150x50" />
      <div class="search-bar">
        <input v-model="searchQuery" placeholder="Keresés" type="text" />
        <button @click="search">
          <i class="fas fa-search"></i>
        </button>
      </div>
      <!-- Kosár gomb, amely átirányít a Cart.vue oldalra -->
      <router-link to="/cart">
        <button class="cart-button">
          Kosár
        </button>
      </router-link>
    </header>
    <nav class="nav">
      <a href="#">Akció</a>
      <a href="#">Használt</a>
      <a href="#">PlayStation</a>
      <a href="#">Xbox</a>
      <a href="#">PC</a>
      <a href="#">PlayStation</a>
    </nav>
    <main class="main">
      <aside class="sidebar">
        <h2>Szűrők</h2>
        <label v-for="filter in filters" :key="filter">
          <input type="checkbox" v-model="selectedFilters" :value="filter" />
          {{ filter }}
        </label>
      </aside>
      <section class="content">
        <img alt="PS5 Pro advertisement" src="https://placehold.co/800x200" />
        <h1>Játékok</h1>
        <p>1–24 / 880 termék PS5 játékok kategóriában</p>
        <div class="products">
          <div class="product" v-for="product in products" :key="product.id">
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
      filters: ['Új termékek', 'Használt termékek', 'Raktáron', 'Előrendelhető'],
      selectedFilters: [],
      products: [
        { id: 1, name: "Marvel's Spider-Man 2", price: 19990, image: "https://placehold.co/200x300" },
        { id: 2, name: "Marvel's Spider-Man 2 (használt)", price: 15990, image: "https://placehold.co/200x300" },
        { id: 3, name: "Marvel's Spider-Man Miles Morales Ultimate Edition", price: 19990, image: "https://placehold.co/200x300" },
        { id: 4, name: "Marvel's Spider-Man: Miles Morales", price: 17990, image: "https://placehold.co/200x300" },
      ]
    };
  },
  methods: {
    // Keresés metódus, a már meglévő funkció
    search() {
      console.log("Searching for:", this.searchQuery);
    },
    // Kosárba helyezés metódusa, a már meglévő funkció
    addToCart(product) {
      console.log("Added to cart:", product.name);
    }
  }
};
</script>

<style scoped>
  /* A stílusokat a gombhoz és az oldal többi eleméhez igazítjuk */

  .cart-button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .cart-button:hover {
    background-color: #45a049;
  }

  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
  }

  .header {
    background-color: #fff;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
  }

  .header img {
    height: 50px;
  }

  .header .search-bar {
    display: flex;
    align-items: center;
  }

  .header .search-bar input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px 0 0 5px;
    outline: none;
  }

  .header .search-bar button {
    padding: 10px;
    border: none;
    background-color: #e91e63;
    color: #fff;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
  }

  .nav {
    background-color: #fff;
    padding: 10px 20px;
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #ddd;
  }

  .nav a {
    color: #333;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 5px;
  }

  .nav a:hover {
    background-color: #f5f5f5;
  }

  .main {
    display: flex;
    padding: 20px;
  }

  .sidebar {
    width: 20%;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .sidebar h2 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .sidebar label {
    display: block;
    margin-bottom: 10px;
  }

  .content {
    width: 80%;
    padding: 20px;
  }

  .content h1 {
    font-size: 24px;
    margin-bottom: 10px;
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
</style>
