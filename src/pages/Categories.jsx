import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [name, setName] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadCategories();
    loadVendors();
  }, []);

  const loadCategories = async () => {
    const data = await api.getCategories();
    setCategories(data);
  };

  const loadVendors = async () => {
    const data = await api.getVendors();
    setVendors(data);
  };

  const handleAddOrUpdate = async () => {
    if (!name || !vendorId) return alert("Enter all fields");
    const categoryData = { name, vendorId };

    if (editId) {
      await api.updateCategory(editId, categoryData);
      setEditId(null);
    } else {
      await api.createCategory(categoryData);
    }

    setName("");
    setVendorId("");
    loadCategories();
  };

  const handleEdit = (category) => {
    setName(category.name);
    setVendorId(category.vendorId?._id);
    setEditId(category._id);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this category?")) {
      await api.deleteCategory(id);
      loadCategories();
    }
  };

  return (
    <div>
      <h2>Manage Categories</h2>

      <input
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select value={vendorId} onChange={(e) => setVendorId(e.target.value)}>
        <option value="">Select Vendor</option>
        {vendors.map((v) => (
          <option key={v._id} value={v._id}>{v.name}</option>
        ))}
      </select>

      <button onClick={handleAddOrUpdate}>{editId ? "Update" : "Add"}</button>

      <ul>
        {categories.map((c) => (
          <li key={c._id}>
            {c.name} - {c.vendorId?.name || "No Vendor"}{" "}
            <button onClick={() => handleEdit(c)}>Edit</button>{" "}
            <button onClick={() => handleDelete(c._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
