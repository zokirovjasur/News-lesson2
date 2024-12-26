import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../components/store/authSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const formSubmit = async (e) => {
    e.preventDefault();
    const body = {};
    const formData = new FormData(e.target);
    formData.forEach((val, key) => {
      body[key] = val;
    });
    setLoading(true);
    try {
      const resultAction = await dispatch(signup(body));
      if (signup.fulfilled.match(resultAction)) {
        setError(false);
        navigate("/");
      } else {
        setError(true);
      }
    } catch (err) {
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
        <h3 className="font-bold text-3xl text-center mb-5">Register</h3>
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Your username
          </label>
          <input
            name="username"
            type="text"
            id="username"
            className="bg-black border border-black text-black text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-100 dark:border-black dark:placeholder-black dark:text-black dark:focus:ring-black dark:focus:border-black"
            placeholder="Username"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Your email
          </label>
          <input
            name="email"
            type="email"
            id="email"
            className="bg-black border border-black text-black text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-100 dark:border-black dark:placeholder-black dark:text-black dark:focus:ring-black dark:focus:border-black"
            placeholder="example@email.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Your password
          </label>
          <input
            name="password"
            type="password"
            id="password"
            className="bg-black border border-black text-black text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-100 dark:border-black dark:placeholder-black dark:text-black dark:focus:ring-black dark:focus:border-black"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-black border border-black text-black text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-100 dark:border-black dark:placeholder-black dark:text-black dark:focus:ring-black dark:focus:border-black hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
        >
          {loading ? "Signing up..." : "Submit"}
        </button>

        {error && (
          <p className="text-red-500 mt-3">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
};

export default Signup;
