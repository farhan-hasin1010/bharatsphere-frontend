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
            Bharatsphere Exim is a Murshidabad-based trading exporter specialising in custom-printed and
            value-added jute bags for European buyers. We ship wine carriers, promotional bags, and JC-blend
            lifestyle lines direct from India.
          </p>
        </div>
      </section>

      <section className="relative">
        <img src={MAIN_IMG} alt="Warehouse" className="w-full h-64 sm:h-80 md:h-[560px] object-cover" />
      </section>

      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24" data-testid="credentials-detail">
        <div className="eyebrow mb-5">Why Bharatsphere</div>
        <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#1A3626] leading-tight max-w-2xl">
          Registered, compliant, and <span className="italic">export-ready.</span>
        </h2>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-10">
          {CREDENTIALS.map((c) => (
            <li key={c.label} className="flex items-center gap-3 border border-[#D5D0C5] bg-white px-4 py-3">
              <span className="w-8 h-8 bg-[#1A3626] text-[#F4F1EA] grid place-items-center shrink-0">{c.icon}</span>
              <span className="text-xs md:text-sm text-[#1A251D] leading-snug">{c.label}</span>
            </li>
          ))}
        </ul>
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
          <Step n="04" title="Export & Delivery" body="Fumigation, documentation, and freight coordinated in-house. Direct FOB or CIF to your European port." />
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-24 text-center">
        <h2 className="font-serif-display text-3xl sm:text-4xl md:text-6xl text-[#1A3626] leading-tight max-w-3xl mx-auto">
          Source direct — <span className="italic">no middlemen.</span>
        </h2>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-[#1A3626] text-[#F4F1EA] hover:bg-[#24412F] transition-all px-8 md:px-10 py-4 text-sm font-medium mt-8 md:mt-10"
          data-testid="about-enquiry-cta"
        >
          Send a Buyer Enquiry <ArrowUpRight className="w-4 h-4" />
        </Link>
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
