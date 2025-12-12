import { Navbar } from "../../componentes/Navbar/Navbar";
import { Productos } from "../../componentes/Productos/Productos";
import {Clientes} from "../../componentes/clientes/clientes";
import { HeroAdmin } from "../../componentes/heroadmin/heroadmin";
import { Footer } from "../../componentes/footer/footer";
export function Administrador() {

  return (
    <>
      <Navbar />
      <HeroAdmin />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Productos />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Clientes />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Footer />
    </>
  );
}
