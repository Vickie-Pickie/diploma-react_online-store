import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = () => {
  const cartItems =localStorage.getItem('cart');
  if (!cartItems) {
    return [];
  }

  return JSON.parse(cartItems);
};

const saveToLocalStorage = (items) => {
  localStorage.setItem('cart', JSON.stringify(items));
};

const cart = createSlice({
  name: 'cart',
  initialState: {
    items: loadFromLocalStorage(),
  },
  reducers: {
    addToCart(state, action) {
      const { product, size, quantity } = action.payload;
      const foundInd = state.items.findIndex(item => item.productId === product.id && item.size === size);
      if (foundInd !== -1) {
        state.items[foundInd].quantity += quantity;
      } else {
        state.items.push({
          productId: product.id,
          price: product.price,
          title: product.title,
          size,
          quantity,
        });
      }

      saveToLocalStorage(state.items);
    },
    deleteItem(state, action) {
      state.items.splice(action.payload, 1);
      saveToLocalStorage(state.items);
    },
    clearCart(state) {
      state.items = [];
      saveToLocalStorage(state.items);
    },
  },
});

export default cart;
