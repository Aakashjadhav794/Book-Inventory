import axios from "axios";

const API = axios.create({
  baseURL: "https://book-inventory-0s10.onrender.com"
});

export const getBooks = () => API.get("/books");
export const getBookById = (id) => API.get(`/books/${id}`);
export const addBook = (data) => API.post("/books", data);
export const updateBook = (id, data) => API.put(`/books/${id}`, data);
export const deleteBook = (id) => API.delete(`/books/${id}`);
