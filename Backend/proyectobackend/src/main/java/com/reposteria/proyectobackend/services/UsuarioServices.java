package com.reposteria.proyectobackend.services;

import java.util.List;
import com.reposteria.proyectobackend.entities.Usuario;

public interface UsuarioServices {

    Usuario crear(Usuario usuario);

    Usuario obtenerId(Long id);

    List<Usuario> listarTodas();

    void eliminar(Long id);

    Usuario actualizar(Long id, Usuario usuarioActualizado);

    Usuario desactivar(Long id);

}
