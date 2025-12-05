import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [modules, setModules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // fetch modules from backend
    api.getModules().then(setModules);
  }, []);

  const handleGo = (page) => {
    navigate(`/${page}`);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={() => handleGo("modules")}>Manage Modules</button>
      <button onClick={() => handleGo("vendors")}>Manage Vendors</button>
      <button onClick={() => handleGo("categories")}>Manage Categories</button>
      <button onClick={() => handleGo("subcategories")}>Manage SubCategories</button>
      <button onClick={() => handleGo("products")}>Manage Products</button>
      <button onClick={() => handleGo("users")}>Manage Users</button>

      <h3>Modules List</h3>
      <ul>
        {modules.map((m) => (
          <li key={m._id}>{m.name}</li>
        ))}
      </ul>
    </div>
  );
}
