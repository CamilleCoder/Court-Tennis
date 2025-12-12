import "./catalogoTortas.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Footer } from "../../componentes/footer/footer";

export function CatalogoTortas() {
  const navigate = useNavigate();
  
    const [productos, setProductos] = useState([]);
  
    const cargarProductos = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/productos");
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
  
        const data = await response.json();
        console.log("Respuesta del backend:", data);
  
        // Normalizar y filtrar
        const productosNormalizados = data
          .map((p) => ({
            ...p,
            activo: p.activo === true || p.activo === "true",
          }))
          .filter(
            (p) => p.categoria?.nombre?.toLowerCase() === "pelotas" && p.activo
          );
  
        setProductos(productosNormalizados);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };
  
    useEffect(() => {
      cargarProductos();
    }, []);
  
    const agregarAlCarrito = (producto) => {
      const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      carrito.push(producto);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      alert(`${producto.nombre} agregado al carrito`);
    };
  
    return (

      <>
      <section className="catalogo">
        {productos.map((p) => (
          <div key={p.codigo} className="productos">
            <img src={p.img} alt={p.nombre} className="imagen" />
            <h3 className="nombreProducto">{p.nombre}</h3>
            <p>Descripción: {p.descripcion}</p>
            <p>Precio: ${p.precio}</p>
            <button onClick={() => agregarAlCarrito(p)}>Agregar</button>
          </div>
        ))}
  
        <div className="irCarrito">
          <button onClick={() => navigate("/Contacto")}>Ir al carrito 🛒</button>
        </div>
      </section>
      <Footer />
      </>
    );
}
