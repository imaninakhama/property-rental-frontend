import { useState } from "react";
import { useAuth, useRouter } from "../context/AuthContext";
import { PROPERTIES, BOOKINGS, KES } from "../data/constants";
import { Card, Btn, Input, Badge, Alert, StarRating, StatusBadge, PropertyCard } from "../components/common";

// ─── PROPERTIES ───────────────────────────────────────────────────────────────
export function PropertiesPage() {
  const { navigate } = useRouter();
  const [search, setSearch] = useState("");
  const [minP, setMinP] = useState("");
  const [maxP, setMaxP] = useState("");
  const [pet, setPet] = useState("");
  const [smoke, setSmoke] = useState("");
  const [sort, setSort] = useState("rating");

  const results = PROPERTIES.filter(p => {
    if (search && !p.location.toLowerCase().includes(search.toLowerCase()) && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (minP && p.price < +minP) return false;
    if (maxP && p.price > +maxP) return false;
    if (smoke === "true" && !p.smoking) return false;
    if (pet === "true" && !p.petFriendly) return false;
    return true;
  }).sort((a,b) => sort==="price_asc"?a.price-b.price:sort==="price_desc"?b.price-a.price:b.rating-a.rating);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold font-serif text-[#1B2B4B] mb-6">Browse Accommodations</h1>

      <Card className="mb-6 p-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Search</label>
            <input 
              placeholder="Location or name…" 
              value={search} 
              onChange={e => setSearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E8634A]" 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Min (KES)</label>
            <input 
              type="number" 
              placeholder="0" 
              value={minP} 
              onChange={e => setMinP(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E8634A]" 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Max (KES)</label>
            <input 
              type="number" 
              placeholder="50000" 
              value={maxP} 
              onChange={e => setMaxP(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E8634A]" 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Smoking</label>
            <select 
              value={smoke} 
              onChange={e => setSmoke(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E8634A]"
            >
              <option value="">Any</option>
              <option value="true">Allowed</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Pets</label>
            <select 
              value={pet} 
              onChange={e => setPet(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E8634A]"
            >
              <option value="">Any</option>
              <option value="true">Friendly</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Sort By</label>
            <select 
              value={sort} 
              onChange={e => setSort(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E8634A]"
            >
              <option value="rating">Top Rated</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </Card>

      <p className="text-sm text-gray-400 mb-4">{results.length} {results.length === 1 ? "property" : "properties"} found</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {results.map(p => (
          <PropertyCard key={p.id} property={p} onClick={() => navigate(`/properties/${p.id}`)} />
        ))}
      </div>
      
      {results.length === 0 && (
        <p className="text-center text-gray-400 py-16">No properties match your filters.</p>
      )}
    </div>
  );
}

// ─── PROPERTY DETAIL ──────────────────────────────────────────────────────────
export function PropertyDetailPage({ params }) {
  const { navigate } = useRouter();
  const { user } = useAuth();
  const property = PROPERTIES.find(p => p.id === params.id);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [booked, setBooked] = useState(false);
  const [reviews, setReviews] = useState([
    { id: 1, name: "Alice Wambua", rating: 5, comment: "Absolutely stunning! Would book again.", date: "2025-06-15" },
    { id: 2, name: "Brian Mwangi", rating: 4, comment: "Great location and very clean.", date: "2025-05-20" },
  ]);

  if (!property) {
    return <div className="max-w-7xl mx-auto px-4 py-10"><p>Property not found.</p></div>;
  }

  const nights = checkIn && checkOut ? Math.max(0, (new Date(checkOut) - new Date(checkIn)) / (86400000)) : 0;
  const subtotal = nights * property.price;
  const fee = Math.round(subtotal * 0.1);
  const total = subtotal + fee;
  const DEFAULT = ["WiFi", "Kitchen"];
  const EXTRAS = property.amenities.filter(a => !DEFAULT.includes(a));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <button className="text-sm text-gray-400 hover:text-[#1B2B4B] mb-6 flex items-center gap-1" 
        onClick={() => navigate("/properties")}>
        ← Back to listings
      </button>

      <div className="grid lg:grid-cols-5 gap-10">
        {/* Left col */}
        <div className="lg:col-span-3">
          <div className="h-64 rounded-2xl flex items-center justify-center text-7xl font-bold font-serif text-[#1B2B4B]/20 mb-6"
            style={{ background: `hsl(${property.id * 47}, 35%, 93%)` }}>
            {property.title[0]}
          </div>

          <h1 className="text-2xl font-bold font-serif text-[#1B2B4B] mb-1">{property.title}</h1>
          <p className="text-gray-400 text-sm mb-3">{property.location} · Hosted by {property.host}</p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {property.smoking && <Badge color="gray">Smoking Allowed</Badge>}
            {property.petFriendly && <Badge color="green">Pet Friendly</Badge>}
            {property.disabilityAccess && <Badge color="blue">Disability Access</Badge>}
          </div>

          <div className="flex gap-6 text-sm mb-6">
            <div><span className="font-bold text-[#1B2B4B]">{property.bedrooms}</span> <span className="text-gray-400">Bedrooms</span></div>
            <div><span className="font-bold text-[#1B2B4B]">{property.bathrooms}</span> <span className="text-gray-400">Bathrooms</span></div>
            <div><span className="font-bold text-[#1B2B4B]">{property.maxGuests}</span> <span className="text-gray-400">Max Guests</span></div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-6">{property.description}</p>

          <h3 className="font-bold text-[#1B2B4B] mb-3">Amenities</h3>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Default Services</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {DEFAULT.map(a => (
              <span key={a} className="px-3 py-1.5 bg-gray-50 rounded-lg text-xs text-gray-600 border border-gray-100">{a}</span>
            ))}
          </div>
          {EXTRAS.length > 0 && (
            <>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Extras</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {EXTRAS.map(a => (
                  <span key={a} className="px-3 py-1.5 bg-[#fdf0ed] rounded-lg text-xs text-[#E8634A] border border-[#f5c9bf]">{a}</span>
                ))}
              </div>
            </>
          )}

          <div className="border-t border-gray-100 mt-6 pt-6">
            <h3 className="font-bold text-[#1B2B4B] mb-4">Reviews ({reviews.length})</h3>
            {reviews.map(r => (
              <div key={r.id} className="mb-5 pb-5 border-b border-gray-100 last:border-0">
                <div className="flex justify-between items-start mb-1">
                  <strong className="text-sm text-[#1B2B4B]">{r.name}</strong>
                  <span className="text-xs text-gray-400">{r.date}</span>
                </div>
                <StarRating value={r.rating} />
                <p className="text-sm text-gray-600 mt-1.5">{r.comment}</p>
              </div>
            ))}

            {user?.role === "customer" && (
              <Card className="p-5 mt-4">
                <h4 className="font-semibold text-[#1B2B4B] mb-3">Leave a Review</h4>
                <StarRating value={rating} onChange={setRating} />
                <div className="mt-3 mb-3">
                  <textarea rows={3} placeholder="Share your experience…" value={comment} 
                    onChange={e => setComment(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E8634A] resize-none" />
                </div>
                <Btn variant="primary" size="sm" disabled={!rating || !comment}
                  onClick={() => {
                    setReviews([...reviews, { 
                      id: Date.now(), 
                      name: user.name, 
                      rating, 
                      comment, 
                      date: new Date().toISOString().split("T")[0] 
                    }]);
                    setRating(0);
                    setComment("");
                  }}>
                  Post Review
                </Btn>
              </Card>
            )}
          </div>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-2">
          <div className="sticky top-20">
            <Card className="p-6">
              <div className="flex items-baseline justify-between mb-5">
                <span className="text-2xl font-bold text-[#E8634A]">
                  {KES(property.price)}<span className="text-sm text-gray-400 font-normal">/night</span>
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <span className="text-amber-400">★</span>{property.rating} ({property.reviews})
                </span>
              </div>

              {booked ? (
                <Alert type="success">Booking confirmed! Check your dashboard.</Alert>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Check-in</label>
                      <input 
                        type="date" 
                        value={checkIn} 
                        min={new Date().toISOString().split("T")[0]}
                        onChange={e => setCheckIn(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E8634A]" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Check-out</label>
                      <input 
                        type="date" 
                        value={checkOut} 
                        min={checkIn || new Date().toISOString().split("T")[0]}
                        onChange={e => setCheckOut(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E8634A]" 
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Guests</label>
                    <select 
                      value={guests} 
                      onChange={e => setGuests(+e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E8634A]"
                    >
                      {Array.from({ length: property.maxGuests }, (_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1} guest{i > 0 ? "s" : ""}</option>
                      ))}
                    </select>
                  </div>

                  {nights > 0 && (
                    <div className="bg-gray-50 rounded-xl p-4 mb-4 text-sm">
                      <div className="flex justify-between mb-1.5">
                        <span className="text-gray-500">{KES(property.price)} × {nights} night{nights > 1 ? "s" : ""}</span>
                        <span>{KES(subtotal)}</span>
                      </div>
                      <div className="flex justify-between mb-3">
                        <span className="text-gray-500">Service fee (10%)</span>
                        <span>{KES(fee)}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-3 flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-[#E8634A]">{KES(total)}</span>
                      </div>
                    </div>
                  )}

                  <Btn variant="primary" full disabled={!checkIn || !checkOut || nights <= 0}
                    onClick={() => {
                      if (!user) {
                        navigate("/login");
                        return;
                      }
                      setBooked(true);
                    }}>
                    {user ? "Reserve Now" : "Sign in to Book"}
                  </Btn>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}