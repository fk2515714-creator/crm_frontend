// import React, { useState, useEffect, useContext } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";

// import bgImage from "../assets/89124.jpg";
// import { callApi } from "../Services/Api";
// import { AuthContext } from "../Context/AuthContext";

// export default function OtpVerify() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { setUser } = useContext(AuthContext);

//   const email = location?.state?.email || localStorage.getItem("loginEmail");

//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!email) {
//       toast.error("Session expired, please login again");
//       navigate("/");
//     }
//   }, [email, navigate]);

//   // Submit OTP
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!otp) {
//       toast.error("Please enter OTP");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await callApi("/verify-otp", "POST", { email, otp });

//       const { message, data } = res || {};
//       const { token, user } = data || {};

//       toast.success(message || "OTP verified successfully");

//       // Save auth info (IMPORTANT)
//       if (token) {
//         localStorage.setItem("accessToken", token);
//       }

//       if (user) {
//         localStorage.setItem("user", JSON.stringify(user));
//         setUser(user);
//       }

//       // Clear temp email
//       localStorage.removeItem("loginEmail");

//       navigate("/dashboard");
//     } catch (err) {
//       const msg =
//         err?.response?.data?.message ||
//         err?.message ||
//         "OTP verification failed";
//       toast.error(msg);
//       console.error("OTP verify error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChangeAccount = () => {
//     localStorage.removeItem("loginEmail");
//     navigate("/");
//   };

//   return (
//     <div
//       className="w-full min-h-screen flex items-center justify-center p-6 bg-cover bg-center"
//       style={{ backgroundImage: `url(${bgImage})` }}
//     >
//       <div className="w-full max-w-6xl rounded-[30px] flex flex-col md:flex-row gap-6 md:max-h-[90vh] overflow-hidden">
//         <div className="w-full md:w-1/2 flex items-center justify-center mx-auto">
//           <div className="w-full max-w-md rounded-[22px] p-5 md:p-10 backdrop-blur">
//             <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-4">
//               OTP Verification
//             </h1>

//             <p className="text-sm md:text-base text-gray-600 mb-6">
//               An OTP has been sent to{" "}
//               <span className="font-semibold">{email}</span>.
//             </p>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-900 rounded-full focus:outline-none focus:border-cyan-300 text-sm"
//               />

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-3 bg-cyan-600 text-white rounded-full text-lg font-medium disabled:opacity-70"
//               >
//                 {loading ? "Verifying..." : "Verify OTP"}
//               </button>

//               <button
//                 type="button"
//                 onClick={handleChangeAccount}
//                 className="w-full py-3 border border-gray-900 rounded-full text-gray-700 text-sm"
//               >
//                 Change email / password
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import bgImage from "../assets/89124.jpg";
import { callApi } from "../Services/Api";
import { AuthContext } from "../Context/AuthContext";

export default function OtpVerify() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const email = location?.state?.email || localStorage.getItem("loginEmail");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      toast.error("Session expired, please login again");
      navigate("/");
    }
  }, [email, navigate]);

  // Submit OTP (UNCHANGED)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    setLoading(true);

    try {
      const res = await callApi("/verify-otp", "POST", { email, otp });

      const { message, data } = res || {};
      const { token, user } = data || {};

      toast.success(message || "OTP verified successfully");

      if (token) {
        localStorage.setItem("accessToken", token);
      }

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      }

      localStorage.removeItem("loginEmail");
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "OTP verification failed";
      toast.error(msg);
      console.error("OTP verify error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeAccount = () => {
    localStorage.removeItem("loginEmail");
    navigate("/");
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

      <div className="relative z-10 w-full min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div
            className="
              bg-white
              rounded-[26px]
              p-6 md:p-10
              border border-[#ead7c0]
              shadow-sm
            "
          >
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#3b2a24] mb-4">
              OTP Verification
            </h1>

            <p className="text-sm md:text-base text-[#7a5a3a] mb-6">
              An OTP has been sent to{" "}
              <span className="font-semibold text-[#4a2f1a]">{email}</span>.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="
                  w-full px-4 py-3
                  border border-[#d9b48a]
                  rounded-full
                  text-sm
                  focus:outline-none
                  focus:ring-2 focus:ring-[#b08a63]
                "
              />

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full py-3
                  bg-[#b08a63]
                  hover:bg-[#9c774b]
                  text-white
                  rounded-full
                  text-lg font-medium
                  transition
                  disabled:opacity-70
                "
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <button
                type="button"
                onClick={handleChangeAccount}
                className="
                  w-full py-3
                  border border-[#d9b48a]
                  rounded-full
                  text-[#7a5a3a]
                  text-sm
                  hover:bg-[#f3e6d8]
                  transition
                "
              >
                Change email / password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
