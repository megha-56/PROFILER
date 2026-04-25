"use client";

import { useState, useRef } from "react";
import Link from "next/link";

const SKILL_CHIPS = ["React", "Node.js", "Python", "TypeScript", "Figma", "AWS", "GraphQL", "Vue"];

export default function DashboardPage() {
  const [profile, setProfile] = useState({
    name: "Arjun Sharma", email: "arjun@example.com", phone: "+91 98765 43210",
    gender: "Male", username: "arjun_dev", dob: "1998-04-12",
    bio: "Full-stack developer passionate about building beautiful, functional products. I love clean code and thoughtful design.",
    skills: ["React", "Node.js", "UI Design"], photo: null,
  });
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const [skillInput, setSkillInput] = useState("");
  const [focused, setFocused] = useState("");
  const [activeNav, setActiveNav] = useState("profile");
  const fileRef = useRef();

  const current = editing ? draft : profile;
  const initials = profile.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  const handle = (e) => setDraft({ ...draft, [e.target.name]: e.target.value });
  const addSkill = (s) => { const t = s.trim(); if (t && !draft.skills.includes(t)) setDraft({ ...draft, skills: [...draft.skills, t] }); setSkillInput(""); };
  const removeSkill = (s) => setDraft({ ...draft, skills: draft.skills.filter(x => x !== s) });
  const handlePhoto = (e) => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = ev => setDraft({ ...draft, photo: ev.target.result }); r.readAsDataURL(f); };
  const save = () => { setProfile(draft); setEditing(false); };
  const cancel = () => { setDraft(profile); setEditing(false); };

  const inputStyle = (name) => ({
    background: focused === name ? "rgba(201,168,76,0.05)" : "rgba(255,255,255,0.03)",
    border: focused === name ? "1px solid #c9a84c" : "1px solid rgba(255,255,255,0.07)",
    boxShadow: focused === name ? "0 0 0 3px rgba(201,168,76,0.09)" : "none",
  });

  const navItems = [
    { id: "profile", label: "Profile", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> },
    { id: "activity", label: "Activity", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
    { id: "settings", label: "Settings", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg> },
  ];

  const personalFields = [
    { label: "Full Name", name: "name", type: "text", placeholder: "John Doe" },
    { label: "Username", name: "username", type: "text", placeholder: "johndoe" },
    { label: "Email Address", name: "email", type: "email", placeholder: "john@example.com" },
    { label: "Phone Number", name: "phone", type: "tel", placeholder: "+91 98765 43210" },
    { label: "Date of Birth", name: "dob", type: "date" },
    { label: "Gender", name: "gender", type: "select", options: ["Male", "Female", "Non-binary", "Prefer not to say"] },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0e] flex overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Outfit:wght@300;400;500;600&display=swap');
        * { font-family: 'Outfit', sans-serif; box-sizing: border-box; }
        .font-playfair { font-family: 'Playfair Display', serif !important; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes glow-pulse { 0%,100% { opacity:0.4; } 50% { opacity:0.7; } }
        .dash-fade { animation: fadeUp 0.5s cubic-bezier(.4,0,.2,1) 0.05s both; }
        .orb { animation: glow-pulse 8s ease-in-out infinite; }
        .btn-shine { background: linear-gradient(100deg, #c9a84c 0%, #e8c97a 40%, #c9a84c 60%, #b8940e 100%); background-size: 200% auto; transition: background-position 0.5s ease, transform 0.2s, box-shadow 0.2s; }
        .btn-shine:hover { background-position: right center; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(201,168,76,0.3); }
        select option { background: #17171f; color: #f0ece4; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #12121a; } ::-webkit-scrollbar-thumb { background: #2a2838; border-radius: 4px; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.4); cursor: pointer; }
      `}</style>

      {/* BG orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="orb absolute w-[500px] h-[500px] rounded-full -top-24 -right-24"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)" }} />
        <div className="orb absolute w-[400px] h-[400px] rounded-full bottom-0 left-52"
          style={{ background: "radial-gradient(circle, rgba(80,100,200,0.06) 0%, transparent 70%)", animationDelay: "4s" }} />
      </div>

      {/* ─── SIDEBAR ─── */}
      <aside className="hidden md:flex w-[220px] flex-shrink-0 flex-col justify-between py-8 px-5 relative z-10 border-r border-white/[0.06]"
        style={{ background: "linear-gradient(180deg, #12121a 0%, #0e0e15 100%)" }}>
        <div className="absolute inset-x-0 top-0 h-[2px]"
          style={{ background: "linear-gradient(90deg, transparent, #c9a84c, transparent)" }} />

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-9">
            <div className="w-8 h-8 rounded-[8px] flex items-center justify-center text-[#0a0a0e] font-playfair text-lg font-semibold"
              style={{ background: "#c9a84c" }}>A</div>
            <span className="font-playfair text-xl text-[#f0ece4] tracking-wide">Aura</span>
          </div>

          {/* Nav */}
          <nav className="space-y-1">
            {navItems.map(item => (
              <button key={item.id} onClick={() => setActiveNav(item.id)}
                className="w-full flex items-center gap-2.5 px-3 py-[9px] rounded-[8px] text-[13px] font-medium transition-all duration-200 text-left"
                style={{
                  background: activeNav === item.id ? "rgba(201,168,76,0.12)" : "transparent",
                  color: activeNav === item.id ? "#c9a84c" : "#7a7688",
                  border: activeNav === item.id ? "1px solid rgba(201,168,76,0.18)" : "1px solid transparent",
                }}>
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Sidebar user footer */}
        <div className="flex items-center gap-2.5 p-3 rounded-[10px] border border-white/[0.06]"
          style={{ background: "rgba(255,255,255,0.02)" }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden border"
            style={{ borderColor: "rgba(201,168,76,0.35)", background: "rgba(201,168,76,0.1)" }}>
            {profile.photo
              ? <img src={profile.photo} alt="" className="w-full h-full object-cover" />
              : <span className="text-[11px] font-semibold" style={{ color: "#c9a84c" }}>{initials}</span>}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-medium text-[#f0ece4] truncate">{profile.name.split(" ")[0]}</p>
            <p className="text-[11px] text-[#4a4858] truncate">@{profile.username}</p>
          </div>
          <Link href="/" title="Sign out" className="text-[#4a4858] hover:text-[#c9a84c] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </Link>
        </div>
      </aside>

      {/* ─── MAIN ─── */}
      <main className="flex-1 flex flex-col overflow-y-auto relative z-10">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex items-center justify-between px-7 py-5 border-b border-white/[0.06]"
          style={{ background: "rgba(10,10,14,0.85)", backdropFilter: "blur(16px)" }}>
          <div>
            <h2 className="font-playfair text-[22px] text-[#f0ece4]">My Profile</h2>
            <p className="text-[12px] text-[#4a4858] mt-0.5">Manage your personal information</p>
          </div>
          <div className="flex items-center gap-3">
            {editing ? (
              <>
                <button onClick={cancel}
                  className="px-4 py-2 rounded-[8px] text-[13px] font-medium text-[#7a7688] border border-white/[0.08] hover:border-white/20 hover:text-[#f0ece4] transition-all"
                  style={{ background: "rgba(255,255,255,0.03)" }}>
                  Cancel
                </button>
                <button onClick={save}
                  className="btn-shine px-4 py-2 rounded-[8px] text-[13px] font-semibold text-[#0a0a0e] cursor-pointer">
                  Save Changes
                </button>
              </>
            ) : (
              <button onClick={() => { setDraft(profile); setEditing(true); }}
                className="btn-shine flex items-center gap-2 px-4 py-2 rounded-[8px] text-[13px] font-semibold text-[#0a0a0e] cursor-pointer">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Edit Profile
              </button>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="dash-fade flex flex-col gap-5 p-6 md:p-7">

          {/* ── Hero card ── */}
          <div className="rounded-2xl overflow-hidden border border-white/[0.06]" style={{ background: "#13131c" }}>
            {/* Cover */}
            <div className="h-[110px] relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #18182a 0%, #0f0f1a 50%, #161220 100%)" }}>
              <div className="absolute inset-0" style={{
                background: "linear-gradient(135deg, rgba(201,168,76,0.1) 0%, transparent 50%, rgba(80,60,180,0.07) 100%)"
              }} />
              <div className="absolute inset-0" style={{
                backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(201,168,76,0.025) 40px, rgba(201,168,76,0.025) 41px)"
              }} />
            </div>

            {/* Avatar + info */}
            <div className="flex items-end gap-5 px-6 pb-5" style={{ marginTop: "-42px" }}>
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-[84px] h-[84px] rounded-full border-[3px] border-[#c9a84c] overflow-hidden flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #1e1e2e, #16161f)", boxShadow: "0 0 0 4px #13131c" }}>
                  {current.photo
                    ? <img src={current.photo} alt="Avatar" className="w-full h-full object-cover" />
                    : <span className="font-playfair text-[28px] font-normal" style={{ color: "#c9a84c" }}>{initials}</span>}
                </div>
                {editing && (
                  <button onClick={() => fileRef.current.click()}
                    className="absolute bottom-0.5 right-0.5 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110"
                    style={{ background: "#c9a84c", border: "2px solid #13131c", color: "#0a0a0e" }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                      <circle cx="12" cy="13" r="4"/>
                    </svg>
                  </button>
                )}
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
              </div>

              {/* Meta */}
              <div className="pt-8">
                <h1 className="font-playfair text-[26px] font-normal text-[#f0ece4] leading-tight">{profile.name}</h1>
                <p className="text-[13px] text-[#4a4858] mb-2">@{profile.username}</p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, text: profile.dob ? new Date(profile.dob).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "—" },
                    { icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>, text: profile.gender },
                  ].map(({ icon, text }) => (
                    <span key={text} className="flex items-center gap-1.5 text-[12px] text-[#7a7688]">
                      <span className="text-[#4a4858]">{icon}</span>{text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Cards grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">

            {/* Personal Info card */}
            <div className="rounded-2xl border border-white/[0.06] p-6" style={{ background: "#13131c" }}>
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/[0.05]">
                <div className="w-8 h-8 rounded-[8px] flex items-center justify-center text-[#c9a84c]"
                  style={{ background: "rgba(201,168,76,0.12)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                  </svg>
                </div>
                <h3 className="text-[14px] font-semibold text-[#f0ece4]">Personal Information</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {personalFields.map(f => (
                  <div key={f.name} className="space-y-[5px]">
                    <label className="block text-[10px] font-medium uppercase tracking-[0.12em] text-[#7a7688]">
                      {f.label}
                    </label>
                    {!editing ? (
                      <div className="py-[9px] text-[13px] text-[#f0ece4] border-b border-white/[0.05]">
                        {profile[f.name] || "—"}
                      </div>
                    ) : f.type === "select" ? (
                      <select name={f.name} value={draft[f.name]} onChange={handle}
                        onFocus={() => setFocused(f.name)} onBlur={() => setFocused("")}
                        className="w-full px-3 py-[9px] rounded-[8px] text-[13px] text-[#f0ece4] outline-none transition-all duration-200 cursor-pointer"
                        style={inputStyle(f.name)}>
                        {f.options.map(o => <option key={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input type={f.type} name={f.name} value={draft[f.name]} onChange={handle}
                        placeholder={f.placeholder}
                        onFocus={() => setFocused(f.name)} onBlur={() => setFocused("")}
                        className="w-full px-3 py-[9px] rounded-[8px] text-[13px] text-[#f0ece4] placeholder-[#3a3848] outline-none transition-all duration-200"
                        style={inputStyle(f.name)} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-5">
              {/* Bio card */}
              <div className="rounded-2xl border border-white/[0.06] p-6" style={{ background: "#13131c" }}>
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/[0.05]">
                  <div className="w-8 h-8 rounded-[8px] flex items-center justify-center text-[#c9a84c]"
                    style={{ background: "rgba(201,168,76,0.12)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                    </svg>
                  </div>
                  <h3 className="text-[14px] font-semibold text-[#f0ece4]">Bio</h3>
                </div>
                {editing ? (
                  <textarea name="bio" value={draft.bio} onChange={handle} rows={4}
                    placeholder="Tell people about yourself..."
                    onFocus={() => setFocused("bio")} onBlur={() => setFocused("")}
                    className="w-full px-3 py-[9px] rounded-[8px] text-[13px] text-[#f0ece4] placeholder-[#3a3848] outline-none transition-all duration-200 resize-none"
                    style={{ ...inputStyle("bio"), lineHeight: 1.65 }} />
                ) : (
                  <p className="text-[13px] text-[#7a7688] leading-relaxed">
                    {profile.bio || "No bio added yet."}
                  </p>
                )}
              </div>

              {/* Skills card */}
              <div className="rounded-2xl border border-white/[0.06] p-6" style={{ background: "#13131c" }}>
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/[0.05]">
                  <div className="w-8 h-8 rounded-[8px] flex items-center justify-center text-[#c9a84c]"
                    style={{ background: "rgba(201,168,76,0.12)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  </div>
                  <h3 className="text-[14px] font-semibold text-[#f0ece4]">Skills</h3>
                </div>

                {/* Chips */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {current.skills.map(s => (
                    <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium border"
                      style={{ background: "rgba(201,168,76,0.1)", borderColor: "rgba(201,168,76,0.22)", color: "#c9a84c" }}>
                      {s}
                      {editing && (
                        <button onClick={() => removeSkill(s)} className="text-[15px] leading-none opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                          style={{ background: "none", border: "none", color: "#c9a84c", padding: 0 }}>×</button>
                      )}
                    </span>
                  ))}
                  {current.skills.length === 0 && (
                    <span className="text-[13px] text-[#4a4858]">No skills yet</span>
                  )}
                </div>

                {editing && (
                  <>
                    {/* Add input */}
                    <div className="flex gap-2 mb-3">
                      <input value={skillInput} onChange={e => setSkillInput(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addSkill(skillInput))}
                        placeholder="Add a skill..."
                        onFocus={() => setFocused("skill")} onBlur={() => setFocused("")}
                        className="flex-1 px-3 py-[9px] rounded-[8px] text-[13px] text-[#f0ece4] placeholder-[#3a3848] outline-none transition-all duration-200"
                        style={inputStyle("skill")} />
                      <button onClick={() => addSkill(skillInput)}
                        className="px-3 py-[9px] rounded-[8px] text-[13px] font-medium border cursor-pointer transition-all hover:border-[#c9a84c] hover:text-[#c9a84c]"
                        style={{ background: "rgba(201,168,76,0.08)", borderColor: "rgba(201,168,76,0.18)", color: "#c9a84c" }}>
                        Add
                      </button>
                    </div>
                    {/* Suggestions */}
                    <div className="flex flex-wrap gap-1.5">
                      {SKILL_CHIPS.filter(s => !draft.skills.includes(s)).map(s => (
                        <button key={s} onClick={() => addSkill(s)}
                          className="px-2.5 py-1 rounded-full text-[11px] border border-white/[0.07] text-[#7a7688] cursor-pointer transition-all hover:border-[#c9a84c]/40 hover:text-[#c9a84c]"
                          style={{ background: "rgba(255,255,255,0.02)" }}>
                          + {s}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}