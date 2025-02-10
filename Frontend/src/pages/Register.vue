<template>
    <div>
      <header class="header">
        <img alt="Konzolvilág logo" src="https://placehold.co/150x50" id="navlogo" />
        <div class="navigation">
          <router-link to="/main" class="nav-link">Főoldal</router-link>
          <router-link to="/login" class="nav-link">Bejelentkezés</router-link>
          <router-link to="/register" class="nav-link">Regisztráció</router-link>
          <router-link to="/cart" class="nav-link">Kosár</router-link>
        </div>
      </header>
  
      <div class="auth-container">
        <header>
          <h1>Regisztráció</h1>
        </header>
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
            Már van fiókod? <router-link to="/login">Jelentkezz be itt</router-link>
          </p>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      };
    },
    methods: {
      register() {
        if (this.password !== this.confirmPassword) {
          alert('A jelszavak nem egyeznek!');
          return;
        }
        console.log('Regisztráció:', this.username, this.email);
      },
    },
  };
  </script>
  
  <style scoped>
  /* A fejléc stílusa maradjon meg a meglévő kódból */
  .header {
    background-color: #fff;
    color: #333;
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  
  .auth-container {
    max-width: 600px; /* Növeltem a maximális szélességet */
    margin: 50px auto;
    padding: 30px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  h1 {
    font-size: 28px; /* Nagyobb cím */
    font-weight: 600;
  }
  
  .input-group {
    margin-bottom: 20px; /* Tágabb margó */
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 12px; /* Növeltük a belső paddingot */
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px; /* Kicsit nagyobb betűméret */
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
  }
  
  .redirect a:hover {
    text-decoration: underline;
  }
  </style>
  