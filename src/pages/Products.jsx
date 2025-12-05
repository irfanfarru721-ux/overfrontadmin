import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [name, setName] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadProducts();
    loadVendors();
  }, []);

  const loadProducts = async () => {
    const data = await api.getProducts();
    setProducts(data);
  };

  const loadVendors = async () => {
    const data = await api.getVendors();
    setVendors(data);
  };

  const loadCategories = async (vendorId) => {
    if (!vendorId) return setCategories([]);
    const data = await api.getCategoriesByVendor(vendorId);
    setCategories(data);
  };

  const loadSubCategories = async (categoryId) => {
    if (!categoryId) return setSubCategories([]);
    const data = await api.getSubCategoriesByCategory(categoryId);
    setSubCategories(data);
  };

  const handleAddOrUpdate = async () => {
    if (!name || !vendorId || !categoryId || !price) return alert("Enter all required fields");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("vendorId", vendorId);
    formData.append("categoryId", categoryId);
    formData.append("subCategoryId", subCategoryId || "");
    formData.append("price", price);
    formData.append("description", description);
    if (image) formData.append("image", image);

    if (editId) {
      await api.updateProduct(editId, formData);
      setEditId(null);
    } else {
      await api.createProduct(formData);
    }

    setName("");
    setVendorId("");
    setCategoryId("");
    setSubCategoryId("");
    setPrice("");
    setDescription("");
    setImage(null);
    setCategories([]);
    setSubCategories([]);
    loadProducts();
  };

  const handleEdit = (product) => {
    setName(product.name);
    setVendorId(product.vendorId?._id);
    loadCategories(product.vendorId?._id);
    setCategoryId(product.categoryId?._id);
    loadSubCategories(product.categoryId?._id);
    setSubCategoryId(product.subCategoryId?._id || "");
    setPrice(product.price);
    setDescription(product.description || "");
    setEditId(product._id);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await api.deleteProduct(id);
      loadProducts();
    }
  };

  return (
    <div>
      <h2>Manage Products</h2>

      <input placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} />
      <select value={vendorId} onChange={e => { setVendorId(e.target.value); loadCategories(e.target.value); }}>
        <option value="">Select Vendor</option>
        {vendors.map(v => <option key={v._id} value={v._id}>{v.name}</option>)}
      </select>
      <select value={categoryId} onChange={e => { setCategoryId(e.target.value); loadSubCategories(e.target.value); }}>
        <option value="">Select Category</option>
        {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
      </select>
      <select value={subCategoryId} onChange={e => setSubCategoryId(e.target.value)}>
        <option value="">Select SubCategory (optional)</option>
        {subCategories.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
      </select>
      <input placeholder="Price" type="number" value={price} onChange={e => setPrice(e.target.value)} />
      <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <input type="file" onChange={e => setImage(e.target.files[0])} />

      <button onClick={handleAddOrUpdate}>{editId ? "Update" : "Add"}</button>

      <ul>
        {products.map(p => (
          <li key={p._id}>
            {p.name} - {p.vendorId?.name} / {p.categoryId?.name} / {p.subCategoryId?.name || "-"} - ₹{p.price}
            <button onClick={() => handleEdit(p)}>Edit</button>
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
