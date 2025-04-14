<template>
  <div class="auth-container">
    <header class="header">
      <router-link to="main"><img src="../assets/logo.png" class="navlogo"/></router-link>
      <div class="search-container">
      </div>
      <div class="navigation">
        <router-link to="/main" class="nav-link">Főoldal</router-link>
        <router-link to="/products" class="nav-link">Termékek</router-link>
        <router-link to="/cart" class="nav-link">Kosár</router-link>
      </div>

      <div class="hamburger-menu" v-if="isMobile" @click="toggleMenu">
        &#9776;
      </div>
      
      <div class="mobile-menu" v-if="menuOpen">
        <router-link to="/main" class="mobile-nav-link" @click="closeMenu">Főoldal</router-link>
        <router-link to="/products" class="mobile-nav-link" @click="closeMenu">Termékek</router-link> 
        <router-link to="/cart" class="mobile-nav-link" @click="closeMenu">Kosár</router-link>
      </div>
    </header>
    <div class="form-container">
      <header>
        <h1>Regisztráció</h1>
      </header>
      <BaseAlert v-if="alertMessage" :message="alertMessage" :type="alertType" />
      <form @submit.prevent="register">
        <div class="input-group">
          <label for="username">Felhasználónév</label>
          <input type="text" v-model="username" id="username" required />
        </div>
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email" required />
        </div>
        <div class="input-group">
          <label for="password">Jelszó</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <div class="input-group">
          <label for="confirmPassword">Jelszó megerősítése</label>
          <input type="password" v-model="confirmPassword" id="confirmPassword" required />
        </div>
        <div class="actions">
          <button type="submit">Regisztrálok</button>
        </div>
        <p class="redirect">
          Már van fiókod? <router-link to="/profile">Jelentkezz be itt</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import BaseAlert from '/src/components/BaseAlert.vue';

export default {
  components: {
    BaseAlert,
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      alertMessage: '',
      alertType: '',
      isMobile: window.innerWidth < 768,
      menuOpen: false
    };
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
    async register() {
      if (this.password !== this.confirmPassword) {
        this.alertMessage = 'A jelszavak nem egyeznek!';
        this.alertType = 'error';
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/api/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password,
          }),
        });
        
        const data = await response.json();

        if (!response.ok) {
          this.alertMessage = `Hiba történt: ${data.message}`;
          this.alertType = 'error';
        } else {
          this.alertMessage = data.message;
          this.alertType = 'success';

          setTimeout(() => {
            this.$router.push('/profile');
          }, 1500);
        }
      } catch (error) {
        console.error('Hiba történt:', error);
        this.alertMessage = `Belső hiba történt a regisztráció során: ${error.message}`;
        this.alertType = 'error';
      }
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>


<style scoped>
.auth-container {
  animation: fadeInAll 0.75s ease-out;
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
  animation: fadeInLink 0.75s ease-out forwards;
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

.form-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  animation: fadeInForm 0.75s ease-out;
}

header {
  text-align: center;
  margin-bottom: 20px;
}

h1 {
  font-size: 28px;
  font-weight: 600;
  animation: fadeInText 0.75s ease-out forwards;
}

.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 96%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  opacity: 0;
  animation: fadeInInput 0.75s ease-out forwards;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  opacity: 0;
  animation: fadeInButton 0.75s ease-out forwards;
}

button:hover {
  background-color: #45a049;
}

.redirect {
  text-align: center;
  margin-top: 20px;
}

.redirect a {
  color: #4caf50;
  text-decoration: none;
  opacity: 0;
  animation: fadeInLink 0.75s ease-out forwards;
}

.redirect a:hover {
  text-decoration: underline;
}

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

@keyframes fadeInForm {
  0% { opacity: 0; transform: translateY(-50px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInText {
  0% { opacity: 0; transform: translateY(-20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInInput {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInButton {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
</style>
