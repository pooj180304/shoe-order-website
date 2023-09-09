import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, changecart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/cart")
      .then((res) => res.json())
      .then((resp) => {
        changecart(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const updateQuantity = (item, newQuantity) => {
    if (newQuantity >= 0) {
      const updatedCart = cart.map((cartItem) => {
        if (cartItem.id === item.id) {
          cartItem.quantity = newQuantity;
        }
        return cartItem;
      });

      // Update the JSON file with the updated cart data
      fetch("http://localhost:3000/updateCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart: updatedCart }),
      })
        .then((res) => res.json())
        .then((resp) => {
          changecart(updatedCart);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const removeItem = (id) => {
    fetch(`http://localhost:3000/cart/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          changecart(cart.filter((item) => item.id !== id));
          toast.success("Item removed successfully");
        } else {
          toast.error("Item not removed");
        }
      })
      .catch((err) => {
        console.error("Error deleting item:", err);
      });
  };

  return (
    <div className="bod">
      <header>
        <h1>Your Cart</h1>
        <br/>
        <Link to={'/'}className="logou-button">Logout</Link>
      </header>
      <div className="con">
        {cart.map((item, index) => (
          <div key={index} className="cart-item">
            <div className="cart-content">
            <h2>{item.Shoename}</h2>
            <p>Size: {item.size}</p>
            <p>Price: ${item.Price}</p>
            <div className="quantity">
              <button onClick={() => updateQuantity(item, item.quantity - 1)}className="btn btn-primary">-</button>
              &nbsp;&nbsp;
              <span className="quan">{item.quantity}</span>
              &nbsp;&nbsp;
              <button onClick={() => updateQuantity(item, item.quantity + 1)}className="btn btn-primary">+</button>
            </div>
            <br/>
              <button onClick={() => removeItem(item.id)} className="btn btn-danger">Remove</button>
          </div>
          <img src={item.image} alt={item.Shoename} className="img-size" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
