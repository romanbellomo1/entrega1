let listaHamburguesas = [
  {
    id: 1,
    nombre: "Clásica",
    precio: 1500,
    img: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
  },
  {
    id: 2,
    nombre: "Doble Queso",
    precio: 2000,
    img: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
  },
  {
    id: 3,
    nombre: "Vegana",
    precio: 1800,
    img: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
  },
];

let pedido = JSON.parse(localStorage.getItem("pedido")) || [];

let menu = document.getElementById("menu");

for (let i = 0; i < listaHamburguesas.length; i++) {
  let card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
        <img src="${listaHamburguesas[i].img}" alt="${listaHamburguesas[i].nombre}">
        <h3>${listaHamburguesas[i].nombre}</h3>
        <p>$${listaHamburguesas[i].precio}</p>
        <button id="btn${listaHamburguesas[i].id}">Agregar</button>
    `;
  menu.appendChild(card);

  let boton = document.getElementById(`btn${listaHamburguesas[i].id}`);
  boton.addEventListener("click", function () {
    agregarAlPedido(listaHamburguesas[i]);
  });
}

function agregarAlPedido(hamburguesa) {
  pedido.push(hamburguesa);
  localStorage.setItem("pedido", JSON.stringify(pedido));
  mostrarPedido();
}

function mostrarPedido() {
  let listaPedido = document.getElementById("pedido");
  listaPedido.innerHTML = "";

  let total = pedido.reduce((acc, item) => acc + item.precio, 0);

  for (let i = 0; i < pedido.length; i++) {
    let li = document.createElement("li");
    li.textContent = `${pedido[i].nombre} - $${pedido[i].precio}`;
    listaPedido.appendChild(li);
  }

  document.getElementById("total").textContent = `Total: $${total}`;
}

//muestra pedido final
mostrarPedido();

function confirmarPedido() {
    if (pedido.length > 0) {
        alert("¡Pedido confirmado!\nTotal: $" + 
              pedido.reduce((acc, item) => acc + item.precio, 0));
        pedido = [];
        localStorage.setItem("pedido", JSON.stringify(pedido));
        mostrarPedido();
    } else {
        alert("Tu pedido está vacío");
    }
}