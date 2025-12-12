import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '../componentes/Navbar/Navbar';
import '@testing-library/jest-dom';

describe('Navbar', () => {
  it('Muestra marca y links con href correctos', () => {
    
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Marca principal
    const brand = screen.getByRole('link', { name: /Court/i });
    expect(brand).toBeInTheDocument();
    expect(brand).toHaveAttribute('href', '/');

    // Links
    expect(screen.getByRole('link', { name: /Home/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /Administrador/i })).toHaveAttribute('href', '/inventario');
    expect(screen.getByRole('link', { name: /Cliente/i })).toHaveAttribute('href', '/contacto');

    // Botón toggler (menú hamburguesa)
    const toggler = screen.getByRole('button');
    expect(toggler).toHaveAttribute('data-bs-toggle', 'collapse');
    expect(toggler).toHaveAttribute('data-bs-target', '#menuNav');
  });

  it('Navega a /Administrador al hacer click en el link', async () =>{
  const user = userEvent.setup()
  render(
    <MemoryRouter initialEntries={['/']}>
      <Navbar />
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/inventario" element={<h1>Administrador</h1>} />
          <Route path="/contacto" element={<h1>Cliente</h1>} />
        </Routes>
    </MemoryRouter>
  )
  await user.click(screen.getByRole('link', {name: /administrador/i}))

  expect(await screen.getByRole('heading', {name: /administrador/i}))
  .toBeInTheDocument();

  })

});
