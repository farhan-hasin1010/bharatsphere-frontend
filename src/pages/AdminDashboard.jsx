import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../lib/api";
import { toast } from "sonner";
import { Loader2, LogOut, Trash2, Plus, X, Package, Mail } from "lucide-react";

export default function AdminDashboard() {
  const nav = useNavigate();
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [p, i] = await Promise.all([adminApi.allProducts(), adminApi.listInquiries()]);
      setProducts(p);
      setInquiries(i);
    } catch (err) {
      if (err?.response?.status === 401) {
        localStorage.removeItem("admin_token");
        nav("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      nav("/admin/login");
      return;
    }
    loadAll();
    // eslint-disable-next-line
  }, []);

  const logout = () => {
    localStorage.removeItem("admin_token");
    nav("/admin/login");
  };

  const removeProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await adminApi.deleteProduct(id);
      toast.success("Product deleted");
      loadAll();
    } catch {
      toast.error("Delete failed");
    }
  };

  const setInquiryStatus = async (id, status) => {
    try {
      await adminApi.updateInquiryStatus(id, status);
      toast.success("Updated");
      loadAll();
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB]" data-testid="admin-dashboard">
      <div className="border-b border-[#D5D0C5] bg-white">
        <div className="px-6 md:px-12 py-5 flex items-center justify-between">
          <div>
            <div className="eyebrow">Control Room</div>
            <div className="font-serif-display text-2xl text-[#1A3626]">Junesons Admin</div>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 text-sm text-[#4A524C] hover:text-[#1A3626]"
            data-testid="admin-logout"
          >
            <LogOut className="w-4 h-4" /> Log out
          </button>
        </div>
        <div className="px-6 md:px-12 flex gap-6">
          <TabButton active={tab === "products"} onClick={() => setTab("products")} icon={<Package className="w-4 h-4" />} label={`Products (${products.length})`} testid="tab-products" />
          <TabButton active={tab === "inquiries"} onClick={() => setTab("inquiries")} icon={<Mail className="w-4 h-4" />} label={`Inquiries (${inquiries.length})`} testid="tab-inquiries" />
        </div>
      </div>

      <div className="px-6 md:px-12 py-10">
        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-[#1A3626]" />
          </div>
        ) : tab === "products" ? (
          <ProductsPanel products={products} onDelete={removeProduct} onAdd={() => setShowAdd(true)} />
        ) : (
          <InquiriesPanel inquiries={inquiries} onStatus={setInquiryStatus} />
        )}
      </div>

      {showAdd && <AddProductModal onClose={() => setShowAdd(false)} onSaved={() => { setShowAdd(false); loadAll(); }} />}
    </div>
  );
}

function TabButton({ active, onClick, icon, label, testid }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 py-4 text-sm transition-colors -mb-px border-b-2 ${
        active ? "border-[#1A3626] text-[#1A3626] font-semibold" : "border-transparent text-[#757C78] hover:text-[#1A3626]"
      }`}
      data-testid={testid}
    >
      {icon} {label}
    </button>
  );
}

function ProductsPanel({ products, onDelete, onAdd }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-serif-display text-3xl text-[#1A3626]">Product Catalog</h2>
        <button onClick={onAdd} className="inline-flex items-center gap-2 bg-[#1A3626] text-[#F4F1EA] px-5 py-2.5 text-sm" data-testid="add-product-btn">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>
      <div className="bg-white border border-[#D5D0C5] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F4F1EA] text-left">
            <tr>
              <th className="p-4 eyebrow">Product</th>
              <th className="p-4 eyebrow">Category</th>
              <th className="p-4 eyebrow">Status</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-[#D5D0C5]">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={p.image_url} alt="" className="w-12 h-12 object-cover" />
                    <div>
                      <div className="font-medium text-[#1A3626]">{p.name}</div>
                      <div className="text-xs text-[#757C78]">/{p.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-[#4A524C]">{p.category}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 ${p.featured ? "bg-[#C98E4B]/20 text-[#8A5E2A]" : "bg-[#EAE5D9] text-[#4A524C]"}`}>
                    {p.featured ? "Featured" : "Standard"}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => onDelete(p.id)} className="text-[#B85C38] hover:text-[#8B4423]" data-testid={`delete-${p.slug}`}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InquiriesPanel({ inquiries, onStatus }) {
  return (
    <div>
      <h2 className="font-serif-display text-3xl text-[#1A3626] mb-6">Customer Inquiries</h2>
      {inquiries.length === 0 ? (
        <p className="text-[#4A524C]">No inquiries yet.</p>
      ) : (
        <div className="space-y-4">
          {inquiries.map((i) => (
            <div key={i.id} className="bg-white border border-[#D5D0C5] p-6" data-testid={`inquiry-${i.id}`}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`eyebrow text-[10px] px-2 py-0.5 ${i.type === "quote" ? "bg-[#1A3626] text-[#F4F1EA]" : "bg-[#EAE5D9] text-[#1A3626]"}`}>
                      {i.type}
                    </span>
                    <span className={`eyebrow text-[10px] px-2 py-0.5 ${
                      i.status === "new" ? "bg-[#C98E4B]/20 text-[#8A5E2A]" :
                      i.status === "reviewed" ? "bg-[#1A3626]/10 text-[#1A3626]" : "bg-[#EAE5D9] text-[#757C78]"
                    }`}>
                      {i.status}
                    </span>
                  </div>
                  <div className="font-serif-display text-xl text-[#1A3626]">{i.full_name} <span className="text-[#757C78] text-base font-body">· {i.email}</span></div>
                  <div className="text-xs text-[#757C78] mt-1">
                    {i.company && <>{i.company} · </>}
                    {i.country && <>{i.country} · </>}
                    {i.phone && <>{i.phone_code || ""} {i.phone} · </>}
                    {i.product_interest && <>Interest: {i.product_interest} · </>}
                    {i.order_quantity && <>Qty: {i.order_quantity}</>}
                  </div>
                </div>
                <select
                  value={i.status}
                  onChange={(e) => onStatus(i.id, e.target.value)}
                  className="border border-[#D5D0C5] px-3 py-1.5 text-sm bg-white"
                  data-testid={`inquiry-status-${i.id}`}
                >
                  <option value="new">New</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <p className="mt-4 text-[#1A251D] text-sm whitespace-pre-wrap border-t border-[#D5D0C5] pt-4">{i.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AddProductModal({ onClose, onSaved }) {
  const [f, setF] = useState({
    name: "", slug: "", category: "", short_description: "",
    long_description: "", image_url: "", specsText: "", featured: false,
  });
  const [saving, setSaving] = useState(false);

  const up = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const specs = {};
      f.specsText.split("\n").forEach((line) => {
        const [k, ...v] = line.split(":");
        if (k && v.length) specs[k.trim()] = v.join(":").trim();
      });
      await adminApi.createProduct({
        name: f.name,
        slug: f.slug || f.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
        category: f.category,
        short_description: f.short_description,
        long_description: f.long_description,
        image_url: f.image_url,
        specs,
        featured: f.featured,
      });
      toast.success("Product added");
      onSaved();
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4 overflow-y-auto" data-testid="add-product-modal">
      <div className="bg-white max-w-2xl w-full my-8">
        <div className="flex items-center justify-between p-5 border-b border-[#D5D0C5]">
          <h3 className="font-serif-display text-2xl text-[#1A3626]">Add Product</h3>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={submit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <AdminField label="Name *" value={f.name} onChange={up("name")} required testid="add-name" />
          <AdminField label="Slug" value={f.slug} onChange={up("slug")} placeholder="auto from name" testid="add-slug" />
          <AdminField label="Category *" value={f.category} onChange={up("category")} required testid="add-category" />
          <AdminField label="Image URL *" value={f.image_url} onChange={up("image_url")} required testid="add-image" />
          <div className="md:col-span-2">
            <label className="eyebrow block mb-2">Short Description *</label>
            <input required value={f.short_description} onChange={up("short_description")} className="w-full border-b border-[#1A3626]/20 py-2 bg-transparent focus:outline-none focus:border-[#1A3626]" data-testid="add-short" />
          </div>
          <div className="md:col-span-2">
            <label className="eyebrow block mb-2">Long Description *</label>
            <textarea required rows={3} value={f.long_description} onChange={up("long_description")} className="w-full border border-[#D5D0C5] p-3 bg-transparent focus:outline-none focus:border-[#1A3626]" data-testid="add-long" />
          </div>
          <div className="md:col-span-2">
            <label className="eyebrow block mb-2">Specs (Key: Value per line)</label>
            <textarea rows={5} value={f.specsText} onChange={up("specsText")} placeholder="Material: 100% Jute&#10;MOQ: 1000 units" className="w-full border border-[#D5D0C5] p-3 bg-transparent font-mono text-sm focus:outline-none focus:border-[#1A3626]" data-testid="add-specs" />
          </div>
          <label className="md:col-span-2 inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={f.featured} onChange={(e) => setF({ ...f, featured: e.target.checked })} data-testid="add-featured" />
            Featured on homepage
          </label>
          <div className="md:col-span-2 flex justify-end gap-3 pt-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm border border-[#D5D0C5]">Cancel</button>
            <button type="submit" disabled={saving} className="px-6 py-2.5 text-sm bg-[#1A3626] text-[#F4F1EA] inline-flex items-center gap-2" data-testid="save-product">
              {saving && <Loader2 className="w-4 h-4 animate-spin" />} Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AdminField({ label, ...props }) {
  const { testid, ...rest } = props;
  return (
    <div>
      <label className="eyebrow block mb-2">{label}</label>
      <input {...rest} data-testid={testid} className="w-full border-b border-[#1A3626]/20 py-2 bg-transparent focus:outline-none focus:border-[#1A3626]" />
    </div>
  );
}
