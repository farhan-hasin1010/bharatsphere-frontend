import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Mail, Phone } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Enquiry" },
];

// Central contact details — single source of truth
export const CONTACT = {
  company: "BHARATSPHERE EXIM",
  city: "Murshidabad, West Bengal, India",
  role: "Trading Exporter",
  email: "enquiries@bharatsphereexim.com",
  phoneDial: "+918777817212", // used only for tel:/wa.me links (placeholder)
  phoneDisplay: "+91 7602548351",
};

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#1A251D]">
      <header
        className="sticky top-0 z-50 backdrop-blur-xl bg-[#F4F1EA]/90 border-b border-[#D5D0C5]/60"
        data-testid="site-header"
      >
        <div className="px-4 sm:px-6 md:px-12 lg:px-20 h-16 md:h-20 flex items-center justify-between gap-2">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0" data-testid="logo-link">
            <img
              src="/logo.jpeg"
              alt="BharatSphere Exim Logo"
              className="w-9 h-9 sm:w-11 sm:h-11 object-contain rounded shrink-0"
            />
            <div className="leading-tight min-w-0">
              <div className="font-serif-display text-base sm:text-xl text-[#1A3626] truncate tracking-tight">
                BHARATSPHERE
              </div>
              <div className="eyebrow text-[9px] sm:text-[10px]">EXIM · Murshidabad</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  `text-sm tracking-wide transition-colors ${
                    isActive ? "text-[#1A3626] font-semibold" : "text-[#4A524C] hover:text-[#1A3626]"
                  }`
                }
                data-testid={`nav-${n.label.toLowerCase()}`}
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#1A3626] text-[#F4F1EA] hover:bg-[#24412F] transition-all duration-300 px-5 lg:px-6 py-3 text-sm font-medium"
              data-testid="header-enquiry-cta"
            >
              Buyer Enquiry <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-[#1A3626]"
            onClick={() => setOpen(!open)}
            data-testid="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-[#D5D0C5]/60 bg-[#F4F1EA] px-6 py-6 space-y-4" data-testid="mobile-menu">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className="block text-lg font-serif-display text-[#1A3626]"
                data-testid={`mobile-nav-${n.label.toLowerCase()}`}
              >
                {n.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#1A3626] text-[#F4F1EA] px-6 py-3 text-sm font-medium mt-3"
              data-testid="mobile-enquiry-cta"
            >
              Buyer Enquiry <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="bg-[#1A3626] text-[#F4F1EA] mt-16 md:mt-24" data-testid="site-footer">
        <div className="px-6 md:px-12 lg:px-20 py-16 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-4">
            <div className="font-serif-display text-2xl md:text-3xl tracking-tight">{CONTACT.company}</div>
            <p className="text-[#F4F1EA]/70 text-sm leading-relaxed max-w-md">
              Custom-Printed & Value-Added Jute Bags — Direct from India to Europe. Trading exporter based in
              Bengal's jute heartland.
            </p>
            <div className="pt-2 space-y-2 text-sm">
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-2 text-[#F4F1EA]/85 hover:text-[#F4F1EA] transition-colors"
                data-testid="footer-email-link"
              >
                <Mail className="w-4 h-4" /> {CONTACT.email}
              </a>
              <div className="flex flex-wrap gap-3 text-sm">
                <a
                  href={`tel:${CONTACT.phoneDial}`}
                  className="inline-flex items-center gap-2 text-[#F4F1EA]/85 hover:text-[#F4F1EA]"
                  data-testid="footer-phone-link"
                >
                  <Phone className="w-4 h-4" /> Call {CONTACT.phoneDisplay}
                </a>
                <a
                  href={`https://wa.me/${CONTACT.phoneDial.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[#C98E4B] hover:text-[#E4A65B]"
                  data-testid="footer-whatsapp-link"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow text-[#C98E4B] mb-4">Explore</div>
            <ul className="space-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-[#F4F1EA]/80 hover:text-[#F4F1EA]">{n.label}</Link>
                </li>
              ))}
              <li>
                <Link to="/admin/login" className="text-[#F4F1EA]/50 hover:text-[#F4F1EA]/80 text-xs" data-testid="admin-link">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="eyebrow text-[#C98E4B] mb-4">Registered Office</div>
            <address className="not-italic text-sm text-[#F4F1EA]/80 space-y-1 leading-relaxed">
              <div>Murshidabad</div>
              <div>West Bengal, India</div>
              <div className="pt-2 text-[#F4F1EA]/60">Trading Exporter</div>
            </address>
          </div>
        </div>
        <div className="border-t border-[#F4F1EA]/10 px-6 md:px-12 lg:px-20 py-5 text-xs text-[#F4F1EA]/60 flex flex-col md:flex-row justify-between gap-2">
          <span data-testid="footer-brand-line">
            {CONTACT.company} | {CONTACT.city} | {CONTACT.role}
          </span>
          <span>© {new Date().getFullYear()} All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
