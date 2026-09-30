import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productsApi } from "../lib/api";
import { ArrowUpRight, Loader2 } from "lucide-react";

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

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productsApi.list().then(setProducts).finally(() => setLoading(false));
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-20 py-16 md:py-24" data-testid="products-page">
      <div className="max-w-3xl mb-12 md:mb-16">
        <div className="eyebrow mb-4">The Range</div>
        <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-[#1A3626] leading-[1.02]">
          Three specialised lines,<br />
          <span className="italic">built for Global Buyers.</span>
        </h1>
        <p className="text-[#4A524C] mt-5 max-w-xl text-sm sm:text-base">
          Every item is manufactured and finished in Bengal's jute belt and shipped direct from India.
          Flexible MOQs across all categories — contact us for your specific order size.
        </p>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-[#1A3626]" />
        </div>
      ) : (
        CATEGORY_ORDER.map((cat, idx) => {
          const items = products.filter((p) => p.category === cat.key);
          const isLead = cat.lead;
          const takeCount = isLead ? 3 : 2;
          return (
            <section
              key={cat.key}
              className={idx > 0 ? "mt-20 md:mt-28" : ""}
              data-testid={`category-block-${cat.key.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}
            >
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 md:mb-10 border-b border-[#D5D0C5] pb-6">
                <div className="max-w-2xl">
                  <div className="eyebrow text-[#C98E4B] mb-3">
                    {isLead ? "Flagship · 01" : idx === 1 ? "02" : "03"}
                  </div>
                  <h2 className={`font-serif-display text-[#1A3626] leading-tight ${
                    isLead ? "text-3xl sm:text-4xl md:text-5xl" : "text-2xl sm:text-3xl md:text-4xl"
                  }`}>
                    {cat.key}
                  </h2>
                  <p className="text-[#4A524C] mt-3 max-w-xl text-sm sm:text-base">{cat.positioning}</p>
                  <p className="mt-2 text-xs sm:text-sm text-[#1A3626] font-medium">
                    Flexible MOQs — contact us for your order size.
                  </p>
                </div>
              </div>

              <div className={`grid gap-6 lg:gap-8 ${isLead
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1 sm:grid-cols-2"
                }`}>
                {items.slice(0, takeCount).map((p, i) => (
                  <Link
                    key={p.id}
                    to={`/products/${p.slug}`}
                    className="group relative flex flex-col h-full bg-white border border-[#D5D0C5] hover:border-[#1A3626]/40 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(26,54,38,0.12)] overflow-hidden"
                    style={{ animationDelay: `${i * 65}ms` }}
                    data-testid={`product-card-${p.slug}`}
                  >
                    {/* 1. Studio Stage with Badges & Ambient Lighting */}
                    <div className="relative h-72 sm:h-80 bg-gradient-to-b from-[#FBF9F5] to-[#FFFFFF] p-8 flex items-center justify-center overflow-hidden border-b border-[#D5D0C5]/50">
                      {/* Subtle Category Pill Badge */}
                      <span className="absolute top-3.5 left-3.5 z-10 text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 bg-[#1A3626]/5 text-[#1A3626] border border-[#1A3626]/10 backdrop-blur-sm">
                        {p.category || "Export Line"}
                      </span>


                      {/* Product Packshot */}
                      <img
                        src={p.image_url}
                        alt={p.name}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.08)] group-hover:scale-105 transition-transform duration-700 ease-out"
                      />

                      {/* Quick Hover Overlay Cue */}
                      <div className="absolute inset-0 bg-[#1A3626]/0 group-hover:bg-[#1A3626]/[0.02] transition-colors duration-500 pointer-events-none" />
                    </div>

                    {/* 2. Editorial Product Information */}
                    <div className="p-6 flex flex-col flex-1 justify-between bg-white">
                      <div>
                        {/* Eyebrow */}
                        <div className="text-[11px] font-semibold uppercase tracking-widest text-[#C98E4B] mb-1.5">
                          Loom-Woven Jute
                        </div>

                        {/* Title */}
                        <h3 className="font-serif-display text-xl sm:text-2xl text-[#1A3626] leading-snug group-hover:text-[#24412F] transition-colors min-h-[3.25rem]">
                          {p.name}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-[#4A524C] leading-relaxed mt-2 line-clamp-2">
                          {p.short_description}
                        </p>
                      </div>

                      {/* 3. Interactive Footer CTA */}
                      <div className="pt-6 mt-4 border-t border-[#D5D0C5]/40 flex items-center justify-between">
    
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A3626] group-hover:text-[#C98E4B] transition-colors">
                          View Specs
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}
