import { useState } from "react";
import { useAuth, useRouter } from "../context/AuthContext";
import { Card, Input, Btn, Alert } from "../components/common";

// ─── LOGIN ────────────────────────────────────────────────────────────────────
export function LoginPage() {
  const { login } = useAuth();
  const { navigate } = useRouter();
  const [form, setForm] = useState({ email:"", password:"" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
    setLoading(true); setError("");
    await new Promise(r => setTimeout(r, 700));
    const role = form.email.includes("host") ? "host" : "customer";
    login({ name: role === "host" ? "Jane Wanjiku" : "Alex Kamau", email: form.email, role });
    navigate(role === "host" ? "/host/dashboard" : "/dashboard");
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <Card>
        <div className="p-8">
          <h2 className="text-2xl font-bold font-serif text-[#1B2B4B] mb-1 text-center">Welcome back</h2>
          <p className="text-gray-400 text-sm text-center mb-6">Sign in to your StayEase account</p>
          {error && <Alert type="error">{error}</Alert>}
          <Input label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({...form, email:e.target.value})} />
          <Input label="Password" type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password:e.target.value})} onKeyDown={e => e.key==="Enter" && handleSubmit()} />
          <div className="text-right mb-5">
            <button className="text-[#E8634A] text-sm" onClick={() => navigate("/forgot-password")}>Forgot password?</button>
          </div>
          <Btn variant="primary" full onClick={handleSubmit} disabled={loading}>{loading ? "Signing in…" : "Sign In"}</Btn>
          <div className="border-t border-gray-100 mt-6 pt-5 text-center">
            <p className="text-sm text-gray-400">No account? <button className="text-[#E8634A] font-medium" onClick={() => navigate("/register")}>Sign up</button></p>
            <p className="text-xs text-gray-300 mt-2">Tip: include "host" in email for a host demo account</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── REGISTER ─────────────────────────────────────────────────────────────────
export function RegisterPage() {
  const { login } = useAuth();
  const { navigate } = useRouter();
  const [form, setForm] = useState({ name:"", email:"", phone:"", password:"", confirm:"", role:"customer" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) { setError("Please fill in all required fields."); return; }
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    login({ name: form.name, email: form.email, role: form.role, phone: form.phone });
    navigate(form.role === "host" ? "/host/dashboard" : "/dashboard");
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <Card>
        <div className="p-8">
          <h2 className="text-2xl font-bold font-serif text-[#1B2B4B] mb-1 text-center">Create your account</h2>
          <p className="text-gray-400 text-sm text-center mb-6">Join thousands of hosts and guests on StayEase</p>
          {error && <Alert type="error">{error}</Alert>}

          <div className="flex gap-3 mb-6">
            {["customer","host"].map(r => (
              <button key={r} onClick={() => setForm({...form, role:r})}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-all ${form.role===r ? "bg-[#1B2B4B] text-white border-[#1B2B4B]" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}>
                {r === "customer" ? "I'm a Guest" : "I'm a Host"}
              </button>
            ))}
          </div>

          <Input label="Full Name *" placeholder="Alex Kamau" value={form.name} onChange={e => setForm({...form,name:e.target.value})} />
          <Input label="Email *" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({...form,email:e.target.value})} />
          <Input label="Phone Number" placeholder="+254 700 000 000" value={form.phone} onChange={e => setForm({...form,phone:e.target.value})} />
          <Input label="Password *" type="password" placeholder="Min. 8 characters" value={form.password} onChange={e => setForm({...form,password:e.target.value})} />
          <Input label="Confirm Password *" type="password" placeholder="Repeat password" value={form.confirm} onChange={e => setForm({...form,confirm:e.target.value})} />

          <Btn variant="primary" full onClick={handleSubmit} disabled={loading}>{loading ? "Creating account…" : "Create Account"}</Btn>
          <div className="border-t border-gray-100 mt-6 pt-5 text-center">
            <p className="text-sm text-gray-400">Have an account? <button className="text-[#E8634A] font-medium" onClick={() => navigate("/login")}>Sign in</button></p>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── FORGOT PASSWORD ──────────────────────────────────────────────────────────
export function ForgotPasswordPage() {
  const { navigate } = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const next = async () => { setLoading(true); await new Promise(r => setTimeout(r,700)); setStep(s=>s+1); setLoading(false); };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <Card>
        <div className="p-8">
          <h2 className="text-2xl font-bold font-serif text-[#1B2B4B] mb-1">Reset Password</h2>
          <p className="text-gray-400 text-sm mb-6">
            {["","Enter your email to receive a reset code.","Enter the 6-digit code sent to your email.","Set your new password.","All done!"][step]}
          </p>

          <div className="flex gap-1.5 mb-8">
            {[1,2,3].map(s => (
              <div key={s} className={`flex-1 h-1 rounded-full transition-all ${step > s ? "bg-[#E8634A]" : step === s ? "bg-[#1B2B4B]" : "bg-gray-200"}`} />
            ))}
          </div>

          {step === 1 && <><Input label="Email Address" type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} /><Btn variant="primary" full onClick={next} disabled={loading||!email}>{loading?"Sending…":"Send Reset Code"}</Btn></>}
          {step === 2 && <><Input label="Verification Code" placeholder="123456" value={code} onChange={e=>setCode(e.target.value)} maxLength={6} /><Btn variant="primary" full onClick={next} disabled={loading||code.length<4}>{loading?"Verifying…":"Verify Code"}</Btn></>}
          {step === 3 && <><Input label="New Password" type="password" placeholder="Min. 8 characters" value={password} onChange={e=>setPassword(e.target.value)} /><Btn variant="primary" full onClick={next} disabled={loading||password.length<6}>{loading?"Saving…":"Set New Password"}</Btn></>}
          {step === 4 && <><Alert type="success">Your password has been updated successfully.</Alert><Btn variant="primary" full onClick={() => navigate("/login")}>Back to Sign In</Btn></>}

          <div className="border-t border-gray-100 mt-6 pt-5 text-center">
            <button className="text-[#E8634A] text-sm" onClick={() => navigate("/login")}>← Back to login</button>
          </div>
        </div>
      </Card>
    </div>
  );
}