import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { productsApi } from "../lib/api";
import QuoteDialog from "../components/QuoteDialog";
import { ArrowLeft, ArrowUpRight, Loader2 } from "lucide-react";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    setLoading(true);
    productsApi
      .get(slug)
      .then(async (p) => {
        setProduct(p);
        setActiveImage(p.image_url);
        try {
          const all = await productsApi.list({ category: p.category });
          setRelated(all.filter((x) => x.slug !== p.slug).slice(0, 3));
        } catch {}
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="py-40 flex justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-[#1A3626]" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="px-6 md:px-20 py-32 text-center" data-testid="not-found">
        <h1 className="font-serif-display text-4xl text-[#1A3626]">Product not found</h1>
        <Link to="/products" className="inline-block mt-6 text-sm border-b border-[#1A3626] text-[#1A3626]">
          Back to catalog
        </Link>
      </div>
    );
  }

  return (
    <div data-testid="product-detail-page">
      <div className="px-6 md:px-12 lg:px-20 pt-10">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-[#4A524C] hover:text-[#1A3626]" data-testid="back-link">
          <ArrowLeft className="w-4 h-4" /> Back to catalog
        </Link>
      </div>

      <section className="px-6 md:px-12 lg:px-20 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-7 space-y-4">
          <div className="overflow-hidden bg-white border border-[#D5D0C5]">
            <img
              src={activeImage || product.image_url}
              alt={product.name}
              className="w-full h-[420px] md:h-[640px] object-contain transition-all duration-300"
              data-testid="product-image"
            />
          </div>

          {/* Thumbnail Selectors */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex gap-3">
              {product.gallery.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 border-2 overflow-hidden bg-white transition-all ${
                    (activeImage || product.image_url) === img
                      ? "border-[#1A3626] opacity-100"
                      : "border-[#D5D0C5] opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} angle ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="md:col-span-5 space-y-8">
          <div>
            <div className="eyebrow text-[#C98E4B] mb-3">{product.category}</div>
            <h1 className="font-serif-display text-4xl md:text-5xl text-[#1A3626] leading-tight" data-testid="product-name">
              {product.name}
            </h1>
            <p className="text-[#4A524C] mt-5 leading-relaxed">{product.long_description}</p>
          </div>

          <div className="border-t border-[#D5D0C5] pt-6">
            <div className="eyebrow mb-4">Specifications</div>
            <dl className="space-y-3" data-testid="specs-table">
              {Object.entries(product.specs || {}).map(([k, v]) => (
                <div key={k} className="grid grid-cols-3 gap-4 py-2 border-b border-[#D5D0C5]/70 text-sm">
                  <dt className="col-span-1 text-[#757C78] uppercase tracking-wider text-xs">{k}</dt>
                  <dd className="col-span-2 text-[#1A251D]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setQuoteOpen(true)}
              className="inline-flex items-center gap-2 bg-[#1A3626] text-[#F4F1EA] hover:bg-[#24412F] transition-all px-8 py-4 text-sm font-medium"
              data-testid="open-quote-dialog"
            >
              Request a Quote <ArrowUpRight className="w-4 h-4" />
            </button>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-[#1A3626] text-[#1A3626] hover:bg-[#1A3626] hover:text-[#F4F1EA] transition-all px-8 py-4 text-sm font-medium"
              data-testid="general-contact-link"
            >
              Ask a Question
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="px-6 md:px-12 lg:px-20 py-20 bg-[#EAE5D9]" data-testid="related-section">
          <div className="eyebrow mb-5">You might also explore</div>
          <h3 className="font-serif-display text-3xl md:text-4xl text-[#1A3626] mb-10">Related {product.category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link
                key={r.id}
                to={`/products/${r.slug}`}
                className="group bg-white border border-[#D5D0C5] overflow-hidden"
                data-testid={`related-${r.slug}`}
              >
                <div className="h-[240px] overflow-hidden">
                  <img src={r.image_url} alt={r.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-[1000ms]" />
                </div>
                <div className="p-5">
                  <div className="eyebrow text-[#C98E4B] text-[10px] mb-1">{r.category}</div>
                  <div className="font-serif-display text-xl text-[#1A3626]">{r.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <QuoteDialog open={quoteOpen} onOpenChange={setQuoteOpen} product={product} />
    </div>
  );
}
