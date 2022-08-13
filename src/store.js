import { configureStore } from '@reduxjs/toolkit';
// Or from '@reduxjs/toolkit/query/react';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productsApi } from './api/products';
import cart from './slices/cart';
import {orderApi} from "./api/order";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [productsApi.reducerPath]: productsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    cart: cart.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([productsApi.middleware, orderApi.middleware]),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
