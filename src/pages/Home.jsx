import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productsApi } from "../lib/api";
import { ArrowUpRight, ShieldCheck, FileCheck2, Award, BadgeCheck } from "lucide-react";

const HERO_BG = "https://images.pexels.com/photos/7598537/pexels-photo-7598537.jpeg";

const CATEGORY_ORDER = [
  {
    key: "Wine & Bottle Carriers",
    positioning: "Retail-ready jute carriers for wineries, gifting brands, and hospitality — our flagship line.",
    lead: true,
  },
  {
    key: "Custom-Printed Promotional Bags",
    positioning: "Screen and digital-print jute bags for events, launches, and corporate campaigns.",
  },
  {
    key: "JC-Blend Lifestyle Bags",
    positioning: "Softer jute-cotton blend bags for retail, boutique, and lifestyle brands.",
  },
];

const CREDENTIALS = [
  { icon: <FileCheck2 className="w-4 h-4" />, label: "IEC Registered Exporter" },
  { icon: <BadgeCheck className="w-4 h-4" />, label: "JPDEPC RCMC Member" },
  { icon: <Award className="w-4 h-4" />, label: "OEKO-TEX® Standard 100 (In Progress)" },
  { icon: <ShieldCheck className="w-4 h-4" />, label: "GST / LUT Compliant" },
];

const MARQUEE = [
  "India → Europe",
  "IEC Registered",
  "JPDEPC RCMC",
  "GST · LUT Compliant",
  "OEKO-TEX in Progress",
  "Custom Printing",
  "Wine Carrier Specialists",
  "Direct Exporter",
];

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productsApi.list().then(setProducts).catch(() => {});
  }, []);

  const byCategory = (cat) => products.filter((p) => p.category === cat);

  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section className="relative overflow-hidden grain" data-testid="hero-section">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_BG})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F4F1EA]/95 via-[#F4F1EA]/85 to-[#F4F1EA]/60" />
        <div className="relative px-6 md:px-12 lg:px-20 pt-16 sm:pt-24 md:pt-32 pb-24 md:pb-36">
          <div className="max-w-4xl space-y-6 sm:space-y-8 fade-up">
            <div className="eyebrow">Murshidabad · West Bengal · India</div>
            <h1 className="font-serif-display text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.98] text-[#1A3626] tracking-tight">
              Custom-Printed &<br />
              Value-Added <span className="italic">Jute Bags.</span>
            </h1>
            <p className="text-base md:text-xl text-[#4A524C] max-w-2xl leading-relaxed">
              Direct from India to Europe. Bharatsphere Exim is a Murshidabad-based trading exporter
              specialising in wine carriers, custom-printed promotional bags, and JC-blend lifestyle
              lines.
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-[#1A3626] text-[#F4F1EA] hover:bg-[#24412F] transition-all px-6 sm:px-8 py-3 sm:py-4 text-sm font-medium"
                data-testid="hero-explore-cta"
              >
                See the Range <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-[#1A3626] text-[#1A3626] hover:bg-[#1A3626] hover:text-[#F4F1EA] transition-all px-6 sm:px-8 py-3 sm:py-4 text-sm font-medium"
                data-testid="hero-enquiry-cta"
              >
                Send a Buyer Enquiry
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-[#D5D0C5] bg-[#EAE5D9] overflow-hidden" data-testid="trust-marquee">
        <div className="marquee-track py-5">
          {[...MARQUEE, ...MARQUEE].map((s, i) => (
            <span key={i} className="font-serif-display italic text-xl md:text-2xl text-[#1A3626] px-6 md:px-10 whitespace-nowrap">
              {s} <span className="text-[#C98E4B] ml-6 md:ml-10">·</span>
            </span>
          ))}
        </div>
      </section>

      {/* CREDENTIALS BADGE ROW */}
      <section className="px-6 md:px-12 lg:px-20 py-12 md:py-16 border-b border-[#D5D0C5]" data-testid="credentials-section">
        <div className="eyebrow mb-5 text-center md:text-left">Why Bharatsphere</div>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4" data-testid="credentials-badges">
          {CREDENTIALS.map((c) => (
            <li
              key={c.label}
              className="flex items-center gap-3 border border-[#D5D0C5] bg-white px-4 py-3 hover:border-[#1A3626] transition-colors"
              data-testid={`credential-${c.label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}
            >
              <span className="w-8 h-8 bg-[#1A3626] text-[#F4F1EA] grid place-items-center shrink-0">{c.icon}</span>
              <span className="text-xs md:text-sm text-[#1A251D] leading-snug">{c.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* CATEGORY SHOWCASE */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-28" data-testid="categories-section">
        {CATEGORY_ORDER.map((cat, idx) => {
          const items = byCategory(cat.key);
          const isLead = cat.lead;
          return (
            <div
              key={cat.key}
              className={`${idx > 0 ? "mt-20 md:mt-32" : ""}`}
              data-testid={`category-${cat.key.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}
            >
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-12">
                <div className="max-w-2xl">
                  <div className="eyebrow text-[#C98E4B] mb-3">
                    {isLead ? "Flagship Line · 01" : idx === 1 ? "02" : "03"}
                  </div>
                  <h2 className={`font-serif-display text-[#1A3626] leading-[1.02] tracking-tight ${
                    isLead ? "text-4xl sm:text-5xl md:text-6xl" : "text-3xl sm:text-4xl md:text-5xl"
                  }`}>
                    {cat.key}
                  </h2>
                  <p className="text-[#4A524C] mt-4 max-w-xl">{cat.positioning}</p>
                  <p className="mt-3 text-xs sm:text-sm text-[#1A3626] font-medium">
                    Flexible MOQs — contact us for your order size.
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#1A3626] border-b border-[#1A3626] pb-1 self-start"
                  data-testid={`cta-${cat.key.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                >
                  Enquire about this range <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              <div className={`grid gap-4 sm:gap-6 ${
                isLead
                  ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                  : "grid-cols-1 sm:grid-cols-2 md:grid-cols-2"
              }`}>
                {items.slice(0, isLead ? 3 : 2).map((p, i) => (
                  <Link
                    key={p.id}
                    to={`/products/${p.slug}`}
                    className="group relative overflow-hidden bg-white border border-[#D5D0C5] hover:shadow-[0_12px_40px_rgba(26,54,38,0.10)] transition-all fade-up"
                    style={{ animationDelay: `${i * 80}ms` }}
                    data-testid={`product-tile-${p.slug}`}
                  >
                    <div className={`overflow-hidden ${isLead && i === 0 ? "h-64 sm:h-80 md:h-96" : "h-56 sm:h-64 md:h-72"}`}>
                      <img
                        src={p.image_url}
                        alt={p.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1000ms] ease-out"
                      />
                    </div>
                    <div className="p-5 sm:p-6">
                      <h3 className="font-serif-display text-lg sm:text-xl md:text-2xl text-[#1A3626] leading-tight">
                        {p.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#4A524C] mt-1.5 line-clamp-2">{p.short_description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-24 text-center bg-[#EAE5D9]" data-testid="final-cta">
        <div className="eyebrow mb-4">Ready to source?</div>
        <h2 className="font-serif-display text-3xl sm:text-4xl md:text-6xl text-[#1A3626] leading-[1.05] max-w-3xl mx-auto">
          Send us your brief.<br />
          <span className="italic">We respond within 24 hours.</span>
        </h2>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-[#1A3626] text-[#F4F1EA] hover:bg-[#24412F] transition-all px-8 md:px-10 py-4 text-sm font-medium mt-8 md:mt-10"
          data-testid="bottom-enquiry-cta"
        >
          Buyer Enquiry <ArrowUpRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
