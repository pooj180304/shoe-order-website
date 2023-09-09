import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Display = () => {
  const [shoedata, shoedatachange] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/Details")
      .then((res) => res.json())
      .then((resp) => {
        shoedatachange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const addTocart = (item) => {
    const quantity = 1;
    const newItem = { ...item, quantity };
    fetch("http://localhost:3000/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newItem),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Item added to cart:", data);
      toast.success("Item added to cart!");
    })
    .catch((error) => {
      console.error("Error adding item to cart:", error);
      toast.error("Error adding item to cart. Please try again later.");
    });
};

  return (
    <div className="bod">
      <header>
        <div className="top-buttons">
            <Link to={'/cart'} className="btn btn-primary">Cart</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to={'/'}className="btn btn-primary">Logout</Link>
        </div>
        <h1>Shoeish</h1>
        <p className="slogan">Step into Style and Comfort</p>
        </header>
        <div className="cont">
	      {shoedata.map((item, index) => (
        <div className="shoe-card">
            <img className="img-resize" src={item.image} alt={item.Shoename}/>
            <h2>{item.Shoename}</h2>
            <p>Size: {item.size}</p>
            <p>Color:{item.color}</p>
            <p>${item.price}</p>
            <button type="submit" onClick={() => addTocart(item)}>Add to Cart</button>
          </div>
      ))}
      </div>
      </div>
  );
};

export default Display;
