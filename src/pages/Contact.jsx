import { useState } from "react";
import { inquiriesApi } from "../lib/api";
import { CONTACT } from "../components/Layout";
import { Loader2, Mail, Phone, MessageCircle, CheckCircle2 } from "lucide-react";

const COUNTRIES = [
  "All Countries",
  "Germany", "France", "Italy", "Spain", "Netherlands", "Belgium", "Portugal",
  "Sweden", "Norway", "Denmark", "Finland", "Austria", "Switzerland", "Ireland",
  "United Kingdom", "Poland", "Czech Republic", "Greece", "United States",
  "Canada", "Australia", "United Arab Emirates", "Japan", "Singapore", "India", "Other",
];

const PRODUCT_INTEREST = [
  "Wine Bottle Carriers",
  "Custom Printed Bags",
  "JC-Blend Bags",
  "Other",
];

const PHONE_CODES = [
  "+91","+1","+44","+33","+49","+34","+39","+31","+32","+351","+46","+47","+45",
  "+358","+43","+41","+353","+48","+420","+30","+61","+971","+81","+65",
];

const INITIAL = {
  full_name: "", company: "", country: "All Countries", email: "",
  phone_code: "+49", phone: "", product_interest: "Wine Bottle Carriers",
  order_quantity: "", message: "",
};

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await inquiriesApi.create({ type: "buyer", ...form });
      setSuccess(true);
      setForm(INITIAL);
    } catch (err) {
      alert(err?.response?.data?.detail || "Unable to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-20 py-14 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14" data-testid="contact-page">
      {/* Aside */}
      <aside className="md:col-span-5 space-y-8">
        <div>
          <div className="eyebrow mb-4">Buyer Enquiry</div>
          <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-[#1A3626] leading-[1.02] tracking-tight">
            Let's talk <span className="italic">supply.</span>
          </h1>
          <p className="text-[#4A524C] mt-4 md:mt-5 leading-relaxed max-w-md text-sm sm:text-base">
            Tell us what you need — wine carriers, custom-printed events, or JC-blend lifestyle lines.
            We respond to every enquiry within 24 hours.
          </p>
        </div>

        <div className="space-y-4 pt-6 border-t border-[#D5D0C5]">
          <a href={`mailto:${CONTACT.email}`} className="flex items-start gap-4 group" data-testid="side-email">
            <span className="w-10 h-10 bg-[#1A3626] text-[#F4F1EA] grid place-items-center shrink-0">
              <Mail className="w-5 h-5" />
            </span>
            <span>
              <span className="eyebrow block mb-0.5">Email</span>
              <span className="text-[#1A251D] group-hover:text-[#1A3626] break-all">{CONTACT.email}</span>
            </span>
          </a>

          <a href={`tel:${CONTACT.phoneDial}`} className="flex items-start gap-4 group" data-testid="side-phone">
            <span className="w-10 h-10 bg-[#1A3626] text-[#F4F1EA] grid place-items-center shrink-0">
              <Phone className="w-5 h-5" />
            </span>
            <span>
              <span className="eyebrow block mb-0.5">Phone</span>
              <span className="text-[#1A251D]">{CONTACT.phoneDisplay}</span>
            </span>
          </a>

          <a
            href={`https://wa.me/${CONTACT.phoneDial.replace(/[^0-9]/g, "")}`}
            target="_blank" rel="noreferrer"
            className="flex items-start gap-4 group"
            data-testid="side-whatsapp"
          >
            <span className="w-10 h-10 bg-[#C98E4B] text-white grid place-items-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </span>
            <span>
              <span className="eyebrow block mb-0.5">WhatsApp</span>
              <span className="text-[#1A251D]">Message us instantly</span>
            </span>
          </a>
        </div>

        <div className="pt-6 border-t border-[#D5D0C5] text-xs sm:text-sm text-[#4A524C] leading-relaxed">
          <div className="eyebrow mb-2 text-[#1A3626]">Office</div>
          {CONTACT.company}<br />
          {CONTACT.city}<br />
          {CONTACT.role}
        </div>
      </aside>

      {/* Form */}
      <div className="md:col-span-7">
        {success ? (
          <div
            className="bg-white border border-[#1A3626] p-8 md:p-12 fade-up"
            data-testid="enquiry-success"
          >
            <div className="w-14 h-14 bg-[#1A3626] text-[#F4F1EA] grid place-items-center mb-6">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h2 className="font-serif-display text-3xl md:text-4xl text-[#1A3626] leading-tight">
              Thank you.
            </h2>
            <p className="mt-4 text-[#4A524C] text-base md:text-lg">
              We respond to all enquiries within 24 hours.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-8 inline-flex items-center gap-2 border border-[#1A3626] text-[#1A3626] hover:bg-[#1A3626] hover:text-[#F4F1EA] transition-all px-6 py-3 text-sm font-medium"
              data-testid="send-another"
            >
              Send another enquiry
            </button>
          </div>
        ) : (
          <form
            onSubmit={submit}
            className="bg-white border border-[#D5D0C5] p-6 sm:p-8 md:p-10 grid grid-cols-1 sm:grid-cols-2 gap-5"
            data-testid="enquiry-form"
          >
            <Field label="Full Name" required value={form.full_name} onChange={update("full_name")} testid="f-name" />
            <Field label="Company Name" required value={form.company} onChange={update("company")} testid="f-company" />

            <SelectField label="Country" value={form.country} onChange={update("country")} options={COUNTRIES} testid="f-country" />
            <Field label="Email" type="email" required value={form.email} onChange={update("email")} testid="f-email" />

            <div className="sm:col-span-2 grid grid-cols-[7rem_1fr] gap-3">
              <SelectField label="Code" value={form.phone_code} onChange={update("phone_code")} options={PHONE_CODES} testid="f-phonecode" />
              <Field label="Phone / WhatsApp" required value={form.phone} onChange={update("phone")} testid="f-phone" placeholder="e.g. 176 1234 5678" />
            </div>

            <SelectField label="Product Interest" value={form.product_interest} onChange={update("product_interest")} options={PRODUCT_INTEREST} testid="f-interest" />
            <Field label="Order Quantity Estimate" value={form.order_quantity} onChange={update("order_quantity")} testid="f-qty" placeholder="Optional — e.g. 500 pcs" />

            <div className="sm:col-span-2">
              <label className="eyebrow block mb-2">Message *</label>
              <textarea
                required rows={5} value={form.message} onChange={update("message")}
                placeholder="Tell us about your artwork, sizes, timelines, and destination port..."
                className="w-full border border-[#D5D0C5] p-3 bg-transparent text-sm focus:outline-none focus:border-[#1A3626] transition-colors resize-none placeholder:text-[#1A3626]/40"
                data-testid="f-message"
              />
            </div>

            <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
              <p className="text-xs text-[#757C78]">Your details are used only to prepare a quote.</p>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1A3626] text-[#F4F1EA] hover:bg-[#24412F] disabled:opacity-60 px-8 py-3.5 text-sm font-medium transition-all"
                data-testid="submit-enquiry"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Send Enquiry
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, type = "text", required, value, onChange, testid, placeholder }) {
  return (
    <div>
      <label className="eyebrow block mb-2">{label}{required && " *"}</label>
      <input
        type={type} required={required} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full border-b border-[#1A3626]/25 bg-transparent py-2.5 text-sm focus:outline-none focus:border-[#1A3626] transition-colors placeholder:text-[#1A3626]/35"
        data-testid={testid}
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options, testid }) {
  return (
    <div>
      <label className="eyebrow block mb-2">{label}</label>
      <select
        value={value} onChange={onChange}
        className="w-full border-b border-[#1A3626]/25 bg-transparent py-2.5 text-sm focus:outline-none focus:border-[#1A3626] transition-colors appearance-none pr-6"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%231A3626'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 4px center" }}
        data-testid={testid}
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
