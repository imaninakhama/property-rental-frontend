import { KES } from "../data/constants";

export function Btn({ children, onClick, variant="primary", size="md", disabled, full, type="button" }) {
  const base = "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
  const sizes = { sm:"px-3 py-1.5 text-sm", md:"px-4 py-2 text-sm", lg:"px-6 py-3 text-base" };
  const variants = {
    primary:  "bg-[#E8634A] hover:bg-[#d4563f] text-white focus:ring-[#E8634A]",
    outline:  "border border-[#1B2B4B] text-[#1B2B4B] hover:bg-[#1B2B4B] hover:text-white focus:ring-[#1B2B4B]",
    ghost:    "border border-gray-200 text-gray-500 hover:bg-gray-100 focus:ring-gray-300",
    danger:   "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500",
    success:  "bg-emerald-500 hover:bg-emerald-600 text-white focus:ring-emerald-500",
    dark:     "bg-[#1B2B4B] hover:bg-[#243660] text-white focus:ring-[#1B2B4B]",
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]} ${full ? "w-full" : ""}`}>
      {children}
    </button>
  );
}

export function Input({ label, type="text", placeholder, value, onChange, onKeyDown, min, max, maxLength, rows }) {
  const cls = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E8634A] transition-colors bg-white text-[#1B2B4B]";
  return (
    <div className="mb-4">
      {label && <label className="block text-xs font-semibold text-[#1B2B4B] mb-1.5 uppercase tracking-wide">{label}</label>}
      {rows
        ? <textarea rows={rows} placeholder={placeholder} value={value} onChange={onChange} className={cls + " resize-y"} />
        : <input type={type} placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDown}
            min={min} max={max} maxLength={maxLength} className={cls} />
      }
    </div>
  );
}

export function Select({ label, value, onChange, children }) {
  return (
    <div className="mb-4">
      {label && <label className="block text-xs font-semibold text-[#1B2B4B] mb-1.5 uppercase tracking-wide">{label}</label>}
      <select value={value} onChange={onChange}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#E8634A] transition-colors bg-white text-[#1B2B4B]">
        {children}
      </select>
    </div>
  );
}

export function Card({ children, className="" }) {
  return <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${className}`}>{children}</div>;
}

export function Badge({ children, color="gray" }) {
  const colors = {
    gray:   "bg-gray-100 text-gray-600",
    green:  "bg-emerald-50 text-emerald-700",
    blue:   "bg-blue-50 text-blue-700",
    orange: "bg-orange-50 text-orange-700",
    coral:  "bg-[#fdf0ed] text-[#E8634A]",
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color]}`}>{children}</span>;
}

export function Alert({ children, type="success" }) {
  const styles = {
    success: "bg-emerald-50 text-emerald-800 border border-emerald-200",
    error:   "bg-red-50 text-red-800 border border-red-200",
    info:    "bg-blue-50 text-blue-800 border border-blue-200",
  };
  return <div className={`px-4 py-3 rounded-lg text-sm mb-4 ${styles[type]}`}>{children}</div>;
}

export function Toggle({ checked, onChange, label }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-700">{label}</span>
      <button onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none ${checked ? "bg-[#E8634A]" : "bg-gray-200"}`}>
        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${checked ? "left-5" : "left-0.5"}`} />
      </button>
    </div>
  );
}

export function StarRating({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(s => (
        <span key={s} onClick={() => onChange && onChange(s)}
          className={`text-2xl ${onChange ? "cursor-pointer" : ""} ${s <= value ? "text-amber-400" : "text-gray-200"}`}>
          ★
        </span>
      ))}
    </div>
  );
}

export function StatusBadge({ status }) {
  const map = { confirmed:"green", pending:"orange", cancelled:"gray", completed:"blue" };
  return <Badge color={map[status] || "gray"}>{status}</Badge>;
}

export function StatCard({ value, label }) {
  return (
    <Card className="p-6">
      <div className="text-3xl font-bold text-[#E8634A] font-serif">{value}</div>
      <div className="text-gray-500 text-sm mt-1">{label}</div>
    </Card>
  );
}

export function PropertyCard({ property, onClick }) {
  return (
    <Card className="cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-200" >
      <div onClick={onClick}>
        <div className="h-48 flex items-center justify-center text-5xl font-bold font-serif text-[#1B2B4B]/20"
          style={{ background: `hsl(${property.id * 47}, 35%, 93%)` }}>
          {property.title[0]}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-[#1B2B4B] font-serif mb-0.5">{property.title}</h3>
          <p className="text-gray-400 text-xs mb-2">{property.location}</p>
          <div className="flex flex-wrap gap-1 mb-3">
            {property.smoking      && <Badge color="gray">Smoking OK</Badge>}
            {property.petFriendly  && <Badge color="green">Pet Friendly</Badge>}
            {property.disabilityAccess && <Badge color="blue">Accessible</Badge>}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#E8634A] font-bold text-sm">{KES(property.price)}<span className="text-gray-400 font-normal">/night</span></span>
            <span className="text-xs text-gray-400 flex items-center gap-0.5"><span className="text-amber-400">★</span>{property.rating} ({property.reviews})</span>
          </div>
        </div>
      </div>
    </Card>
  );
}