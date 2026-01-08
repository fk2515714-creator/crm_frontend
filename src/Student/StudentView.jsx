import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import bgImage from "../assets/89124.jpg";
import Sidebar from "../Dashboards/Sidebar";
import Header from "../Dashboards/Header";
import { callApi } from "../Services/Api";

export default function StudentView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await callApi(`/students/${id}`, "GET");
        setStudent(res?.data || null);
      } catch (err) {
        console.error("Fetch student error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#7a5a3a]">
        Loading student...
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#7a5a3a]">
        Student not found
      </div>
    );
  }

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
          <Header userName="Student Profile" />

          <main className="flex-1 px-4 md:px-8 py-8">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* BACK */}
              <button
                onClick={() => navigate(-1)}
                className="text-[#7a5a3a] text-sm hover:underline"
              >
                ← Back
              </button>

              {/* PROFILE CARD */}
              <article
                className="
                  bg-white
                  border border-[#ead7c0]
                  rounded-2xl
                  p-6 md:p-8
                  shadow-sm
                "
              >
                {/* TOP SECTION */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  {/* IMAGE */}
                  <div
                    className="
                      h-28 w-28 rounded-full overflow-hidden
                      bg-[#f3e6d8]
                      flex items-center justify-center
                      text-[#7a5a3a]
                      font-bold text-3xl
                    "
                  >
                    {student.profileImage ? (
                      <img
                        // src={student.profileImage}
                        src={student}
                        alt={student.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      student.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")
                    )}
                  </div>

                  {/* BASIC INFO */}
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-[#3b2a24]">
                      {student.name}
                    </h2>

                    <p className="text-sm text-[#7a5a3a] mt-1">
                      {student.email}
                    </p>

                    <p className="text-sm text-[#7a5a3a]">{student.phone}</p>

                    <span
                      className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium ${
                        student.status === "Active"
                          ? "bg-[#e6f2e6] text-[#3f7a3a]"
                          : student.status === "Pending"
                          ? "bg-[#fff1d6] text-[#8a6d3b]"
                          : "bg-[#f3e6d8] text-[#7a5a3a]"
                      }`}
                    >
                      {student.status}
                    </span>
                  </div>
                </div>

                {/* DETAILS */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#3b2a24]">
                  <p>
                    <b>Gender:</b> {student.gender}
                  </p>
                  <p>
                    <b>Age:</b> {student.age}
                  </p>
                  <p>
                    <b>Qualification:</b> {student.qualification}
                  </p>
                  <p>
                    <b>Course:</b> {student.course}
                  </p>
                  <p>
                    <b>Batch:</b> {student.batch}
                  </p>

                  {student.address && (
                    <p className="md:col-span-2">
                      <b>Address:</b> {student.address}
                    </p>
                  )}
                </div>

                {/* FOOTER */}
                <p className="mt-6 text-xs text-[#7a5a3a]">
                  Joined on{" "}
                  {student.createdAt
                    ? new Date(student.createdAt).toLocaleDateString()
                    : ""}
                </p>
              </article>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
