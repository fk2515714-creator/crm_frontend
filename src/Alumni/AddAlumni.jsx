import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import bgImage from "../assets/89124.jpg";
import Sidebar from "../Dashboards/Sidebar";
import Header from "../Dashboards/Header";
import { callApi } from "../Services/Api";

function AddAlumni() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    student: "",
    passingYear: "",
    companyName: "",
    jobRole: "",
    location: "",
  });

  /* ===== Fetch students ===== */
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await callApi("/students", "GET");
        setStudents(res?.data || []);
      } catch {
        toast.error("Failed to load students");
      }
    };
    fetchStudents();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.student || !form.passingYear) {
      toast.error("Student and passing year are required");
      return;
    }

    try {
      setLoading(true);
      await callApi("/admin/createAlumni", "POST", form);
      toast.success("Alumni created successfully");
      navigate("/alumni");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create alumni");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-[#f7f2ec]">
      {/* ===== LIGHT BROWN BACKGROUND ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f7f2ec] via-[#f3e6d8] to-[#ead7c0]" />

      <div
        className="absolute -top-40 -right-40 w-[520px] h-[520px]
        bg-cover bg-center opacity-[0.12] blur-sm rounded-full"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      <div className="relative z-20 flex min-h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Header userName="Add Alumni" />

          <main className="flex-1 px-4 py-10">
            <div className="max-w-3xl mx-auto">
              {/* Heading */}
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-extrabold text-[#3b2a24]">
                  Add Alumni
                </h2>
                <p className="text-[#7a5a3a] mt-1">
                  Mark a student as alumni after placement
                </p>
              </div>

              {/* Card */}
              <div
                className="bg-white border border-[#ead7c0]
                rounded-3xl p-8 shadow-sm"
              >
                <form className="space-y-6">
                  {/* Student */}
                  <div>
                    <label className="text-sm font-medium text-[#5c4630]">
                      Student *
                    </label>
                    <select
                      name="student"
                      value={form.student}
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="">Select Student</option>
                      {students.map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-[#5c4630]">
                        Passing Year *
                      </label>
                      <input
                        name="passingYear"
                        value={form.passingYear}
                        onChange={handleChange}
                        placeholder="e.g. 2023"
                        className="input"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-[#5c4630]">
                        Company
                      </label>
                      <input
                        name="companyName"
                        value={form.companyName}
                        onChange={handleChange}
                        placeholder="Company name"
                        className="input"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-[#5c4630]">
                        Job Role
                      </label>
                      <input
                        name="jobRole"
                        value={form.jobRole}
                        onChange={handleChange}
                        placeholder="Job role"
                        className="input"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-[#5c4630]">
                        Location
                      </label>
                      <input
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="City / Location"
                        className="input"
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="pt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex-1 bg-[#b08a63] text-white
                      py-3 rounded-full font-medium text-sm
                      hover:bg-[#9c774b] transition
                      disabled:opacity-70"
                    >
                      {loading ? "Creating..." : "Create Alumni"}
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate("/alumni")}
                      className="px-6 py-3 rounded-full border
                      text-sm hover:bg-[#f3e6d8]"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AddAlumni;
