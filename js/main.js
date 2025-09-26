// app.js (module)
const LS_KEY = "simulador_cart_v1";

document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.getElementById("products");
  const cartItemsEl = document.getElementById("cartItems");
  const totalEl = document.getElementById("total");
  const loadingEl = document.getElementById("loading");
  const toggleThemeBtn = document.getElementById("toggleTheme");
  const clearCartBtn = document.getElementById("clearCart");
  const confirmBtn = document.getElementById("confirmOrder");

  let products = [];
  let cart = loadCart();

  // theme
  const body = document.documentElement;
  toggleThemeBtn.addEventListener("click", () => {
    const isDark = body.getAttribute("data-theme") === "dark";
    body.setAttribute("data-theme", isDark ? "": "dark");
    toggleThemeBtn.textContent = isDark ? "Modo oscuro" : "Modo claro";
  });

  // Simula obtener datos remotos (JSON) con delay
  async function fetchProducts(){
    loadingEl.textContent = "Cargando productos…";
    await new Promise(r => setTimeout(r, 500)); // simulación latencia
    loadingEl.textContent = "";
    return [
      { id: "p1", title: "Clásica", price: 1500, img: "https://i.imgur.com/8Km9tLL.png" },
      { id: "p2", title: "Doble Queso", price: 2000, img: "https://i.imgur.com/mV0J4iE.png" },
      { id: "p3", title: "Vegana", price: 1800, img: "https://i.imgur.com/0KXbK2K.png" }
    ];
  }

  // render productos
  function renderProducts(list){
    const tpl = document.getElementById("productTpl");
    productsContainer.innerHTML = "";
    list.forEach(p => {
      const node = tpl.content.cloneNode(true);
      const article = node.querySelector(".card");
      const img = node.querySelector("img");
      const h3 = node.querySelector("h3");
      const price = node.querySelector(".price");
      const btn = node.querySelector(".addBtn");

      img.src = p.img; img.alt = p.title;
      h3.textContent = p.title;
      price.textContent = `$${p.price}`;
      btn.addEventListener("click", () => addToCart(p.id));
      productsContainer.appendChild(node);
    });
  }

  // cart logic
  function loadCart(){
    try{
      return JSON.parse(localStorage.getItem(LS_KEY)) || [];
    }catch(e){ return []; }
  }
  function saveCart(){
    localStorage.setItem(LS_KEY, JSON.stringify(cart));
  }
  function addToCart(productId){
    const prod = products.find(x => x.id === productId);
    if(!prod) return;
    const entry = cart.find(c => c.id === productId);
    if(entry) entry.qty++;
    else cart.push({ id: productId, qty: 1, title: prod.title, price: prod.price });
    saveCart(); renderCart(); flash(`Agregaste: ${prod.title}`);
  }
  function removeFromCart(productId){
    cart = cart.filter(c => c.id !== productId);
    saveCart(); renderCart();
  }
  function updateQty(productId, qty){
    const entry = cart.find(c => c.id === productId);
    if(!entry) return;
    entry.qty = Math.max(1, Math.floor(qty) || 1);
    saveCart(); renderCart();
  }
  function clearCart(){
    cart = []; saveCart(); renderCart();
  }
  function getTotal(){
    return cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  }

  // render carrito
  function renderCart(){
    const tpl = document.getElementById("cartItemTpl");
    cartItemsEl.innerHTML = "";
    if(cart.length === 0){
      cartItemsEl.innerHTML = `<p class="muted">El carrito está vacío</p>`;
    } else {
      cart.forEach(item => {
        const node = tpl.content.cloneNode(true);
        node.querySelector(".cart-name").textContent = item.title;
        node.querySelector(".cart-price").textContent = `$${item.price} x ${item.qty} = $${item.price*item.qty}`;
        const qtyEl = node.querySelector(".qty");
        const removeBtn = node.querySelector(".remove");
        qtyEl.value = item.qty;
        qtyEl.addEventListener("change", (e) => updateQty(item.id, e.target.value));
        removeBtn.addEventListener("click", () => removeFromCart(item.id));
        cartItemsEl.appendChild(node);
      });
    }
    totalEl.textContent = `$${getTotal()}`;
  }

  // confirm order (simulación)
  confirmBtn.addEventListener("click", () => {
    if(cart.length === 0) return flash("El carrito está vacío", true);
    // simulamos proceso de compra
    confirmBtn.disabled = true;
    confirmBtn.textContent = "Procesando...";
    setTimeout(() => {
      const orderId = "ORD-" + Math.random().toString(36).slice(2,9).toUpperCase();
      flash(`Pedido confirmado: ${orderId}. Total: $${getTotal()}`);
      clearCart();
      confirmBtn.disabled = false;
      confirmBtn.textContent = "Confirmar Pedido";
    }, 900);
  });

  clearCartBtn.addEventListener("click", () => {
    if(cart.length === 0) return;
    if(confirm("¿Vaciar el carrito?")) clearCart();
  });

  // pequeñas utilidades UI
  function flash(msg, isError=false){
    const prev = document.createElement("div");
    prev.textContent = msg;
    prev.style.position = "fixed";
    prev.style.left = "50%";
    prev.style.transform = "translateX(-50%)";
    prev.style.bottom = "24px";
    prev.style.padding = "10px 16px";
    prev.style.borderRadius = "10px";
    prev.style.boxShadow = "0 6px 18px rgba(0,0,0,0.12)";
    prev.style.background = isError ? "#ffdddd" : "#eaf6ff";
    prev.style.zIndex = 9999;
    document.body.appendChild(prev);
    setTimeout(()=> prev.remove(), 2000);
  }

  // inicialización
  (async function init(){
    products = await fetchProducts();
    renderProducts(products);
    renderCart();
  })();
});
