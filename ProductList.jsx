import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice.js";

const categories = [
  {
    name: "Air-Purifying Plants",
    description: "Freshen up your favourite corners.",
    plants: [
      { id: 1, name: "Snake Plant", price: 350, image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=600&q=80" },
      { id: 2, name: "Peace Lily", price: 450, image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=600&q=80" },
      { id: 3, name: "Spider Plant", price: 250, image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=600&q=80" },
      { id: 4, name: "Areca Palm", price: 550, image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=600&q=80" },
      { id: 5, name: "Rubber Plant", price: 500, image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600&q=80" },
      { id: 6, name: "Boston Fern", price: 300, image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=600&q=80" }
    ]
  },
  {
    name: "Succulents & Cacti",
    description: "Small plants with lots of personality.",
    plants: [
      { id: 7, name: "Aloe Vera", price: 200, image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600&q=80" },
      { id: 8, name: "Echeveria", price: 180, image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=80" },
      { id: 9, name: "Jade Plant", price: 220, image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&q=80" },
      { id: 10, name: "Haworthia", price: 190, image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=80" },
      { id: 11, name: "String of Pearls", price: 280, image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=600&q=80" },
      { id: 12, name: "Zebra Cactus", price: 170, image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600&q=80" }
    ]
  },
  {
    name: "Decorative Foliage",
    description: "Statement leaves for a beautiful home.",
    plants: [
      { id: 13, name: "Monstera", price: 650, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&q=80" },
      { id: 14, name: "Golden Pothos", price: 280, image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=600&q=80" },
      { id: 15, name: "Calathea", price: 480, image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600&q=80" },
      { id: 16, name: "Philodendron", price: 400, image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&q=80" },
      { id: 17, name: "Dracaena", price: 520, image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=600&q=80" },
      { id: 18, name: "Chinese Evergreen", price: 380, image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=600&q=80" }
    ]
  }
];

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const count = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <main className="page-container">
      <section className="shop-heading">
        <p className="eyebrow">THE PLANT SHOP</p>
        <h1>Find your new favourite plant</h1>
        <p>Thoughtfully picked greenery for every room and every plant parent.</p>
        <Link className="text-link" to="/cart">View cart ({count}) →</Link>
      </section>

      {categories.map((category) => (
        <section className="plant-category" key={category.name}>
          <div className="category-heading">
            <div>
              <h2>{category.name}</h2>
              <p>{category.description}</p>
            </div>
          </div>
          <div className="plant-grid">
            {category.plants.map((plant) => {
              const added = cartItems.some((item) => item.id === plant.id);
              return (
                <article className="plant-card" key={plant.id}>
                  <img src={plant.image} alt={plant.name} loading="lazy"
                    onError={(event) => {
                      event.currentTarget.src = "/plant-placeholder.svg";
                    }} />
                  <div className="plant-card-content">
                    <h3>{plant.name}</h3>
                    <p className="plant-price">₹{plant.price}</p>
                    <button className="add-button" disabled={added}
                      onClick={() => dispatch(addItem(plant))}>
                      {added ? "✓ Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}
