// ===============================
// WALLET STORE - SCRIPT.JS
// ===============================

// ===== MOBILE MENU =====
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// ===== ACTIVE NAV LINK =====
const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {
  link.addEventListener("click", () => {
    links.forEach(item => item.classList.remove("active"));
    link.classList.add("active");
  });
});

// ===== CART SYSTEM =====
const cartIcon = document.querySelector(".cart-icon");
const cartSidebar = document.querySelector(".cart-sidebar");
const closeCart = document.querySelector(".close-cart");
const overlay = document.querySelector(".overlay");
const cartItemsContainer = document.querySelector(".cart-items");
const cartTotal = document.querySelector("#cartTotal");
const cartCount = document.querySelector("#cartCount");

let cart = [];

// OPEN CART
if (cartIcon) {
  cartIcon.addEventListener("click", () => {
    cartSidebar.classList.add("open");
    overlay.classList.add("show");
  });
}

// CLOSE CART
function closeCartSidebar() {
  cartSidebar.classList.remove("open");
  overlay.classList.remove("show");
}

if (closeCart) {
  closeCart.addEventListener("click", closeCartSidebar);
}

if (overlay) {
  overlay.addEventListener("click", closeCartSidebar);
}

// ===== PRODUCTS =====
const products = [
  {
    id: 1,
    name: "Classic Leather Wallet",
    price: 49,
    image: "images/wallet1.jpg"
  },
  {
    id: 2,
    name: "Slim Card Holder",
    price: 35,
    image: "images/wallet2.jpg"
  },
  {
    id: 3,
    name: "Premium Brown Wallet",
    price: 59,
    image: "images/wallet3.jpg"
  },
  {
    id: 4,
    name: "Minimal Black Wallet",
    price: 42,
    image: "images/wallet4.jpg"
  }
];

// ===== ADD TO CART =====
const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    addToCart(products[index]);
  });
});

function addToCart(product) {
  cart.push(product);

  updateCart();

  showToast(`${product.name} added to cart`);
}

// ===== UPDATE CART =====
function updateCart() {
  cartItemsContainer.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>$${item.price}</p>
      </div>

      <div class="cart-item-remove" onclick="removeFromCart(${index})">
        ✕
      </div>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  cartTotal.textContent = `$${total}`;
  cartCount.textContent = cart.length;
}

// ===== REMOVE ITEM =====
function removeFromCart(index) {
  const removedItem = cart[index];

  cart.splice(index, 1);

  updateCart();

  showToast(`${removedItem.name} removed`);
}

// ===== TOAST NOTIFICATION =====
function showToast(message) {
  const toast = document.createElement("div");

  toast.classList.add("toast");
  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideOutToast 0.4s ease forwards";

    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 2500);
}

// ===== PRICE FILTER =====
const priceRange = document.querySelector("#priceRange");
const priceValue = document.querySelector("#priceValue");

if (priceRange) {
  priceRange.addEventListener("input", () => {
    priceValue.textContent = `$${priceRange.value}`;
  });
}

// ===== CATEGORY FILTER =====
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

// ===== FAQ =====
const faqItems = document.querySelectorAll(".faq-list details");

faqItems.forEach(item => {
  item.addEventListener("toggle", () => {
    if (item.open) {
      faqItems.forEach(other => {
        if (other !== item) {
          other.open = false;
        }
      });
    }
  });
});

// ===== NEWSLETTER =====
const newsletterForm = document.querySelector(".newsletter-form");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const input = newsletterForm.querySelector("input");

    if (input.value.trim() !== "") {
      showToast("Subscribed successfully!");
      input.value = "";
    }
  });
}

// ===== CONTACT FORM =====
const contactForm = document.querySelector(".contact-form form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    showToast("Message sent successfully!");

    contactForm.reset();
  });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

// ===== NAVBAR SHADOW ON SCROLL =====
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
  } else {
    navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
  }
});