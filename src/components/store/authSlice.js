import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://mustafocoder.pythonanywhere.com";

export const login = createAsyncThunk("auth/login", async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token); // Save token in localStorage
  }
  return response.data;
});

export const signup = createAsyncThunk("auth/signup", async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
    isAuthenticated: false, // Track authentication status
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false; // Reset authentication status
      localStorage.removeItem("token"); // Clear token from localStorage on logout
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload; // Update authentication status
    },
    setUser: (state, action) => {
      state.user = action.payload; // Set the user data
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true; // Set authentication status
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true; // Set authentication status
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logout, setIsAuthenticated, setUser } = authSlice.actions;

export default authSlice.reducer;
