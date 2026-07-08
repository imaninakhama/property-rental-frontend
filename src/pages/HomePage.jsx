import { useState } from "react";
import { useRouter } from "../context/AuthContext";
import { PROPERTIES, LOCATIONS } from "../data/constants";
import { Btn, PropertyCard } from "../components/common";

export function HomePage() {
  const { navigate } = useRouter();
  const [search, setSearch] = useState("");

  return (
    <div>
      {/* Hero */}
      <div className="bg-linear-to-br from-[#1B2B4B] to-[#2d4a7a] text-white py-24 px-4 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-[#E8634A] text-sm font-semibold tracking-widest uppercase mb-3">Kenya's Rental Platform</p>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif leading-tight mb-4">
            Find Your Perfect <span className="text-[#E8634A]">Stay</span>
          </h1>
          <p className="text-white/70 text-lg mb-8">Discover unique homes, villas, and cottages across Kenya — from the coast to the highlands.</p>
          <div className="bg-white rounded-full flex items-center gap-2 px-5 py-2 max-w-lg mx-auto shadow-xl">
            <input value={search} onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === "Enter" && navigate("/properties")}
              placeholder="Search by location or property name…"
              className="flex-1 text-[#1B2B4B] text-sm outline-none bg-transparent py-1" />
            <Btn variant="primary" size="sm" onClick={() => navigate("/properties")}>Search</Btn>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Offer Banner */}
        <div className="bg-linear-to-r from-[#E8634A] to-[#c84f38] text-white rounded-2xl p-8 text-center mb-12">
          <h3 className="text-2xl font-bold font-serif mb-1">Summer Special — Up to 30% Off</h3>
          <p className="text-white/80 mb-4">Book any stay of 5+ nights before 31st August</p>
          <Btn variant="dark" onClick={() => navigate("/properties")}>Browse Deals</Btn>
        </div>

        {/* Locations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold font-serif text-[#1B2B4B] mb-6">Recommended Locations</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {LOCATIONS.map(l => (
              <button key={l} onClick={() => { setSearch(l); navigate("/properties"); }}
                className="bg-white border border-gray-100 rounded-xl py-4 px-3 text-sm font-medium text-[#1B2B4B] hover:-translate-y-1 transition-all shadow-sm text-center">
                {l}
              </button>
            ))}
          </div>
        </section>

        {/* Popular */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-serif text-[#1B2B4B]">Popular Accommodations</h2>
            <Btn variant="outline" size="sm" onClick={() => navigate("/properties")}>View All</Btn>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROPERTIES.slice(0, 4).map(p => <PropertyCard key={p.id} property={p} onClick={() => navigate(`/properties/${p.id}`)} />)}
          </div>
        </section>

        {/* New */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold font-serif text-[#1B2B4B] mb-6">New Accommodations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {PROPERTIES.slice(4).map(p => <PropertyCard key={p.id} property={p} onClick={() => navigate(`/properties/${p.id}`)} />)}
          </div>
        </section>

        {/* Become Host CTA */}
        <section className="border border-[#1B2B4B] rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold font-serif text-[#1B2B4B] mb-2">Own a property in Kenya?</h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">List your space on StayEase and start earning from travellers across Kenya and beyond.</p>
          <Btn variant="primary" size="lg" onClick={() => navigate("/become-host")}>Start Hosting Today</Btn>
        </section>
      </div>
    </div>
  );
}