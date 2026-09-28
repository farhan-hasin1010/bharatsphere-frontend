// frontend/src/lib/api.js
import axios from "axios";
import { PRODUCTS_DATA } from "../data/products";

// Set to true to run 100% static (no backend needed)
const IS_STATIC = process.env.REACT_APP_USE_STATIC !== "false";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000";
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ==========================================
// 1. PRODUCTS API
// ==========================================
export const productsApi = {
  list: async (params = {}) => {
    if (IS_STATIC) {
      let result = [...PRODUCTS_DATA].filter((p) => p.active !== false);
      if (params.category) {
        result = result.filter((p) => p.category === params.category);
      }
      if (params.featured !== undefined) {
        result = result.filter((p) => p.featured === params.featured);
      }
      result.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
      return Promise.resolve(result);
    }
    return api.get("/products", { params }).then((r) => r.data);
  },

  get: async (slug) => {
    if (IS_STATIC) {
      const item = PRODUCTS_DATA.find((p) => p.slug === slug && p.active !== false);
      if (!item) {
        return Promise.reject(new Error("Product not found"));
      }
      return Promise.resolve(item);
    }
    return api.get(`/products/${slug}`).then((r) => r.data);
  },

  categories: async () => {
    if (IS_STATIC) {
      const cats = [...new Set(PRODUCTS_DATA.map((p) => p.category))];
      return Promise.resolve({ categories: cats });
    }
    return api.get("/products/categories").then((r) => r.data);
  },
};

// ==========================================
// 2. INQUIRIES API (Direct-to-Email via Web3Forms)
// ==========================================
export const inquiriesApi = {
  create: async (payload) => {
    if (IS_STATIC) {
      const accessKey = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY;
      
      const emailPayload = {
        access_key: accessKey,
        subject: `New Lead: ${payload.full_name || "Buyer"} (${payload.company || "General"})`,
        from_name: "Bharatsphere Storefront",
        ...payload,
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(emailPayload),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to send message.");
      }
      return { success: true };
    }

    // Live backend endpoint
    return api.post("/inquiries", payload).then((r) => r.data);
  },
};

// ==========================================
// 3. ADMIN API (Ready for future backend)
// ==========================================
export const adminApi = {
  login: (email, password) =>
    api.post("/admin/login", { email, password }).then((r) => r.data),
  me: () => api.get("/admin/me").then((r) => r.data),
  allProducts: () => api.get("/admin/products/all").then((r) => r.data),
  createProduct: (payload) => api.post("/admin/products", payload).then((r) => r.data),
  updateProduct: (id, payload) =>
    api.patch(`/admin/products/${id}`, payload).then((r) => r.data),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`).then((r) => r.data),
  listInquiries: () => api.get("/admin/inquiries").then((r) => r.data),
  updateInquiryStatus: (id, status) =>
    api.patch(`/admin/inquiries/${id}`, { status }).then((r) => r.data),
};