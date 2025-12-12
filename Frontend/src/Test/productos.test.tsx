// producto.test.tsx
import { render, screen } from "@testing-library/react";
import { Productos } from "../componentes/productos/productos";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

describe("Productos", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("muestra los productos cargados desde el backend", async () => {
    // Mock de fetch con productos de ejemplo
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        { id: 1, nombre: "Raqueta", descripcion: "Descripción 1", precio: 100, activo: true },
        { id: 2, nombre: "Pelota", descripcion: "Descripción 2", precio: 50, activo: true },
      ],
    });

    // 🔹 Importante: envolver en MemoryRouter
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    // Esperamos que los productos se muestren en pantalla
    expect(await screen.findByText("Raqueta")).toBeInTheDocument();
    expect(await screen.findByText("Pelota")).toBeInTheDocument();
  });
});
