import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './clientes.css';

export function Clientes() {

    const [clientes, setClientes] = useState([]);

    const cargarClientes = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/usuarios');
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            const data = await response.json();
            console.log("Respuesta del backend:", data);

            const clientesNormalizados = data.map(p => ({
                ...p,
                activo: p.activo === true || p.activo === 'true',
            }));

            setClientes(clientesNormalizados);
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
        }
    };

    useEffect(() => {
        cargarClientes();
    }, []);

    /* ============================
       🔴 Desactivar Usuario
    ============================ */
    const handleDesactivar = (id, nombre) => {
        if (window.confirm(`¿Estás seguro de desactivar al usuario "${nombre}"?`)) {
            fetch(`http://localhost:8080/api/usuarios/${id}/desactivar`, {
                method: 'PATCH'
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al desactivar el usuario');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Usuario desactivado:', data);
                    alert('Usuario desactivado exitosamente');
                    cargarClientes();
                })
                .catch(error => {
                    console.error('Error al desactivar:', error);
                    alert('Error al desactivar al usuario');
                });
        }
    };

    /* ============================
       🗑️ Eliminar Usuario
    ============================ */
    const handleEliminar = (id, nombre) => {
        if (window.confirm(`⚠️ ¿Seguro que deseas ELIMINAR al usuario "${nombre}"? Esta acción es permanente.`)) {
            fetch(`http://localhost:8080/api/usuarios/${id}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al eliminar el usuario');
                    }
                    alert('Usuario eliminado exitosamente');
                    cargarClientes();
                })
                .catch(error => {
                    console.error('Error al eliminar:', error);
                    alert('No se pudo eliminar el usuario');
                });
        }
    };

    return (
        <>
            <div className="container mi-tabla">
                <h3 style={{ marginBottom: '20px' }}>Lista de Usuarios</h3>

                <div className="row mb-3">
                    <div className="col-12 text-end">
                        <Link className="btn btn-outline-dark"
                            style={{ fontSize: '13px' }}
                            to="/crear-cliente">
                            Crear Usuario
                        </Link>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Id Usuario</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Email</th>
                                    <th>Editar Usuario</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {clientes.map((clie) => (
                                    <tr key={clie.id}
                                        style={{
                                            opacity: clie.activo ? 1 : 0.5,
                                            backgroundColor: clie.activo ? 'white' : '#f8f8f8'
                                        }}>

                                        <td>{clie.id}</td>
                                        <td>{clie.nombre}</td>
                                        <td>{clie.apellido}</td>
                                        <td>{clie.email}</td>

                                        {/* Editar */}
                                        <td>
                                            {clie.activo ? (
                                                <Link className="btn btn-outline-primary"
                                                    style={{ fontSize: '13px' }}
                                                    to={`/editar-cliente/${clie.id}`}>
                                                    Editar Usuario
                                                </Link>
                                            ) : (
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    style={{
                                                        cursor: 'not-allowed',
                                                        pointerEvents: 'none'
                                                    }}
                                                    disabled>
                                                    Editar Usuario
                                                </button>
                                            )}
                                        </td>

                                        {/* Acciones */}
                                        <td>
                                            {/* Desactivar */}
                                            {clie.activo ? (
                                                <button
                                                    className="btn btn-sm btn-outline-danger me-2"
                                                    onClick={() => handleDesactivar(clie.id, clie.nombre)}>
                                                    Desactivar
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn btn-sm btn-secondary me-2"
                                                    disabled>
                                                    Desactivado
                                                </button>
                                            )}

                                            {/* Eliminar */}
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleEliminar(clie.id, clie.nombre)}>
                                                Eliminar
                                            </button>

                                        </td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
