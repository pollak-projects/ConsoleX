<template>
    <header class="header">
      <img alt="Konzolvilág logo" src="https://placehold.co/150x50" id="navlogo" />
      <div class="navigation">
        <router-link to="/main" class="nav-link">Főoldal</router-link>
        <router-link to="/games" class="nav-link">Játékok</router-link>
        <router-link v-if="!isLoggedIn" to="/register" class="nav-link">Regisztráció</router-link>
        <router-link to="/cart" class="nav-link">Kosár</router-link>
        <div v-if="isLoggedIn" class="profile">
          <img src="https://placehold.co/50x50" alt="Profil ikon" @click="toggleProfileMenu" class="profile-icon"/>
          <div v-if="showProfileMenu" class="profile-menu">
            <span>{{ username }}</span>
            <button @click="logout">Kijelentkezés</button>
          </div>
        </div>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: localStorage.getItem('username') || '',
        showProfileMenu: false,
      };
    },
    computed: {
      isLoggedIn() {
        return !!localStorage.getItem('token');
      },
    },
    methods: {
      toggleProfileMenu() {
        this.showProfileMenu = !this.showProfileMenu;
      },
      logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.username = '';
        this.showProfileMenu = false;
        this.$router.push('/login');
      },
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
  