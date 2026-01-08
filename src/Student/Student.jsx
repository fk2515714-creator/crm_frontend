import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import bgImage from "../assets/89124.jpg";
import Sidebar from "../Dashboards/Sidebar";
import Header from "../Dashboards/Header";
import { callApi } from "../Services/Api";
import EditStudent from "./EditStudent";

export default function Students() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(6);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await callApi("/students", "GET");
        setStudents(res?.data || []);
      } catch (err) {
        console.error("Fetch students error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter((s) =>
    (s.name + s.email + s.course).toLowerCase().includes(query.toLowerCase())
  );

  const visibleStudents = filteredStudents.slice(0, visible);

  const handleView = (id) => navigate(`/students/${id}`);

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setIsEditOpen(true);
  };

  const handleUpdatedStudent = (updatedStudent) => {
    setStudents((prev) =>
      prev.map((s) => (s._id === updatedStudent._id ? updatedStudent : s))
    );
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (!confirm) return;

    try {
      setDeletingId(id);
      await callApi(`/students/${id}`, "DELETE");
      setStudents((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Delete student error:", err);
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
          <Header />

          <main className="flex-1 px-6 py-8">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* HEADER */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-[#3b2a24]">
                    Students
                  </h2>
                  <p className="text-sm text-[#7a5a3a]">
                    All enrolled students
                  </p>
                </div>

                <div className="flex gap-3">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setVisible(6);
                    }}
                    placeholder="Search students..."
                    className="
                      px-5 py-2 rounded-full
                      border border-[#ead7c0]
                      text-sm
                      focus:outline-none
                      focus:ring-2 focus:ring-[#b08a63]
                    "
                  />

                  <button
                    onClick={() => navigate("/add-student")}
                    className="
                      px-6 py-2 rounded-full
                      bg-[#b08a63]
                      hover:bg-[#9c774b]
                      text-white
                      text-sm font-medium
                      shadow-sm
                      transition
                    "
                  >
                    + Add Student
                  </button>
                </div>
              </div>

              {/* LOADING */}
              {loading && (
                <div className="text-center text-[#7a5a3a] py-16">
                  Loading students...
                </div>
              )}

              {/* STUDENT CARDS */}
              {!loading && visibleStudents.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleStudents.map((s) => (
                    <article
                      key={s._id}
                      className="
                        bg-white
                        rounded-2xl
                        p-5
                        border border-[#ead7c0]
                        shadow-sm
                        hover:shadow-lg
                        transition-all
                        hover:-translate-y-1
                      "
                    >
                      {/* TOP */}
                      <div className="flex items-center gap-4">
                        <div
                          className="
                            h-14 w-14 rounded-full
                            bg-[#f3e6d8] text-[#7a5a3a]
                            flex items-center justify-center
                            font-semibold text-sm
                          "
                        >
                          {/* IMAGE REMOVED HERE – only initials will show */}
                          {s.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-semibold text-[#3b2a24] truncate">
                            {s.name}
                          </h3>
                          <p className="text-xs text-[#7a5a3a] truncate">
                            {s.email}
                          </p>
                        </div>
                      </div>

                      {/* INFO */}
                      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-[#3b2a24]">
                        <p>
                          <span className="font-medium">Course:</span>{" "}
                          {s.course}
                        </p>
                        <p>
                          <span className="font-medium">Batch:</span> {s.batch}
                        </p>

                        <span
                          className={`w-fit px-3 py-0.5 rounded-full text-[10px] font-medium ${
                            s.status === "Active"
                              ? "bg-[#e6f2e6] text-[#3f7a3a]"
                              : "bg-[#f3e6d8] text-[#7a5a3a]"
                          }`}
                        >
                          {s.status}
                        </span>
                      </div>

                      {/* ACTIONS */}
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => handleView(s._id)}
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
                          onClick={() => handleEdit(s)}
                          className="
                            flex-1 rounded-full py-1.5 text-xs
                            border border-[#ead7c0]
                            text-[#3b2a24]
                            hover:bg-[#f7f2ec]
                          "
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(s._id)}
                          disabled={deletingId === s._id}
                          className="
                            rounded-full px-3 py-1.5 text-xs
                            border border-red-300
                            text-red-600
                            hover:bg-red-50
                            disabled:opacity-60
                          "
                        >
                          {deletingId === s._id ? "..." : "Delete"}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* LOAD MORE */}
              {!loading && filteredStudents.length > visible && (
                <div className="flex justify-center">
                  <button
                    onClick={() => setVisible((v) => v + 6)}
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
              {!loading && filteredStudents.length === 0 && (
                <div className="text-center text-[#7a5a3a] py-16">
                  No students found
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* EDIT MODAL */}
      {isEditOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="w-full max-w-3xl">
            <EditStudent
              student={selectedStudent}
              onClose={() => setIsEditOpen(false)}
              onUpdated={handleUpdatedStudent}
            />
          </div>
        </div>
      )}
    </div>
  );
}
