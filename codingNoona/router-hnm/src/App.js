import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProductAll from "./pages/ProductAll";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from "./route/PrivateRoute";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductAll />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<PrivateRoute />} />
      </Routes>
    </div>
  );
}

export default App;
