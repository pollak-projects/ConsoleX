<template lang="">
    <div>
        <div class="header">
   <div class="logo">
    <img alt="Konzolvilág Logo" height="40" src="#"/> <!--Logót berakni at assets mappába majd referálni ide-->
   </div>
   <div class="search-bar">
    <input placeholder="Keresés" type="text"/>
    <button>
     <i class="fas fa-search">
     </i>
    </button>
   </div>
   <div class="cart" id="cart-button">
    <i class="fas fa-shopping-cart"></i>
    KOSÁR
</div>


   <div class="nav"> <!--Ez majd Routelinkel meg kell csinálnunk mert nem fogja szeretni a vue-->
    <a href="#" id="főoldal-button">Főoldal</a>
    <a href="#" id="bejelentkezes-button">Bejelentkezés</a>
    <a href="#" id="regisztracio-button">Regisztráció</a>
    <a href="#" id="akcio-button">Akció</a>
    <a href="#" id="hasznalt-button">Használt</a>
    <a href="#" id="playstation-button">PlayStation</a>
    <a href="#" id="xbox-button">Xbox</a>
    <a href="#" id="pc-button">PC</a>
   </div>
  </div>
  
  <div id="bejelentkezes-modal" class="modal">
    <div class="modal-content">
      <span class="close" id="close-bejelentkezes">&times;</span>
      <h2>Bejelentkezés</h2>
      <form>
        <label for="email">Email:</label>
        <input type="email" id="email" required>
        <br>
        <label for="password">Jelszó:</label>
        <input type="password" id="password" required>
        <br>
        <button type="submit">Bejelentkezés</button>
      </form>
    </div>
  </div>
  
  <div id="regisztracio-modal" class="modal">
    <div class="modal-content">
      <span class="close" id="close-regisztracio">&times;</span>
      <h2>Regisztráció</h2>
      <form>
        <label for="reg-email">Email:</label>
        <input type="email" id="reg-email" required>
        <br>
        <label for="reg-password">Jelszó:</label>
        <input type="password" id="reg-password" required>
        <br>
        <label for="confirm-password">Jelszó megerősítése:</label>
        <input type="password" id="confirm-password" required>
        <br>
        <button type="submit">Regisztráció</button>
      </form>

    </div>
  </div>
  <div class="main">
   <div class="sidebar">
    <h3>Rendezés</h3>
    <select>
     <option>Toplista</option>
     <option>Név szerint</option>
     <option>Ár szerint</option>
     <option>Értékelés szerint</option>
    </select>

    <h3>Aktív szűrések</h3>
    <button id="reset-filters">NINCS AKTÍV SZŰRÉS</button>

    <h3>Készleten</h3>
    <input type="checkbox" id="keszleten" />
    <label for="keszleten">Készleten</label>
    <br />
    <input type="checkbox" id="rendelheto" />
    <label for="rendelheto">Rendelhető</label>
    <br />
    <input type="checkbox" id="elorendelheto" />
    <label for="elorendelheto">Előrendelhető</label>
    <br />
    <input type="checkbox" id="akcios" />
    <label for="akcios">Akciós</label>
    <br />

    <h3>Használt</h3>
    <input type="radio" id="minden-termek" name="hasznalt" checked />
    <label for="minden-termek">Minden termék</label>
    <br />
    <input type="radio" id="hasznalt-termek" name="hasznalt" />
    <label for="hasznalt-termek">Használt termékek</label>
    <br />
    <input type="radio" id="uj-termek" name="hasznalt" />
    <label for="uj-termek">Új, bontatlan termékek</label>
    <br />

    <h3>Megjelenés</h3>
    <input type="checkbox" id="utolso-30-nap" />
    <label for="utolso-30-nap">Utolsó 30 nap</label>
    <br />
    <input type="checkbox" id="utolso-90-nap" />
    <label for="utolso-90-nap">Utolsó 90 nap</label>
    <br />
    <input type="checkbox" id="90-napnal-regebbi" />
    <label for="90-napnal-regebbi">90 napnál régebbi</label>
    <br />

    <h3>Ár tartomány</h3>
    <input type="number" id="min-ar" placeholder="Min. ár" />
    <input type="number" id="max-ar" placeholder="Max. ár" />
    <br />

    <h3>Értékelés</h3>
    <input type="radio" id="minden-ertekeles" name="ertekeles" checked />
    <label for="minden-ertekeles">Minden értékelés</label>
    <br />
    <input type="radio" id="5-csillag" name="ertekeles" />
    <label for="5-csillag">5 csillag</label>
    <br />
    <input type="radio" id="4-csillag" name="ertekeles" />
    <label for="4-csillag">4 csillag</label>
    <br />
    <input type="radio" id="3-csillag" name="ertekeles" />
    <label for="3-csill ag">3 csillag </label>
    <br />
    <input type="radio" id="2-csillag" name="ertekeles" />
    <label for="2-csillag">2 csillag</label>
    <br />
    <input type="radio" id="1-csillag" name="ertekeles" />
    <label for="1-csillag">1 csillag</label>
    <br />
   </div>

    <div class="content">
      <h2 id="page-title">Összes játék</h2>
      <p id="page-description">1-16 / 945 termék Xbox Series játékok kategóriában</p>
      <div class="products" id="product-container">
        <!-- Example products -->
        <div class="product">
          <img src="#" alt="Product 1"> <!--Ide is képet keresni majd berakni az assets mappába és referálni itt-->
          <h4>Product 1</h4>
          <p class="price">$19.99</p>
          <button class="btn add-to-cart" data-name="Product 1" data-price="19.99">KOSÁRBA</button>
      </div>
      
        <div class="product">
          <img src="#" alt="Product 2"> <!--Ide is képet keresni majd berakni az assets mappába és referálni itt-->
          <h4>Product 2</h4>
          <p class="price">$29.99</p>
          <button class="btn" onclick="addToCart('Product 2', 29.99)">KOSÁRBA</button>
        </div>
        <div class="product">
          <img src="#" alt="Product 3"> <!--Ide is képet keresni majd berakni az assets mappába és referálni itt-->
          <h4>Product 3</h4>
          <p class="price">$24.99</p>
          <button class="btn" onclick="addToCart('Product 3', 24.99)">KOSÁRBA</button>
        </div>
        <div class="product">
          <img src="#" alt="Product 4"> <!--Ide is képet keresni majd berakni az assets mappába és referálni itt-->
          <h4>Product 4</h4>
          <p class="price">$34.99</p>
          <button class="btn" onclick="addToCart('Product 4', 34.99)">KOSÁRBA</button>
        </div>
      </div>
      <button id="loadMoreBtn" class="load-more" onclick="loadMoreProducts()">További játékok</button>
    </div>
  </div>

  <!-- Cart Modal -->
  <div id="cart-modal" class="modal" style="display: none;">
    <div class="modal-content">
      <span class="close" id="close-cart">&times;</span>
      <h2>Kosár Tartalma</h2>
      <div id="cart-contents"></div>
      <button id="checkout-btn">Pénztár</button>
    </div>
  </div>
    </div>
</template>

<script>
export default{

}
</script>

<style scoped>
    .header {
    background-color: #fff;
    padding: 10px 20px;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.header .logo {
    display: flex;
    align-items: center;
}
.header .logo img {
    height: 40px;
}
.header .search-bar {
    display: flex;
    align-items: center;
    flex-grow: 1;
    margin: 0 20px;
}
.header .search-bar input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}
.header .search-bar button {
    background-color: #e91e63;
    border: none;
    color: #fff;
    padding: 10px 20px;
    margin-left: 10px;
    border-radius: 4px;
    cursor: pointer;
}
.header .cart {
    background-color: #4caf50;
    color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
}
.nav {
    background-color: #fff;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
}
.nav a {
    color: #333;
    text-decoration: none;
    margin: 0 10px;
    font-weight: 500;
}
.nav a.active {
    color: #e91e63;
}
.main {
    display: flex;
    padding: 20px;
}
.sidebar {
    width: 250px;
    background-color: #fff;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 20px;
}
.sidebar h3 {
    margin-top: 0;
}
.sidebar select, .sidebar input[type="checkbox"] {
    margin-bottom: 10px;
}
.content {
    flex-grow: 1;
}
.banner {
    width: 100%;
    margin-bottom: 20px;
}
.banner img {
    width: 100%;
    border-radius: 4px;
}

/* Termékek elrendezése oszlopokban és sorokban */
.products {
    display: flex;
    flex-wrap: wrap; /* Ez biztosítja, hogy ha a sor megtelik, új sorba kerüljenek a termékek */
    justify-content: space-between; /* Egyenletes eloszlás a sorok között */
}

.product {
    width: 23%; /* Négy termék elfér egymás mellett */
    background-color: #fff;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 20px;
    text-align: center;
    box-sizing: border-box; /* Figyelembe veszi a paddinget és bordert a szélességben */
}

.product img {
    width: 100px; /* Kisebb képméret, hogy elférjenek a termékek egymás mellett */
    height: auto;
    margin-bottom: 10px;
}

.product h4 {
    font-size: 14px;
    margin: 10px 0;
}

.product .price {
    font-size: 16px;
    color: #e91e63;
    font-weight: 700;
    margin: 5px 0;
}

.product .btn {
    background-color: #4caf50;
    color: #fff;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
}


/* Modalok stílusa */
.modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
}
  
.modal-content {
    background-color: #fff;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 300px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
}
  
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}
  
.close:hover, .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}

/* Input mezők a modalokban */
input[type="email"], input[type="password"] {
    width: 100%;
    padding: 10px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

.load-more {
    background-color: #e91e63; /* Gomb háttérszíne */
    color: white; /* Szöveg színe */
    padding: 12px 24px; /* Belső margók */
    border: none; /* Nincs keret */
    border-radius: 4px; /* Lekerekített sarkok */
    cursor: pointer; /* Kézmutató kurzor */
    margin: 20px auto; /* Külső margók, középre igazítva */
    display: block; /* Blokk szintű elem */
    width: 200px; /* Gomb szélessége */
    text-align: center; /* Középre igazított szöveg */
    font-size: 16px; /* Betűméret */
    transition: background-color 0.3s ease, transform 0.2s ease; /* Animációs átmenet */
}

.load-more:hover {
    background-color: #d81b60; /* Gomb háttérszín változtatása hover esetén */
    transform: translateY(-2px); /* Gomb felemelése hover esetén */
}

.load-more:active {
    transform: translateY(0); /* Gomb visszaállítása nyomáskor */
}
</style>