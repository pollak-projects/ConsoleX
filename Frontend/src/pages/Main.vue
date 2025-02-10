<template>
    <div class="main-container">
      <header class="main-header">
        <img alt="ConsoleX logo" src="https://placehold.co/150x50" />
        <div class="main-navigation">
          <router-link to="/games" class="main-nav-link">Játékok</router-link>
          <router-link to="/login" class="main-nav-link">Bejelentkezés</router-link>
          <router-link to="/register" class="main-nav-link">Regisztráció</router-link>
          <router-link to="/cart" class="main-nav-link">Kosár</router-link>
        </div>
      </header>
  
      <section class="hero-section">
        <div class="hero-slider">
          <div class="slide" v-for="(image, index) in sliderImages" :key="index">
            <img :src="image" alt="Hero Image" class="hero-image" />
          </div>
        </div>
        <div class="hero-content">
          <h1 class="hero-title">Üdvözlünk a ConsoleX-en!</h1>
          <p class="hero-subtitle">Fedezd fel legújabb játékkínálatunkat és szerezd meg kedvenc konzolodat!</p>
          <router-link to="/games" class="shop-now-button">Vásárolj most</router-link>
        </div>
      </section>
  
      <section class="featured-section">
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
  
      <section class="about-us">
        <h2 class="section-title">Rólunk</h2>
        <p class="about-text">
          A ConsoleX az egyik vezető online áruház a videojátékok, konzolok és tartozékok terén.
          Több mint 10 éve biztosítjuk a legjobb termékeket és szolgáltatásokat játékosok számára.
        </p>
        <router-link to="/about" class="about-button">Tudj meg többet</router-link>
      </section>
  
      <footer class="footer">
        <div class="footer-content">
          <p>&copy; 2025 ConsoleX. Minden jog fenntartva.</p>
        </div>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Kiemelt játékok listája
        featuredGames: [
          { id: 1, name: "Jatek 1", price: 17990, image: "https://placehold.co/400x300" },
          { id: 2, name: "Jatek 2", price: 15990, image: "https://placehold.co/400x300" },
          { id: 3, name: "Jatek 3", price: 12990, image: "https://placehold.co/400x300" },
          { id: 4, name: "Jatek 4", price: 12990, image: "https://placehold.co/400x300" },
          { id: 5, name: "Jatek 5", price: 12990, image: "https://placehold.co/400x300" },
          { id: 6, name: "Jatek 6", price: 12990, image: "https://placehold.co/400x300" },
        ],
        // Slider képek listája
        sliderImages: [
          "https://placehold.co/1200x300?text=Kép+1",
          "https://placehold.co/1200x300?text=Kép+2",
          "https://placehold.co/1200x300?text=Kép+3",
        ],
      };
    },
    mounted() {
      this.startSlider();
    },
    methods: {
      startSlider() {
        let currentIndex = 0;
        const slides = document.querySelectorAll(".hero-slider .slide");
        setInterval(() => {
          slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
          });
          currentIndex = (currentIndex + 1) % slides.length;
        }, 3000); // Képek váltása 3 másodpercenként
      },
    },
  };
  </script>
  
  <style scoped>
  body {
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f7f7f7;
    color: #333;
  }
  
  /* Header */
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
  
  /* Hero Section */
  .hero-section {
    position: relative;
    overflow: hidden;
  }
  
  .hero-slider {
    display: flex;
    transition: transform 1s ease;
  }
  
  .slide {
    flex: 0 0 100%;
  }
  
  .hero-image {
    width: 100%;
    height: auto;
    object-fit: cover;
    filter: brightness(70%);
  }
  
  .hero-content {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    color: white;
    z-index: 3;
    animation: fadeIn 2s ease-in-out;
  }
  
  .hero-title {
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 20px;
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
  }
  
  .hero-subtitle {
    font-size: 20px;
    margin-bottom: 40px;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
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
  
  /* Featured Section */
  .featured-section {
    padding: 40px 20px;
    text-align: center;
  }
  
  .section-title {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 30px;
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
  
  /* About Us Section */
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
  
  /* Animation */
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .main-header {
      flex-direction: column;
      align-items: flex-start;
    }
  
    .main-navigation {
      margin-top: 20px;
      flex-direction: column;
      gap: 15px;
    }
  
    .hero-title {
      font-size: 36px;
    }
  
    .hero-subtitle {
      font-size: 18px;
    }
  }
  </style>
  