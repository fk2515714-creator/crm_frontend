import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Dashboards/Sidebar";
import Header from "../Dashboards/Header";
import { callApi } from "../Services/Api";
import { AuthContext } from "../Context/AuthContext";
import profile from "../assets/profile.png";

export default function Profile() {
  const navigate = useNavigate();
  const { role, logout } = useContext(AuthContext);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await callApi("/profile", "GET");
        setUser(res?.data || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await callApi("/logout", "POST");
    logout();
    navigate("/", { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#7a5a3a]">
        Loading profile...
      </div>
    );
  }

  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="min-h-screen bg-[#f7f2ec] relative overflow-hidden">
      {/* ===== LIGHT BROWN BACKGROUND ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f7f2ec] via-[#f3e6d8] to-[#ead7c0]" />

      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px]
                   bg-gradient-to-br from-[#e6c8a5]/40 to-[#d9b48a]/40
                   rounded-full blur-3xl"
      />

      <div className="relative z-10 flex min-h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Header userName="Profile" />

          <main className="flex-1 p-6 flex justify-center items-start">
            {/* PROFILE CARD */}
            <div
              className="
                w-full max-w-3xl
                bg-white
                rounded-3xl
                p-8
                border border-[#ead7c0]
                shadow-sm hover:shadow-xl
                transition-all duration-300
              "
            >
              {/* TOP SECTION */}
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div
                  className="
                    h-32 w-32 rounded-2xl overflow-hidden
                    bg-gradient-to-br from-[#caa472] to-[#b08a63]
                    flex items-center justify-center
                    text-white text-4xl font-bold
                  "
                >
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    initials
                  )}
                </div>

                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold text-[#3b2a24]">
                    {user.name}
                  </h2>
                  <p className="text-[#7a5a3a] text-sm">{user.email}</p>

                  <span
                    className="
                      inline-block mt-2 px-4 py-1 rounded-full
                      text-xs capitalize
                      bg-[#f3e6d8] text-[#6b4a2e]
                    "
                  >
                    {role}
                  </span>
                </div>
              </div>

              {/* DETAILS */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <p>
                  <span className="text-[#7a5a3a]">Phone :</span>{" "}
                  <span className="text-[#3b2a24]">{user.phone}</span>
                </p>
                <p>
                  <span className="text-[#7a5a3a]">Designation :</span>{" "}
                  <span className="text-[#3b2a24]">{user.designation}</span>
                </p>
                <p>
                  <span className="text-[#7a5a3a]">Department :</span>{" "}
                  <span className="text-[#3b2a24]">{user.department}</span>
                </p>
                <p>
                  <span className="text-[#7a5a3a]">Experience :</span>{" "}
                  <span className="text-[#3b2a24]">
                    {user.experience} years
                  </span>
                </p>
                <p>
                  <span className="text-[#7a5a3a]">Status :</span>{" "}
                  <span className="text-[#3b2a24]">{user.status}</span>
                </p>
                <p>
                  <span className="text-[#7a5a3a]">Joined :</span>{" "}
                  <span className="text-[#3b2a24]">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </p>
              </div>

              {/* ACTIONS */}
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("/profile/edit")}
                  className="
                    flex-1 py-2 rounded-full
                    bg-[#b08a63] text-white
                    text-sm font-medium
                    hover:bg-[#9c774b]
                    transition
                  "
                >
                  Edit Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="
                    flex-1 py-2 rounded-full
                    border border-[#d9b48a]
                    text-[#7a5a3a]
                    text-sm
                    hover:bg-[#f3e6d8]
                    transition
                  "
                >
                  Logout
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
