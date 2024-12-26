import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../components/store/authSlice";

function Header() {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-blue-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold hover:text-blue-200 transition duration-300"
        >
          News Website
        </Link>

        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/"
                className="hover:text-blue-200 transition duration-300"
              >
                Home
              </Link>
            </li>

            {isAuthenticated ? (
              <>
                <li>
                  <Link
                    to="/create"
                    className="hover:text-blue-200 transition duration-300"
                  >
                    Create Article
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:text-blue-200 transition duration-300"
                    aria-label="Logout"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="hover:text-blue-200 transition duration-300"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="hover:text-blue-200 transition duration-300"
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
