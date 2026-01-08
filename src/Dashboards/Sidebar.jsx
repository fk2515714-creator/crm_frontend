import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

// Icons
import {
  FiHome,
  FiUsers,
  FiBookOpen,
  FiUserCheck,
  FiBriefcase,
  FiFileText,
  FiGrid,
  FiMenu,
} from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

export default function Sidebar() {
  const { role, allowedTabs } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const displayRole = role
    ? role.charAt(0).toUpperCase() + role.slice(1)
    : "User";

  // 🔒 ICON LOGIC (UNCHANGED)
  const getIcon = (tab) => {
    const path = tab.path?.toLowerCase();
    const label = tab.label?.toLowerCase();

    if (path?.includes("dashboard") || label?.includes("dashboard"))
      return <FiHome />;

    if (path?.includes("student") || label?.includes("student"))
      return <FiUsers />;

    if (path?.includes("course") || label?.includes("course"))
      return <FiBookOpen />;

    if (path?.includes("teacher") || label?.includes("teacher"))
      return <FiUserCheck />;

    if (path?.includes("placement") || label?.includes("placement"))
      return <FiBriefcase />;

    if (path?.includes("resume") || label?.includes("resume"))
      return <FiFileText />;

    if (
      path?.includes("profile") ||
      path?.includes("setting") ||
      label?.includes("profile") ||
      label?.includes("setting")
    )
      return <CgProfile />;

    return <FiGrid />;
  };

  return (
    <>
      {/* 📱 Mobile Toggle Button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[#c6a27e] text-white"
      >
        <FiMenu size={20} />
      </button>

      {/* 📱 Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          h-screen w-64
          bg-gradient-to-b from-[#d6b38c] to-[#b08a63]
          text-white
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* HEADER */}
        <div className="h-16 flex items-center justify-center border-b border-white/20">
          <span className="text-lg font-bold tracking-wide text-black">
            Stack CRM
          </span>
        </div>

        {/* MENU */}
        <nav className="mt-4 flex flex-col gap-1 px-2">
          {allowedTabs?.length > 0 ? (
            allowedTabs.map((tab) => (
              <NavLink
                key={tab.path}
                to={tab.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `
                  flex items-center gap-4 px-3 py-2.5 rounded-md
                  text-sm font-medium
                  transition-all
                  ${isActive ? "bg-white/25" : "hover:bg-white/15"}
                `
                }
              >
                {/* ICON */}
                <span className="text-lg min-w-[20px]">{getIcon(tab)}</span>

                {/* ✅ LABEL – ALWAYS VISIBLE */}
                <span className="whitespace-nowrap">{tab.label}</span>
              </NavLink>
            ))
          ) : (
            <p className="text-xs text-center text-white/70 mt-6">No menu</p>
          )}
        </nav>

        {/* FOOTER */}
        <div className="absolute bottom-0 w-full border-t border-white/20 p-3">
          <p className="text-xs text-white/70 text-center">
            © {new Date().getFullYear()} Stack CRM
          </p>
        </div>
      </aside>
    </>
  );
}
