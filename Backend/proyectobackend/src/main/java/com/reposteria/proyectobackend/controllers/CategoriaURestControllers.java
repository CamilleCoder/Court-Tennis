package com.reposteria.proyectobackend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.reposteria.proyectobackend.entities.CategoriaU;
import com.reposteria.proyectobackend.services.CategoriaUServices;



@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/categoriasU")
public class CategoriaURestControllers {

    @Autowired
    private CategoriaUServices categoriaUServices;

    @PostMapping
    public ResponseEntity<CategoriaU> crearCategoria(@RequestBody CategoriaU categoriaU) {
        CategoriaU nuevaCategoriaU = categoriaUServices.crear(categoriaU);
        return ResponseEntity.ok(nuevaCategoriaU);
    }


    @GetMapping("/{id}")
    public ResponseEntity<CategoriaU> obtenerCategoriaPorId(@PathVariable Long id) {
        CategoriaU categoriaU = categoriaUServices.obtenerId(id);
        return ResponseEntity.ok(categoriaU);
    }


    @GetMapping
    public ResponseEntity<List<CategoriaU>> listarCategorias() {
        List<CategoriaU> categoriasU = categoriaUServices.listarTodas();
        return ResponseEntity.ok(categoriasU);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCategoria(@PathVariable Long id) {
        categoriaUServices.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoriaU> actualizarCategoria(@PathVariable Long id, @RequestBody CategoriaU categoriaActualizada) {
        CategoriaU categoriaU = categoriaUServices.actualizar(id, categoriaActualizada);
        return ResponseEntity.ok(categoriaU);
    }

}
