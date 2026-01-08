import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import bgImage from "../assets/89124.jpg";
import Sidebar from "../Dashboards/Sidebar";
import Header from "../Dashboards/Header";
import { callApi } from "../Services/Api";

export default function AddResume() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    student: "",
    name: "",
    email: "",
    phone: "",
    course: "",
    resumeUrl: "",
    status: "Pending",
  });

  /* FETCH STUDENTS (UNCHANGED) */
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await callApi("/students", "GET");
        setStudents(res?.data || []);
      } catch (err) {
        console.error("Fetch students error:", err);
      }
    };

    fetchStudents();
  }, []);

  /* SELECT STUDENT (UNCHANGED) */
  const handleStudentSelect = (e) => {
    const studentId = e.target.value;
    const selectedStudent = students.find((s) => s._id === studentId);

    if (!selectedStudent) return;

    setForm((prev) => ({
      ...prev,
      student: selectedStudent._id,
      name: selectedStudent.name || "",
      email: selectedStudent.email || "",
      phone: selectedStudent.phone || "",
      course: selectedStudent.course || "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { student, name, email, phone, course, resumeUrl } = form;

    if (!student || !name || !email || !phone || !course || !resumeUrl) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await callApi("/admin/createResumes", "POST", form);
      toast.success("Resume created successfully");
      navigate("/resumes");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create resume";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

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
          <Header userName="Add Resume" />

          <main className="flex-1 px-4 md:px-8 py-8">
            <div
              className="
                max-w-3xl mx-auto
                bg-white
                border border-[#ead7c0]
                rounded-3xl
                p-6 md:p-8
                shadow-sm hover:shadow-lg
                transition
              "
            >
              <h2 className="text-2xl font-bold text-[#3b2a24] mb-1">
                Add Resume
              </h2>
              <p className="text-sm text-[#7a5a3a] mb-6">
                Select student and upload resume details
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* STUDENT */}
                <select
                  value={form.student}
                  onChange={handleStudentSelect}
                  className="pill-input"
                >
                  <option value="">Select Student *</option>
                  {students.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name} ({s.email})
                    </option>
                  ))}
                </select>

                {/* AUTO FIELDS */}
                <input
                  value={form.name}
                  disabled
                  placeholder="Name"
                  className="pill-input bg-[#f3e6d8]"
                />

                <input
                  value={form.email}
                  disabled
                  placeholder="Email"
                  className="pill-input bg-[#f3e6d8]"
                />

                <input
                  value={form.phone}
                  disabled
                  placeholder="Phone"
                  className="pill-input bg-[#f3e6d8]"
                />

                <input
                  value={form.course}
                  disabled
                  placeholder="Course"
                  className="pill-input bg-[#f3e6d8]"
                />

                {/* RESUME URL */}
                <input
                  name="resumeUrl"
                  value={form.resumeUrl}
                  onChange={handleChange}
                  placeholder="Resume URL *"
                  className="pill-input"
                />

                {/* STATUS */}
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="pill-input"
                >
                  <option value="Pending">Pending</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Rejected">Rejected</option>
                </select>

                {/* ACTIONS */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      flex-1
                      bg-[#b08a63] hover:bg-[#9c774b]
                      text-white py-3 rounded-full
                      font-medium transition
                      disabled:opacity-70
                    "
                  >
                    {loading ? "Saving..." : "Add Resume"}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/resumes")}
                    className="
                      px-6 py-3 rounded-full
                      border border-[#d9b48a]
                      text-[#7a5a3a]
                      hover:bg-[#f3e6d8]
                      transition
                    "
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
