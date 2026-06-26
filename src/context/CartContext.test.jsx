import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useContext } from "react";
import { CartProvider, CartContext } from "./CartContext";

vi.mock("sweetalert2", () => ({
  default: {
    fire: vi.fn(() => Promise.resolve({ isConfirmed: true })),
  },
}));

// Limpiar localStorage antes de cada test
beforeEach(() => {
  localStorage.clear();
});

function TestComponent() {
  const { cart, addItem, total, totalQuantity, clearCart } =
    useContext(CartContext);

  const product = {
    id: 1,
    name: "Budín",
    price: 100,
  };

  return (
    <>
      <button onClick={() => addItem(product, 2)}>
        Agregar
      </button>

      <button onClick={clearCart}>
        Vaciar
      </button>

      <div data-testid="cart">
        {cart.length}
      </div>

      <div data-testid="total">
        {total}
      </div>

      <div data-testid="quantity">
        {totalQuantity}
      </div>
    </>
  );
}

describe("CartContext", () => {
  test("agrega un producto al carrito", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText("Agregar"));

    expect(screen.getByTestId("cart")).toHaveTextContent("1");
  });

  test("calcula correctamente el total", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText("Agregar"));

    expect(screen.getByTestId("total")).toHaveTextContent("200");
  });

  test("calcula correctamente la cantidad total", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText("Agregar"));

    expect(screen.getByTestId("quantity")).toHaveTextContent("2");
  });

  test("vacía el carrito", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText("Agregar"));
    fireEvent.click(screen.getByText("Vaciar"));

    expect(screen.getByTestId("cart")).toHaveTextContent("0");
  });
});