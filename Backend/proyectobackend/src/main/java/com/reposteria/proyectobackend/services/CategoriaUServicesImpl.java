package com.reposteria.proyectobackend.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.reposteria.proyectobackend.entities.CategoriaU;
import com.reposteria.proyectobackend.repositories.CategoriaURepositories;


@Service
public class CategoriaUServicesImpl implements CategoriaUServices{


    @Autowired
    private CategoriaURepositories categoriaURepositories;

    @Override
    public CategoriaU crear(CategoriaU categoriaU){
        return categoriaURepositories.save(categoriaU);
    }

    @Override
    public CategoriaU obtenerId(Long id) {
        return categoriaURepositories.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
    }

    @Override
    public List<CategoriaU> listarTodas() {
        return (List<CategoriaU>) categoriaURepositories.findAll();
    }

    @Override
    public void eliminar(Long id) {
        if (!categoriaURepositories.existsById(id)) {
            throw new RuntimeException("Categoría no encontrada");
        }
        categoriaURepositories.deleteById(id);
    }

    @Override
    public CategoriaU actualizar(Long id, CategoriaU categoriaActualizada) {
        CategoriaU existente = obtenerId(id);
        existente.setNombre(categoriaActualizada.getNombre());
        return categoriaURepositories.save(existente);
    }


}
