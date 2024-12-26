import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./store/authSlice"; 
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth); 
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const formSubmit = async (e) => {
    e.preventDefault();
    const body = {};
    const formData = new FormData(e.target);
    formData.forEach((val, key) => {
      body[key] = val;
    });
    setLoading(true);
    try {
      await dispatch(login(body)).unwrap(); 
      setError(false);
      navigate("/");
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] justify-center flex items-center">
      <form
        onSubmit={formSubmit}
        className="w-[400px] shadow px-5 py-10 rounded"
      >
        <h3 className="font-bold text-3xl text-center mb-5">Login</h3>
        <TextField
          className="w-full mb-5"
          name="username"
          label="Username"
          variant="outlined"
        />
        <TextField
          sx={{ margin: "10px 0 10px 0" }}
          className="w-full mb-5"
          name="password"
          type="password"
          label="Password"
          variant="outlined"
        />

        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              name="remember"
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-100 rounded bg-gray-90 focus:ring-3 focus:ring-black dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-black dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-gray-800 dark:text-gray-700"
          >
            Remember me
          </label>
        </div>
        {error && (
          <div className="text-center text-red-500 py-2">
            Invalid username or password
          </div>
        )}
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? "Logging..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
