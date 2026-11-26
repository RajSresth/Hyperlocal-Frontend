import { useState } from "react";
import api from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const verifyEmail = async () => {
    setLoading(true);
    try {
      const response = await api.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, {
        email
      });
      console.log(response);

      if (response.data.success) {
        setError("")
        setStep((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      const response = await api.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, {
        email,
        otp,
      });
      console.log(response);

      if (response.data.success) {
        setStep((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="flex flex-col gap-2 border-2 border-neutral-300 w-full max-w-100 py-10 px-8 rounded-3xl space-y-3">
        <div className="flex items-center">
          <span
            onClick={() => navigate(-1)}
            className="text-orange-600 font-semibold cursor-pointer"
          >
            <FaArrowLeft size={22} />
          </span>
          <h2 className="mx-auto font-semibold tracking-wide text-2xl">
            Forgot Password
          </h2>
        </div>

        {error && (
          <div className="py-1 px-2 border-l-4 border-red-600 bg-red-200 rounded-md">
            {error}
          </div>
        )}

        {step === 1 && (
          <div>
            <label htmlFor="email">
              Email<sup className="text-red-600">*</sup>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full ring-1 ring-neutral-600  rounded py-1.5 px-4 text-md focus-within:outline-2 focus-within:outline-blue-600"
              required
            />
            <button
              type="button"
              onClick={verifyEmail}
              className="w-full mt-5 bg-blue-600 py-2 rounded-md text-white font-semibold tracking-wide hover:cursor-pointer hover:bg-blue-700"
            >
              {loading ? "Submitting..." : "Verify Email"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div>

            <label htmlFor="email" className="text-neutral-400">
              Email<sup className="">*</sup>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full ring-1 ring-neutral-400  rounded py-1.5 px-4 text-md text-neutral-400 cursor-no-drop mb-5"
              disabled
              required
            />

            <label htmlFor="otp" className="mt-4">
              OTP<sup className="text-red-600">*</sup>
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter email"
              className="w-full ring-1 ring-neutral-600  rounded py-1.5 px-4 text-md focus-within:outline-2 focus-within:outline-blue-600"
              required
            />

            <button
              type="button"
              onClick={verifyOtp}
              className="w-full mt-5 bg-blue-600 py-2 rounded-md text-white font-semibold tracking-wide hover:cursor-pointer hover:bg-blue-700"
            >
              {loading ? "Submitting..." : "Verify OTP"}
            </button>
          </div>
        )}

        {step === 3 && <div>New Password Confirm Password</div>}
      </form>
    </div>
  );
};

export default ForgotPassword;
