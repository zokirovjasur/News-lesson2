import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ArticleList from "./components/ArticleList";
import ArticleDetail from "./components/ArticleDetail";
import CreateArticle from "./components/CreateArticle";
import UpdateArticle from "./components/UpdateArticle";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto mt-4 p-4">
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
            <Route
              path="/create"
              element={
                isAuthenticated ? <CreateArticle /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/update/:id"
              element={
                isAuthenticated ? <UpdateArticle /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
