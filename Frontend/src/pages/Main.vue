<template>
  <div class="main-container fade-in">
    <header class="header">
      <router-link to="main"><img src="../assets/logo.png" class="navlogo"/></router-link>
      <div class="search-container">
      </div>
      <div class="navigation">
        <router-link to="/admin" class="nav-link">Admin</router-link>
        <router-link to="/games" class="nav-link">Játékok</router-link>
        <router-link to="/cart" class="nav-link">Kosár</router-link> 
        <router-link to="/profile" class="nav-link">Profil</router-link>
      </div>
    </header>
    <section class="hero-section fade-in">
      <div class="hero-carousel">
        <img v-for="(image, index) in images" :key="index" :src="image" class="hero-image" :class="{active: activeImageIndex === index}" />
      </div>
      <div class="hero-text slide-up">
        <h1 class="hero-title">Üdvözlünk a ConsoleX-en!</h1>
        <router-link to="/games" class="shop-now-button">Vásárolj most</router-link>
      </div>
    </section>

    <section class="featured-section fade-in">
      <h2 class="section-title">Kiemelt Játékok</h2>
      <div class="featured-games">
        <div class="game-card" v-for="(game, index) in featuredGames" :key="index">
          <img :src="game.image" :alt="game.name" class="game-image" />
          <div class="game-info">
            <h3 class="game-name">{{ game.name }}</h3>
            <p class="game-price">{{ game.price }} Ft</p>
            <router-link :to="`/games/${game.id}`" class="view-details">Részletek</router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="about-us fade-in">
      <h2 class="section-title">Rólunk</h2>
      <p class="about-text">
        A ConsoleX az egyik vezető online áruház a videojátékok, konzolok és tartozékok terén.
        Több mint 10 éve biztosítjuk a legjobb termékeket és szolgáltatásokat játékosok számára.
      </p>
      <router-link to="/about" class="about-button">Tudj meg többet</router-link>
    </section>

    <footer class="footer fade-in">
      <div class="footer-content">
        <p>&copy; 2025 ConsoleX. Minden jog fenntartva.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import imagePath from '../assets/fc25.jpg';
import imagePath2 from '../assets/farcry6.jpg';
import imagePath3 from '../assets/hogwarts.jpg';


export default {
  data() {
    return {

      images: [
        imagePath,
        imagePath2,
        imagePath3,
      ],
      activeImageIndex: 0,
      intervalId: null
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
      this.intervalId = setInterval(this.nextImage, 3000); // Automatically move to the next image
    },
    stopImageCarousel() {
      clearInterval(this.intervalId);
    }
  },
  mounted() {
    this.startImageCarousel();
  },
  beforeDestroy() {
    this.stopImageCarousel();
  }
};

</script>

<style scoped>
/* Alap body stílusok */
body {
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f7f7f7;
  color: #333;
  overflow-x: hidden;
  opacity: 0;
  animation: fadeIn 1.5s forwards; /* Gyorsabb animáció */
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
  animation: fadeInHeader 0.75s ease-out; /* Fejléc animáció */
}

.header img {
  height: 60px;
}

/* Fading animáció */
@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

/* Fading effektus a szekciókhoz */
.fade-in {
  opacity: 0;
  animation: fadeInSection 1.5s forwards; /* Gyorsabb animáció */
}

@keyframes fadeInSection {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* Fejléc animáció */
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

/* Hero Section */
.hero-section {
  position: relative;
  overflow: hidden;
  text-align: center;
  padding: 0;
  margin-top: 0;
  width: 1890px;
  height: 400px; /* Keeps the shorter height */
}

.hero-carousel {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
    display: flex; /* Enables horizontal alignment of images */
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  position: absolute;
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
  left: 10px; /* Position left button */
}

.nav-button.right {
  right: 10px; /* Position right button */
}

.nav-button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}


.hero-text {
  position: relative; /* Ensures it stays on top of the carousel */
  z-index: 1;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
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
}

.shop-now-button:hover {
  background: linear-gradient(45deg, #d81b60, #c2185b);
  transform: scale(1.05);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
}

/* Kiemelt Játékok Szekció */
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

/* About Us Szekció */
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

/* Footer */
.footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 20px;
}

.footer-content {
  font-size: 14px;
}

</style>
