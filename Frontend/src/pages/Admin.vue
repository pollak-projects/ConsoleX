<template>
  <div class="admin-container">
    <BaseAlert
      v-if="alertMessage"
      :message="alertMessage"
      :type="alertType"
      :duration="2500"
      @close="alertMessage = ''"
    />
    <header class="header">
      <router-link to="adminmain"><img src="../assets/logo.png" class="navlogo" /></router-link>
      <div class="search-container"></div>
      <div class="navigation">
        <router-link to="/adminmain" class="nav-link">Főoldal</router-link>
        <router-link to="/adminproducts" class="nav-link">Termékek</router-link>
        <router-link to="/adminloggedin" class="nav-link">Profil</router-link>
      </div>

      <div class="hamburger-menu" v-if="isMobile" @click="toggleMenu">
        &#9776;
      </div>
      
      <div class="mobile-menu" v-if="menuOpen">
        <router-link to="/adminmain" class="mobile-nav-link" @click="closeMenu">Főoldal</router-link>
        <router-link to="/adminproducts" class="mobile-nav-link" @click="closeMenu">Termékek</router-link> 
        <router-link to="/adminloggedin" class="mobile-nav-link" @click="closeMenu">Profil</router-link>
      </div>
    </header>

    <div class="main-content">
      <div class="form-container">
        <header>
          <h1>Új termék hozzáadása</h1>
        </header>
        <form @submit.prevent="addProduct">
          <div class="input-group">
            <label for="name">Termék neve:</label>
            <input type="text" v-model="product.name" id="name" required />
          </div>
          <div class="input-group">
            <label for="price">Ár:</label>
            <input type="number" v-model="product.price" id="price" required />
          </div>
          <div class="input-group">
            <label for="image">Kép URL:</label>
            <input type="text" v-model="product.image" id="image" />
          </div>
          <div class="input-group">
            <label for="category">Kategória:</label>
            <select v-model="product.category" id="category" required>
              <option disabled value=""></option>
              <option
                v-for="category in categories"
                :key="category.category_id"
                :value="category.category_id"
              >
                {{ category.category_name }}
              </option>
            </select>
          </div>
          <button type="submit" class="submit-button">Termék feltöltése</button>
        </form>
      </div>
      

      <div class="product-list-container">
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

      <div class="user-list-container">
      <header><h1>Felhasználók kezelése</h1></header>
      <div class="search-wrapper">
      <input
        v-model="userSearchQuery"
        type="text"
        placeholder="Felhasználó keresése név vagy email alapján..."
        class="search-input"
      />
      </div>


        <div class="user-group">
          <h2>Felhasználók</h2>
          <div class="users">
              <div class="user-card" v-for="user in filteredRegularUsers" :key="user.user_id">
              <p><strong>Név:</strong> {{ user.username }}</p>
              <p><strong>Email:</strong> {{ user.email }}</p>
              <button @click="deleteUser(user.user_id)">Törlés</button>
            </div>
          </div>
        </div>

        <div class="user-group">
          <h2>Adminok</h2>
          <div class="users">
              <div class="user-card" v-for="user in filteredAdmins" :key="user.user_id">
              <p><strong>Név:</strong> {{ user.username }}</p>
              <p><strong>Email:</strong> {{ user.email }}</p>
            </div>
          </div>
        </div>
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
      product: {
        name: '',
        price: '',
        image: '',
        category: '',
      },
      users: [],
      userSearchQuery: '',
      products: [],
      categories: [],
      alertMessage: '',
      alertType: '',
      isMobile: window.innerWidth < 768,
      menuOpen: false
    };
  },

  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:8000/api/users');
        this.users = response.data.users;
      } catch (error) {
        console.error('Hiba a felhasználók lekérésekor:', error);
      }
    },

    async deleteUser(id) {
      try {
        await axios.delete(`http://localhost:8000/api/users/${id}`);
        this.alertMessage = "Felhasználó sikeresen törölve!";
        this.alertType = "success";
        this.fetchUsers();
      } catch (error) {
        console.error('Hiba a törlés közben:', error);
        this.alertMessage = `❌ Hiba: ${error.response?.data || error.message}`;
        this.alertType = "error";
      }
    },


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

    async addProduct() {
      try {
        await axios.post('http://localhost:8000/api/admin', this.product, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        this.alertMessage = "A terméket sikeresen hozzáadtad!";
        this.alertType = "success";
        this.fetchProducts();
        this.resetForm();
      } catch (error) {
        console.error('Hiba történt:', error);
        this.alertMessage = `❌ Hiba: ${error.message}`;
        this.alertType = "error";
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
        await axios.delete(`http://localhost:8000/api/admin/${productId}`);
        this.alertMessage = "🗑️ A terméket sikeresen törölted!";
        this.alertType = "success";
        this.fetchProducts();
      } catch (error) {
        console.error('Hiba történt a termék törlésekor:', error);
        this.alertMessage = `❌ Hiba: ${error.message}`;
        this.alertType = "error";
      }
    },

    async fetchCategories() {
      try {
        const response = await axios.get('http://localhost:8000/api/categories');
        if (response.data.categories) {
          this.categories = response.data.categories;
        } else {
          console.error("Hibás API válasz:", response.data);
        }
      } catch (error) {
        console.error('Hiba történt a kategóriák lekérésekor:', error);
      }
    },

    resetForm() {
      this.product = {
        name: '',
        price: '',
        image: '',
        category: ''
      };
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },

  computed: {
    filteredUsers() {
      if (!this.userSearchQuery) return this.users;
      const query = this.userSearchQuery.toLowerCase();
      return this.users.filter(user =>
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    },
    filteredAdmins() {
      return this.filteredUsers.filter(user => user.role === 'admin');
    },
    filteredRegularUsers() {
      return this.filteredUsers.filter(user => user.role === 'user');
    }
  },

  created() {
    this.fetchUsers();
    this.fetchProducts();
    this.fetchCategories();
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
  animation: fadeInAll 1s ease-out;
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
  position: sticky;
  top: 0; /* A tetején marad */
  z-index: 1000; /* Magasabb szintű, hogy a többi elem ne takarja */
  animation: fadeInHeader 0.75s ease-out;
}

.header.sticky {
  background-color: #333; /* Sötétebb szín rögzített állapotban */
  color: white;
}

.header img {
  height: 60px;
}

.user-list-container {
  background-color: #fff;
  padding: 25px;
  border-radius: 12px;
  border: 1px solid #ddd;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  width: 100%;
  margin-top: 30px;
}

.user-group {
  margin-bottom: 30px;
}

.users {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.user-card {
  background-color: #f0f0f0;
  border: 1px solid #bbb;
  border-radius: 8px;
  padding: 16px;
  width: 45%;
}

.user-card button {
  background-color: #e53935;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
}

.user-card button:hover {
  background-color: #c62828;
}

.search-wrapper {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 12px 15px;
  font-size: 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
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
  transform: scale(1.05);
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

.main-content {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  padding: 30px;
  max-width: 1400px;
  margin: 0 auto;
  animation: fadeInContent 0.75s ease-out;
}

.form-container,
.product-list-container {
  flex: 1;
  min-width: 320px;
}

.form-container {
  background-color: #fff;
  padding: 25px;
  border-radius: 12px;
  border: 1px solid #ddd;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.form-container h1 {
  font-size: 22px;
  margin-bottom: 20px;
  font-weight: 600;
}

.form-container form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  font-weight: 600;
  margin-bottom: 6px;
  font-size: 15px;
}

.input-group input,
.input-group select {
  padding: 10px;
  font-size: 15px;
  border: 2px solid #ddd;
  border-radius: 6px;
}

.submit-button {
  background-color: #4caf50;
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.submit-button:hover {
  background-color: #43a047;
}

.product-list-container {
  background-color: #fff;
  padding: 25px;
  border-radius: 12px;
  border: 1px solid #ddd;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.product-list-container h1 {
  font-size: 22px;
  margin-bottom: 20px;
  font-weight: 600;
}

.products {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product {
  background-color: #fefefe;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 12px;
  width: 22%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s, box-shadow 0.3s;
}

.product:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.07);
}

.product img {
  width: 100%;
  border-radius: 6px;
  object-fit: cover;
}

.product h2 {
  font-size: 17px;
  font-weight: 600;
  color: #333;
  margin: 10px 0 5px 0;
  text-align: center;
}

.product .price {
  font-size: 15px;
  color: #4caf50;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}

.product .actions {
  display: flex;
  justify-content: center;
}

.product .actions button {
  background-color: #e53935;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.product .actions button:hover {
  background-color: #c62828;
}

@media (max-width: 1024px) {
  .product {
    width: 45%;
  }
}

@media (max-width: 600px) {
  .product {
    width: 100%;
  }

  .main-content {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .user-card {
    width: 100%;
  }
}

@keyframes fadeInContent {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInAll {
  0% { opacity: 0; transform: translateY(-30px); }
  100% { opacity: 1; transform: translateY(0); }
}

</style>