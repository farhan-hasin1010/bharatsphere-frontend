import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { inquiriesApi } from "../lib/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const INITIAL = { full_name: "", company: "", country: "", email: "", phone_code: "+49", phone: "", order_quantity: "", message: "" };

export default function QuoteDialog({ open, onOpenChange, product }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(INITIAL);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await inquiriesApi.create({
        type: "quote", ...form,
        product_interest: product?.category,
      });
      toast.success("Enquiry submitted", { description: "We respond within 24 hours." });
      onOpenChange(false);
      setForm(INITIAL);
    } catch (err) {
      toast.error("Unable to submit", { description: err?.response?.data?.detail || "Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#F4F1EA] border border-[#D5D0C5] max-w-2xl rounded-none p-0 overflow-hidden max-h-[90vh] overflow-y-auto" data-testid="quote-dialog">
        <div className="p-6 sm:p-8 md:p-10">
          <DialogHeader className="space-y-2 text-left">
            <div className="eyebrow text-[#C98E4B]">Buyer Enquiry</div>
            <DialogTitle className="font-serif-display text-2xl sm:text-3xl text-[#1A3626] leading-tight">
              Request pricing
              {product && <span className="block text-lg sm:text-xl text-[#4A524C] italic font-normal mt-1">for {product.name}</span>}
            </DialogTitle>
            <DialogDescription className="text-sm text-[#4A524C]">We respond to every enquiry within 24 hours.</DialogDescription>
          </DialogHeader>

          <form onSubmit={submit} className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5" data-testid="quote-form">
            <Field label="Full Name" required value={form.full_name} onChange={update("full_name")} testid="q-name" />
            <Field label="Company" required value={form.company} onChange={update("company")} testid="q-company" />
            <Field label="Email" type="email" required value={form.email} onChange={update("email")} testid="q-email" />
            <Field label="Country" value={form.country} onChange={update("country")} testid="q-country" />
            <Field label="Phone / WhatsApp" required value={form.phone} onChange={update("phone")} testid="q-phone" />
            <Field label="Order Quantity" value={form.order_quantity} onChange={update("order_quantity")} testid="q-qty" />
            <div className="sm:col-span-2">
              <label className="eyebrow block mb-2">Details</label>
              <textarea required rows={3} value={form.message} onChange={update("message")}
                className="w-full border border-[#D5D0C5] p-3 text-sm bg-transparent focus:outline-none focus:border-[#1A3626] resize-none"
                data-testid="q-message" />
            </div>
            <div className="sm:col-span-2 flex justify-end pt-2">
              <button type="submit" disabled={loading}
                className="inline-flex items-center gap-2 bg-[#1A3626] text-[#F4F1EA] hover:bg-[#24412F] disabled:opacity-60 px-8 py-3 text-sm font-medium transition-all"
                data-testid="quote-submit-button">
                {loading && <Loader2 className="w-4 h-4 animate-spin" />} Submit Enquiry
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, type = "text", required, value, onChange, testid }) {
  return (
    <div>
      <label className="eyebrow block mb-2">{label}{required && " *"}</label>
      <input type={type} required={required} value={value} onChange={onChange}
        className="w-full border-b border-[#1A3626]/25 bg-transparent py-2 text-sm focus:outline-none focus:border-[#1A3626]"
        data-testid={testid} />
    </div>
  );
}
