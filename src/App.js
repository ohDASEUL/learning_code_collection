import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import LoginPage from "./Pages/LoginPage";
import PrivateRoute from "./Routes/PrivateRoute";
import ProductAllPage from "./Pages/ProductAllPage";
import "./App.css"
const App = () => {
  const [authenticate, setAuthenticate] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0); // 장바구니 카운트 상태

  const incrementCartCount = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div>
      <Navbar
        authenticate={authenticate}
        setAuthenticate={setAuthenticate}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartCount}
      />
      <Routes>
        <Route path="/" element={<ProductAllPage searchQuery={searchQuery} />} />
        <Route path="/login" element={<LoginPage setAuthenticate={setAuthenticate} />} />
        <Route
          path="/product/:id"
          element={<PrivateRoute authenticate={authenticate} setAuthenticate={setAuthenticate} incrementCartCount={incrementCartCount} />}
        />
      </Routes>
    </div>
  );
};

export default App;
