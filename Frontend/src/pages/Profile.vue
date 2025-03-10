<template>
    <div class="profile-container">
      <h1>Üdvözlünk, {{ user.name }}!</h1>
      <p>Email: {{ user.email }}</p>
      <button @click="logout">Kijelentkezés</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: {}
      };
    },
    async created() {
      try {
        const response = await fetch("http://localhost:8000/api/profile", {
          method: "GET",
          headers: {
            "Authorization": localStorage.getItem("token"),
          },
        });
  
        if (!response.ok) {
          throw new Error("Profil betöltése sikertelen.");
        }
  
        this.user = await response.json();
      } catch (error) {
        console.error(error.message);
        this.$router.push("/login");
      }
    },
    methods: {
      logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        this.$router.push("/login");
      }
    }
  };
  </script>
  