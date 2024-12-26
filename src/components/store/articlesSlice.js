import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://mustafocoder.pythonanywhere.com/api/articles/";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

export const fetchArticle = createAsyncThunk(
  "articles/fetchArticle",
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
);

export const createArticle = createAsyncThunk(
  "articles/createArticle",
  async (articleData, { getState }) => {
    const token = getState().auth.token;
    if (!token) {
      throw new Error("Token is required");
    }
    const response = await axios.post(`${API_URL}/create`, articleData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const updateArticle = createAsyncThunk(
  "articles/updateArticle",
  async ({ id, articleData }, { getState }) => {
    const token = getState().auth.token;
    const response = await axios.put(`${API_URL}/${id}/update`, articleData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const deleteArticle = createAsyncThunk(
  "articles/deleteArticle",
  async (id, { getState }) => {
    const token = getState().auth.token;
    await axios.delete(`${API_URL}/${id}/delete`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  }
);

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    currentArticle: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.currentArticle = action.payload;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.articles.push(action.payload);
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        const index = state.articles.findIndex(
          (article) => article.id === action.payload.id
        );
        if (index !== -1) {
          state.articles[index] = action.payload;
        }
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.articles = state.articles.filter(
          (article) => article.id !== action.payload
        );
      });
  },
});

export default articlesSlice.reducer;
