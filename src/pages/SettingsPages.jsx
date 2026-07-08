import { useState } from "react";
import { useAuth, useRouter } from "../context/AuthContext";
import { PROPERTIES } from "../data/constants";
import { Card, Btn, Input, Alert, Toggle } from "../components/common";

// ─── BECOME A HOST ────────────────────────────────────────────────────────────
export function BecomeHostPage() {
  const { user, upgradeToHost } = useAuth();
  const { navigate } = useRouter();
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const steps = ["How it works", "Requirements", "Agreement", "Activate"];

  const handleActivate = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    if (user) {
      upgradeToHost();
      setStep(5);
    } else {
      navigate("/register");
    }
    setLoading(false);
  };

  const benefits = [
    { title: "Set your own price", desc: "You decide how much to charge per night. Adjust anytime based on season or demand." },
    { title: "Flexible availability", desc: "Open your calendar when you want. Block dates you need the space yourself." },
    { title: "Secure payments", desc: "Guests pay upfront via M-Pesa or card. Funds released to you after check-in." },
    { title: "Host protection", desc: "StayEase covers property damage up to KES 500,000 under our Host Guarantee." },
  ];

  const requirements = [
    "Valid Kenyan national ID or passport",
    "Property must be located within Kenya",
    "At least one clear photo of the property",
    "Accurate description of amenities and capacity",
    "Responsive to guest inquiries within 24 hours",
    "Clean, safe, and habitable condition at all times",
  ];

  if (step === 5) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-6 font-bold text-[#E8634A] font-serif">Done!</div>
        <h2 className="text-2xl font-bold font-serif text-[#1B2B4B] mb-3">You are now a Host</h2>
        <p className="text-gray-500 mb-8">Your account has been upgraded. Start by creating your first listing.</p>
        <Btn variant="primary" size="lg" onClick={() => navigate("/host/properties/new")}>Create Your First Listing</Btn>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold font-serif text-[#1B2B4B] mb-2">Become a StayEase Host</h1>
        <p className="text-gray-500">Earn income from your property on Kenya's leading rental platform.</p>
      </div>

      <div className="flex items-center gap-0 mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold shrink-0
              ${step > i + 1 ? "bg-[#E8634A] text-white" : step === i + 1 ? "bg-[#1B2B4B] text-white" : "bg-gray-200 text-gray-500"}`}>
              {i + 1}
            </div>
            <span className={`ml-2 text-xs hidden sm:inline ${step === i + 1 ? "text-[#1B2B4B] font-semibold" : "text-gray-400"}`}>{s}</span>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-2 ${step > i + 1 ? "bg-[#E8634A]" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      <Card className="mb-6">
        <div className="p-8">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold font-serif text-[#1B2B4B] mb-6">How hosting works</h2>
              <div className="grid sm:grid-cols-2 gap-5 mb-8">
                {benefits.map((b, i) => (
                  <div key={b.title} className="border border-gray-100 rounded-xl p-5">
                    <div className="w-8 h-8 rounded-lg bg-[#fdf0ed] text-[#E8634A] font-bold text-sm flex items-center justify-center mb-3">{i + 1}</div>
                    <h4 className="font-semibold text-[#1B2B4B] mb-1">{b.title}</h4>
                    <p className="text-sm text-gray-500">{b.desc}</p>
                  </div>
                ))}
              </div>
              <div className="bg-[#f7f3ee] rounded-xl p-5 mb-6">
                <p className="text-sm text-[#1B2B4B] font-medium mb-1">Average host earnings on StayEase</p>
                <p className="text-3xl font-bold font-serif text-[#E8634A]">KES 45,000<span className="text-base text-gray-400 font-normal">/month</span></p>
                <p className="text-xs text-gray-400 mt-1">Based on active hosts listing 1–2 properties in Nairobi</p>
              </div>
              <Btn variant="primary" size="lg" full onClick={() => setStep(2)}>Continue</Btn>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold font-serif text-[#1B2B4B] mb-2">Host requirements</h2>
              <p className="text-sm text-gray-500 mb-6">Make sure you meet these requirements before listing your property.</p>
              <ul className="space-y-3 mb-8">
                {requirements.map(r => (
                  <li key={r} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">✓</span>
                    {r}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3">
                <Btn variant="ghost" onClick={() => setStep(1)}>Back</Btn>
                <Btn variant="primary" full onClick={() => setStep(3)}>I Meet These Requirements</Btn>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold font-serif text-[#1B2B4B] mb-2">Host Agreement</h2>
              <p className="text-sm text-gray-500 mb-5">Please read and accept our hosting terms before activating your account.</p>
              <div className="h-48 overflow-y-auto bg-gray-50 rounded-xl p-5 text-xs text-gray-500 leading-relaxed mb-5 border border-gray-200">
                <p className="font-semibold text-gray-700 mb-2">StayEase Host Terms & Conditions</p>
                <p className="mb-3">By becoming a host on StayEase, you agree to maintain your property in a clean, safe, and habitable condition at all times. You agree to provide accurate descriptions and photographs of your property and to honour confirmed bookings except in cases of genuine emergency.</p>
                <p className="mb-3">StayEase charges a 10% service fee on each completed booking. Payouts are processed within 24 hours of guest check-in via M-Pesa or bank transfer to your registered account.</p>
                <p className="mb-3">Hosts are responsible for complying with all applicable Kenyan laws, including the Tourism Act, local county regulations, and any applicable tax obligations such as Withholding Tax on rental income.</p>
                <p className="mb-3">StayEase reserves the right to remove listings that violate our community standards or receive repeated negative reviews. Disputes between hosts and guests will be mediated by StayEase support.</p>
                <p>The Host Guarantee covers accidental property damage up to KES 500,000 per booking. It does not cover theft, wear and tear, or damage caused by events outside normal guest use.</p>
              </div>
              <label className="flex items-start gap-3 cursor-pointer mb-6">
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                  className="mt-0.5 accent-[#E8634A] w-4 h-4" />
                <span className="text-sm text-gray-600">I have read and agree to the StayEase Host Terms & Conditions.</span>
              </label>
              <div className="flex gap-3">
                <Btn variant="ghost" onClick={() => setStep(2)}>Back</Btn>
                <Btn variant="primary" full onClick={() => setStep(4)} disabled={!agreed}>Continue</Btn>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#fdf0ed] flex items-center justify-center mx-auto mb-5">
                <span className="text-2xl text-[#E8634A] font-bold">H</span>
              </div>
              <h2 className="text-xl font-bold font-serif text-[#1B2B4B] mb-2">Ready to activate?</h2>
              <p className="text-sm text-gray-500 mb-8 max-w-xs mx-auto">
                {user
                  ? `We'll upgrade your account (${user.email}) to a host account right now.`
                  : "You'll need an account first. We'll take you to registration and set you up as a host."}
              </p>
              <div className="flex gap-3 justify-center">
                <Btn variant="ghost" onClick={() => setStep(3)}>Back</Btn>
                <Btn variant="primary" size="lg" onClick={handleActivate} disabled={loading}>
                  {loading ? "Activating…" : user ? "Activate Host Account" : "Create Host Account"}
                </Btn>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────
export function ProfilePage() {
  const { user, login } = useAuth();
  const { navigate } = useRouter();
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "" });
  const [prefs, setPrefs] = useState({ smoking: false, petFriendly: true, disabilityAccess: false });
  const [saved, setSaved] = useState(false);
  const togP = f => setPrefs(p => ({ ...p, [f]: !p[f] }));

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold font-serif text-[#1B2B4B] mb-6">My Profile</h1>
      {saved && <Alert type="success">Profile updated.</Alert>}

      <Card className="p-6 mb-4">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-full bg-[#E8634A] flex items-center justify-center text-white text-xl font-bold">
            {form.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <p className="font-semibold text-[#1B2B4B]">{form.name}</p>
            <Badge color={user?.role === "host" ? "coral" : "blue"}>{user?.role === "host" ? "Host" : "Guest"}</Badge>
          </div>
        </div>
        <Input label="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <Input label="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <Input label="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        <Btn variant="primary" onClick={() => { login({ ...user, ...form }); setSaved(true); setTimeout(() => setSaved(false), 2500); }}>
          Save Changes
        </Btn>
      </Card>

      {user?.role === "customer" && (
        <Card className="p-5 mb-4">
          <h3 className="font-bold text-[#1B2B4B] mb-1 text-sm">My Preferences</h3>
          <p className="text-xs text-gray-400 mb-3">Used to personalise your search results.</p>
          <Toggle label="Smoking Allowed" checked={prefs.smoking} onChange={() => togP("smoking")} />
          <Toggle label="Pet Friendly" checked={prefs.petFriendly} onChange={() => togP("petFriendly")} />
          <Toggle label="Disability Accessible" checked={prefs.disabilityAccess} onChange={() => togP("disabilityAccess")} />
        </Card>
      )}

      {user?.role === "customer" && (
        <Card className="p-5 mb-4">
          <h3 className="font-bold text-[#1B2B4B] mb-3 text-sm">Become a Host</h3>
          <p className="text-xs text-gray-500 mb-4">Have a property to list? Upgrade your account to start hosting.</p>
          <Btn variant="outline" onClick={() => navigate("/become-host")}>Start the Host Application</Btn>
        </Card>
      )}

      <Card className="p-5">
        <h3 className="font-bold text-[#1B2B4B] mb-3 text-sm">Account Actions</h3>
        <div className="flex flex-wrap gap-2">
          <Btn variant="ghost" size="sm" onClick={() => navigate("/forgot-password")}>Change Password</Btn>
          {user?.role === "customer"
            ? <Btn variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>My Bookings</Btn>
            : <Btn variant="ghost" size="sm" onClick={() => navigate("/host/dashboard")}>My Listings</Btn>
          }
        </div>
      </Card>
    </div>
  );
}

// ─── PROPERTY FORM ────────────────────────────────────────────────────────────
export function PropertyFormPage({ params }) {
  const { navigate } = useRouter();
  const isEdit = !!params?.id;
  const existing = isEdit ? PROPERTIES.find(p => p.id === params.id) : null;
  const [form, setForm] = useState({
    title: existing?.title || "",
    location: existing?.location || "",
    description: existing?.description || "",
    price: existing?.price || "",
    bedrooms: existing?.bedrooms || 1,
    bathrooms: existing?.bathrooms || 1,
    maxGuests: existing?.maxGuests || 2,
    smoking: existing?.smoking || false,
    petFriendly: existing?.petFriendly || false,
    disabilityAccess: existing?.disabilityAccess || false,
    wifi: true,
    kitchen: true,
    ac: existing?.amenities?.includes("AC") || false,
    grill: existing?.amenities?.includes("Grill") || false,
    pool: existing?.amenities?.includes("Pool") || false,
    fireplace: existing?.amenities?.includes("Fireplace") || false,
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const tog = f => setForm(v => ({ ...v, [f]: !v[f] }));

  const handleSave = async () => {
    if (!form.title || !form.location || !form.price) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setSaved(true);
    setLoading(false);
    setTimeout(() => navigate("/host/dashboard"), 1300);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button className="text-sm text-gray-400 hover:text-[#1B2B4B] mb-6" onClick={() => navigate("/host/dashboard")}>
        ← Back
      </button>
      <h1 className="text-2xl font-bold font-serif text-[#1B2B4B] mb-6">{isEdit ? "Edit Listing" : "Create New Listing"}</h1>
      {saved && <Alert type="success">Listing {isEdit ? "updated" : "created"} successfully. Redirecting…</Alert>}

      <Card className="mb-4 p-6">
        <h3 className="font-bold text-[#1B2B4B] mb-4">Basic Information</h3>
        <Input label="Property Title *" placeholder="e.g. Sunset Villa with Pool" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <Input label="Location *" placeholder="City, Kenya" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
        <Input label="Description" placeholder="Describe your property…" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Input label="Price/Night (KES) *" type="number" placeholder="10000" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          <Input label="Bedrooms" type="number" value={form.bedrooms} onChange={e => setForm({ ...form, bedrooms: +e.target.value })} />
          <Input label="Bathrooms" type="number" value={form.bathrooms} onChange={e => setForm({ ...form, bathrooms: +e.target.value })} />
          <Input label="Max Guests" type="number" value={form.maxGuests} onChange={e => setForm({ ...form, maxGuests: +e.target.value })} />
        </div>
      </Card>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <Card className="p-5">
          <h3 className="font-bold text-[#1B2B4B] mb-1 text-sm">Default Services</h3>
          <p className="text-xs text-gray-400 mb-3">Always included</p>
          <Toggle label="WiFi" checked={form.wifi} onChange={() => tog("wifi")} />
          <Toggle label="Kitchen" checked={form.kitchen} onChange={() => tog("kitchen")} />
        </Card>
        <Card className="p-5">
          <h3 className="font-bold text-[#1B2B4B] mb-1 text-sm">Extra Amenities</h3>
          <p className="text-xs text-gray-400 mb-3">Optional add-ons</p>
          <Toggle label="Air Conditioning" checked={form.ac} onChange={() => tog("ac")} />
          <Toggle label="Grill / BBQ" checked={form.grill} onChange={() => tog("grill")} />
          <Toggle label="Pool" checked={form.pool} onChange={() => tog("pool")} />
          <Toggle label="Fireplace" checked={form.fireplace} onChange={() => tog("fireplace")} />
        </Card>
      </div>

      <Card className="p-5 mb-6">
        <h3 className="font-bold text-[#1B2B4B] mb-1 text-sm">Accommodation Preferences</h3>
        <p className="text-xs text-gray-400 mb-3">Let guests know what is allowed</p>
        <Toggle label="Smoking Allowed" checked={form.smoking} onChange={() => tog("smoking")} />
        <Toggle label="Pet Friendly" checked={form.petFriendly} onChange={() => tog("petFriendly")} />
        <Toggle label="Disability Accessible" checked={form.disabilityAccess} onChange={() => tog("disabilityAccess")} />
      </Card>

      <div className="flex gap-3">
        <Btn variant="primary" onClick={handleSave} disabled={loading || !form.title || !form.location || !form.price}>
          {loading ? "Saving…" : isEdit ? "Save Changes" : "Publish Listing"}
        </Btn>
        <Btn variant="ghost" onClick={() => navigate("/host/dashboard")}>Cancel</Btn>
      </div>
    </div>
  );
}