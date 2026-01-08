import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import bgImage from "../assets/89124.jpg";
import Sidebar from "../Dashboards/Sidebar";
import Header from "../Dashboards/Header";
import { callApi } from "../Services/Api";

export default function Courses() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(6);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await callApi("/courses", "GET");
        setCourses(res?.data || []);
      } catch (err) {
        console.error("Fetch courses error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filtered = courses.filter((c) =>
    (c.courseName + (c.description || ""))
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const showCourses = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      setDeletingId(id);
      await callApi(`/courses/${id}`, "DELETE");
      toast.success("Course deleted successfully");
      setCourses((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete course");
    } finally {
      setDeletingId(null);
    }
  };

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
          <Header userName="Courses" />

          <main className="flex-1 px-6 py-8">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* HEADER */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-[#3b2a24]">Courses</h2>
                  <p className="text-sm text-[#7a5a3a]">
                    Manage institute courses
                  </p>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setVisible(6);
                    }}
                    placeholder="Search courses..."
                    className="
                      px-5 py-2 rounded-full
                      border border-[#d9b48a]
                      text-sm w-full md:w-72
                      focus:outline-none
                      focus:ring-2 focus:ring-[#b08a63]
                    "
                  />

                  <button
                    onClick={() => navigate("/add-course")}
                    className="
                      px-6 py-2 rounded-full
                      bg-[#b08a63]
                      hover:bg-[#9c774b]
                      text-white text-sm
                      font-medium
                      shadow-sm
                      transition
                    "
                  >
                    + Add Course
                  </button>
                </div>
              </div>

              {/* LOADING */}
              {loading && (
                <div className="text-center text-[#7a5a3a] py-16">
                  Loading courses...
                </div>
              )}

              {/* COURSE CARDS */}
              {!loading && showCourses.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {showCourses.map((c) => (
                    <article
                      key={c._id}
                      className="
                        bg-white rounded-2xl p-5
                        border border-[#ead7c0]
                        shadow-sm hover:shadow-lg
                        transition-all duration-300
                        hover:-translate-y-1
                        flex gap-4
                      "
                    >
                      {/* IMAGE */}
                      <div
                        className="
                          w-14 h-14 rounded-full
                          overflow-hidden bg-[#f3e6d8]
                          shrink-0
                          flex items-center justify-center
                          text-[#7a5a3a] font-semibold
                        "
                      >
                        {c.courseImg ? (
                          <img
                            src={c.courseImg}
                            alt={c.courseName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          c.courseName?.[0]
                        )}
                      </div>

                      {/* INFO */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-[#3b2a24] text-sm">
                            {c.courseName}
                          </h3>

                          <p className="text-xs text-[#7a5a3a] mt-1 line-clamp-2">
                            {c.description || "No description available"}
                          </p>

                          <div className="mt-2 text-xs text-[#5c4630] space-y-1">
                            <p>
                              <span className="font-medium">Duration:</span>{" "}
                              {c.duration}
                            </p>
                            <p className="font-medium">Fee: ₹{c.fee}</p>
                          </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() => navigate(`/courses/${c._id}`)}
                            className="
                              flex-1 rounded-full py-1.5 text-xs
                              border border-[#d9b48a]
                              text-[#7a5a3a]
                              hover:bg-[#f3e6d8]
                            "
                          >
                            View
                          </button>

                          <button
                            onClick={() => navigate(`/courses/edit/${c._id}`)}
                            className="
                              flex-1 rounded-full py-1.5 text-xs
                              border border-[#e0d3c2]
                              text-[#5c4630]
                              hover:bg-[#f7f2ec]
                            "
                          >
                            Edit
                          </button>

                          <button
                            disabled={deletingId === c._id}
                            onClick={() => handleDelete(c._id)}
                            className="
                              flex-1 rounded-full py-1.5 text-xs
                              border border-red-300
                              text-red-600
                              hover:bg-red-50
                              disabled:opacity-60
                            "
                          >
                            {deletingId === c._id ? "..." : "Delete"}
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* LOAD MORE */}
              {hasMore && (
                <div className="flex justify-center">
                  <button
                    onClick={() => setVisible((v) => v + 3)}
                    className="
                      px-6 py-2 rounded-full
                      border border-[#d9b48a]
                      text-[#7a5a3a]
                      text-sm
                      hover:bg-[#f3e6d8]
                    "
                  >
                    Load More
                  </button>
                </div>
              )}

              {/* EMPTY */}
              {!loading && !filtered.length && (
                <div className="text-center text-[#7a5a3a] py-16">
                  No courses found
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
