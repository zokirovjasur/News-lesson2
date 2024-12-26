import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../components/store/articlesSlice";
import NewsCard from "./NewsCard"; // Import your NewsCard component

function ArticleList() {
  const dispatch = useDispatch();
  const { articles, status, error } = useSelector((state) => state.articles);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchArticles());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Latest News</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

export default ArticleList;
