<template>
    <div>
        <header class="main-header fade-in-header">
        <img alt="ConsoleX logo" src="https://placehold.co/150x50" class="logo" />
            <div class="main-navigation">
                <router-link to="/games" class="main-nav-link">Játékok</router-link>
                <router-link to="/login" class="main-nav-link">Bejelentkezés</router-link>
                <router-link to="/register" class="main-nav-link">Regisztráció</router-link>
                <router-link to="/cart" class="main-nav-link">Kosár</router-link>
            </div>
        </header>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .main-header {
  background-color: #fff;
  color: #333;
  padding: 20px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 3px solid #ddd;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
}

.main-navigation {
  display: flex;
  gap: 30px;
}

.main-nav-link {
  color: #333;
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 1px;
  transition: color 0.3s, transform 0.3s, letter-spacing 0.3s;
}

.main-nav-link:hover {
  color: #e91e63;
  transform: scale(1.1);
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  letter-spacing: 3px;
}
</style>