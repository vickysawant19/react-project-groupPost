import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { postApi } from "./postSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});

export default store;

setupListeners(store.dispatch);
