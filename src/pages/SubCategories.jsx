import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function SubCategories() {
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadSubCategories();
    loadCategories();
  }, []);

  const loadSubCategories = async () => {
    const data = await api.getSubCategories();
    setSubCategories(data);
  };

  const loadCategories = async () => {
    const data = await api.getCategories();
    setCategories(data);
  };

  const handleAddOrUpdate = async () => {
    if (!name || !categoryId) return alert("Enter all fields");
    const subCategoryData = { name, categoryId };

    if (editId) {
      await api.updateSubCategory(editId, subCategoryData);
      setEditId(null);
    } else {
      await api.createSubCategory(subCategoryData);
    }

    setName("");
    setCategoryId("");
    loadSubCategories();
  };

  const handleEdit = (sub) => {
    setName(sub.name);
    setCategoryId(sub.categoryId?._id);
    setEditId(sub._id);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this subcategory?")) {
      await api.deleteSubCategory(id);
      loadSubCategories();
    }
  };

  return (
    <div>
      <h2>Manage SubCategories</h2>

      <input
        placeholder="SubCategory Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

      <button onClick={handleAddOrUpdate}>{editId ? "Update" : "Add"}</button>

      <ul>
        {subCategories.map((s) => (
          <li key={s._id}>
            {s.name} - {s.categoryId?.name || "No Category"}{" "}
            <button onClick={() => handleEdit(s)}>Edit</button>{" "}
            <button onClick={() => handleDelete(s._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
