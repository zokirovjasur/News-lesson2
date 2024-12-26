import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import articlesReducer from "./articlesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articlesReducer,
  },
});

export default store;
