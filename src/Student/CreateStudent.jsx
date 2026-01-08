import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import bgImage from "../assets/89124.jpg";
import Sidebar from "../Dashboards/Sidebar";
import Header from "../Dashboards/Header";
import { callApi } from "../Services/Api";

export default function CreateStudent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    gender: "",
    age: "",
    qualification: "",
    email: "",
    phone: "",
    address: "",
    course: "",
    batch: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let key in form) {
      if (!form[key]) {
        toast.error("Please fill all required fields");
        return;
      }
    }

    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const res = await callApi("/admin/create-students", "POST", formData);

      toast.success(res?.message || "Student created successfully");
      navigate("/students");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create student");
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
          <Header userName="Add Student" />

          <main className="flex-1 px-4 md:px-8 py-8">
            <div
              className="
                max-w-3xl mx-auto
                bg-white
                border border-[#ead7c0]
                rounded-2xl
                p-6 md:p-8
                shadow-sm
              "
            >
              <h2 className="text-2xl font-bold text-[#3b2a24] mb-1">
                Create Student
              </h2>
              <p className="text-sm text-[#7a5a3a] mb-6">
                Fill student details and add them to the system.
              </p>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full name *"
                  className="input border-[#ead7c0] focus:ring-[#b08a63]"
                />

                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="input border-[#ead7c0] focus:ring-[#b08a63]"
                >
                  <option value="">Select gender *</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

                <input
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="Age *"
                  className="input border-[#ead7c0] focus:ring-[#b08a63]"
                />

                <input
                  name="qualification"
                  value={form.qualification}
                  onChange={handleChange}
                  placeholder="Qualification *"
                  className="input border-[#ead7c0] focus:ring-[#b08a63]"
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="student@mail.com *"
                  className="input border-[#ead7c0] focus:ring-[#b08a63]"
                />

                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone number *"
                  className="input border-[#ead7c0] focus:ring-[#b08a63]"
                />

                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Address *"
                  className="md:col-span-2 input border-[#ead7c0] focus:ring-[#b08a63]"
                />

                <input
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  placeholder="Course *"
                  className="input border-[#ead7c0] focus:ring-[#b08a63]"
                />

                <input
                  name="batch"
                  value={form.batch}
                  onChange={handleChange}
                  placeholder="Batch *"
                  className="input border-[#ead7c0] focus:ring-[#b08a63]"
                />

                {/* Image upload */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                  className="md:col-span-2 input border-[#ead7c0]"
                />

                <div className="md:col-span-2 flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      flex-1
                      bg-[#b08a63]
                      hover:bg-[#9c774b]
                      text-white
                      py-3
                      rounded-full
                      font-medium
                      transition
                      disabled:opacity-70
                    "
                  >
                    {loading ? "Creating..." : "Create Student"}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/students")}
                    className="
                      px-6 py-3
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
