// Nav Gombok
const főoldalButton = document.querySelector('#főoldal-button');
const bejelentkezesButton = document.querySelector('#bejelentkezes-button');
const regisztracioButton = document.querySelector('#regisztracio-button');
const akcioButton = document.querySelector('#akcio-button');
const hasznaltButton = document.querySelector('#hasznalt-button');
const playstationButton = document.querySelector('#playstation-button');
const xboxButton = document.querySelector('#xbox-button');
const pcButton = document.querySelector('#pc-button');

főoldalButton.addEventListener('click', () => {
 document.querySelector('#akcio-products-list').style.display = 'none';
 document.querySelector('#hasznalt-products-list').style.display = 'none';
 document.querySelector('#playstation-products-list').style.display = 'none';
 document.querySelector('#xbox-products-list').style.display = 'none';
 document.querySelector('#pc-products-list').style.display = 'none';
 // ...
 document.querySelector('#page-title').textContent = 'Főoldal';
 document.querySelector('#page-description').textContent = '1-24 / 945 termék Főoldal kategóriában';
});

bejelentkezesButton.addEventListener('click', () => {
 document.querySelector('#akcio-products-list').style.display = 'none';
 document.querySelector('#hasznalt-products-list').style.display = 'none';
 document.querySelector('#playstation-products-list').style.display = 'none';
 document.querySelector('#xbox-products-list').style.display = 'none';
 document.querySelector('#pc-products-list').style.display = 'none';
 // ...
 document.querySelector('#page-title').textContent = 'Bejelentkezés';
 document.querySelector('#page-description').textContent = '1- 24 / 945 termék Bejelentkezés kategóriában';
});

regisztracioButton.addEventListener('click', () => {
 document.querySelector('#akcio-products-list').style.display = 'none';
 document.querySelector('#hasznalt-products-list').style.display = 'none';
 document.querySelector('#playstation-products-list').style.display = 'none';
 document.querySelector('#xbox-products-list').style.display = 'none';
 document.querySelector('#pc-products-list').style.display = 'none';
 // ...
 document.querySelector('#page-title').textContent = 'Regisztráció';
 document.querySelector('#page-description').textContent = '1-24 / 945 termék Regisztráció kategóriában';
});

akcioButton.addEventListener('click', () => {
 document.querySelector('#akcio-products-list').style.display = 'block';
 document.querySelector('#hasznalt-products-list').style.display = 'none';
 document.querySelector('#playstation-products-list').style.display = 'none';
 document.querySelector('#xbox-products-list').style.display = 'none';
 document.querySelector('#pc-products-list').style.display = 'none';
 // ...
 document.querySelector('#page-title').textContent = 'Akció';
 document.querySelector('#page-description').textContent = '1-24 / 945 termék Akció kategóriában';
});

hasznaltButton.addEventListener('click', () => {
 document.querySelector('#akcio-products-list').style.display = 'none';
 document.querySelector('#hasznalt-products-list').style.display = 'block';
 document.querySelector('#playstation-products-list').style.display = 'none';
 document.querySelector('#xbox-products-list').style.display = 'none';
 document.querySelector('#pc-products-list').style.display = 'none';
 // ...
 document.querySelector('#page-title').textContent = 'Használt';
 document.querySelector('#page-description').textContent = '1-24 / 945 termék Használt kategóriában';
});

playstationButton.addEventListener('click', () => {
 document.querySelector('#akcio-products-list').style.display = 'none';
 document.querySelector('#hasznalt-products-list').style.display = 'none';
 document.querySelector('#playstation-products-list').style.display = 'block';
 document.querySelector('#xbox-products-list').style.display = 'none';
 document.querySelector('#pc-products-list').style.display = 'none';
 // ...
 document.querySelector('#page-title').textContent = 'PlayStation Játékok';
 document.querySelector('#page-description').textContent = '1-24 / 945 termék PlayStation játékok kategóriában';
});

xboxButton.addEventListener('click', () => {
 document.querySelector('#akcio-products-list').style.display = 'none';
 document.querySelector('#hasznalt-products-list').style.display = 'none';
 document.querySelector('#playstation-products-list').style.display = 'none';
 document.querySelector('#xbox-products-list').style.display = 'block';
 document.querySelector('#pc-products-list').style.display = 'none';
 // ...
 document.querySelector('#page-title').textContent = 'Xbox Játékok';
 document.querySelector('#page-description').textContent = '1-24 / 945 termék Xbox játékok kategóriában';
});

pcButton.addEventListener('click', () => {
 document.querySelector('#akcio-products-list').style.display = 'none';
 document.querySelector('#hasznalt-products-list').style.display = 'none';
 document.querySelector('#playstation-products-list').style.display = 'none';
 document.querySelector('#xbox-products-list').style.display = 'none';
 document.querySelector('#pc-products-list').style.display = 'block';
 // ...
 document.querySelector('#page-title').textContent = 'PC Játékok';
 document.querySelector('#page-description').textContent = '1-24 / 945 termék PC játékok kategóriában';
});
 // ...

 // Oldalsáv filter
document.addEventListener("DOMContentLoaded", function() {
    const keszleten = document.getElementById('keszleten');
    const rendelheto = document.getElementById('rendelheto');
    const elorendelheto = document.getElementById('elorendelheto');
    const akcios = document.getElementById('akcios');
    const mindenTermek = document.getElementById('minden-termek');
    const hasznaltTermek = document.getElementById('hasznalt-termek');
    const ujTermek = document.getElementById('uj-termek');

    const resetFiltersButton = document.getElementById('reset-filters');

    resetFiltersButton.addEventListener('click', function() {
        keszleten.checked = false;
        rendelheto.checked = false;
        elorendelheto.checked = false;
        akcios.checked = false;
        mindenTermek.checked = true;
        hasznaltTermek.checked = false;
        ujTermek.checked = false;

        filterProducts();
    });

    const akcioProductsList = document.getElementById('akcio-products-list');
    const hasznaltProductsList = document.getElementById('hasznalt-products-list');
    const xboxProductsList = document.getElementById('xbox-products-list');

    keszleten.addEventListener('change', filterProducts);
    rendelheto.addEventListener('change', filterProducts);
    elorendelheto.addEventListener('change', filterProducts);
    akcios.addEventListener('change', filterProducts);
    mindenTermek.addEventListener('change', filterProducts);
    hasznaltTermek.addEventListener('change', filterProducts);
    ujTermek.addEventListener('change', filterProducts);

    function filterProducts() {
        akcioProductsList.style.display = 'none';
        hasznaltProductsList.style.display = 'none';
        xboxProductsList.style.display = 'none';

        if (akcios.checked) {
            akcioProductsList.style.display = 'block';
        }

        if (hasznaltTermek.checked) {
            hasznaltProductsList.style.display = 'block';
        }

        if (mindenTermek.checked || ujTermek.checked) {
            xboxProductsList.style.display = 'block';
        }
    }
    filterProducts();
});
// ...

// Bejelentkezés és Regisztráció
document.addEventListener("DOMContentLoaded", function() {
    const bejelentkezesModal = document.getElementById('bejelentkezes-modal');
    const regisztracioModal = document.getElementById('regisztracio-modal');

    const bejelentkezesButton = document.getElementById('bejelentkezes-button');
    const regisztracioButton = document.getElementById('regisztracio-button');

    const closeBejelentkezes = document.getElementById('close-bejelentkezes');
    const closeRegisztracio = document.getElementById('close-regisztracio');

    bejelentkezesButton.onclick = function() {
        bejelentkezesModal.style.display = "block";
    };

    regisztracioButton.onclick = function() {
        regisztracioModal.style.display = "block";
    };

    closeBejelentkezes.onclick = function() {
        bejelentkezesModal.style.display = "none";
    };

    closeRegisztracio.onclick = function() {
        regisztracioModal.style.display = "none";
    };
    window.onclick = function(event) {
        if (event.target === bejelentkezesModal) {
            bejelentkezesModal.style.display = "none";
        } else if (event.target === regisztracioModal) {
            regisztracioModal.style.display = "none";
        }
    };
});
const products = [
    { name: "Product 1", price: "$19.99", img: "product1.jpg" },
    { name: "Product 2", price: "$29.99", img: "product2.jpg" },
    { name: "Product 3", price: "$24.99", img: "product3.jpg" },
    { name: "Product 4", price: "$34.99", img: "product4.jpg" },
    { name: "Product 5", price: "$14.99", img: "product5.jpg" },
    { name: "Product 6", price: "$39.99", img: "product6.jpg" },
    { name: "Product 7", price: "$44.99", img: "product7.jpg" },
    { name: "Product 8", price: "$59.99", img: "product8.jpg" },
    { name: "Product 9", price: "$19.99", img: "product9.jpg" },
    { name: "Product 10", price: "$29.99", img: "product10.jpg" },
    { name: "Product 11", price: "$24.99", img: "product11.jpg" },
    { name: "Product 12", price: "$34.99", img: "product12.jpg" },
    { name: "Product 13", price: "$14.99", img: "product13.jpg" },
    { name: "Product 14", price: "$39.99", img: "product14.jpg" },
    { name: "Product 15", price: "$44.99", img: "product15.jpg" },
    { name: "Product 16", price: "$59.99", img: "product16.jpg" },
    { name: "Product 17", price: "$29.99", img: "product17.jpg" },
    { name: "Product 18", price: "$39.99", img: "product18.jpg" },
    { name: "Product 19", price: "$34.99", img: "product19.jpg" },
    { name: "Product 20", price: "$44.99", img: "product20.jpg" },
    { name: "Product 21", price: "$54.99", img: "product21.jpg" },
    { name: "Product 22", price: "$14.99", img: "product22.jpg" },
    { name: "Product 23", price: "$64.99", img: "product23.jpg" },
    { name: "Product 24", price: "$74.99", img: "product24.jpg" },
    { name: "Product 25", price: "$84.99", img: "product25.jpg" },
    { name: "Product 26", price: "$94.99", img: "product26.jpg" },
    { name: "Product 27", price: "$19.99", img: "product27.jpg" },
    { name: "Product 28", price: "$29.99", img: "product28.jpg" },
    { name: "Product 29", price: "$39.99", img: "product29.jpg" },
    { name: "Product 30", price: "$49.99", img: "product30.jpg" },
    { name: "Product 31", price: "$59.99", img: "product31.jpg" },
    { name: "Product 32", price: "$69.99", img: "product32.jpg" },
];

let currentPage = 0; // Kezdetben 0, mert a loadMoreProducts kezeli az oldalszámot
const productsPerPage = 8; // Maximum termékek száma oldalon
const totalProducts = products.length;

function displayProducts() {
    const productContainer = document.getElementById("product-container");
    const start = currentPage * productsPerPage;
    const end = start + productsPerPage;
    const currentProducts = products.slice(start, end);

    currentProducts.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p class="price">${product.price}</p>
            <button class="btn">KOSÁRBAt</button>
        `;
        productContainer.appendChild(productDiv);
    });

    document.getElementById("loadMoreBtn").disabled = end >= totalProducts; // Ha a megjelenített termékek elérik a maximumot, letiltjuk a gombot
}

function loadMoreProducts() {
    currentPage++;
    displayProducts();
}

// Kezdőképernyő megjelenítése
displayProducts();

let cart = [];

function addToCart(name, price) {
    cart.push({ name, price });
    alert(`${name} hozzáadva a kosárhoz.`);
}

function displayCart() {
    const cartContainer = document.getElementById('cart-contents');
    cartContainer.innerHTML = ''; // Clear previous contents
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item.name} - $${item.price}`;
        cartContainer.appendChild(itemDiv);
    });
    document.getElementById('cart-modal').style.display = 'block';
}

// Event listener for Add to Cart buttons
document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.querySelector('.cart');
    const productButtons = document.querySelectorAll('.btn');

    productButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productDiv = button.parentElement;
            const productName = productDiv.querySelector('h4').innerText;
            const productPrice = productDiv.querySelector('.price').innerText;

            const product = {
                name: productName,
                price: productPrice,
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));

            alert(`${productName} hozzáadva a kosárhoz!`);
        });
    });

    cartButton.addEventListener('click', () => {
        window.location.href = 'cart.html';
    });
});
