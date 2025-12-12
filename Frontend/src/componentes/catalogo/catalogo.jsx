import { useNavigate } from "react-router-dom";
import "./catalogo.css";


export function Catalogo() {

  const navigate = useNavigate();
  return (
    <section id="productos">
      <div className="container">
        <h2>Nuestros productos</h2>
        <div>
          <div className="cart">
            <h3>Raquetas</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit
              maiores hic accusantium ducimus doloribus nihil, totam ea. Sint
              omnis rem aperiam temporibus ipsa veritatis aliquam quia, officiis
              dolorem minus? Corrupti.
            </p>
            <button onClick={() => navigate("/Pasteles")}>+ info</button>
          </div>
          <div className="cart">
            <h3>Pelotas</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit
              maiores hic accusantium ducimus doloribus nihil, totam ea. Sint
              omnis rem aperiam temporibus ipsa veritatis aliquam quia, officiis
              dolorem minus? Corrupti.
            </p>    
            <button onClick={() => navigate("/Tortas")}>+ info</button>
          </div>
          <div className="cart">
            <h3>Ropa deportiva</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit
              maiores hic accusantium ducimus doloribus nihil, totam ea. Sint
              omnis rem aperiam temporibus ipsa veritatis aliquam quia, officiis
              dolorem minus? Corrupti.
            </p>
            <button onClick={() => navigate("/Masas")}>+ info</button>
          </div>
        </div>
      </div>
    </section>
  );
}
