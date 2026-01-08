// import React, { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";

// import bgImage from "../assets/89124.jpg";
// import { callApi } from "../Services/Api";

// import Sidebar from "./Sidebar.jsx";
// import Header from "./Header.jsx";

// export default function Dashboard() {
//   const [data, setData] = useState({
//     courses: [],
//     students: [],
//     resumes: [],
//     placements: [],
//     employees: [],
//   });

//   const [loading, setLoading] = useState(true);

//   // constants (UNCHANGED)
//   const STUDENT_FEE = 30000;
//   const TEACHER_SALARY = 20000;

//   useEffect(() => {
//     const loadDashboard = async () => {
//       try {
//         const res = await callApi("/dashboard", "GET");
//         setData({
//           courses: res?.data?.courses || [],
//           students: res?.data?.students || [],
//           resumes: res?.data?.resumes || [],
//           placements: res?.data?.placements || [],
//           employees: res?.data?.employees || [],
//         });
//       } catch {
//         toast.error("Failed to load dashboard data");
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadDashboard();
//   }, []);

//   // filters (UNCHANGED)
//   const activeStudents = data.students.filter((s) => s.status === "Active");
//   const teachers = data.employees.filter((e) => e.role === "teacher");

//   // calculations (UNCHANGED)
//   const totalRevenue = activeStudents.length * STUDENT_FEE;
//   const teacherSalary = teachers.length * TEACHER_SALARY;
//   const netProfit = totalRevenue - teacherSalary;

//   return (
//     <div className="w-full min-h-screen relative bg-[#f7f2ec] overflow-hidden">
//       {/* ===== LIGHT BROWN BACKGROUND ===== */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#f7f2ec] via-[#f3e6d8] to-[#ead7c0]" />

//       <div
//         className="absolute -top-40 -right-40 w-[600px] h-[600px]
//                    bg-cover bg-center opacity-[0.12] blur-sm rounded-full"
//         style={{ backgroundImage: `url(${bgImage})` }}
//       />

//       <div
//         className="absolute bottom-0 left-0 w-[400px] h-[400px]
//                    bg-gradient-to-br from-[#e6c8a5]/40 to-[#d9b48a]/40
//                    rounded-full blur-3xl"
//       />

//       {/* ===== CONTENT ===== */}
//       <div className="relative z-10 flex min-h-screen">
//         <Sidebar />

//         <div className="flex-1 flex flex-col">
//           <Header />

//           <main className="flex-1 px-6 py-6">
//             <div className="max-w-7xl mx-auto space-y-10">
//               {/* TITLE */}
//               <div>
//                 <h2 className="text-3xl font-extrabold text-[#3b2a24]">
//                   Dashboard
//                 </h2>
//                 <p className="text-[#7a5a3a] text-sm mt-1">
//                   Institute performance overview
//                 </p>
//               </div>

//               {/* CIRCULAR STATS */}
//               {!loading && (
//                 <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-12">
//                   <Stat label="Courses" value={data.courses.length} />
//                   <Stat label="Students" value={data.students.length} />
//                   <Stat label="Active" value={activeStudents.length} />
//                   <Stat label="Teachers" value={teachers.length} />
//                   <Stat label="Placements" value={data.placements.length} />
//                 </section>
//               )}

//               {/* FINANCE */}
//               {!loading && (
//                 <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   <MoneyCard
//                     title="Total Revenue"
//                     value={`₹${(totalRevenue / 100000).toFixed(2)} L`}
//                     subtitle={`${activeStudents.length} students × ₹30,000`}
//                     accent="brown"
//                   />

//                   <MoneyCard
//                     title="Teacher Salary"
//                     value={`₹${(teacherSalary / 1000).toFixed(0)} K`}
//                     subtitle={`${teachers.length} teachers × ₹20,000`}
//                     accent="sand"
//                   />

//                   <MoneyCard
//                     title="Net Profit / Loss"
//                     value={`₹${(netProfit / 100000).toFixed(2)} L`}
//                     subtitle="Revenue − Salary"
//                     accent="coffee"
//                   />
//                 </section>
//               )}

//               {/* LISTS */}
//               {!loading && (
//                 <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <Card title="Courses">
//                     {data.courses.slice(0, 4).map((c) => (
//                       <Row
//                         key={c._id}
//                         title={c.courseName}
//                         subtitle={`Duration: ${c.duration}`}
//                       />
//                     ))}
//                   </Card>

//                   <Card title="Active Students">
//                     {activeStudents.slice(0, 4).map((s) => (
//                       <Row key={s._id} title={s.name} subtitle={s.course} />
//                     ))}
//                   </Card>
//                 </section>
//               )}
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= UI COMPONENTS (LOGIC FREE) ================= */

// /* 🔵 CIRCULAR STATS – LIGHT BROWN */
// const Stat = ({ label, value }) => {
//   const colors = {
//     Courses: "from-[#caa472] to-[#b08a63]",
//     Students: "from-[#d6b38c] to-[#c19a6b]",
//     Active: "from-[#bfa17a] to-[#a07c52]",
//     Teachers: "from-[#e0c2a2] to-[#c6a27e]",
//     Placements: "from-[#b9976b] to-[#9c774b]",
//   };

//   return (
//     <div className="flex flex-col items-center gap-3">
//       <div
//         className={`
//           h-24 w-24 rounded-full
//           bg-gradient-to-br ${colors[label]}
//           flex items-center justify-center
//           text-white text-3xl font-bold
//           shadow-lg
//         `}
//       >
//         {value}
//       </div>

//       <p className="text-sm font-medium text-[#3b2a24]">{label}</p>
//     </div>
//   );
// };

// const MoneyCard = ({ title, value, subtitle, accent }) => {
//   const accents = {
//     brown: "border-[#b08a63] text-[#6b4a2e]",
//     sand: "border-[#d6b38c] text-[#7a5a3a]",
//     coffee: "border-[#9c774b] text-[#4a2f1a]",
//   };

//   return (
//     <div
//       className={`rounded-2xl p-6 bg-white shadow-sm border-l-4 ${accents[accent]}`}
//     >
//       <p className="text-xs text-[#7a5a3a] uppercase">{title}</p>
//       <p className="text-3xl font-extrabold mt-2">{value}</p>
//       <p className="text-xs text-[#8b6a4a] mt-1">{subtitle}</p>
//     </div>
//   );
// };

// const Card = ({ title, children }) => (
//   <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ead7c0]">
//     <h3 className="font-semibold text-[#3b2a24] mb-4">{title}</h3>
//     <div className="space-y-3">{children}</div>
//   </div>
// );

// const Row = ({ title, subtitle }) => (
//   <div className="bg-[#f6efe8] rounded-lg px-4 py-3 hover:bg-[#efe4d8] transition">
//     <p className="text-sm font-medium text-[#3b2a24]">{title}</p>
//     <p className="text-xs text-[#7a5a3a]">{subtitle}</p>
//   </div>
// );

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import bgImage from "../assets/89124.jpg";
import { callApi } from "../Services/Api";

import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";

export default function Dashboard() {
  const [data, setData] = useState({
    courses: [],
    students: [],
    resumes: [],
    placements: [],
    employees: [],
  });

  const [loading, setLoading] = useState(true);

  // constants (UNCHANGED)
  const STUDENT_FEE = 30000;
  const TEACHER_SALARY = 20000;

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await callApi("/dashboard", "GET");
        setData({
          courses: res?.data?.courses || [],
          students: res?.data?.students || [],
          resumes: res?.data?.resumes || [],
          placements: res?.data?.placements || [],
          employees: res?.data?.employees || [],
        });
      } catch {
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  // filters (UNCHANGED)
  const activeStudents = data.students.filter((s) => s.status === "Active");
  const teachers = data.employees.filter((e) => e.role === "teacher");

  // calculations (UNCHANGED)
  const totalRevenue = activeStudents.length * STUDENT_FEE;
  const teacherSalary = teachers.length * TEACHER_SALARY;
  const netProfit = totalRevenue - teacherSalary;

  return (
    <div className="w-full min-h-screen relative bg-[#f7f2ec] overflow-x-hidden">
      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f7f2ec] via-[#f3e6d8] to-[#ead7c0]" />

      <div
        className="absolute -top-40 -right-40 w-[400px] md:w-[600px] h-[400px] md:h-[600px]
                   bg-cover bg-center opacity-[0.12] blur-sm rounded-full"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      <div
        className="absolute bottom-0 left-0 w-[260px] md:w-[400px] h-[260px] md:h-[400px]
                   bg-gradient-to-br from-[#e6c8a5]/40 to-[#d9b48a]/40
                   rounded-full blur-3xl"
      />

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 flex min-h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col md:ml-16">
          <Header />

          <main className="flex-1 px-4 sm:px-6 py-6">
            <div className="max-w-7xl mx-auto space-y-10">
              {/* TITLE */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3b2a24]">
                  Dashboard
                </h2>
                <p className="text-[#7a5a3a] text-sm mt-1">
                  Institute performance overview
                </p>
              </div>

              {/* CIRCULAR STATS */}
              {!loading && (
                <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-10">
                  <Stat label="Courses" value={data.courses.length} />
                  <Stat label="Students" value={data.students.length} />
                  <Stat label="Active" value={activeStudents.length} />
                  <Stat label="Teachers" value={teachers.length} />
                  <Stat label="Placements" value={data.placements.length} />
                </section>
              )}

              {/* FINANCE */}
              {!loading && (
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <MoneyCard
                    title="Total Revenue"
                    value={`₹${(totalRevenue / 100000).toFixed(2)} L`}
                    subtitle={`${activeStudents.length} students × ₹30,000`}
                    accent="brown"
                  />

                  <MoneyCard
                    title="Teacher Salary"
                    value={`₹${(teacherSalary / 1000).toFixed(0)} K`}
                    subtitle={`${teachers.length} teachers × ₹20,000`}
                    accent="sand"
                  />

                  <MoneyCard
                    title="Net Profit / Loss"
                    value={`₹${(netProfit / 100000).toFixed(2)} L`}
                    subtitle="Revenue − Salary"
                    accent="coffee"
                  />
                </section>
              )}

              {/* LISTS */}
              {!loading && (
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card title="Courses">
                    {data.courses.slice(0, 4).map((c) => (
                      <Row
                        key={c._id}
                        title={c.courseName}
                        subtitle={`Duration: ${c.duration}`}
                      />
                    ))}
                  </Card>

                  <Card title="Active Students">
                    {activeStudents.slice(0, 4).map((s) => (
                      <Row key={s._id} title={s.name} subtitle={s.course} />
                    ))}
                  </Card>
                </section>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

/* ================= UI COMPONENTS (LOGIC FREE) ================= */

const Stat = ({ label, value }) => {
  const colors = {
    Courses: "from-[#caa472] to-[#b08a63]",
    Students: "from-[#d6b38c] to-[#c19a6b]",
    Active: "from-[#bfa17a] to-[#a07c52]",
    Teachers: "from-[#e0c2a2] to-[#c6a27e]",
    Placements: "from-[#b9976b] to-[#9c774b]",
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`h-20 w-20 sm:h-24 sm:w-24 rounded-full
        bg-gradient-to-br ${colors[label]}
        flex items-center justify-center
        text-white text-2xl sm:text-3xl font-bold
        shadow-lg`}
      >
        {value}
      </div>
      <p className="text-sm font-medium text-[#3b2a24]">{label}</p>
    </div>
  );
};

const MoneyCard = ({ title, value, subtitle, accent }) => {
  const accents = {
    brown: "border-[#b08a63] text-[#6b4a2e]",
    sand: "border-[#d6b38c] text-[#7a5a3a]",
    coffee: "border-[#9c774b] text-[#4a2f1a]",
  };

  return (
    <div
      className={`rounded-2xl p-5 sm:p-6 bg-white shadow-sm border-l-4 ${accents[accent]}`}
    >
      <p className="text-xs text-[#7a5a3a] uppercase">{title}</p>
      <p className="text-2xl sm:text-3xl font-extrabold mt-2">{value}</p>
      <p className="text-xs text-[#8b6a4a] mt-1">{subtitle}</p>
    </div>
  );
};

const Card = ({ title, children }) => (
  <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#ead7c0]">
    <h3 className="font-semibold text-[#3b2a24] mb-4">{title}</h3>
    <div className="space-y-3">{children}</div>
  </div>
);

const Row = ({ title, subtitle }) => (
  <div className="bg-[#f6efe8] rounded-lg px-4 py-3 hover:bg-[#efe4d8] transition">
    <p className="text-sm font-medium text-[#3b2a24]">{title}</p>
    <p className="text-xs text-[#7a5a3a]">{subtitle}</p>
  </div>
);
