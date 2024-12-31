import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { resourceApi } from "./features/manage-resources/api/dataApi";
import authSliceReducer from "./features/authentication/slice/authSlice";
import { authApi } from "./features/authentication/api/authApi";

export const store = configureStore({
  reducer: {
    [resourceApi.reducerPath]: resourceApi.reducer,
    auth: authSliceReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, resourceApi.middleware),
});

setupListeners(store.dispatch);
