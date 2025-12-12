import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";

export function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const usuarioId = parseInt(id);

  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    categoriaU: { id: "", nombre: "" },
  });

  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);

        
        const respUsuario = await fetch(
          `http://localhost:8080/api/usuarios/${usuarioId}`
        );
        if (!respUsuario.ok) throw new Error("Error al cargar el usuario");
        const dataUsuario = await respUsuario.json();
        setUsuario(dataUsuario);


        const respCategoriasU = await fetch(
          "http://localhost:8080/api/categoriasU"
        );
        if (!respCategoriasU.ok) throw new Error("Error al cargar categorías");
        const dataCategoriasU = await respCategoriasU.json();
        setCategorias(dataCategoriasU);

        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, [usuarioId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "categoriaU") {
      const categoriaSeleccionada = categorias.find(
        (c) => c.id === parseInt(value)
      );
      setUsuario((prev) => ({
        ...prev,
        categoriaU: categoriaSeleccionada || { id: value },
      }));
    } else {
      setUsuario((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);
      setError(null);

      const datosActualizados = {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        categoriaU: usuario.categoriaU ? { id: usuario.categoriaU.id } : null,
      };

      const response = await fetch(
        `http://localhost:8080/api/usuarios/${usuarioId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datosActualizados),
        }
      );

      if (!response.ok) throw new Error("Error al actualizar usuario");

      await response.json();
      setSuccess(true);
      setTimeout(() => navigate("/administrador"), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleVolver = () => navigate("/administrador");

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted">Cargando usuario...</p>
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="container mt-3" style={{ maxWidth: "600px" }}>
        <div className="card">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h6 className="mb-0">Editar Usuario</h6>
            <button
              onClick={handleVolver}
              className="btn-close btn-close-white"
            ></button>
          </div>

          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
            {success && (
              <div className="alert alert-success">
                Usuario actualizado exitosamente
              </div>
            )}

            <div className="mb-2">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                value={usuario.nombre}
                disabled
                className="form-control form-control-sm bg-light"
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                name="apellido"
                value={usuario.apellido || ""}
                onChange={handleChange}
                className="form-control form-control-sm"
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Email</label>
              <input
                type="text"
                name="email"
                value={usuario.email || ""}
                onChange={handleChange}
                className="form-control form-control-sm"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Categoría</label>
              <select
                name="categoriaU"
                value={usuario.categoriaU?.id || ""}
                onChange={handleChange}
                className="form-select form-select-sm"
              >
                <option value="">Seleccione categoría</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="d-flex gap-2 border-top pt-2">
              <button
                onClick={handleVolver}
                className="btn btn-sm btn-secondary"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="btn btn-sm btn-primary flex-grow-1"
              >
                {saving ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
