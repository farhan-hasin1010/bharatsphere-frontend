import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "sonner";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function SiteRoutes() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");
  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    );
  }
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <SiteRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#F4F1EA",
              color: "#1A251D",
              border: "1px solid #D5D0C5",
              borderRadius: 0,
              fontFamily: "Work Sans, sans-serif",
            },
          }}
        />
      </BrowserRouter>
    </div>
  );
}
