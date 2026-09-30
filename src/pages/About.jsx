import { Link } from "react-router-dom";
import { ArrowUpRight, ShieldCheck, FileCheck2, Award, BadgeCheck } from "lucide-react";

const MAIN_IMG = "https://images.unsplash.com/photo-1769752803940-0acb89683123";

const CREDENTIALS = [
  { icon: <FileCheck2 className="w-4 h-4" />, label: "IEC Registered Exporter" },
  { icon: <BadgeCheck className="w-4 h-4" />, label: "JPDEPC RCMC Member" },
  { icon: <Award className="w-4 h-4" />, label: "OEKO-TEX® Standard 100 (In Progress)" },
  { icon: <ShieldCheck className="w-4 h-4" />, label: "GST / LUT Compliant" },
];

export default function About() {
  return (
    <div data-testid="about-page">
      <section className="px-6 md:px-12 lg:px-20 pt-16 md:pt-28 pb-14 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
        <div className="md:col-span-8">
          <div className="eyebrow mb-4">About Bharatsphere</div>
          <h1 className="font-serif-display text-4xl sm:text-5xl md:text-7xl text-[#1A3626] leading-[0.98] tracking-tight">
            A trading exporter,<br />
            <span className="italic">rooted in Bengal's jute belt.</span>
          </h1>
        </div>
        <div className="md:col-span-4 md:self-end">
          <p className="text-[#4A524C] leading-relaxed text-sm sm:text-base">
            Bharatsphere Exim is an Indian origin, Murshidabad-based trading exporter specialising in custom-printed and
            value-added jute bags for global buyers. We ship wine carriers, promotional bags, and JC-blend
            lifestyle lines direct from India.
          </p>
        </div>
      </section>

      <section className="relative">
        <img src={MAIN_IMG} alt="Warehouse" className="w-full h-64 sm:h-80 md:h-[560px] object-cover" />
      </section>


      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 bg-[#EAE5D9]">
        <div className="md:col-span-5">
          <div className="eyebrow mb-4">How we work</div>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#1A3626] leading-tight">
            Direct from India, <span className="italic">accountable to you.</span>
          </h2>
        </div>
        <div className="md:col-span-7 space-y-6 md:space-y-8">
          <Step n="01" title="Brief & Artwork" body="Share your product, artwork, sizes, quantities, and destination. We reply within 24 hours with samples and indicative pricing." />
          <Step n="02" title="Sampling" body="We prepare physical samples of your design in the finish and print method you specify — usually within 10–14 days." />
          <Step n="03" title="Production" body="Once samples are approved, production runs at our partner units in Bengal's jute belt with staged quality checks." />
          <Step n="04" title="Export & Delivery" body="Fumigation, documentation, and freight coordinated in-house. Direct FOB or CIF to your port." />
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28 border-t border-[#D5D0C5] bg-[#FAF8F5]/60" data-testid="why-bharatsphere-section">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
            <div className="eyebrow text-[#C98E4B] mb-3">
              Why BharatSphere
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#1A3626] leading-tight">
              The Benchmark for Export-Grade Jute Packaging
            </h2>
          </div>

          {/* 4-Pillar Trust Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 01. Export-Ready */}
            <div className="bg-white border border-[#D5D0C5] p-6 sm:p-7 flex flex-col justify-between hover:border-[#1A3626]/40 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(26,54,38,0.06)] transition-all duration-300">
              <div>
                <span className="text-xs font-mono text-[#C98E4B] tracking-wider">01</span>
                <h3 className="font-serif-display text-xl text-[#1A3626] mt-3 mb-2">
                  Export-Ready
                </h3>
                <p className="text-xs sm:text-sm text-[#4A524C] leading-relaxed">
                  Quality-focused products prepared for international buyers.
                </p>
              </div>
            </div>

            {/* 02. Custom Solutions */}
            <div className="bg-white border border-[#D5D0C5] p-6 sm:p-7 flex flex-col justify-between hover:border-[#1A3626]/40 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(26,54,38,0.06)] transition-all duration-300">
              <div>
                <span className="text-xs font-mono text-[#C98E4B] tracking-wider">02</span>
                <h3 className="font-serif-display text-xl text-[#1A3626] mt-3 mb-2">
                  Custom Solutions
                </h3>
                <p className="text-xs sm:text-sm text-[#4A524C] leading-relaxed">
                  Sizes, designs, materials &amp; branding tailored to your requirements.
                </p>
              </div>
            </div>

            {/* 03. Bulk Supply */}
            <div className="bg-white border border-[#D5D0C5] p-6 sm:p-7 flex flex-col justify-between hover:border-[#1A3626]/40 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(26,54,38,0.06)] transition-all duration-300">
              <div>
                <span className="text-xs font-mono text-[#C98E4B] tracking-wider">03</span>
                <h3 className="font-serif-display text-xl text-[#1A3626] mt-3 mb-2">
                  Bulk Supply
                </h3>
                <p className="text-xs sm:text-sm text-[#4A524C] leading-relaxed">
                  Built for consistent B2B and wholesale requirements.
                </p>
              </div>
            </div>

            {/* 04. Global Focus */}
            <div className="bg-white border border-[#D5D0C5] p-6 sm:p-7 flex flex-col justify-between hover:border-[#1A3626]/40 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(26,54,38,0.06)] transition-all duration-300">
              <div>
                <span className="text-xs font-mono text-[#C98E4B] tracking-wider">04</span>
                <h3 className="font-serif-display text-xl text-[#1A3626] mt-3 mb-2">
                  Global Focus
                </h3>
                <p className="text-xs sm:text-sm text-[#4A524C] leading-relaxed">
                  Serving buyers looking for sustainable products from India.
                </p>
              </div>
            </div>
          </div>

          {/* Integrated Buyer CTA */}
          <div className="mt-14 md:mt-16 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#1A3626] text-[#F4F1EA] hover:bg-[#24412F] transition-all px-8 md:px-10 py-4 text-sm font-medium"
              data-testid="why-bharatsphere-enquiry-cta"
            >
              Send a Buyer Enquiry <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Step({ n, title, body }) {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6 border-t border-[#D5D0C5] pt-6">
      <div className="col-span-3 sm:col-span-2 font-serif-display text-2xl md:text-3xl text-[#C98E4B]">{n}</div>
      <div className="col-span-9 sm:col-span-10">
        <h3 className="font-serif-display text-xl md:text-2xl text-[#1A3626]">{title}</h3>
        <p className="text-[#4A524C] text-sm mt-2 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
