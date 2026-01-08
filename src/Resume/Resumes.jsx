import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import bgImage from "../assets/89124.jpg";
import Sidebar from "../Dashboards/Sidebar";
import Header from "../Dashboards/Header";
import { callApi } from "../Services/Api";
import { AuthContext } from "../Context/AuthContext";

function Resumes() {
  const navigate = useNavigate();
  const { role, loading: authLoading } = useContext(AuthContext);

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await callApi("/resumes", "GET");
        setResumes(res?.data || []);
      } catch (err) {
        console.error("Fetch resumes error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#7a5a3a]">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-[#f7f2ec]">
      {/* ===== LIGHT BROWN BACKGROUND ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f7f2ec] via-[#f3e6d8] to-[#ead7c0]" />

      <div
        className="absolute -top-40 -right-40 w-[500px] h-[500px]
                   bg-cover bg-center opacity-[0.12] blur-sm rounded-full"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      <div className="relative z-10 flex min-h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Header userName="Resumes" />

          <main className="flex-1 px-6 py-8">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* HEADER */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-[#3b2a24]">Resumes</h2>
                  <p className="text-sm text-[#7a5a3a]">
                    Uploaded student resumes
                  </p>
                </div>

                {role?.toLowerCase() !== "counseller" && (
                  <button
                    onClick={() => navigate("/add-resume")}
                    className="
                      px-6 py-2 rounded-full
                      bg-[#b08a63] hover:bg-[#9c774b]
                      text-white text-sm font-medium
                      shadow-sm transition
                    "
                  >
                    + Add Resume
                  </button>
                )}
              </div>

              {/* LOADING */}
              {loading && (
                <div className="text-center text-[#7a5a3a] py-16">
                  Loading resumes...
                </div>
              )}

              {/* RESUME CARDS */}
              {!loading && resumes.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resumes.map((r) => (
                    <article
                      key={r._id}
                      className="
                        bg-white rounded-3xl p-5
                        border border-[#ead7c0]
                        shadow-sm hover:shadow-lg
                        transition-all duration-300
                        hover:-translate-y-1
                      "
                    >
                      {/* TOP */}
                      <div>
                        <h3 className="font-semibold text-[#3b2a24] text-sm">
                          {r.name}
                        </h3>
                        <p className="text-xs text-[#7a5a3a] mt-1">{r.email}</p>
                      </div>

                      {/* INFO */}
                      <div className="mt-3 text-xs text-[#5c4630] space-y-1">
                        <p>
                          <span className="font-medium">Phone:</span> {r.phone}
                        </p>
                        <p>
                          <span className="font-medium">Course:</span>{" "}
                          {r.course}
                        </p>
                      </div>

                      {/* STATUS */}
                      <div className="mt-3">
                        <span
                          className={`inline-block px-3 py-1 rounded-full
                          text-[11px] font-medium ${
                            r.status === "Pending"
                              ? "bg-[#f3e6d8] text-[#7a5a3a]"
                              : r.status === "Reviewed"
                              ? "bg-blue-100 text-blue-700"
                              : r.status === "Shortlisted"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {r.status}
                        </span>
                      </div>

                      {/* ACTION */}
                      <div className="mt-4">
                        <a
                          href={r.resumeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="
                            inline-block text-[#9c774b]
                            text-sm font-medium
                            hover:underline
                          "
                        >
                          View Resume →
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* EMPTY */}
              {!loading && resumes.length === 0 && (
                <div className="text-center text-[#7a5a3a] py-16">
                  No resumes found
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Resumes;
