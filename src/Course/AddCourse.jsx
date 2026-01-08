import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import bgImage from "../assets/89124.jpg";
import Sidebar from "../Dashboards/Sidebar";
import Header from "../Dashboards/Header";
import { callApi } from "../Services/Api";

export default function AddCourse() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    courseName: "",
    duration: "",
    fee: "",
    description: "",
    eligibility: "",
    level: "Beginner",
    mode: "Offline",
    syllabus: "",
    instructorName: "",
    instructorExperience: "",
    status: "Active",
    startDate: "",
  });

  const [courseImg, setCourseImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.courseName || !form.duration || !form.fee || !courseImg) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (key === "syllabus") {
          formData.append(
            "syllabus",
            JSON.stringify(value.split(",").map((s) => s.trim()))
          );
        } else {
          formData.append(key, value);
        }
      });

      formData.append("instructor[name]", form.instructorName);
      formData.append("instructor[experience]", form.instructorExperience);

      formData.append("courseImg", courseImg);

      await callApi("/admin/createCourse", "POST", formData);

      toast.success("Course created successfully");
      navigate("/courses");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create course");
    } finally {
      setLoading(false);
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

          <main className="flex-1 px-4 md:px-8 py-8">
            <div
              className="
                max-w-4xl mx-auto
                bg-white
                border border-[#ead7c0]
                rounded-2xl
                p-8
                shadow-sm
              "
            >
              <h2 className="text-2xl font-bold text-[#3b2a24]">
                Create Course
              </h2>
              <p className="text-sm text-[#7a5a3a] mb-6">Add course details</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* BASIC INFO */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="courseName"
                    placeholder="Course name *"
                    onChange={handleChange}
                    className="input border-[#ead7c0] focus:ring-[#b08a63]"
                  />

                  <input
                    name="duration"
                    placeholder="Duration (e.g. 6 Months) *"
                    onChange={handleChange}
                    className="input border-[#ead7c0] focus:ring-[#b08a63]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="number"
                    name="fee"
                    placeholder="Course fee *"
                    onChange={handleChange}
                    className="input border-[#ead7c0] focus:ring-[#b08a63]"
                  />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCourseImg(e.target.files[0])}
                    className="input border-[#ead7c0]"
                  />
                </div>

                {/* DESCRIPTION */}
                <textarea
                  name="description"
                  placeholder="Short description"
                  rows={2}
                  onChange={handleChange}
                  className="
                    w-full px-3 py-2
                    border border-[#ead7c0]
                    rounded-xl text-sm
                    resize-none
                    focus:outline-none
                    focus:ring-2 focus:ring-[#b08a63]
                  "
                />

                {/* SYLLABUS */}
                <input
                  name="syllabus"
                  placeholder="Syllabus (comma separated)"
                  onChange={handleChange}
                  className="input border-[#ead7c0] focus:ring-[#b08a63]"
                />

                {/* ELIGIBILITY + LEVEL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="eligibility"
                    placeholder="Eligibility"
                    onChange={handleChange}
                    className="input border-[#ead7c0] focus:ring-[#b08a63]"
                  />

                  <select
                    name="level"
                    onChange={handleChange}
                    className="input border-[#ead7c0] focus:ring-[#b08a63]"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>

                {/* MODE + STATUS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    name="mode"
                    onChange={handleChange}
                    className="input border-[#ead7c0] focus:ring-[#b08a63]"
                  >
                    <option>Offline</option>
                    <option>Online</option>
                    <option>Hybrid</option>
                  </select>

                  <select
                    name="status"
                    onChange={handleChange}
                    className="input border-[#ead7c0] focus:ring-[#b08a63]"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>

                {/* INSTRUCTOR */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="instructorName"
                    placeholder="Instructor name"
                    onChange={handleChange}
                    className="input border-[#ead7c0] focus:ring-[#b08a63]"
                  />

                  <input
                    name="instructorExperience"
                    placeholder="Instructor experience (e.g. 5+ years)"
                    onChange={handleChange}
                    className="input border-[#ead7c0] focus:ring-[#b08a63]"
                  />
                </div>

                {/* START DATE */}
                <input
                  type="date"
                  name="startDate"
                  onChange={handleChange}
                  className="input border-[#ead7c0] focus:ring-[#b08a63]"
                />

                {/* ACTIONS */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      flex-1
                      bg-[#b08a63]
                      hover:bg-[#9c774b]
                      text-white
                      py-2.5
                      rounded-full
                      font-medium
                      transition
                      disabled:opacity-70
                    "
                  >
                    {loading ? "Creating..." : "Create Course"}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/courses")}
                    className="
                      px-8 py-2
                      border border-[#d9b48a]
                      rounded-full
                      text-sm
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
