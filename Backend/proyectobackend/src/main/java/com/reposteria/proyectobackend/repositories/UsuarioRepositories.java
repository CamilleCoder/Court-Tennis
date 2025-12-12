package com.reposteria.proyectobackend.repositories;

import org.springframework.data.repository.CrudRepository;
import com.reposteria.proyectobackend.entities.Usuario;

public interface UsuarioRepositories  extends CrudRepository <Usuario, Long>{

}
