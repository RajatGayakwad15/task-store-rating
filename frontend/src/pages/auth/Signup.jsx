import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Register } from "../../api/Postapi.jsx";
import AuthBackground from "./AuthBackground.jsx";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useMutation } from '@tanstack/react-query';
import toast from "react-hot-toast"; // ✅ Missing import added

const Signup = () => {
  const navigate = useNavigate();

  const { mutate: register, isPending: isRegisterPending } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: Register,
    onSuccess: (data) => {
      if (!data) {
        toast.error("Something went wrong. Please try again.");
        return;
      }
      if (data.status) {
        navigate("/auth/login");
      } else {
        const errorMessage =
          data?.errors?.[0] || data?.message || "Registration failed.";
        toast.error(errorMessage, {
          style: {
            background: "#111",
            color: "#fff",
            border: "1px solid #333",
          },
        });
      }
    },
    onError: (error) => {
      toast.error(error?.message || "An error occurred.", {
        style: {
          background: "#111",
          color: "#fff",
          border: "1px solid #333",
        },
      });
    },
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    address: Yup.string(), // ✅ Optional validation if needed
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one number, and one special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values) => {
    register(values);
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const toggleConfirmPasswordVisibility = () => {
    setConfirmShowPassword(!showConfirmPassword);
  };

  return (
    <>
      <div className="relative min-h-screen px-4 lg:px-8 w-full flex items-center justify-center opacity-70">
        <AuthBackground />

        <div className="relative p-[1px] w-full max-w-[400px] sm:max-w-[500px] rounded-2xl overflow-hidden group mx-auto">
          <div className="absolute inset-0 rounded-xl bg-[linear-gradient(155deg,var(--accent-light),#555_60%)] transition-transform duration-700 group-hover:rotate-180 blur-3xl scale-150"></div>
          <div className="relative border border-gray-700 py-8 md:py-10 px-6 sm:px-10 md:px-12 rounded-2xl bg-[#100C08]">
            <div className="flex flex-col items-start gap-4 text-color-1 text-lg sm:text-xl md:text-2xl font-semibold mb-4">
              Sign Up
            </div>

            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                address: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
              }) => (
                <Form className="flex flex-col gap-2 w-full">
                  {/* Username */}
                  <div className="flex-1 max-w-md mx-4">
                    <label className="p-2">Username</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-2 rounded-md bg-[#190F23] text-white border border-[#2c2a29] focus:outline-none focus:ring-1"
                    />
                    {touched.name && errors.name && (
                      <div className="text-red-500 text-sm">{errors.name}</div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex-1 max-w-md mx-4">
                    <label className="p-2">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-2 rounded-md bg-[#190F23] text-white border border-[#2c2a29] focus:outline-none focus:ring-1"
                    />
                    {touched.email && errors.email && (
                      <div className="text-red-500 text-sm">{errors.email}</div>
                    )}
                  </div>

                  {/* Address */}
                  <div className="flex-1 max-w-md mx-4">
                    <label className="p-2">Address</label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      placeholder="Address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-2 rounded-md bg-[#190F23] text-white border border-[#2c2a29] focus:outline-none focus:ring-1"
                    />
                  </div>

                  {/* Password */}
                  <div className="flex-1 max-w-md mx-4">
                    <label className="p-2">Password</label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-4 py-2 pr-10 rounded-md bg-[#190F23] text-white border border-[#2c2a29] focus:outline-none focus:ring-1"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-400 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {touched.password && errors.password && (
                      <div className="text-red-500 text-sm">{errors.password}</div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="flex-1 max-w-md mx-4">
                    <label className="p-2">Confirm Password</label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-4 py-2 pr-10 rounded-md bg-[#190F23] text-white border border-[#2c2a29] focus:outline-none focus:ring-1"
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-400 cursor-pointer"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {touched.confirmPassword && errors.confirmPassword && (
                      <div className="text-red-500 text-sm">{errors.confirmPassword}</div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center px-4">
                    <button
                      type="submit"
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 cursor-pointer px-2 mt-4 rounded-md transition duration-300 ease-in-out shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#101010]"
                    >
                      Register
                    </button>
                  </div>

                  {/* Link to Login */}
                  <div className="flex flex-col items-center">
                    <p className="text-md text-gray-300 mt-4">
                      Already have an account?{" "}
                      <span
                        className="text-white hover:underline font-semibold cursor-pointer"
                        onClick={() => navigate("/auth/login")}
                      >
                        Log in
                      </span>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
