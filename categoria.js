import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Obtener categoría desde la URL
const parametros = new URLSearchParams(window.location.search);
const categoria = parametros.get("cat");

// Cambiar el título
document.getElementById("tituloCategoria").textContent = categoria;

// Contenedor de productos
const contenedor = document.getElementById("productos");

// Función para cargar productos
async function cargarProductos() {

    try {

        console.log("Categoría:", categoria);

        contenedor.innerHTML = "";

        const snapshot = await getDocs(
            collection(db, "productos")
        );

        console.log("Productos en Firestore:", snapshot.size);

        let productos = [];

        snapshot.forEach((documento) => {

            const p = documento.data();

            console.log(p);

            if (p.Categoria === categoria) {

                productos.push(p);

            }

        });

        productos.sort((a, b) =>
            a.Nombre.localeCompare(b.Nombre)
        );

        if (productos.length === 0) {

            contenedor.innerHTML = `
                <h2 style="text-align:center;">
                    No hay productos en esta categoría.
                </h2>
            `;

            return;

        }

        productos.forEach((p) => {

            contenedor.innerHTML += `

                <div class="producto">

                    <div class="imagen">

                        <img
                            src="${p.imagen}"
                            alt="${p.Nombre}">

                    </div>

                    <div class="contenido">

                        <h3>${p.Nombre}</h3>

                        <p><b>SKU:</b> ${p.sku}</p>

                        <p><b>CeCo:</b> ${p.ceco}</p>

                        ${p.cuenta && p.cuenta !== "N/A"
                            ? `<p><b>Cuenta:</b> ${p.cuenta}</p>`
                            : ""}

                    </div>

                </div>

            `;

        });

    } catch (error) {

        console.error("ERROR:", error);

    }

}

// Cargar productos
cargarProductos();

// Buscador
document.getElementById("buscar").addEventListener("keyup", function () {

    const texto = this.value.toLowerCase();

    document.querySelectorAll(".producto").forEach((producto) => {

        producto.style.display =
            producto.textContent.toLowerCase().includes(texto)
                ? "flex"
                : "none";

    });

});
