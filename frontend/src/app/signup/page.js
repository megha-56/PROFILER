"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", username: "", email: "", phone: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [focused, setFocused] = useState("");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const strength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const strengthColor = ["#3a3848", "#e05c5c", "#c9a84c", "#5cc485"][strength];
  const strengthLabel = ["", "Weak", "Medium", "Strong"][strength];

  const inputStyle = (name) => ({
    background: focused === name ? "rgba(201,168,76,0.05)" : "rgba(255,255,255,0.03)",
    border: focused === name ? "1px solid #c9a84c" : "1px solid rgba(255,255,255,0.07)",
    boxShadow: focused === name ? "0 0 0 3px rgba(201,168,76,0.09)" : "none"
  });

  const fields = [
    { name: "name", label: "Full Name", type: "text", placeholder: "John Doe",
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
    { name: "username", label: "Username", type: "text", placeholder: "johndoe",
      icon: <span className="text-[13px] font-medium text-[#4a4858]">@</span> },
    { name: "email", label: "Email Address", type: "email", placeholder: "john@example.com",
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
    { name: "phone", label: "Phone Number", type: "tel", placeholder: "+91 98765 43210",
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.23h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.4a16 16 0 0 0 5.67 5.67l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.07l.92-.92z"/></svg> },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0e] flex overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Outfit:wght@300;400;500;600&display=swap');
        * { font-family: 'Outfit', sans-serif; box-sizing: border-box; }
        .font-playfair { font-family: 'Playfair Display', serif !important; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes glow-pulse { 0%,100% { opacity:0.5; } 50% { opacity:0.85; } }
        .anim-1 { animation: fadeUp 0.55s cubic-bezier(.4,0,.2,1) 0.05s both; }
        .anim-2 { animation: fadeUp 0.55s cubic-bezier(.4,0,.2,1) 0.12s both; }
        .anim-3 { animation: fadeUp 0.55s cubic-bezier(.4,0,.2,1) 0.2s both; }
        .anim-4 { animation: fadeUp 0.55s cubic-bezier(.4,0,.2,1) 0.28s both; }
        .anim-5 { animation: fadeUp 0.55s cubic-bezier(.4,0,.2,1) 0.36s both; }
        .orb { animation: glow-pulse 7s ease-in-out infinite; }
        .btn-shine { background: linear-gradient(100deg, #c9a84c 0%, #e8c97a 40%, #c9a84c 60%, #b8940e 100%); background-size: 200% auto; transition: background-position 0.5s ease, transform 0.2s, box-shadow 0.2s; }
        .btn-shine:hover { background-position: right center; transform: translateY(-2px); box-shadow: 0 10px 30px rgba(201,168,76,0.3); }
      `}</style>

      {/* BG orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="orb absolute w-[600px] h-[600px] rounded-full -top-48 right-0"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)" }} />
        <div className="orb absolute w-[350px] h-[350px] rounded-full bottom-0 left-0"
          style={{ background: "radial-gradient(circle, rgba(80,100,200,0.07) 0%, transparent 70%)", animationDelay: "3.5s" }} />
      </div>

      {/* Left panel */}
      <aside className="hidden lg:flex w-[360px] flex-shrink-0 flex-col justify-between p-10 relative border-r border-white/[0.06] z-10"
        style={{ background: "linear-gradient(160deg, #12121a 0%, #0e0e15 100%)" }}>
        <div className="absolute inset-x-0 top-0 h-[2px]"
          style={{ background: "linear-gradient(90deg, transparent, #c9a84c, transparent)" }} />

        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[9px] flex items-center justify-center text-[#0a0a0e] font-playfair text-xl font-semibold"
            style={{ background: "#c9a84c" }}>A</div>
          <span className="font-playfair text-2xl text-[#f0ece4] tracking-wide">Aura</span>
        </div>

        {/* Middle */}
        <div className="space-y-7">
          <div>
            <h2 className="font-playfair text-[32px] leading-[1.3] text-[#f0ece4] mb-3">
              Begin your<br /><em className="text-[#c9a84c]">journey</em> with us.
            </h2>
            <p className="text-[13px] text-[#7a7688] leading-relaxed">
              Join thousands managing their identity, skills, and story — all in one place.
            </p>
          </div>

          <ul className="space-y-3">
            {["Unified profile management", "Showcase skills & bio", "Secure encrypted data", "Works across all devices"].map(text => (
              <li key={text} className="flex items-center gap-3 text-[13px] text-[#7a7688]">
                <span className="text-[10px]" style={{ color: "#c9a84c" }}>✦</span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom decoration rings */}
        <div className="relative">
          <div className="absolute bottom-0 right-0 w-36 h-36 rounded-full border border-[#c9a84c]/10 translate-x-10 translate-y-10" />
          <div className="absolute bottom-0 right-0 w-52 h-52 rounded-full border border-[#c9a84c]/[0.05] translate-x-16 translate-y-16" />
          <p className="text-[11px] text-[#4a4858]">© 2025 Aura. All rights reserved.</p>
        </div>
      </aside>

      {/* Right form */}
      <main className="flex-1 flex items-center justify-center px-6 py-10 relative z-10 overflow-y-auto">
        <div className="w-full max-w-[480px]">

          {/* Mobile brand */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#0a0a0e] font-playfair text-lg"
              style={{ background: "#c9a84c" }}>A</div>
            <span className="font-playfair text-xl text-[#f0ece4]">Aura</span>
          </div>

          <div className="anim-1 mb-8">
            <span className="inline-block text-[11px] font-medium tracking-[0.1em] uppercase px-3 py-1 rounded-full mb-4 border"
              style={{ color: "#c9a84c", background: "rgba(201,168,76,0.12)", borderColor: "rgba(201,168,76,0.2)" }}>
              New Account
            </span>
            <h1 className="font-playfair text-[38px] font-normal leading-tight text-[#f0ece4] mb-2">Create account</h1>
            <p className="text-[14px] text-[#7a7688]">Fill in your details to get started</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Name + Username row */}
            <div className="anim-2 grid grid-cols-2 gap-4">
              {fields.slice(0, 2).map(f => (
                <div key={f.name} className="space-y-[6px]">
                  <label className="block text-[11px] font-medium uppercase tracking-[0.12em] text-[#7a7688]">{f.label}</label>
                  <div className="relative">
                    <span className="absolute left-[13px] top-1/2 -translate-y-1/2 text-[#4a4858] flex items-center">{f.icon}</span>
                    <input type={f.type} name={f.name} value={form[f.name]} onChange={handle}
                      placeholder={f.placeholder}
                      onFocus={() => setFocused(f.name)} onBlur={() => setFocused("")}
                      className="w-full pl-[38px] pr-3 py-[11px] rounded-[9px] text-[13px] text-[#f0ece4] placeholder-[#3a3848] outline-none transition-all duration-200"
                      style={inputStyle(f.name)} />
                  </div>
                </div>
              ))}
            </div>

            {/* Email + Phone */}
            {fields.slice(2).map((f, i) => (
              <div key={f.name} className={`space-y-[6px] ${i === 0 ? "anim-3" : "anim-3"}`}>
                <label className="block text-[11px] font-medium uppercase tracking-[0.12em] text-[#7a7688]">{f.label}</label>
                <div className="relative">
                  <span className="absolute left-[13px] top-1/2 -translate-y-1/2 text-[#4a4858] flex items-center">{f.icon}</span>
                  <input type={f.type} name={f.name} value={form[f.name]} onChange={handle}
                    placeholder={f.placeholder}
                    onFocus={() => setFocused(f.name)} onBlur={() => setFocused("")}
                    className="w-full pl-[38px] pr-4 py-[11px] rounded-[9px] text-[13px] text-[#f0ece4] placeholder-[#3a3848] outline-none transition-all duration-200"
                    style={inputStyle(f.name)} />
                </div>
              </div>
            ))}

            {/* Password */}
            <div className="anim-4 space-y-[6px]">
              <label className="block text-[11px] font-medium uppercase tracking-[0.12em] text-[#7a7688]">Password</label>
              <div className="relative">
                <span className="absolute left-[13px] top-1/2 -translate-y-1/2 text-[#4a4858] flex items-center">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input type={showPass ? "text" : "password"} name="password" value={form.password} onChange={handle}
                  placeholder="Min. 8 characters"
                  onFocus={() => setFocused("password")} onBlur={() => setFocused("")}
                  className="w-full pl-[38px] pr-12 py-[11px] rounded-[9px] text-[13px] text-[#f0ece4] placeholder-[#3a3848] outline-none transition-all duration-200"
                  style={inputStyle("password")} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-[13px] top-1/2 -translate-y-1/2 text-[#4a4858] hover:text-[#7a7688] transition-colors">
                  {showPass
                    ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
              {form.password.length > 0 && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-[2px] rounded-full" style={{ background: "#1e1e2a" }}>
                    <div className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${[0, 33, 66, 100][strength]}%`, background: strengthColor }} />
                  </div>
                  <span className="text-[11px] font-medium" style={{ color: strengthColor }}>{strengthLabel}</span>
                </div>
              )}
            </div>

            {/* Terms */}
            <p className="anim-4 text-[12px] text-[#4a4858] leading-relaxed">
              By creating an account you agree to our{" "}
              <a href="#" className="transition-colors" style={{ color: "#c9a84c" }}
                onMouseEnter={e => e.target.style.color = "#e8c97a"} onMouseLeave={e => e.target.style.color = "#c9a84c"}>
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="transition-colors" style={{ color: "#c9a84c" }}
                onMouseEnter={e => e.target.style.color = "#e8c97a"} onMouseLeave={e => e.target.style.color = "#c9a84c"}>
                Privacy Policy
              </a>.
            </p>

            <div className="anim-5 space-y-4 pt-1">
              <button type="submit"
                className="btn-shine w-full py-[13px] rounded-[9px] text-[14px] font-semibold tracking-wide text-[#0a0a0e] cursor-pointer">
                Create Account
              </button>
              <p className="text-center text-[14px] text-[#7a7688]">
                Already have an account?{" "}
                <Link href="/" className="font-medium transition-colors" style={{ color: "#c9a84c" }}
                  onMouseEnter={e => e.target.style.color = "#e8c97a"} onMouseLeave={e => e.target.style.color = "#c9a84c"}>
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}