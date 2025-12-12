import "./hero.css";
import imagenFondo from "../../componentes/imgagenes/1.jpg";

export function Hero() {
    const irAlBlog = () => {
        window.open("https://www.youtube.com/@RincondelTenisYT/videos", "_blank");
    };

    return (
        <section
            id="hero"
            style={{ backgroundImage: `url(${imagenFondo})` }}
        >
            <h1>
                Implementos de<br />
                <i>Tenis</i> a tu alcance
            </h1>
            <br></br>
            <button onClick={irAlBlog}>Ir al blog</button>
        </section>
    );
}
