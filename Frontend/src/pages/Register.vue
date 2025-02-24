<template>
  <div class="auth-container">
    <!-- Fejléc -->
    <header class="header">
      <img alt="Konzolvilág logo" src="https://placehold.co/150x50" id="navlogo" />
      <div class="navigation">
        <router-link to="/main" class="nav-link">Főoldal</router-link>
        <router-link to="/games" class="nav-link">Játékok</router-link>
        <router-link to="/login" class="nav-link">Bejelentkezés</router-link>
        <router-link to="/cart" class="nav-link">Kosár</router-link>
      </div>
    </header>

    <!-- Regisztrációs űrlap -->
    <div class="form-container">
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
    async register() {
      if (this.password !== this.confirmPassword) {
        alert('A jelszavak nem egyeznek!');
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/register', {
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

        if (!response.ok) {
          const errorData = await response.json();
          alert(`Hiba történt: ${errorData.message}`);
        } else {
          const data = await response.json();
          alert(data.message);
          this.$router.push('/login');
        }
      } catch (error) {
        console.error('Hiba történt:', error);
        alert('Belső hiba történt a regisztráció során.');
      }
    },
  },
};
</script>


<style scoped>
/* Stílusok maradnak ugyanazok, mint az előző példában */

/* Fő konténer */
.auth-container {
  animation: fadeInAll 0.75s ease-out;
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

/* Regisztrációs form */
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
