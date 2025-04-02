<template>
  <div class="header">
    <router-link to="/main">
      <router-link to="main"><img src="../assets/logo.png" class="navlogo"/></router-link>
    </router-link>
    <div class="navigation">
      <router-link to="/main" class="nav-link">Főoldal</router-link>
      <router-link to="/games" class="nav-link">Játékok</router-link>
      <router-link v-if="!isLoggedIn" to="/register" class="nav-link">Regisztráció</router-link>
      <router-link v-if="!isLoggedIn" to="/login" class="nav-link">Bejelentkezés</router-link>
      <router-link to="/cart" class="nav-link">Kosár</router-link>
      <router-link v-if="isLoggedIn" to="/profile" class="nav-link">Profil</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: !!localStorage.getItem('token'),
    };
  },
  watch: {
    '$route'() {
      this.isLoggedIn = !!localStorage.getItem('token');
    },
  },
};
</script>

<style scoped>
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
</style>
