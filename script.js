// ========== MOBILE MENU ==========
function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('active');
}

// ========== CART SYSTEM ==========
let cart = JSON.parse(localStorage.getItem('herbalGlowCart')) || [];

updateCartUI();

function addToCart(name, price, image) {

  cart.push({
    name,
    price,
    image
  });

  localStorage.setItem('herbalGlowCart', JSON.stringify(cart));

  updateCartUI();

  showToast(`${name} added to cart 🛒`);
}

function updateCartUI() {

  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const totalPrice = document.getElementById('totalPrice');
  const cartTotal = document.getElementById('cartTotal');

  if (!cartItems || !cartCount) return;

  cartItems.innerHTML = '';

  if (cart.length === 0) {

    cartItems.innerHTML = `
      <p style="color:#aaa;text-align:center;margin-top:40px;">
        Your cart is empty
      </p>
    `;

    cartTotal.style.display = 'none';

  } else {

    let total = 0;

    cart.forEach((item, index) => {

      total += item.price;

      cartItems.innerHTML += `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}">
          
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>Rs. ${item.price}</p>
          </div>

          <span class="cart-item-remove" onclick="removeFromCart(${index})">
            ✕
          </span>
        </div>
      `;
    });

    cartCount.innerText = cart.length;
    totalPrice.innerText = total;
    cartTotal.style.display = 'block';
  }
}

function removeFromCart(index) {

  cart.splice(index, 1);

  localStorage.setItem('herbalGlowCart', JSON.stringify(cart));

  updateCartUI();
}

function showCart() {

  document.getElementById('cartSidebar').classList.add('open');

  document.getElementById('overlay').classList.add('show');
}

function closeCart() {

  document.getElementById('cartSidebar').classList.remove('open');

  document.getElementById('overlay').classList.remove('show');
}

function checkout() {

  if(cart.length === 0){
    alert("Your cart is empty!");
    return;
  }

  alert("Thank you for shopping with HerbalGlow 🌿");

  cart = [];

  localStorage.setItem('herbalGlowCart', JSON.stringify(cart));

  updateCartUI();

  closeCart();
}

// ========== TOAST NOTIFICATION ==========
function showToast(message) {

  const toast = document.createElement('div');

  toast.className = 'toast';

  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOutToast 0.4s ease forwards';

    setTimeout(() => {
      toast.remove();
    }, 400);

  }, 2000);
}

// ========== NEWSLETTER ==========
function subscribe(event) {

  event.preventDefault();

  alert("Thank you for subscribing 🌿");
}

// ========== PRODUCT FILTER ==========
function filterProducts(category) {

  const products = document.querySelectorAll('.product-card');

  const buttons = document.querySelectorAll('.filter-btn');

  buttons.forEach(btn => {
    btn.classList.remove('active');
  });

  event.target.classList.add('active');

  products.forEach(product => {

    if(category === 'all') {

      product.style.display = 'block';
    }

    else if(product.classList.contains(category)) {

      product.style.display = 'block';
    }

    else {

      product.style.display = 'none';
    }

  });
}

// ========== PRICE FILTER ==========
function filterByPrice(maxPrice) {

  document.getElementById('priceValue').innerText = maxPrice;

  const products = document.querySelectorAll('.product-card');

  products.forEach(product => {

    const priceText = product.querySelector('.sale-price').innerText;

    const price = parseInt(
      priceText.replace('Rs.', '').replace(',', '').trim()
    );

    if(price <= maxPrice) {

      product.style.display = 'block';

    } else {

      product.style.display = 'none';
    }

  });
}

// ========== SKIN TYPE FILTER ==========
function filterSkinType() {

  alert("Skin type filtering can be customized later 🌿");
}

// ========== CATEGORY FROM HOME PAGE ==========
window.addEventListener('DOMContentLoaded', () => {

  const urlParams = new URLSearchParams(window.location.search);

  const category = urlParams.get('category');

  if(category){

    filterProducts(category);
  }
});