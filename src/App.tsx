import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import HomePage from "./Pages/HomePage";
import Cart from "./Components/Cart/Cart";
import Register from "./Components/Register/Register";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import SingleProduct from "./Pages/SingleProduct/SingleProduct";
import CategoryPage from "./Pages/CategoryPage/CategoryPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/products/:id/Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, cum?"
          element={<SingleProduct />}
        />
         <Route
          path="/category/:id"
          element={<CategoryPage />}
        />
        <Route element={<ProtectedRoutes />}></Route>
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
