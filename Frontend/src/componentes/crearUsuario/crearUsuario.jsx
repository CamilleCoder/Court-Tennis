import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../componentes/Navbar/Navbar";
import "./crearUsuario.css";

const API_BASE_URL = "http://localhost:8080/api";

export function CrearUsuario() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasenia: "",
    categoriaU: "",
  });

  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingCategorias, setLoadingCategorias] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/categoriasU`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar las categorías");
        }
        return response.json();
      })
      .then((data) => {
        setCategorias(data);
        setLoadingCategorias(false);
      })
      .catch((error) => {
        console.error("Error al obtener las categorías:", error);
        setError("No se pudieron cargar las categorías");
        setLoadingCategorias(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const usuarioParaEnviar = {
      nombre: usuario.nombre.trim(),
      apellido: usuario.apellido.trim(),
      email: usuario.email.trim(),
      contrasenia: usuario.contrasenia.trim(),
      activo: true,
      categoriaU: { id: parseInt(usuario.categoriaU) },
    };

    try {
      const response = await fetch(`${API_BASE_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioParaEnviar),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al crear el usuario");
      }

      navigate("/administrador", {
        state: { message: "Usuario creado exitosamente" },
      });
    } catch (err) {
      setError(err.message || "No se pudo crear el usuario");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    const tieneContenido = Object.values(usuario).some((val) => val !== "");

    if (
      !tieneContenido ||
      window.confirm(
        "¿Está seguro de cancelar? Se perderán los datos ingresados."
      )
    ) {
      navigate("/administrador");
    }
  };

  return (
    <>
      <Navbar />

      <div className="crear-usuario-container">
        <div className="form-card">
          <h2>Crear Usuario</h2>

          {error && (
            <div className="error-message">
              {error}
              <button onClick={() => setError(null)} className="error-close">
                ×
              </button>
            </div>
          )}

          {loadingCategorias ? (
            <div className="loading">Cargando categorías...</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={usuario.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Apellido *</label>
                  <input
                    type="text"
                    name="apellido"
                    value={usuario.apellido}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={usuario.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* 🔥 NUEVO: Campo contraseña */}
              <div className="form-group">
                <label>Contraseña *</label>
                <input
                  type="password"
                  name="contrasenia"
                  value={usuario.contrasenia}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Categoría de Usuario *</label>
                <select
                  name="categoriaU"
                  value={usuario.categoriaU}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione una categoría</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-actions">
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? "Guardando..." : "Crear Usuario"}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
