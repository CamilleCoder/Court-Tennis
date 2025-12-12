package com.reposteria.proyectobackend.repositories;

import org.springframework.data.repository.CrudRepository;
import com.reposteria.proyectobackend.entities.Producto;

public interface ProductoRepositories extends CrudRepository <Producto, Long>{

    

}
