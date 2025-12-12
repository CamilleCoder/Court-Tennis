import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Catalogo } from "../componentes/catalogo/catalogo";
import { vi } from "vitest";

// Mock de navigate()
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Catalogo", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("muestra los títulos de los productos", () => {
    render(<Catalogo />);

    expect(screen.getByText("Raquetas")).toBeInTheDocument();
    expect(screen.getByText("Pelotas")).toBeInTheDocument();
    expect(screen.getByText("Ropa deportiva")).toBeInTheDocument();
  });

  test("navega correctamente al hacer click en los botones", async () => {
    render(<Catalogo />);

    const user = userEvent.setup();

    // 1) Botón Raquetas → /Pasteles
    await user.click(screen.getAllByRole("button", { name: /\+ info/i })[0]);
    expect(mockNavigate).toHaveBeenCalledWith("/Pasteles");

    // 2) Botón Pelotas → /Tortas
    await user.click(screen.getAllByRole("button", { name: /\+ info/i })[1]);
    expect(mockNavigate).toHaveBeenCalledWith("/Tortas");

    // 3) Botón Ropa deportiva → /Masas
    await user.click(screen.getAllByRole("button", { name: /\+ info/i })[2]);
    expect(mockNavigate).toHaveBeenCalledWith("/Masas");
  });
});
