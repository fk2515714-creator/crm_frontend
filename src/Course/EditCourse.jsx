import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import bgImage from "../assets/89124.jpg";
import Sidebar from "../Dashboards/Sidebar";
import Header from "../Dashboards/Header";
import { callApi } from "../Services/Api";

export default function EditCourse() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    courseName: "",
    duration: "",
    fee: "",
    courseImg: "",
    description: "",
    eligibility: "",
    level: "Beginner",
    mode: "Offline",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* FETCH COURSE (UNCHANGED) */
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await callApi(`/courses/${id}`, "GET");
        const c = res?.data;

        setForm({
          courseName: c.courseName || "",
          duration: c.duration || "",
          fee: c.fee || "",
          courseImg: c.courseImg || "",
          description: c.description || "",
          eligibility: c.eligibility || "",
          level: c.level || "Beginner",
          mode: c.mode || "Offline",
        });
      } catch {
        toast.error("Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.courseName || !form.duration || !form.fee) {
      toast.error("Please fill required fields");
      return;
    }

    try {
      setSaving(true);
      await callApi(`/courses/${id}`, "PUT", form);
      toast.success("Course updated successfully");
      navigate(`/courses/${id}`);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update course");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#7a5a3a]">
        Loading course...
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

      <div className="relative z-20 flex min-h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Header userName="Edit Course" />

          <main className="flex-1 px-4 md:px-8 py-8">
            <div
              className="
                max-w-5xl mx-auto
                bg-white
                border border-[#ead7c0]
                rounded-3xl
                p-8 md:p-10
                shadow-sm hover:shadow-lg
                transition
              "
            >
              <h2 className="text-2xl font-bold text-[#3b2a24]">Edit Course</h2>
              <p className="text-sm text-[#7a5a3a] mb-8">
                Update course details below
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* ROW 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    name="courseName"
                    value={form.courseName}
                    onChange={handleChange}
                    placeholder="Course name *"
                    className="pill-input"
                  />

                  <input
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    placeholder="Duration *"
                    className="pill-input"
                  />
                </div>

                {/* ROW 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="number"
                    name="fee"
                    value={form.fee}
                    onChange={handleChange}
                    placeholder="Course fee *"
                    className="pill-input"
                  />

                  <input
                    name="courseImg"
                    value={form.courseImg}
                    onChange={handleChange}
                    placeholder="Course image URL"
                    className="pill-input"
                  />
                </div>

                {/* DESCRIPTION */}
                <input
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Course description"
                  className="pill-input"
                />

                {/* ROW 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    name="eligibility"
                    value={form.eligibility}
                    onChange={handleChange}
                    placeholder="Eligibility"
                    className="pill-input"
                  />

                  <select
                    name="level"
                    value={form.level}
                    onChange={handleChange}
                    className="pill-input"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                {/* MODE */}
                <select
                  name="mode"
                  value={form.mode}
                  onChange={handleChange}
                  className="pill-input"
                >
                  <option value="Offline">Offline</option>
                  <option value="Online">Online</option>
                  <option value="Hybrid">Hybrid</option>
                </select>

                {/* ACTIONS */}
                <div className="flex items-center gap-6 pt-6">
                  <button
                    type="submit"
                    disabled={saving}
                    className="
                      flex-1
                      bg-[#b08a63] hover:bg-[#9c774b]
                      text-white py-3 rounded-full
                      text-sm font-medium
                      transition disabled:opacity-70
                    "
                  >
                    {saving ? "Saving..." : "Update Course"}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="
                      px-10 py-3 rounded-full
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
