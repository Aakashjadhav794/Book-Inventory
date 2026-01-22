import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";
import Loader from "../components/Loader";
import { addBook, getBookById, updateBook } from "../services/api";

const AddEditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      getBookById(id).then(res => {
        setBook(res.data);
        setLoading(false);
      });
    }
  }, [id]);

  const handleSubmit = async (data) => {
    id ? await updateBook(id, data) : await addBook(data);
    navigate("/");
  };

  if (loading) return <Loader />;

  return <BookForm onSubmit={handleSubmit} defaultValues={book} />;
};

export default AddEditBook;
