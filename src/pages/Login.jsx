import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import api from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleLoginForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post(ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
        role,
      });

      if (!response.success) {
        throw new Error(response.data);
      }
    } catch (error) {
      const data = error.response?.data;

      if (!data) {
        setError("Network error. Try again.");
        return;
      }
      if (data.message === "Validation Failed" && Array.isArray(data.errors)) {
        setFieldErrors(
          Object.fromEntries(
            data.errors.map(({ field, message }) => [field, message]),
          ),
        );
        setError("");
      } else {
        setError(data.message || "Something went wrong");
        setFieldErrors({});
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        className="flex flex-col gap-2 border-2 border-neutral-300 w-full max-w-100 py-10 px-8 rounded-3xl"
        onSubmit={handleLoginForm}
      >
        <h2 className="text-center font-semibold tracking-wide text-2xl">
          Login
        </h2>

        {error && (
          <div className="py-1 px-2 border-l-4 border-red-600 bg-red-200 rounded-md">
            {error}
          </div>
        )}

        <label htmlFor="email">
          Email<sup className="text-red-600">*</sup>
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="ring-1 ring-neutral-600  rounded py-1.5 px-4 text-md focus-within:outline-2 focus-within:outline-blue-600"
          required
        />
        {fieldErrors.email && (
          <div className="text-red-500 text-xs font-semibold">
            {fieldErrors.email}
          </div>
        )}

        <label htmlFor="password">
          Password<sup className="text-red-600">*</sup>
        </label>

        <div>
          <div className="relative">
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
          {fieldErrors.password && (
            <div className="text-red-500 text-xs font-semibold">
              {fieldErrors.password}
            </div>
          )}
          <div className="text-blue-600 text-end font-semibold">
            <a href="">forgot-password?</a>
          </div>
        </div>

        <label htmlFor="role">
          Choose your Role<sup className="text-red-600">*</sup>
        </label>
        <select
          name="role"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="ring-1 ring-neutral-600  rounded py-1.5 px-4 text-lg focus-within:outline-2 focus-within:outline-blue-600"
          required
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        {fieldErrors.role && (
          <div className="text-red-500 text-xs font-semibold">
            {fieldErrors.role}
          </div>
        )}

        <button
          type="submit"
          className="mt-3 bg-blue-600 py-2 rounded-md text-white font-semibold tracking-wide"
        >
          {loading ? "Submitting..." : "Login"}
        </button>
        <button
          type="reset"
          className="bg-neutral-800 py-2 rounded-md text-white font-semibold tracking-wide"
        >
          Cancel
        </button>
        <p className="text-center">
          Create your account?
          <a href="" className="text-blue-600">
            {" "}
            Signup
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
