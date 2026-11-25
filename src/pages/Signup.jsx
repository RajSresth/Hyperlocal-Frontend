import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import api from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";

const Signup = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignupForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post(ENDPOINTS.AUTH.REGISTER, {
        fullname,
        email,
        password,
        confirmPassword,
        role,
      });
      console.log(response);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        className="flex flex-col gap-2 border-2 border-neutral-300 w-full max-w-100 py-10 px-8 rounded-3xl"
        onSubmit={handleSignupForm}
      >
        <h2 className="text-center font-semibold tracking-wide text-2xl">
          Signup
        </h2>

        <label htmlFor="fullname">
          Fullname<sup className="text-red-600">*</sup>
        </label>
        <input
          type="text"
          id="fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          placeholder="Enter fullname"
          className="ring-1 ring-neutral-600  rounded py-1.5 px-4 text-md focus-within:outline-2 focus-within:outline-blue-600"
          required
        />

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

        <label htmlFor="password">
          Password<sup className="text-red-600">*</sup>
        </label>
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

        <label htmlFor="confirmPassword">
          Confirm Password<sup className="text-red-600">*</sup>
        </label>
        <input
          type="text"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Enter confirm password"
          className="ring-1 ring-neutral-600  rounded py-1.5 px-4 text-md focus-within:outline-2 focus-within:outline-blue-600"
          required
        />

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

        <button
          type="submit"
          className="mt-3 bg-blue-600 py-2 rounded-md text-white font-semibold tracking-wide"
        >
          {loading ? "Submitting..." : "Signup"}
        </button>
        <button
          type="reset"
          className="bg-neutral-800 py-2 rounded-md text-white font-semibold tracking-wide"
        >
          Cancel
        </button>
        <p className="text-center">
          Already have an account?
          <a href="" className="text-blue-600">
            {" "}
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
