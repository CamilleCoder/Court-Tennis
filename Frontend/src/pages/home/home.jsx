import { Navbar } from "../../componentes/Navbar/Navbar";
import { Hero } from "../../componentes/hero/Hero";
import { Catalogo } from "../../componentes/catalogo/catalogo";
import { Somos } from "../../componentes/quienesSomos/quienesSomos"
import { Footer } from "../../componentes/footer/footer";
import "./Home.css";


export function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <Somos />
            <Catalogo />
            <Footer />

        </>
    );
}

