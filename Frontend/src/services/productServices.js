
export const getProductos = async() => {

    const res = await fetch('/data/productos.json');
    const data = await res.json();
    return data.productos;
    
}