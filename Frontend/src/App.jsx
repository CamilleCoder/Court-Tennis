import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { Contacto } from './pages/Contacto/Contacto';
import { Inventario } from './pages/inventario/inventario';
import { CrearProducto } from './componentes/crearProducto/CrearProducto';
import { EditarProd } from './componentes/editarProd/EditarProd';
import { EditarUsuario } from './componentes/editarUsuario/editarUsuario';
import './App.css'  
import { Productos } from './componentes/Productos/Productos';
import { Pasteles } from './pages/pasteles/pasteles';
import { CatalogoPasteles } from './componentes/catalogoPasteles/catalogoPasteles';
import { Tortas } from './pages/tortas/tortas';
import { CatalogoTortas } from './componentes/catalogoTortas/catalogoTortas';
import { Navbar } from './componentes/Navbar/Navbar';
import { Form } from 'react-router-dom';
import { Carrito } from "./pages/carrito/carrito";
import { Administrador } from './pages/administrador/administrador';
import { CatalogoMasas } from './componentes/catalogoMasas/catalogoMasas';
import { Masas } from './pages/masas/masas';
import { CrearUsuario } from './componentes/crearUsuario/crearUsuario';


function App() {
  

  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/pasteles" element={<Pasteles />} />
          <Route path="/masas" element={<Masas />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/tortas" element={<Tortas />} />
          <Route path="/formulario" element={<Form />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/administrador" element={<Administrador />} />
          <Route path="/catalogoPasteles" element={<CatalogoPasteles />} />
          <Route path="/catalogoTortas" element={<CatalogoTortas />} />
          <Route path="/catalogoMasas" element={<CatalogoMasas />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/crear-producto" element={<CrearProducto />} /> 
          <Route path="/crear-cliente" element={<CrearUsuario />} /> 
          <Route path="/editar-producto/:id" element={<EditarProd />} />
          <Route path="/editar-cliente/:id" element={<EditarUsuario />} />
       </Routes>
    </Router>

    
  )

  
  
}


export default App
