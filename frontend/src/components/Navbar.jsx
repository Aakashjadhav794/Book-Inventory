import { Link } from "react-router-dom";

const Navbar = () => {
  const nav = {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    height: "60px",
    padding: "0 28px",
    background: "linear-gradient(90deg, #3f51b5, #5c6bc0)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#fff"
  };

  const left = {
    fontSize: "20px",
    fontWeight: "600"
  };

  const right = {
    display: "flex",
    gap: "20px"
  };

  const link = {
    color: "#fff",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "500"
  };

  return (
    <nav style={nav}>
      <div style={left}>Book Inventory</div>

      <div style={right}>
        <Link to="/" style={link}>Home</Link>
        <Link to="/add" style={link}>Add Book</Link>
      </div>
    </nav>
  );
};

export default Navbar;
