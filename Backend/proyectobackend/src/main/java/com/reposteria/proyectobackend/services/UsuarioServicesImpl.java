package com.reposteria.proyectobackend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.reposteria.proyectobackend.entities.Usuario;
import com.reposteria.proyectobackend.repositories.UsuarioRepositories;

@Service
public class UsuarioServicesImpl implements UsuarioServices{


    @Autowired
    private UsuarioRepositories usuarioRepositories;

    @Override
    public Usuario crear(Usuario usuario){
        return usuarioRepositories.save(usuario);
    }

    @Override
    public Usuario obtenerId(Long id) {
        return usuarioRepositories.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    @Override
    public List<Usuario> listarTodas() {
        return (List<Usuario>) usuarioRepositories.findAll();
    }

    @Override
    public void eliminar(Long id) {
        if (!usuarioRepositories.existsById(id)) {
            throw new RuntimeException("Producto no encontrado");
        }
       usuarioRepositories.deleteById(id);
    }

    @Override
    public Usuario actualizar(Long id, Usuario usuarioActualizado) {
        Usuario existente = obtenerId(id);
        existente.setApellido(usuarioActualizado.getApellido());
        existente.setEmail(usuarioActualizado.getEmail());
        existente.setCategoriaU(usuarioActualizado.getCategoriaU());
        return usuarioRepositories.save(existente);
    }

    @Override
    public Usuario desactivar(Long id){
        Usuario usuario = obtenerId(id);
        usuario.setActivo(false);
        return usuarioRepositories.save(usuario);
    }

  



}
