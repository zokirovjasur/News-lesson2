import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchArticle, deleteArticle } from "../components/store/articlesSlice"; // Assuming you have a delete action
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ArrowBackIos, Delete } from "@mui/icons-material";

function ArticleDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentArticle, status, error } = useSelector(
    (state) => state.articles
  );
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const { user } = useSelector((state) => state.auth);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // Fetch article on mount
  useEffect(() => {
    dispatch(fetchArticle(id));
  }, [dispatch, id]);

  const handleImageClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDeleteClick = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDelete = () => {
    dispatch(deleteArticle(currentArticle.id)); // Dispatch the delete action
    setOpenDeleteModal(false);
    navigate("/"); // Redirect to homepage after deletion
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!currentArticle) {
    return <div>Article not found</div>;
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-3xl font-bold mb-4">{currentArticle.title}</h2>
      <p className="text-gray-600 mb-4">By {currentArticle.author}</p>

      {/* Image */}
      <div className="w-full" onClick={handleImageClick}>
        <img
          className="w-full object-contain max-h-[400px]"
          src={
            currentArticle.image ||
            "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
          }
          alt={currentArticle.title}
        />
      </div>

      <p className="text-gray-600 mt-4">{currentArticle.content}</p>

      {/* Modal for Image */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{currentArticle.title}</DialogTitle>
        <DialogContent>
          <img
            className="w-full object-contain"
            src={
              currentArticle.image ||
              "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
            }
            alt={currentArticle.title}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <DialogTitle>Are you sure you want to delete this article?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Show Edit and Delete buttons only for the author of the article */}
      {isAuthenticated && user?.username === currentArticle?.author && (
        <div className="flex space-x-4 mt-4">
          <Link
            to={`/update/${currentArticle.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit
          </Link>
          <Button
            onClick={handleDeleteClick}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            startIcon={<Delete />}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}

export default ArticleDetail;
