import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice.js";

export default function CartItem() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="page-container cart-page">
      <div className="cart-heading">
        <div>
          <p className="eyebrow">YOUR SELECTION</p>
          <h1>Shopping Cart</h1>
          <p>{totalItems} {totalItems === 1 ? "item" : "items"} in your cart</p>
        </div>
        <Link className="secondary-button" to="/plants">← Continue Shopping</Link>
      </div>

      {items.length === 0 ? (
        <section className="empty-cart">
          <div className="empty-cart-icon">♧</div>
          <h2>Your cart is waiting to grow</h2>
          <p>You haven't added any plants yet. Find something green for your space.</p>
          <Link className="primary-button dark-button" to="/plants">Explore Plants →</Link>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items">
            {items.map((item) => (
              <article className="cart-row" key={item.id}>
                <img src={item.image} alt={item.name}
                  onError={(event) => { event.currentTarget.src = "/plant-placeholder.svg"; }} />
                <div className="cart-product-info">
                  <h3>{item.name}</h3>
                  <p>₹{item.price} each</p>
                  <button className="remove-button" onClick={() => dispatch(removeItem(item.id))}>
                    Remove
                  </button>
                </div>
                <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                  <button aria-label="Decrease quantity"
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>−</button>
                  <span>{item.quantity}</span>
                  <button aria-label="Increase quantity"
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
                </div>
                <strong className="line-total">₹{item.price * item.quantity}</strong>
              </article>
            ))}
          </section>

          <aside className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-line"><span>Total plants</span><span>{totalItems}</span></div>
            <div className="summary-line"><span>Delivery</span><span>Free</span></div>
            <div className="summary-total"><span>Total cost</span><strong>₹{totalCost}</strong></div>
            <button className="add-button checkout-button" onClick={() => window.alert("Checkout Coming Soon!")}>
              Proceed to Checkout
            </button>
            <Link className="summary-continue" to="/plants">Continue shopping</Link>
          </aside>
        </div>
      )}
    </main>
  );
}
