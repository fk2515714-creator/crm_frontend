import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import bgImage from "../assets/89124.jpg";
import Sidebar from "../Dashboards/Sidebar";
import Header from "../Dashboards/Header";
import { callApi } from "../Services/Api";

function Placement() {
  const navigate = useNavigate();

  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlacements = async () => {
      try {
        const res = await callApi("/placements", "GET");
        setPlacements(res?.data || []);
      } catch (err) {
        console.error("Fetch placements error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlacements();
  }, []);

  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-[#f7f2ec]">
      {/* ===== LIGHT BROWN BACKGROUND ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f7f2ec] via-[#f3e6d8] to-[#ead7c0]" />

      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px]
                   bg-cover bg-center opacity-[0.12] blur-sm rounded-full"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px]
                   bg-gradient-to-br from-[#e6c8a5]/40 to-[#d9b48a]/40
                   rounded-full blur-3xl"
      />

      <div className="relative z-10 flex min-h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Header userName="Placements" />

          <main className="flex-1 px-6 py-8">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* HEADER */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-[#3b2a24]">
                    Placements
                  </h2>
                  <p className="text-sm text-[#7a5a3a]">
                    Student placement records
                  </p>
                </div>

                <button
                  onClick={() => navigate("/add-placement")}
                  className="
                    px-6 py-2 rounded-full
                    bg-[#b08a63] text-white text-sm
                    font-medium hover:bg-[#9c774b]
                    shadow-sm transition
                  "
                >
                  + Add Placement
                </button>
              </div>

              {/* LOADING */}
              {loading && (
                <div className="text-center text-[#7a5a3a] py-16">
                  Loading placements...
                </div>
              )}

              {/* PLACEMENT CARDS */}
              {!loading && placements.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {placements.map((p) => (
                    <article
                      key={p._id}
                      className="
                        bg-white rounded-2xl p-5
                        border border-[#ead7c0]
                        shadow-sm hover:shadow-lg
                        transition-all duration-300
                        hover:-translate-y-1
                      "
                    >
                      {/* STUDENT */}
                      <h3 className="font-semibold text-[#3b2a24] text-sm">
                        {p.student?.name || "Student"}
                      </h3>

                      {/* INFO */}
                      <div className="mt-2 text-xs text-[#6b4a2e] space-y-1">
                        <p>
                          <span className="font-medium">Company:</span>{" "}
                          {p.companyName}
                        </p>
                        <p>
                          <span className="font-medium">Role:</span> {p.jobRole}
                        </p>
                        <p className="font-medium text-[#4a2f1a]">
                          Package: ₹{p.package}
                        </p>
                      </div>

                      {/* STATUS */}
                      <div className="mt-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full
                          text-[11px] font-medium ${
                            p.status === "Placed"
                              ? "bg-[#e6f0e6] text-[#2f6b2f]"
                              : p.status === "Offered"
                              ? "bg-[#f5ecd9] text-[#8a6a2f]"
                              : "bg-[#f0ebe5] text-[#7a5a3a]"
                          }`}
                        >
                          {p.status || "Placed"}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* EMPTY */}
              {!loading && placements.length === 0 && (
                <div className="text-center text-[#7a5a3a] py-16">
                  No placements found
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Placement;
