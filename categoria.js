alert("categoria.js funcionando");
import { db } from "./firebase.js";
import { collection, getDocs} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
// Obtener categoría desde la URL
const parametros = new URLSearchParams(window.location.search);
const categoria = parametros.get("cat");
// Cambiar título
document.getElementById("tituloCategoria").textContent = categoria;
// Contenedor
const contenedor = document.getElementById("productos");
// Cargar productos
async function cargarProductos() {
    contenedor.innerHTML = "";
    try {
        const snapshot = await getDocs(collection(db, "productos"));
        let productos = [];
        snapshot.forEach((doc) => {
            const p = doc.data();
            if (p.Categoria === categoria) {
                productos.push(p);
            }
        });
        productos.sort((a, b) => a.Nombre.localeCompare(b.Nombre)
        );
        productos.forEach((p) => {
            contenedor.innerHTML += `
            <div class="producto">
                <div class="imagen">
                    <img src="${p.imagen}" alt="${p.Nombre}">
                </div>
                <div class="contenido">
                    <h3>${p.Nombre}</h3>
                    <p>SKU: ${p.sku}</p>
                    <p>CeCo: ${p.ceco}</p>
                    ${p.cuenta && p.cuenta !== "N/A"
                        ? `<p>Cuenta: ${p.cuenta}</p>`
                        : ""}
                </div>
            </div>
            `;
        });
    } catch (error) {
        console.error(error);
    }
}
cargarProductos();
// Buscador
document.getElementById("buscar").addEventListener("keyup", () => {

    const texto = document
        .getElementById("buscar")
        .value
        .toLowerCase();

    document.querySelectorAll(".producto").forEach((producto) => {
        producto.style.display = producto.textContent.toLowerCase().includes(texto) ? "flex": "none";
    });
});
