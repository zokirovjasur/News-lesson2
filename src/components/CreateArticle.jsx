import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createArticle } from "../components/store/articlesSlice";

function CreateArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.articles);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(createArticle({ title, content }));
    if (createArticle.fulfilled.match(resultAction)) {
      navigate("/");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Article</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="content" className="block mb-1">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded h-40"
          ></textarea>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {status === "loading" ? "Creating..." : "Create Article"}
        </button>
      </form>
    </div>
  );
}

export default CreateArticle;
