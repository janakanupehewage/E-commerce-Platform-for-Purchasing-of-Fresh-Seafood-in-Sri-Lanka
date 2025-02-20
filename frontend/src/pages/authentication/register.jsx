import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/store/authentication-slice";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!formData.userName.trim()) newErrors.userName = "Username is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    return newErrors;
  };

  async function onSubmit(event) {
    event.preventDefault();
    setErrors({}); // Reset errors before validation
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true); // Show spinner

    try {
      const response = await dispatch(registerUser(formData)).unwrap();

      if (response.success) {
        toast({ title: response.message });
        navigate("/auth/login");
      } else {
        toast({ variant: "destructive", title: response.message });

        setErrors((prevErrors) => ({
          ...prevErrors,
          userName: response.message.includes("Username is already taken") ? "Username is already taken." : "",
          email: response.message.includes("User already exists with this email") ? "Email is already in use." : "",
        }));
      }
    } catch (error) {
      toast({ variant: "destructive", title: "An unexpected error occurred. Please try again." });
    } finally {
      setIsLoading(false); // Hide spinner after request
    }
  }

  return (
    <>
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 right-4 bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 transition duration-300"
      >
        Continue as Guest
      </button>

      <div className="relative mx-auto w-full max-w-md space-y-6">
        <div className="text-center mt-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Create New Account
          </h1>
          <p className="mt-2">
            Already have an account?
            <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/login">
              Login
            </Link>
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Username</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg ${errors.userName ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter your username"
            />
            {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg ${errors.email ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg ${errors.password ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </>
  );
}

export default AuthRegister;
