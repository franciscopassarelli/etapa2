import { useState } from "react";
import Swal from "sweetalert2";
import "./AddProduct.css";




const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    img: "",
    category: "",
    stock: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          price: Number(form.price),
          description: form.description,
          img: form.img,
          category: form.category,
          stock: Number(form.stock),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al crear el producto");
      }

      Swal.fire({
        icon: "success",
        title: "Producto creado",
        text: "El producto se guardó correctamente.",
      });

      // Limpiar formulario
      setForm({
        name: "",
        price: "",
        description: "",
        img: "",
        category: "",
        stock: "",
      });

      console.log(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <div className="AddProductContainer">
      <h1 className="AddProductTitle">Crear producto</h1>

      <form onSubmit={handleSubmit} className="AddProductForm">
        <input
          className="AddProductInput"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
        />

        <input
          className="AddProductInput"
          name="price"
          type="number"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
        />

        <input
          className="AddProductInput"
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
        />

        <input
          className="AddProductInput"
          name="img"
          placeholder="URL de la imagen"
          value={form.img}
          onChange={handleChange}
        />

        <select
  className="AddProductInput"
  name="category"
  value={form.category}
  onChange={handleChange}
>
  <option value="">Seleccionar categoría</option>
  <option value="raquetas">Raquetas</option>
  <option value="indumentaria">Indumentaria</option>
  <option value="accesorios">Accesorios</option>
  
</select>

        <input
          className="AddProductInput"
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
        />

        <button type="submit" className="AddProductButton">
          Crear producto
        </button>
      </form>
    </div>
  );
};

export default AddProduct;