import React, { useState, useEffect } from "react";
import "./ItemListContainer.css";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { categoryId } = useParams();

  const baseURL = import.meta.env.VITE_API_URL;

useEffect(() => {
  setLoading(true);

  const url = categoryId
    ? `${baseURL}/api/products?category=${categoryId}`
    : `${baseURL}/api/products`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => setProducts(data))
    .catch((err) => console.error("Error al obtener productos:", err))
    .finally(() => setLoading(false));
}, [categoryId]);
  return (
    <div className="ItemListContainer">
      <h1 className="TitleProducts">{greeting}</h1>

      {loading ? (
        <p className="LoadingMessage PulseAnimation">
          Cargando productos...
        </p>
      ) : (
        <ItemList products={products} />
      )}
    </div>
  );
};

export default ItemListContainer;