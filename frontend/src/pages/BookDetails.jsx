import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBookById } from "../services/api";
import Loader from "../components/Loader";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBookById(id)
      .then((res) => setBook(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!book) return null;

  /* ===== styles ===== */
const page = {
  minHeight: "100vh",
  background: "#f5f7fb",
  display: "flex",
  justifyContent: "center",
  paddingTop: "60px",
};


  const back = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "16px",
    textDecoration: "none",
    color: "#374151",
    fontSize: "14px"
  };

const card = {
  background: "#fff",
  borderRadius: "12px",
  padding: "24px",
  display: "flex",
  gap: "24px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  width: "100%",
  boxSizing: "border-box",
  overflow: "hidden"
};


  const imageBox = {
    width: "180px",
    height: "220px",
    background: "#eef2f7",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#9ca3af",
    fontSize: "13px",
    flexShrink: 0
  };

  const right = {
    flex: 1
  };

  const title = {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "12px",
    color: "#111827"
  };

  const row = {
    display: "flex",
    gap: "12px",
    marginBottom: "6px",
    fontSize: "14px"
  };

  const label = {
    width: "120px",
    fontWeight: "600",
    color: "#374151"
  };

  const value = {
    color: "#111827"
  };

  const divider = {
    margin: "16px 0",
    borderTop: "1px solid #e5e7eb"
  };

  const descTitle = {
    fontWeight: "600",
    marginBottom: "6px"
  };

const desc = {
  fontSize: "14px",
  color: "#374151",
  lineHeight: "1.6",
  wordBreak: "break-word",
  overflowWrap: "break-word"
};


  return (
<div style={page}>
  <div style={{ width: "100%", maxWidth: "900px" }}>
    
    {/* Back */}
    <Link to="/" style={back}>
      ← Back to Dashboard
    </Link>

      {/* Card */}
      <div style={card}>
        {/* Image */}
        <div style={imageBox}>
          No Image Available
        </div>

        {/* Details */}
        <div style={right}>
          <div style={title}>{book.title}</div>

          <div style={row}>
            <div style={label}>Author</div>
            <div style={value}>{book.author}</div>
          </div>

          <div style={row}>
            <div style={label}>Published Date</div>
            <div style={value}>
              {book.publishedDate
                ? new Date(book.publishedDate).toLocaleDateString()
                : "—"}
            </div>
          </div>

          <div style={row}>
            <div style={label}>Publisher</div>
            <div style={value}>{book.publisher}</div>
          </div>

          <div style={divider} />

          <div style={descTitle}>Description / Overview</div>
          <div style={desc}>
            {book.description || "No description available."}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default BookDetails;
