<template>
  <div class="main-container fade-in">
    <header class="header">
      <router-link to="mainloggedin"><img src="../assets/logo.png" class="navlogo"/></router-link>
      <div class="navigation">
        <router-link to="/productsloggedin" class="nav-link">Termékek</router-link>
        <router-link to="/cartloggedin" class="nav-link">Kosár</router-link> 
        <router-link to="/loggedin" class="nav-link">Profil</router-link>
      </div>

      <div class="hamburger-menu" v-if="isMobile" @click="toggleMenu">
        &#9776;
      </div>
      
      <div class="mobile-menu" v-if="menuOpen">
        <router-link to="/products" class="mobile-nav-link" @click="closeMenu">Termékek</router-link>
        <router-link to="/cart" class="mobile-nav-link" @click="closeMenu">Kosár</router-link> 
        <router-link to="/profile" class="mobile-nav-link" @click="closeMenu">Profil</router-link>
      </div>
    </header>
    <section class="hero-section fade-in">
      <div class="hero-carousel">
        <img v-for="(image, index) in images" :key="index" :src="image" class="hero-image" :class="{active: activeImageIndex === index}" />
      </div>
      <div class="hero-text slide-up">
        <h1 class="hero-title">Üdvözlünk a ConsoleX-en!</h1>
        <router-link to="/productsloggedin" class="shop-now-button">Vásárolj most</router-link>
      </div>
    </section>


    <footer class="footer fade-in">
      <div class="footer-content">
        <p>&copy; 2025 ConsoleX. Minden jog fenntartva.</p>
      </div>
    </footer>
  </div>
</template>


<script>
import imagePath from '../assets/fc25.jpg';
import imagePath2 from '../assets/farcry6.jpg';
import imagePath3 from '../assets/hogwarts.jpg';


export default {
  data() {
    return {
      images: [imagePath, imagePath2, imagePath3],
      activeImageIndex: 0,
      intervalId: null,
      isMobile: window.innerWidth < 768,
      menuOpen: false
    };
  },
  methods: {
    nextImage() {
      this.activeImageIndex = (this.activeImageIndex + 1) % this.images.length;
    },
    previousImage() {
      this.activeImageIndex =
        (this.activeImageIndex - 1 + this.images.length) % this.images.length;
    },
    startImageCarousel() {
      this.intervalId = setInterval(this.nextImage, 3000);
    },
    stopImageCarousel() {
      clearInterval(this.intervalId);
    },
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
  },
  mounted() {
    this.startImageCarousel();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    this.stopImageCarousel();
    window.removeEventListener('resize', this.handleResize);
  }
};
</script>

<style scoped>
body {
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f7f7f7;
  color: #333;
  overflow-x: hidden;
  opacity: 0;
  animation: fadeIn 1.5s forwards;
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

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.fade-in {
  opacity: 0;
  animation: fadeInSection 1.5s forwards;
}

@keyframes fadeInSection {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeInHeader {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-header {
  animation: fadeInHeader 1s ease-out forwards;
}

.navigation {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
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

.hero-carousel {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
}

.hero-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.hero-image.active {
  opacity: 1;
  z-index: 0;
}

@media (max-width: 768px) {
  .hero-carousel {
    height: 250px;
  }
}

.hero-image.active {
  opacity: 1;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 24px;
  padding: 10px 20px;
  cursor: pointer;
  z-index: 2;
}

.nav-button.left {
  left: 10px;
}

.nav-button.right {
  right: 10px;
}

.nav-button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}


.hero-text {
  position: relative;
  z-index: 1;
  color: white;
  text-align: center;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
  color: white;
  text-shadow: 2px 2px 10px rgb(0, 0, 0);
  text-align: center;
  width: 100%;
}

@keyframes slideUp {
  0% {
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
  color: white;
  text-shadow: 2px 2px 10px rgb(0, 0, 0);
}

.hero-subtitle {
  font-size: 20px;
  margin-bottom: 40px;
  text-shadow: 2px 2px 5px rgb(255, 255, 255);
}

.shop-now-button {
  background: linear-gradient(45deg, #e91e63, #d81b60);
  color: white;
  padding: 15px 40px;
  text-decoration: none;
  font-size: 18px;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: inline-block;
}

.shop-now-button:hover {
  background: linear-gradient(45deg, #d81b60, #c2185b);
  transform: scale(1.05);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
}

.featured-section {
  padding: 40px 20px;
  text-align: center;
  background-color: #fafafa;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 30px;
  letter-spacing: 1px;
}

.featured-games {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
}

.game-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
  padding: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.game-card:hover {
  transform: translateY(-10px);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
}

.game-image {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 15px;
}

.game-name {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
}

.game-price {
  font-size: 18px;
  color: #e91e63;
  margin-bottom: 15px;
}

.view-details {
  text-decoration: none;
  color: #4caf50;
  font-size: 16px;
  font-weight: 700;
}

.about-us {
  background-color: #f0f0f0;
  padding: 40px 20px;
  text-align: center;
}

.about-text {
  font-size: 18px;
  margin-bottom: 20px;
}

.about-button {
  background-color: #4caf50;
  color: white;
  padding: 15px 30px;
  font-size: 16px;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;
}

.about-button:hover {
  background-color: #388e3c;
  transform: scale(1.05);
}

.footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}


.footer-content {
  font-size: 14px;
}

.main-container {
  padding-bottom: 80px;
}

</style>