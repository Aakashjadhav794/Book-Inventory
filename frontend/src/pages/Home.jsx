import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../services/api";
import BookTable from "../components/BookTable";
import Loader from "../components/Loader";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const res = await getBooks();
      setBooks(res.data);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Browser alert removed (modal handles confirmation)
  const handleDelete = async (id) => {
    await deleteBook(id);
    loadBooks();
  };

  if (loading) return <Loader />;

  /* ===== inline styles ===== */
  const container = {
    padding: "30px",
    background: "#f5f7fb",
    minHeight: "80vh",
    overflowX: "hidden"
  };

  const hero = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px"
  };

  const heading = {
    fontSize: "36px",
    fontWeight: "700",
    color: "#1f2937",
    margin: 0
  };

  const addBtn = {
    background: "#4f46e5",
    color: "#fff",
    padding: "10px 18px",
    borderRadius: "25px",
    textDecoration: "none",
    fontSize: "14px",
    whiteSpace: "nowrap"
  };

  return (
    <div style={container}>
      {/* Hero Section */}
      <div style={hero}>
        <h1 style={heading}>
          Book Inventory <br /> Management System.
        </h1>

        <Link to="/add" style={addBtn}>
          + Add New Book
        </Link>
      </div>

      {/* Table */}
      <BookTable books={books} onDelete={handleDelete} />
    </div>
  );
};

export default Home;
