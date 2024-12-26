import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchArticle, updateArticle } from "../components/store/articlesSlice";

function UpdateArticle() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentArticle, status, error } = useSelector(
    (state) => state.articles
  );

  useEffect(() => {
    dispatch(fetchArticle(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentArticle) {
      setTitle(currentArticle.title);
      setContent(currentArticle.content);
    }
  }, [currentArticle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(
      updateArticle({ id, articleData: { title, content } })
    );
    if (updateArticle.fulfilled.match(resultAction)) {
      navigate(`/article/${id}`);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Update Article</h2>
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
          {status === "loading" ? "Updating..." : "Update Article"}
        </button>
      </form>
    </div>
  );
}

export default UpdateArticle;
