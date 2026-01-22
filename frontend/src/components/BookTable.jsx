import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import eye_icon from "../assets/svg/eye.svg";
import edit_icon from "../assets/svg/edit.svg";
import trash_icon from "../assets/svg/trash-icon.svg";

const BookTable = ({ books, onDelete }) => {
  const ITEMS_PER_PAGE = 5;
  const MAX_PAGES = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [books]);

  const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentBooks = books.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const startPage =
    Math.floor((currentPage - 1) / MAX_PAGES) * MAX_PAGES + 1;
  const endPage = Math.min(startPage + MAX_PAGES - 1, totalPages);

  /* ===== styles ===== */
const card = {
  background: "#fff",
  borderRadius: "12px",
  padding: "16px",
  marginTop: "30px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  overflowX: "auto"
};


const table = {
  width: "100%",
  minWidth: "700px",
  borderCollapse: "collapse"
};


  const th = {
    padding: "12px",
    textAlign: "center",
    fontSize: "13px",
    backgroundColor:"#b6bfd03b",
    borderBottom: "1px solid #e5e7eb"
  };

  const td = {
    padding: "14px 12px",
    borderBottom: "1px solid #f1f5f9",
    fontSize: "14px",
    textAlign: "center"
  };

const actions = {
  display: "flex",
  gap: "8px",
  justifyContent: "center",
  flexWrap: "wrap"
};


  const btn = (bg) => ({
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 10px",
    borderRadius: "6px",
    background: bg,
    color: "#fff",
    fontSize: "12px",
    border: "none",
    cursor: "pointer",
    textDecoration: "none"
  });

  const icon = { width: "14px", height: "14px" };

  /* ===== Delete handlers ===== */
  const openDeleteModal = (id) => {
    setSelectedBookId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    onDelete(selectedBookId);
    setShowModal(false);
    setSelectedBookId(null);
  };

  return (
    <>
      <div style={card}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Book Name</th>
              <th style={th}>Author</th>
              <th style={th}>Publisher</th>
              <th style={th}>Date</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentBooks.map((book) => (
              <tr key={book.id}>
                <td style={td}>{book.title}</td>
                <td style={td}>{book.author}</td>
                <td style={td}>{book.publisher}</td>
                <td style={td}>
                  {book.publishedDate
                    ? new Date(book.publishedDate).toLocaleDateString()
                    : "—"}
                </td>

                <td style={td}>
                  <div style={actions}>
                    <Link to={`/book/${book.id}`} style={btn("#1e3a8a")}>
                      <img src={eye_icon} alt="View" style={icon} />
                      View
                    </Link>

                    <Link to={`/edit/${book.id}`} style={btn("#14b8a6")}>
                      <img src={edit_icon} alt="Edit" style={icon} />
                      Edit
                    </Link>

                    <button
                      onClick={() => openDeleteModal(book.id)}
                      style={btn("#f97316")}
                    >
                      <img src={trash_icon} alt="Delete" style={icon} />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "16px",
              gap: "8px"
            }}
          >
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              Prev
            </button>

            {Array.from(
              { length: endPage - startPage + 1 },
              (_, i) => startPage + i
            ).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* ===== DELETE MODAL ===== */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "320px",
              textAlign: "center"
            }}
          >
            <h3>Delete Book</h3>
            <p style={{ fontSize: "14px", color: "#374151" }}>
              Are you sure you want to delete this book?
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
              <button
                onClick={confirmDelete}
                style={{
                  padding: "8px 16px",
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px"
                }}
              >
                Yes, Delete
              </button>

              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: "8px 16px",
                  background: "#e5e7eb",
                  border: "none",
                  borderRadius: "6px"
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookTable;
