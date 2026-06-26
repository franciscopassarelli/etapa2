import React, { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert2
import './CartContext.css'

export const CartContext = createContext({
  cart: [],
  addItem: (item, quantity) => {},
  removeItem: (itemId) => {},
  clearCart: () => {},
  total: 0,
  totalQuantity: 0,
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try{ 
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch (error) {
      console.error("Error al parsear el carrito", error);
      localStorage.removeItem("cart");
      return [];
    }
});
  const [total, setTotal] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
  const newTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  setTotal(newTotal);

  const newTotalQuantity = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  setTotalQuantity(newTotalQuantity);
}, [cart]);

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);
const addItem = (item, quantity) => {
  if (quantity <= 0) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "La cantidad debe ser mayor a cero.",
    });
    return;
  }



  const existingProduct = cart.find((prod) => prod.id === item.id);

  if (existingProduct) {
    setCart(
      cart.map((prod) =>
        prod.id === item.id
          ? {
              ...prod,
              quantity: prod.quantity + quantity,
            }
          : prod
      )
    );

    Swal.fire({
      icon: "success",
      title: "Carrito actualizado",
      text: "Se actualizó la cantidad del producto.",
    });
  } else {
    setCart((prev) => [...prev, { ...item, quantity }]);

    Swal.fire({
      icon: "success",
      title: "Producto agregado",
      text: `Se agregaron ${quantity} unidades de ${item.name}.`,
    });
  }
};

 

  const removeItem = (itemId) => {
    Swal.fire({
      icon: 'question',
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar este producto del carrito?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      showClass: {
        popup: 'swal2-popup custom-animation',
      },
      hideClass: {
        popup: 'swal2-popup swal2-hide custom-animation',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const cartUpdated = cart.filter((prod) => prod.id !== itemId);
        setCart(cartUpdated);
        Swal.fire({
          icon: 'success',
          title: 'Producto eliminado',
          text: 'Se ha eliminado el producto del carrito.',
          showClass: {
            popup: 'swal2-popup custom-animation',
          },
          hideClass: {
            popup: 'swal2-popup swal2-hide custom-animation',
          },
        });
      }
    });
  }

  const clearCart = () => {
  setCart([]);
};

const confirmClearCart = () => {
  Swal.fire({
    icon: 'question',
    title: '¿Estás seguro?',
    text: '¿Deseas vaciar todo el carrito?',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No',
    showClass: {
      popup: 'swal2-popup custom-animation',
    },
    hideClass: {
      popup: 'swal2-popup swal2-hide custom-animation',
    },
  }).then((result) => {
    if (result.isConfirmed) {
      setCart([]);
    }
  });
};

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, total, totalQuantity, confirmClearCart }}>
      {children}
    </CartContext.Provider>
  );
}
