const productsContainer = document.getElementById("products");
const cartContainer = document.getElementById("cart");
const clearCartBtn = document.getElementById("clear-cart");

let cart = [];

/* =========================
   LOCAL STORAGE
========================= */

// Guardar carrito
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Cargar carrito
function loadCart() {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
    renderCart();
  }
}

/* =========================
   CARRITO
========================= */

// Renderizar carrito
function renderCart() {
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>No hay productos en el carrito</p>";
    saveCart();
    return;
  }

  let total = 0;
  cartContainer.innerHTML = "";

  cart.forEach(item => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.justifyContent = "space-between";
    div.style.alignItems = "center";
    div.style.marginBottom = "8px";

    const text = document.createElement("span");
    text.textContent = `${item.name} x ${item.quantity} — $${item.price * item.quantity}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.style.marginLeft = "10px";
    removeBtn.addEventListener("click", () => removeFromCart(item.id));

    div.appendChild(text);
    div.appendChild(removeBtn);
    cartContainer.appendChild(div);
  });

  const totalDiv = document.createElement("h3");
  totalDiv.textContent = `Total: $${total}`;
  cartContainer.appendChild(totalDiv);

  saveCart();
}

// Agregar producto al carrito
function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

// Eliminar producto del carrito
function removeFromCart(id) {
  const index = cart.findIndex(item => item.id === id);

  if (index !== -1) {
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    } else {
      cart.splice(index, 1);
    }
  }

  renderCart();
}

// Vaciar carrito
function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

/* =========================
   PRODUCTOS
========================= */

fetch("http://localhost:5000/products")
  .then(res => res.json())
  .then(products => {
    productsContainer.innerHTML = "";

    products.forEach(p => {
      const div = document.createElement("div");
      div.className = "product";

      const button = document.createElement("button");
      button.textContent = "Agregar al carrito";
      button.addEventListener("click", () => addToCart(p));

      div.innerHTML = `
        <h2>${p.name}</h2>
        <p>Precio: $${p.price}</p>
        <p>Stock: ${p.stock}</p>
      `;

      div.appendChild(button);
      productsContainer.appendChild(div);
    });
  })
  .catch(() => {
    productsContainer.innerHTML = "<p>Error cargando productos</p>";
  });

/* =========================
   INICIO
========================= */

loadCart();
clearCartBtn.addEventListener("click", clearCart);
