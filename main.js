//Simulador de comida rapida 

let hamburguesa = ["Clasica", "Doble", "Triple"];
let hamburguesaPrecio = [10000, 13000, 15000];

let papas = ["Chicas", "Grandes", "Con cheddar"];
let papasPrecio = [1000, 2000, 3500];

let bebida = ["Coca-Cola", "Jugo saborizado", "Agua"];
let precioBebida = [2500, 1800, 1000];

let eleccionHamburguesa = prompt(
  "Elegi tu hamburguesa: \n" +
    "1. Hamburguesa Clasica- $10000\n" +
    "2. Hamburguesa Doble- $13000 \n" +
    "3. Hamburguesa Con cheddar $15000"
);

let indiceHamburguesa = parseInt(eleccionHamburguesa) - 1;
let seleccionHamburguesa = hamburguesa[indiceHamburguesa];
let precioSeleccionHamburguesa = hamburguesaPrecio[indiceHamburguesa];
alert(
  "Elegiste: Hamburguesa " +
    seleccionHamburguesa +
    "\n Precio: $" +
    precioSeleccionHamburguesa
);

let eleccionPapas = prompt(
  "Elegi las papas: \n" +
    "1. Papas Chicas- $1000 \n" +
    "2. Papas Grandes- $2000 \n" +
    "3. Papas Con Cheddar- $3000 \n"
);

let indicePapas = parseInt(eleccionHamburguesa) - 1;
let seleccionPapas = papas[indicePapas];
let precioSeleccionPapas = papasPrecio[indicePapas];
alert(
  "Elegiste: Papas" + seleccionPapas + "\n Precio: $" + precioSeleccionPapas
);

let eleccionBebida = prompt(
  "Elegi la bebida: \n" +
    "1. Coca-Cola- $2500 \n" +
    "2. Jugo saborizado - $1800 \n" +
    "3. Agua - $1000"
);

let indiceBebidas = parseInt(eleccionBebida) - 1;
let seleccionBebidas = bebida[indiceBebidas];
let precioSeleccionBebida = precioBebida[indiceBebidas];
alert("Elegiste: " + seleccionBebidas + "\n Precio: $" + precioSeleccionBebida);

let total = precioSeleccionHamburguesa + precioSeleccionPapas + precioSeleccionBebida;
alert(
  "Resumen de compra:\n 🍔Hamburguesa " +
    seleccionHamburguesa +
    " \n 🍟Papas " +
    seleccionPapas +
    "\n 🥤" +
    seleccionBebidas +
    "\n 💰 Total: $" +
    total
);

let confirmar = confirm("¿Querés confirmar tu pedido?");
alert("Pedido en preparacion. Muchas gracias");
