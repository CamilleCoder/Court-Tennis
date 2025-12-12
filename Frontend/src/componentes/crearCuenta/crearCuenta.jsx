import { useState } from "react";
import "./crearCuenta.css";

export function Register() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [categoria, setCategoria] = useState("Cliente");
  const [mensaje, setMensaje] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setLoading(true);

    const payload = {
      nombre,
      apellido,
      email,
      contrasenia,      // campo que tu backend espera
      activo: true,
      categoriaU: {
        id: categoria === "Administrador" ? 1 : 2 // asegúrate que estos IDs existan
      }
    };

    console.log("Payload a enviar:", payload);

    try {
      const response = await fetch("http://localhost:8080/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Lee la respuesta como texto (por si el backend envía mensaje simple)
      const text = await response.text();
      console.log("Status:", response.status, "Body:", text);

      if (response.ok) {
        // Si el backend devuelve JSON con el usuario, parsealo:
        let created;
        try { created = JSON.parse(text); } catch { created = text; }
        setMensaje({ type: "success", text: "✔ Usuario creado correctamente." });
        // limpiar campos
        setNombre(""); setApellido(""); setEmail(""); setContrasenia("");
        console.log("Usuario creado:", created);
      } else {
        // Mostrar mensaje que envió el backend o fallback
        const errorMsg = text || `Error: status ${response.status}`;
        setMensaje({ type: "error", text: `✖ ${errorMsg}` });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setMensaje({ type: "error", text: "Error al conectar con el servidor (fetch). Revisa consola o network." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ padding: "20px" }}>

      <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "8px" }} id="FormularioCrear">

        <h2><em>¡Crea tu Cuenta!</em></h2>

        <label>Nombre:</label>
        <input id="input" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

        <label>Apellido:</label>
        <input id="input" type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} required />

        <label>Email:</label>
        <input id="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Contraseña:</label>
        <input id="input" type="password" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} required />

        <label>Tipo de usuario:</label>
        <select id="select" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option id="option" value="Cliente">Cliente</option>
          <option id="option" value="Administrador">Administrador</option>
        </select>

        <button id="crear" type="submit" disabled={loading}>{loading ? "Creando..." : "Crear Cuenta"}</button>

        {mensaje && (
          <p style={{ color: mensaje.type === "success" ? "green" : "crimson", marginTop: 8 }}>
            {mensaje.text}
          </p>
        )}
      </form>
    </section>
  );
}
