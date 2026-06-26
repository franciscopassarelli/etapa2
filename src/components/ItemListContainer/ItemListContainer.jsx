import React, { useState, useEffect } from "react";
import "./ItemListContainer.css";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    // Si hay categoría, filtramos por query param
    const url = categoryId
      ? `http://localhost:3001/api/products?category=${categoryId}`
      : "http://localhost:3001/api/products";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      })
      .finally(() => {
        setLoading(false);
      });
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