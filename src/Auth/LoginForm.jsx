import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import bgImage from "../assets/crm.webp";
//  background image
import { callApi } from "../Services/Api";
import { AuthContext } from "../Context/AuthContext";

export default function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalEmail = email.trim();

    if (!finalEmail || !password) {
      Toast.fire({
        icon: "warning",
        title: "Please enter email and password",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await callApi("/login", "POST", {
        email: finalEmail,
        password,
      });

      const payload = res?.data || {};

      Toast.fire({
        icon: "success",
        title: payload.isVarified
          ? "Logged in successfully"
          : "OTP sent to your email",
      });

      if (payload.isVarified) {
        if (payload.token) {
          localStorage.setItem("accessToken", payload.token);
        }

        if (payload.user) {
          localStorage.setItem("user", JSON.stringify(payload.user));
          setUser(payload.user);
        }

        navigate("/dashboard");
      } else {
        localStorage.setItem("loginEmail", finalEmail);
        navigate("/otp", { state: { email: finalEmail } });
      }
    } catch (err) {
      const backend = err?.response?.data;
      const msg =
        backend?.message || backend?.error || err?.message || "Login failed";

      Toast.fire({ icon: "error", title: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Card wrapper */}
      <div className="relative w-full max-w-md">
        {/* Glow */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 blur opacity-30"></div>

        {/* Card */}
        <div className="relative bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-800">
              Stack CRM
            </h1>
            <p className="text-sm text-slate-500 mt-2">Login to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-slate-600">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-slate-600">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-16"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 hover:text-slate-700"
                >
                  {showPwd ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-lg hover:from-blue-700 hover:to-cyan-700 transition disabled:opacity-60"
            >
              {loading ? "Please wait..." : "Send OTP"}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-6">
            © {new Date().getFullYear()} CRM
          </p>
        </div>
      </div>
    </div>
  );
}
