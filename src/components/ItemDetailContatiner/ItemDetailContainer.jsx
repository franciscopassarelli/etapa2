import "./ItemDetailContainer.css";
import { useState, useEffect } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { itemId } = useParams();

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:3001/api/products/${itemId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener el producto");
        }

        return response.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [itemId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="ItemDetailContainer">
      {product ? (
        <ItemDetail {...product} />
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ItemDetailContainer;