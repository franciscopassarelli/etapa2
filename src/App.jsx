import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from "./components/AddProduct/AddProduct";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContatiner/ItemDetailContainer";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";

import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CartProvider>
          <NavBar />

          <Routes>
            <Route
              path="/"
              element={
                <ItemListContainer
                  greeting="Todos nuestros productos"
                />
              }
            />

            <Route
              path="/category/:categoryId"
              element={
                <ItemListContainer
                  greeting="Navega por categorías"
                />
              }
            />

            <Route
              path="/item/:itemId"
              element={<ItemDetailContainer />}
            />

            <Route
              path="/cart"
              element={<Cart />}
            />

            <Route
              path="/checkout"
              element={<Checkout />}
            />

            <Route
              path="*"
              element={<h1 className="NotFound">404 NOT FOUND</h1>}
            />

            <Route path="/admin/create-product" element={<AddProduct />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;