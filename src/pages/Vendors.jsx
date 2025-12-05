import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [modules, setModules] = useState([]);
  const [name, setName] = useState("");
  const [moduleId, setModuleId] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadVendors();
    loadModules();
  }, []);

  const loadVendors = async () => {
    const data = await api.getVendors();
    setVendors(data);
  };

  const loadModules = async () => {
    const data = await api.getModules();
    setModules(data);
  };

  const handleAddOrUpdate = async () => {
    if (!name || !moduleId) return alert("Enter all fields");
    const vendorData = { name, moduleId };

    if (editId) {
      await api.updateVendor(editId, vendorData);
      setEditId(null);
    } else {
      await api.createVendor(vendorData);
    }

    setName("");
    setModuleId("");
    loadVendors();
  };

  const handleEdit = (vendor) => {
    setName(vendor.name);
    setModuleId(vendor.moduleId._id);
    setEditId(vendor._id);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this vendor?")) {
      await api.deleteVendor(id);
      loadVendors();
    }
  };

  return (
    <div>
      <h2>Manage Vendors</h2>

      <input
        placeholder="Vendor Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={moduleId} onChange={(e) => setModuleId(e.target.value)}>
        <option value="">Select Module</option>
        {modules.map((m) => (
          <option key={m._id} value={m._id}>{m.name}</option>
        ))}
      </select>
      <button onClick={handleAddOrUpdate}>{editId ? "Update" : "Add"}</button>

      <ul>
        {vendors.map((v) => (
          <li key={v._id}>
            {v.name} - {v.moduleId?.name || "No Module"}{" "}
            <button onClick={() => handleEdit(v)}>Edit</button>{" "}
            <button onClick={() => handleDelete(v._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
