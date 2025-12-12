import { useEffect, useState } from "react";
import { Navbar } from "../../componentes/Navbar/Navbar";
import "./carrito.css";

export function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [boletas, setBoletas] = useState([]); // historial de boletas

  // Cargar carrito y boletas al entrar
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(data);

    const historialBoletas = JSON.parse(localStorage.getItem("boletas")) || [];
    setBoletas(historialBoletas);
  }, []);

  const actualizarLocalStorage = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const eliminarProducto = (index) => {
    const nuevo = carrito.filter((_, i) => i !== index);
    actualizarLocalStorage(nuevo);
  };

  const limpiarCarrito = () => {
    actualizarLocalStorage([]);
  };

  const total = carrito.reduce((acc, p) => acc + p.precio, 0);

  const generarBoleta = () => {
    const fecha = new Date().toLocaleString(); // fecha + hora

    const nuevaBoleta = {
      productos: carrito,
      total,
      fecha,
    };

    // Agregar al historial de boletas
    const nuevoHistorial = [...boletas, nuevaBoleta];
    localStorage.setItem("boletas", JSON.stringify(nuevoHistorial));
    setBoletas(nuevoHistorial);
  };

  const pagar = () => {
    if (carrito.length === 0) return;

    generarBoleta();
    limpiarCarrito();
    alert("¡Compra realizada con éxito!");
  };

  // 🔥 NUEVO → eliminar boleta individual
  const eliminarBoleta = (index) => {
    const nuevoHistorial = boletas.filter((_, i) => i !== index);
    setBoletas(nuevoHistorial);
    localStorage.setItem("boletas", JSON.stringify(nuevoHistorial));
  };

  return (
    <>
      <Navbar />

      <section className="carrito">
        <h2>🛒 Carrito de Compras</h2>

        {carrito.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <ul>
            {carrito.map((p, i) => (
              <li key={i}>
                {p.nombre} — ${p.precio}
                <button onClick={() => eliminarProducto(i)}>❌</button>
              </li>
            ))}
          </ul>
        )}

        <hr />

        <h3>Total a pagar: ${total}</h3>

        {carrito.length > 0 && (
          <div className="acciones">
            <button onClick={limpiarCarrito}>🗑 Vaciar carrito</button>
            <button onClick={pagar}>💳 Pagar</button>
          </div>
        )}

        {/* ----------- HISTORIAL DE BOLETAS ----------- */}
        {boletas.length > 0 && (
          <section className="boleta">
            <h2>🧾 Historial de compras</h2>

            {boletas.map((b, index) => (
              <div key={index} className="boleta-individual">

                {/* 🔥 Botón para eliminar boleta */}
                <button
                  onClick={() => eliminarBoleta(index)}
                  className="btn-eliminar-boleta"
                  style={{ float: "right" }}
                >
                  ❌ Eliminar
                </button>

                <p><strong>Fecha:</strong> {b.fecha}</p>
                <h3>Productos:</h3>
                <ul>
                  {b.productos.map((p, i) => (
                    <li key={i}>{p.nombre} — ${p.precio}</li>
                  ))}
                </ul>
                <h3>Total pagado: ${b.total}</h3>
                <hr />
              </div>
            ))}
          </section>
        )}
      </section>
    </>
  );
}
