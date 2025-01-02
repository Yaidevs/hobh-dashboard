import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { resourceApi } from "./features/manage-resources/api/dataApi";
import authSliceReducer from "./features/authentication/slice/authSlice";
import { authApi } from "./features/authentication/api/authApi";
import { summaryApi } from "./features/dashboard-summary/api/summaryApi";
import { transactionsApi } from "./features/manage-transactions/api/dataApi";
import { notificationApi } from "./features/manage-notifications/api/dataApi";
import { categoryApi } from "./features/manage-category/api/dataApi";
import { instructorApi } from "./features/manage-instructors/api/dataApi";

export const store = configureStore({
  reducer: {
    [resourceApi.reducerPath]: resourceApi.reducer,
    [summaryApi.reducerPath]: summaryApi.reducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [instructorApi.reducerPath]: instructorApi.reducer,
    auth: authSliceReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      resourceApi.middleware,
      summaryApi.middleware,
      transactionsApi.middleware,
      notificationApi.middleware,
      categoryApi.middleware,
      instructorApi.middleware
    ),
});

setupListeners(store.dispatch);
