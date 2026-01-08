import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import bgImage from "../assets/89124.jpg";
import Sidebar from "../Dashboards/Sidebar";
import Header from "../Dashboards/Header";
import { callApi } from "../Services/Api";

export default function EditProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    designation: "",
    department: "",
    experience: "",
    status: "Active",
    profileImage: "",
  });

  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // fetch profile (UNCHANGED)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await callApi("/profile", "GET");
        const data = res?.data || {};

        setForm({
          name: data.name || "",
          phone: data.phone || "",
          email: data.email || "",
          designation: data.designation || "",
          department: data.department || "",
          experience: data.experience || "",
          status: data.status || "Active",
          profileImage: data.profileImage || "",
        });
      } catch (err) {
        console.error("fetch profile error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (key !== "profileImage") {
          formData.append(key, value);
        }
      });

      if (newImage) {
        formData.append("profileImage", newImage);
      }

      await callApi("/profile", "PUT", formData);
      navigate("/profile");
    } catch (err) {
      console.error("update profile error:", err);
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#7a5a3a]">
        Loading profile...
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

      <div className="relative z-20 flex min-h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Header />

          <main className="flex-1 px-4 md:px-8 py-8">
            <div className="w-full max-w-3xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#3b2a24]">
                  Edit Profile
                </h2>
                <p className="text-sm text-[#7a5a3a]">
                  Update your account details
                </p>
              </div>

              <article
                className="
                  bg-white
                  border border-[#ead7c0]
                  rounded-2xl
                  p-6
                  shadow-sm
                "
              >
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* PROFILE IMAGE */}
                  <div className="flex items-center gap-4">
                    <div
                      className="
                        h-20 w-20 rounded-full overflow-hidden
                        bg-gradient-to-br from-[#caa472] to-[#b08a63]
                        flex items-center justify-center
                        text-white font-bold text-lg
                      "
                    >
                      {newImage ? (
                        <img
                          src={URL.createObjectURL(newImage)}
                          alt="preview"
                          className="h-full w-full object-cover"
                        />
                      ) : form.profileImage ? (
                        <img
                          src={form.profileImage}
                          alt="profile"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        form.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")
                      )}
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewImage(e.target.files[0])}
                      className="text-sm text-[#7a5a3a]"
                    />
                  </div>

                  {/* GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[#7a5a3a]">Name</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="input border-[#ead7c0] focus:ring-[#b08a63]"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs text-[#7a5a3a]">Phone</label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="input border-[#ead7c0] focus:ring-[#b08a63]"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-[#7a5a3a]">Email</label>
                      <input
                        value={form.email}
                        disabled
                        className="input bg-[#f3e6d8]"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-[#7a5a3a]">
                        Designation
                      </label>
                      <input
                        name="designation"
                        value={form.designation}
                        onChange={handleChange}
                        className="input border-[#ead7c0] focus:ring-[#b08a63]"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-[#7a5a3a]">
                        Department
                      </label>
                      <input
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                        className="input border-[#ead7c0] focus:ring-[#b08a63]"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-[#7a5a3a]">
                        Experience (years)
                      </label>
                      <input
                        type="number"
                        name="experience"
                        value={form.experience}
                        onChange={handleChange}
                        className="input border-[#ead7c0] focus:ring-[#b08a63]"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-[#7a5a3a]">Status</label>
                      <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="input border-[#ead7c0] focus:ring-[#b08a63]"
                      >
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>Suspended</option>
                      </select>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="pt-4 flex gap-3">
                    <button
                      type="submit"
                      disabled={saving}
                      className="
                        bg-[#b08a63]
                        hover:bg-[#9c774b]
                        text-white
                        px-6 py-2
                        rounded-full
                        text-sm
                        transition
                      "
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate("/profile")}
                      className="
                        border border-[#d9b48a]
                        px-6 py-2
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
              </article>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
