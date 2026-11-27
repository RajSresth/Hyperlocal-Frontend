import { useState } from "react";
import api from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useCountdown from "../hooks/useCountdown";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [otpExpiry, setOtpExpiry] = useState(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const { expired, text } = useCountdown(otpExpiry);

  const forgotPassword = async () => {
    setLoading(true);
    try {
      const { data } = await api.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, {
        email,
      });
      console.log(data);

      if (data.success) {
        setOtpExpiry(data.otpExpiry);
        setError("");
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
      const response = await api.post(ENDPOINTS.AUTH.VERIFY_OTP, {
        email,
        otp,
      });
      console.log(response);

      if (response.data.success) {
        setStep((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setLoading(true);
    setOtp("");
    try {
      const { data } = await api.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, {
        email,
      });
      console.log(data);

      if (data.success) {
        setOtpExpiry(data.otpExpiry);
        setError("");
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    setLoading(true);
    try {
      const { data } = await api.post(ENDPOINTS.AUTH.RESET_PASSWORD, {
        email,
        password,
        confirmPassword,
      });

      console.log(data);
      if (data.success) {
        setError("");
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
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
              onClick={forgotPassword}
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
              placeholder="Enter Otp"
              className="w-full ring-1 ring-neutral-600  rounded py-1.5 px-4 text-md focus-within:outline-2 focus-within:outline-blue-600"
              required
            />
            <div className="text-end text-red-600">
              {expired ? "OTP expired" : `${text}`}
            </div>

            <button
              type="button"
              onClick={verifyOtp}
              disabled={loading || expired || otp.length === 0}
              className="w-full mt-5 bg-blue-600 py-2 rounded-md text-white font-semibold tracking-wide hover:cursor-pointer hover:bg-blue-700"
            >
              {loading ? "Submitting..." : "Verify OTP"}
            </button>
            <button
              type="button"
              onClick={resendOtp}
              disabled={loading || !expired}
              className="w-full mt-5 bg-orange-600 py-2 rounded-md text-white font-semibold tracking-wide hover:cursor-pointer hover:bg-orange-700"
            >
              {loading ? "Submitting..." : "Resend OTP"}
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <label htmlFor="password" className="font-semibold">
              Password<sup className="text-red-600">*</sup>
            </label>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="at least 8 characters"
                className="w-full ring-1 ring-neutral-600  rounded py-1.5 px-4 text-md focus-within:outline-2 focus-within:outline-blue-600"
                required
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-[50%] -translate-y-[calc(50%)] right-3 cursor-pointer"
              >
                {showPassword ? (
                  <FaRegEye size={20} />
                ) : (
                  <FaRegEyeSlash size={20} />
                )}
              </div>
            </div>

            <label htmlFor="confirmPassword" className="font-semibold">
              Confirm Password<sup className="text-red-600">*</sup>
            </label>
            <input
              type="text"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter confirm password"
              className="w-full ring-1 ring-neutral-600  rounded py-1.5 px-4 text-md focus-within:outline-2 focus-within:outline-blue-600"
              required
            />

            <button
              type="button"
              onClick={resetPassword}
              disabled={loading}
              className="w-full mt-5 bg-blue-600 py-2 rounded-md text-white font-semibold tracking-wide hover:cursor-pointer hover:bg-blue-700"
            >
              {loading ? "Submitting..." : "Reset Password"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
