import "./Checkout.css";
import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import Swal from "sweetalert2";

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");

  const { cart, total, clearCart } = useContext(CartContext);

  const createOrder = async ({ name, phone, email, message }) => {
    setLoading(true);

    try {
      const objOrder = {
        buyer: {
          name,
          phone,
          email,
          message,
        },
        items: cart,
        total,
      };

      const response = await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objOrder),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al crear la orden");
      }

      setOrderId(data._id);

      clearCart();

      Swal.fire({
        icon: "success",
        title: "¡Gracias por su compra!",
        text: "Su orden ha sido procesada con éxito.",
        showClass: {
          popup: "swal2-popup custom-animation",
        },
        hideClass: {
          popup: "swal2-popup swal2-hide custom-animation",
        },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h1 className="LoadingStyle">Se está generando su orden...</h1>;
  }

  if (orderId) {
    return (
      <h1 className="OrderStyle">
        El ID de su orden es: {orderId}
      </h1>
    );
  }

  return (
    <div>
      <h1 className="CheckoutStyle">Checkout</h1>

      <CheckoutForm onConfirm={createOrder} />
    </div>
  );
};

export default Checkout;