import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function Modules() {
  const [modules, setModules] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadModules();
  }, []);

  const loadModules = async () => {
    const data = await api.getModules();
    setModules(data);
  };

  const handleAddOrUpdate = async () => {
    if (!name) return alert("Enter module name");
    if (editId) {
      await api.updateModule(editId, { name });
      setEditId(null);
    } else {
      await api.createModule({ name });
    }
    setName("");
    loadModules();
  };

  const handleEdit = (module) => {
    setName(module.name);
    setEditId(module._id);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete?")) {
      await api.deleteModule(id);
      loadModules();
    }
  };

  return (
    <div>
      <h2>Manage Modules</h2>
      <input
        placeholder="Module Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleAddOrUpdate}>
        {editId ? "Update" : "Add"}
      </button>

      <ul>
        {modules.map((m) => (
          <li key={m._id}>
            {m.name}{" "}
            <button onClick={() => handleEdit(m)}>Edit</button>{" "}
            <button onClick={() => handleDelete(m._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
