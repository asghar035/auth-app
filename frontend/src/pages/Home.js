import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ FIXED
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();   // ✅ FIXED

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged out");

    setTimeout(() => {
      navigate("/login");  // ✅ works now
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:4000/products";
      const response = await fetch(url, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      const result = await response.json();
      setProducts(result);
    } catch (err) {
      handleError(err.message || "Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome {loggedInUser} 🎉</h1>

      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Logout
      </button>

      <div className="mt-6">
        {products && products.length > 0 ? (
          products.map((item, index) => (
            <ul key={index} className="mb-2">
              <span>{item.name} : ${item.price}</span>
            </ul>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default Home;
