<template lang="">
<div class="form-container">
      <header>
        <h1>Admin bejelentkezés</h1>
      </header>
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="username">Felhasználónév:</label>
          <input type="text" v-model="username" id="username" required />
        </div>
        <div class="input-group">
          <label for="password">Jelszó:</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <div class="actions">
          <button type="submit">Bejelentkezés</button>
        </div>
      </form>
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
        const response = await fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.usernameOrEmail,
            password: this.password,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          alert(`Hiba történt: ${errorData.message}`);
        } else {
          const data = await response.json();
          alert(data.message);
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', data.username);
          this.$router.push('/');
        }
      } catch (error) {
        console.error('Hiba történt:', error);
        alert('Belső hiba történt a bejelentkezés során.');
      }
    },
  },
};
</script>
<style scoped>
/* Form animáció */
.form-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  margin-top: 10%;
  background-color: gray;
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
</style>