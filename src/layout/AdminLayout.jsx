import { Link, Outlet } from "react-router-dom";
import "./AdminLayout.css"; // optional for styling

export default function AdminLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          background: "#2c3e50",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h2>Admin Panel</h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link style={{ color: "#fff" }} to="/dashboard">Dashboard</Link>
          <Link style={{ color: "#fff" }} to="/modules">Modules</Link>
          <Link style={{ color: "#fff" }} to="/vendors">Vendors</Link>
          <Link style={{ color: "#fff" }} to="/categories">Categories</Link>
          <Link style={{ color: "#fff" }} to="/subcategories">Sub-Categories</Link>
          <Link style={{ color: "#fff" }} to="/products">Products</Link>
          <Link style={{ color: "#fff" }} to="/users">Users</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}
