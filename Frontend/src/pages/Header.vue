<template>
<header class="header">
  <router-link to="/adminlogin">
    <img alt="Konzolvilág logo" src="https://placehold.co/150x50" class="navlogo" />
  </router-link>
  <div class="navigation">
    <router-link to="/games" class="nav-link">Játékok</router-link>
    <router-link to="/cart" class="nav-link">Kosár</router-link>
    <div class="profile-container">
      <p @click="toggleProfileMenu" class="profile-menu-title">
        {{ user ? user.username : 'Profil' }}
      </p>
      <div v-if="showProfileMenu" class="profile-menu">
        <div v-if="!user">
          <p>Még nincs bejelentkezve</p>
          <router-link to="/login" class="login-button">Bejelentkezés</router-link>
        </div>
        <div v-else>
          <p>{{ user.username }}</p>
          <button @click="logout" class="logout-button">Kijelentkezés</button>
        </div>
      </div>
    </div>
  </div>
</header>

  </template>
  
  <script>
  export default {
    data() {
  return {
    user: null,
    showProfileMenu: false,
  };
},
methods: {
  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  },
  logout() {
    this.user = null;
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this.$router.push("/login");
  },
},
mounted() {
  const username = localStorage.getItem("username");
  if (username) {
    this.user = { username };
  }
},

};

  </script>
  
  <style scoped>
  .profile {
    display: flex;
    align-items: center;
  }
  .profile-icon {
    cursor: pointer;
    border-radius: 50%;
  }
  .profile-menu {
    position: absolute;
    top: 60px;
    right: 20px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .profile-menu span {
    margin-bottom: 10px;
  }
  .profile-menu button {
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px 10px;
  }
  .profile-menu button:hover {
    background-color: #45a049;
  }
  </style>
  