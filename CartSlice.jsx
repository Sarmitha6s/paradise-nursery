import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addItem: (state, action) => {
      const plant = action.payload;
      const existing = state.items.find((item) => item.id === plant.id);
      if (!existing) {
        state.items.push({ ...plant, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((plant) => plant.id === id);
      if (!item) return;
      if (quantity <= 0) {
        state.items = state.items.filter((plant) => plant.id !== id);
      } else {
        item.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export const store = configureStore({
  reducer: { cart: cartSlice.reducer },
});
export default cartSlice.reducer;
