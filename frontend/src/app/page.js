"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [focused, setFocused] = useState("");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-[#0a0a0e] flex overflow-hidden font-sans">
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Outfit:wght@300;400;500;600&display=swap');
        * { font-family: 'Outfit', sans-serif; box-sizing: border-box; }
        .font-playfair { font-family: 'Playfair Display', serif !important; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes glow-pulse { 0%,100% { opacity:0.5; transform:scale(1); } 50% { opacity:0.8; transform:scale(1.05); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        .anim-1 { animation: fadeUp 0.55s cubic-bezier(.4,0,.2,1) 0.05s both; }
        .anim-2 { animation: fadeUp 0.55s cubic-bezier(.4,0,.2,1) 0.15s both; }
        .anim-3 { animation: fadeUp 0.55s cubic-bezier(.4,0,.2,1) 0.25s both; }
        .anim-4 { animation: fadeUp 0.55s cubic-bezier(.4,0,.2,1) 0.35s both; }
        .orb { animation: glow-pulse 6s ease-in-out infinite; }
        .btn-shine { background: linear-gradient(100deg, #c9a84c 0%, #e8c97a 40%, #c9a84c 60%, #b8940e 100%); background-size: 200% auto; transition: background-position 0.5s ease, transform 0.2s, box-shadow 0.2s; }
        .btn-shine:hover { background-position: right center; transform: translateY(-2px); box-shadow: 0 10px 30px rgba(201,168,76,0.3); }
        input[type=date]::-webkit-calendar-picker-indicator { filter: invert(0.5); }
      `}</style>

      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb absolute w-[520px] h-[520px] rounded-full -top-32 -left-32"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.13) 0%, transparent 70%)" }} />
        <div className="orb absolute w-[380px] h-[380px] rounded-full bottom-0 right-64"
          style={{ background: "radial-gradient(circle, rgba(90,80,180,0.08) 0%, transparent 70%)", animationDelay: "3s" }} />
      </div>

      {/* Left panel */}
      <aside className="hidden lg:flex w-[420px] flex-shrink-0 flex-col justify-between p-10 relative border-r border-white/[0.06]"
        style={{ background: "linear-gradient(160deg, #12121a 0%, #0e0e15 100%)" }}>
        <div className="absolute inset-x-0 top-0 h-[2px]"
          style={{ background: "linear-gradient(90deg, transparent, #c9a84c, transparent)" }} />

        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[9px] flex items-center justify-center text-[#0a0a0e] font-playfair text-xl font-semibold"
            style={{ background: "#c9a84c" }}>A</div>
          <span className="font-playfair text-2xl text-[#f0ece4] tracking-wide">Aura</span>
        </div>

        {/* Center content */}
        <div className="space-y-6">
          <p className="font-playfair text-[33px] font-normal italic leading-[1.35] text-[#f0ece4]">
            "Your identity,<br />your canvas."
          </p>
          <p className="text-[13px] text-[#7a7688] leading-relaxed max-w-[260px]">
            Sign in to access your personal space and manage everything that defines you.
          </p>

          {/* Stats */}
          <div className="flex items-center gap-6 pt-2">
            {[["12K+", "Members"], ["99.9%", "Uptime"], ["256-bit", "Encrypted"]].map(([n, l]) => (
              <div key={l} className="flex flex-col gap-0.5">
                <span className="text-[15px] font-semibold" style={{ color: "#c9a84c" }}>{n}</span>
                <span className="text-[11px] uppercase tracking-widest text-[#4a4858]">{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="relative h-16 flex items-end">
          <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full border border-[#c9a84c]/10 translate-x-16 translate-y-16" />
          <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full border border-[#c9a84c]/[0.05] translate-x-24 translate-y-24" />
          <p className="text-[11px] text-[#4a4858]">© 2025 Aura. All rights reserved.</p>
        </div>
      </aside>

      {/* Right form */}
      <main className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-[400px]">

          {/* Mobile brand */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#0a0a0e] font-playfair text-lg"
              style={{ background: "#c9a84c" }}>A</div>
            <span className="font-playfair text-xl text-[#f0ece4]">Aura</span>
          </div>

          <div className="anim-1">
            <h1 className="font-playfair text-[40px] font-normal leading-tight text-[#f0ece4] mb-2">
              Welcome back
            </h1>
            <p className="text-[14px] text-[#7a7688] mb-9">Enter your credentials to continue</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Username */}
            <div className="anim-2 space-y-[6px]">
              <label className="block text-[11px] font-medium uppercase tracking-[0.12em] text-[#7a7688]">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#4a4858]">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                  </svg>
                </span>
                <input
                  type="text" name="username" value={form.username} onChange={handle}
                  placeholder="your_username"
                  onFocus={() => setFocused("username")} onBlur={() => setFocused("")}
                  className="w-full pl-[42px] pr-4 py-3 rounded-[9px] text-[14px] text-[#f0ece4] placeholder-[#3a3848] outline-none transition-all duration-200"
                  style={{
                    background: focused === "username" ? "rgba(201,168,76,0.05)" : "rgba(255,255,255,0.03)",
                    border: focused === "username" ? "1px solid #c9a84c" : "1px solid rgba(255,255,255,0.07)",
                    boxShadow: focused === "username" ? "0 0 0 3px rgba(201,168,76,0.09)" : "none"
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="anim-3 space-y-[6px]">
              <label className="block text-[11px] font-medium uppercase tracking-[0.12em] text-[#7a7688]">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#4a4858]">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  type={showPass ? "text" : "password"} name="password" value={form.password} onChange={handle}
                  placeholder="••••••••"
                  onFocus={() => setFocused("password")} onBlur={() => setFocused("")}
                  className="w-full pl-[42px] pr-12 py-3 rounded-[9px] text-[14px] text-[#f0ece4] placeholder-[#3a3848] outline-none transition-all duration-200"
                  style={{
                    background: focused === "password" ? "rgba(201,168,76,0.05)" : "rgba(255,255,255,0.03)",
                    border: focused === "password" ? "1px solid #c9a84c" : "1px solid rgba(255,255,255,0.07)",
                    boxShadow: focused === "password" ? "0 0 0 3px rgba(201,168,76,0.09)" : "none"
                  }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#4a4858] hover:text-[#7a7688] transition-colors">
                  {showPass
                    ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
              <div className="flex justify-end mt-1">
                <a href="#" className="text-[12px] transition-colors" style={{ color: "#c9a84c" }}
                  onMouseEnter={e => e.target.style.color = "#e8c97a"} onMouseLeave={e => e.target.style.color = "#c9a84c"}>
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit */}
            <div className="anim-3 pt-1">
              <button type="submit"
                className="btn-shine w-full py-[13px] rounded-[9px] text-[14px] font-semibold tracking-wide text-[#0a0a0e] cursor-pointer">
                Sign In
              </button>
            </div>

            <p className="anim-4 text-center text-[14px] text-[#7a7688]">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-medium transition-colors" style={{ color: "#c9a84c" }}
                onMouseEnter={e => e.target.style.color = "#e8c97a"} onMouseLeave={e => e.target.style.color = "#c9a84c"}>
                Create one
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}