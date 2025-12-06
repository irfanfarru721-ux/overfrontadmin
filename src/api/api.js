const BASE_URL = "https://final-back-z70x.onrender.com/api"; // Replace with your backend URL if deployed

const getToken = () => localStorage.getItem("adminToken");

const request = async (url, options = {}) => {
  const headers = options.headers || {};
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  headers["Content-Type"] = "application/json";
  options.headers = headers;

  if (options.body && !(options.body instanceof FormData)) {
    options.body = JSON.stringify(options.body);
  }

  const res = await fetch(`${BASE_URL}${url}`, options);
  return res.json();
};

export const api = {
  // Modules
  getModules: () => request("/modules"),
  createModule: (data) => request("/modules", { method: "POST", body: data }),
  updateModule: (id, data) => request(`/modules/${id}`, { method: "PUT", body: data }),
  deleteModule: (id) => request(`/modules/${id}`, { method: "DELETE" }),

  // Vendors
  getVendors: () => request("/vendors"),
  createVendor: (data) => request("/vendors", { method: "POST", body: data }),
  updateVendor: (id, data) => request(`/vendors/${id}`, { method: "PUT", body: data }),
  deleteVendor: (id) => request(`/vendors/${id}`, { method: "DELETE" }),

  // Categories
  getCategories: () => request("/categories"),
  getCategoriesByVendor: (vendorId) => request(`/categories/vendor/${vendorId}`),
  createCategory: (data) => request("/categories", { method: "POST", body: data }),
  updateCategory: (id, data) => request(`/categories/${id}`, { method: "PUT", body: data }),
  deleteCategory: (id) => request(`/categories/${id}`, { method: "DELETE" }),

  // SubCategories
  getSubCategories: () => request("/subcategories"),
  getSubCategoriesByCategory: (categoryId) => request(`/subcategories/category/${categoryId}`),
  createSubCategory: (data) => request("/subcategories", { method: "POST", body: data }),
  updateSubCategory: (id, data) => request(`/subcategories/${id}`, { method: "PUT", body: data }),
  deleteSubCategory: (id) => request(`/subcategories/${id}`, { method: "DELETE" }),

  // Products
  getProducts: () => request("/products"),
  createProduct: (data) => request("/products", { method: "POST", body: data }),
  updateProduct: (id, data) => request(`/products/${id}`, { method: "PUT", body: data }),
  deleteProduct: (id) => request(`/products/${id}`, { method: "DELETE" }),

  // Users
  getUsers: () => request("/users"),
  deleteUser: (id) => request(`/users/${id}`, { method: "DELETE" }),

  // Admin login
  loginAdmin: (data) => request("/admin/login", { method: "POST", body: data }),
};
