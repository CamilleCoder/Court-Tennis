package com.reposteria.proyectobackend.services;

import java.util.List;
import com.reposteria.proyectobackend.entities.CategoriaU;

public interface CategoriaUServices {


    CategoriaU crear(CategoriaU categoria);
    CategoriaU obtenerId(Long id);
    List<CategoriaU> listarTodas();    
    void eliminar(Long id);
    CategoriaU actualizar(Long id, CategoriaU categoriaActualizada);
    

}
