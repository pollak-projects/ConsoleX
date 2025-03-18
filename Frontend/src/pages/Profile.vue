<template>
  <div class="auth-container">
    <header class="header">
      <router-link to="main"><img src="../assets/logo.png" class="navlogo"/></router-link>
      <div class="search-container"></div>
      <div class="navigation">
        <router-link to="/main" class="nav-link">Főoldal</router-link>
        <router-link to="/games" class="nav-link">Játékok</router-link>
        <router-link to="/cart" class="nav-link">Kosár</router-link>
      </div>
    </header>

    <!-- Bejelentkezési űrlap -->
    <div class="form-container">
      <header>
        <h1>Bejelentkezés</h1>
      </header>
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="username-email">Felhasználónév vagy Email</label>
          <input type="text" v-model="usernameOrEmail" id="username-email" required />
        </div>
        <div class="input-group">
          <label for="password">Jelszó</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <div class="actions">
          <button type="submit">Bejelentkezés</button>
        </div>
        <p class="redirect">
          Még nem regisztráltál? <router-link to="/register">Regisztrálj itt</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usernameOrEmail: '',
      password: '',
    };
  },
  methods: {
          async login() {
      try {
        const response = await fetch("http://localhost:8000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usernameOrEmail: this.usernameOrEmail,
            password: this.password,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          alert(`Hiba történt: ${errorData.message}`);
        } else {
          const data = await response.json();
          alert(data.message);
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.username);

          if (data.role === 'admin') {
            this.$router.push("/adminloggedin");
          } else {
            this.$router.push("/loggedin");
          }
        }
      } catch (error) {
        console.error("Hiba történt:", error);
        alert("Belső hiba történt a bejelentkezés során.");
      }
    }
  }
};
</script>


<style scoped>
/* Az egész oldal animációja */
.auth-container {
  animation: fadeInAll 0.75s ease-out; /* Az egész oldal gyorsabban történő betöltése */
}

/* Fejléc */
.header {
  background-color: #fff;
  color: #333;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid #ddd;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  animation: fadeInHeader 0.75s ease-out; /* Fejléc animáció */
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
  animation: fadeInLink 0.75s ease-out forwards; /* Linkek animációja */
}

.nav-link:hover {
  color: #e91e63;
  transform: scale(1.1);
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  letter-spacing: 3px;
}

/* Form animáció */
.form-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  animation: fadeInForm 0.75s ease-out; /* Form gyorsabb animációja */
}

header {
  text-align: center;
  margin-bottom: 20px;
}

h1 {
  font-size: 28px;
  font-weight: 600;
  animation: fadeInText 0.75s ease-out forwards; /* Cím animációja */
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
  opacity: 0; /* Kezdetben átlátszó */
  animation: fadeInInput 0.75s ease-out forwards; /* Input mezők animációja */
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
  opacity: 0; /* Kezdetben átlátszó */
  animation: fadeInButton 0.75s ease-out forwards; /* Gomb animációja */
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
  opacity: 0; /* Kezdetben átlátszó */
  animation: fadeInLink 0.75s ease-out forwards; /* Linkek animációja */
}

.redirect a:hover {
  text-decoration: underline;
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
