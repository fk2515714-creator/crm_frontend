// import React from "react";
// import { FiBell, FiSearch } from "react-icons/fi";
// import logo from "../assets/logo (2).png"; // ✅ make sure filename same ho

// export default function Header({ search = "", setSearch = () => {} }) {
//   const user = JSON.parse(localStorage.getItem("user"));

//   const name = user?.name || "User";
//   const profileImage = user?.profileImage;

//   return (
//     <header className="w-full bg-white border-b border-slate-200">
//       <div className="px-8 py-4 flex items-center justify-between">
//         {/* LEFT SIDE */}
//         <div className="flex items-center gap-6">
//           {/* BRAND WITH LOGO */}
//           <div className="flex items-center gap-3 select-none">
//             <img
//               src={logo}
//               alt="Stack CRM Logo"
//               className="h-9 w-9 object-contain"
//             />

//             <div className="leading-tight">
//               <h1 className="text-lg font-semibold text-slate-900">
//                 Stack CRM
//               </h1>
//               <p className="text-[11px] text-slate-400 tracking-wide">
//                 Developing Tomorrow
//               </p>
//             </div>
//           </div>

//           {/* SEARCH */}
//           <div className="relative hidden lg:block">
//             <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search students, courses..."
//               className="
//                 pl-9 pr-4 py-2.5 w-72
//                 text-sm text-slate-700
//                 border border-slate-300
//                 rounded-md
//                 bg-white
//                 focus:outline-none focus:ring-1 focus:ring-cyan-400
//               "
//             />
//           </div>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="flex items-center gap-6">
//           {/* NOTIFICATION */}
//           <button className="relative flex items-center justify-center h-9 w-9 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100 transition">
//             <FiBell size={18} />
//             <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-cyan-600"></span>
//           </button>

//           {/* DIVIDER */}
//           <div className="h-8 w-px bg-slate-200" />

//           {/* USER */}
//           <div className="flex items-center gap-3">
//             <div className="hidden sm:block leading-tight">
//               <p className="text-[11px] text-slate-400">Signed in</p>
//               <p className="text-sm font-medium text-slate-800">{name}</p>
//             </div>

//             <div className="h-9 w-9 rounded-md bg-slate-100 border border-slate-300 flex items-center justify-center overflow-hidden">
//               {profileImage ? (
//                 <img
//                   src={profileImage}
//                   alt={name}
//                   className="h-full w-full object-cover"
//                 />
//               ) : (
//                 <span className="text-slate-700 text-sm font-semibold">
//                   {name
//                     .split(" ")
//                     .map((n) => n[0])
//                     .slice(0, 2)
//                     .join("")}
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

import React from "react";
import { FiBell, FiSearch } from "react-icons/fi";
import logo from "../assets/logo (2).png"; // ✅ filename unchanged

export default function Header({ search = "", setSearch = () => {} }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const name = user?.name || "User";
  const profileImage = user?.profileImage;

  return (
    <header className="w-full bg-white border-b border-slate-200">
      <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-4 sm:gap-6 min-w-0">
          {/* BRAND WITH LOGO */}
          <div className="flex items-center gap-3 select-none shrink-0">
            <img
              src={logo}
              alt="Stack CRM Logo"
              className="h-8 w-8 sm:h-9 sm:w-9 object-contain"
            />

            <div className="leading-tight hidden xs:block">
              <h1 className="text-base sm:text-lg font-semibold text-slate-900">
                Stack CRM
              </h1>
              <p className="text-[10px] sm:text-[11px] text-slate-400 tracking-wide">
                Developing Tomorrow
              </p>
            </div>
          </div>

          {/* SEARCH (tablet + desktop only) */}
          <div className="relative hidden md:block">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search students, courses..."
              className="
                pl-9 pr-4 py-2.5 w-64 lg:w-72
                text-sm text-slate-700
                border border-slate-300
                rounded-md
                bg-white
                focus:outline-none focus:ring-1 focus:ring-cyan-400
              "
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* NOTIFICATION */}
          <button className="relative flex items-center justify-center h-9 w-9 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100 transition">
            <FiBell size={18} />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-cyan-600"></span>
          </button>

          {/* DIVIDER (hide on very small screens) */}
          <div className="hidden sm:block h-8 w-px bg-slate-200" />

          {/* USER */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block leading-tight text-right">
              <p className="text-[11px] text-slate-400">Signed in</p>
              <p className="text-sm font-medium text-slate-800 truncate max-w-[120px]">
                {name}
              </p>
            </div>

            <div className="h-9 w-9 rounded-md bg-slate-100 border border-slate-300 flex items-center justify-center overflow-hidden shrink-0">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-slate-700 text-sm font-semibold">
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
