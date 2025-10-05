import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WomenCategory from "./pages/womenCategory";
import MenCategory from "./pages/menCategory";
import Product from "./pages/product";
import Checkout from "./pages/checkout";
import HacFoods from "./pages/hacFoods";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/women-collections" element={<WomenCategory />} />
          <Route path="/men-collections" element={<MenCategory />} />
          <Route path="/product" element={<Product />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/hacfoods" element={<HacFoods />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
