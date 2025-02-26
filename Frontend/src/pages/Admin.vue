<template>
  <div class="admin-container">
    <header class="header">
      <img alt="Konzolvilág logo" src="https://placehold.co/150x50" id="navlogo" />
      <div class="navigation">
        <router-link to="/main" class="nav-link">Főoldal</router-link>
        <router-link to="/games" class="nav-link">Játékok</router-link>
        <router-link to="/login" class="nav-link">Bejelentkezés</router-link>
        <router-link to="/cart" class="nav-link">Kosár</router-link>
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
      }
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

        console.log('Response data:', response.data);

        if (response.status !== 201) {
          alert(`Sikeres feltöltés: ${response.data.message}`);
        } else {
          alert(response.data.message); 
        }
      } catch (error) {
        console.error('Hiba történt:', error);
        alert(`Belső hiba történt a termék hozzáadása során: ${error.message}`);
      }
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

.navlogo {
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