import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Sidebar from "../Dashboards/Sidebar";
import Header from "../Dashboards/Header";
import { callApi } from "../Services/Api";

export default function CourseView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await callApi(`/courses/${id}`, "GET");
        setCourse(res?.data);
      } catch (err) {
        console.error("Fetch course error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#7a5a3a]">
        Loading course...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#7a5a3a]">
        Course not found
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#f7f2ec]">
      {/* ===== LIGHT BROWN BACKGROUND ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f7f2ec] via-[#f3e6d8] to-[#ead7c0]" />

      <div className="relative z-10 flex min-h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Header userName="Course Details" />

          <main className="flex-1 px-6 py-8">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* BACK */}
              <button
                onClick={() => navigate(-1)}
                className="text-sm text-[#7a5a3a] hover:underline"
              >
                ← Back
              </button>

              {/* COURSE CARD */}
              <div
                className="
                  bg-white
                  border border-[#ead7c0]
                  rounded-3xl
                  shadow-sm hover:shadow-lg
                  transition-all
                  p-6 md:p-8
                  flex flex-col md:flex-row
                  gap-6
                "
              >
                {/* IMAGE */}
                {course.courseImg && (
                  <div className="bg-[#f3e6d8] p-3 rounded-2xl shrink-0">
                    <img
                      src={course.courseImg}
                      alt={course.courseName}
                      className="w-40 h-28 object-contain rounded-xl"
                    />
                  </div>
                )}

                {/* CONTENT */}
                <div className="flex-1 space-y-4">
                  {/* LEVEL */}
                  <span
                    className="
                      inline-block text-xs px-4 py-1.5 rounded-full
                      border border-[#d9b48a]
                      text-[#7a5a3a] font-medium
                      bg-[#f7f2ec]
                    "
                  >
                    {course.level}
                  </span>

                  {/* TITLE */}
                  <h1 className="text-2xl font-bold text-[#3b2a24]">
                    {course.courseName}
                  </h1>

                  {/* DESCRIPTION */}
                  <p className="text-sm text-[#5c4630] max-w-2xl">
                    {course.description || "No description available"}
                  </p>

                  {/* DETAILS */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm pt-2">
                    <div>
                      <span className="text-xs text-[#7a5a3a]">Duration</span>
                      <p className="font-semibold text-[#3b2a24]">
                        {course.duration}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs text-[#7a5a3a]">Fee</span>
                      <p className="font-semibold text-[#3b2a24]">
                        ₹ {course.fee}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs text-[#7a5a3a]">Mode</span>
                      <p className="font-semibold text-[#3b2a24]">
                        {course.mode}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs text-[#7a5a3a]">Status</span>
                      <p className="font-semibold text-[#3b2a24]">
                        {course.status || "Active"}
                      </p>
                    </div>
                  </div>

                  {/* ACTION */}
                  <div className="pt-4">
                    <button
                      onClick={() => navigate(`/courses/edit/${course._id}`)}
                      className="
                        px-8 py-2.5 rounded-full
                        bg-[#b08a63]
                        hover:bg-[#9c774b]
                        text-white text-sm font-medium
                        transition
                      "
                    >
                      Edit Course
                    </button>
                  </div>
                </div>
              </div>

              {/* FOOTER */}
              <button
                onClick={() => navigate("/courses")}
                className="
                  px-6 py-2 rounded-full
                  border border-[#d9b48a]
                  text-[#7a5a3a]
                  hover:bg-[#f3e6d8]
                  transition
                "
              >
                Back to Courses
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
