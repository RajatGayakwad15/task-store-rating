import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// import TextInput from "../../components/FormElements/TextInput.jsx";
// import { AuthButton } from "../../components/lib/Buttons/AuthButton.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/LOGO/logo-removebg.png";
import { useMutation } from "@tanstack/react-query";
import { Loging } from "../../api/Postapi.jsx";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import AuthBackground from "./AuthBackground.jsx";
import { Eye, EyeOff } from "lucide-react";
// import { useParams } from "react-router-dom";

const Login = () => {
  //   const { role } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  //   const [UserAcceesibility, setUserAccessibility] = useState("client");

  //   useEffect(() => {
  //     setUserAccessibility(role);
  //   }, [role]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const { mutate: login, isPending: isLoginPending } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: Loging,
    onSuccess: (data) => {
      console.log("API response in onSuccess:", data); // 👈 Add this line
      const token = data?.token;
      Cookies.set("authToken", token, { expires: 7 });
      const userRole = data?.user?.role_id;
      console.log("userRole", userRole);
      Cookies.set("userRole", userRole, { expires: 7 });
        const user_id = data?.user?.id;
      console.log("userRole", user_id);
      Cookies.set("user_id", user_id, { expires: 7 });
      if (userRole == 1) {
        console.log("hey admin");
        navigate("/admin");
      } else if (userRole == 2) {
        console.log("hey store");
        navigate("/store");
      } else {
        console.log("hey user");
        navigate("/");
      }

      if (!data) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      if (data) {
        toast.success("Login Successfully");
      } else {
        // const errorMessage =
        //   data?.errors?.[0] || data?.message || 'Registration failed.'
        // console.log(errorMessage)
        toast.error(message);
      }
    },
    onError: (error) => {
      toast.error(error?.message || "An error occurred.");
    },
  });
  const handleSubmit = async (values) => {
    console.log("handleSubmitl", values);
    login(values);
  };

  //   const {
  //     mutate: SendOtpForFogotPassword,
  //     isPending: sendingOtp,
  //   } = useMutation({
  //     mutationKey: ["send-otp-for-forgot-password"],
  //     mutationFn: sendOtpForForgotPassward,
  //     onSuccess: (data) => {
  //       if (data.status) {
  //         toast.success("OTP sent successfully!", {
  //           style: {
  //             background: "#111",
  //             color: "#fff",
  //             border: "1px solid #333",
  //           },
  //         });
  //         navigate("/auth/forgot-password", {
  //           state: { email: email, Acceesibility: UserAcceesibility },
  //         });
  //       } else {
  //         toast.error(data?.message, {
  //           style: {
  //             background: "#111",
  //             color: "#fff",
  //             border: "1px solid #333",
  //           },
  //         });
  //       }
  //     },
  //     onError: (error) => {
  //       console.log("error:", error);
  //     },
  //   });

  //   const handleForgotPassword = (values) => {
  //     const email = values.email;
  //     if (!email) {
  //       toast.error("Please enter your username or email to continue.", {
  //         duration: 3000,
  //         style: {
  //           background: "#111",
  //           color: "#fff",
  //           border: "1px solid #333",
  //         },
  //       });
  //     } else {
  //       SendOtpForFogotPassword({ email });
  //     }
  //   };

  return (
    <>
      <div className="relative min-h-screen px-4 lg:px-8 w-full flex items-center justify-center opacity-70 overflow-hidden">
        <AuthBackground />
        <div className="relative z-10 p-[1px] w-full max-w-[500px] rounded-2xl overflow-hidden group mx-auto">
          <div className="absolute inset-0 rounded-xl transition-transform duration-700 group-hover:rotate-180 blur-3xl scale-150"></div>
          <div className="relative border border-gray-700 py-8  px-6 sm:px-10 md:px-12 rounded-2xl bg-[#101010]">
            <div className="flex flex-col items-center mb-5">
              <img
                src={logo}
                alt="logo"
                className="w-1/2 h-12 object-contain"
              />
            </div>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <Form className="flex flex-col gap-2 w-full">
                  <div className="flex-1 max-w-md mx-4  ">
                    <label className="p-2">Email</label>
                    <div className="">
                      <input
                        type="text"
                        label="Email / Username*"
                        placeholder="Email"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={(e) => {
                          handleChange(e);
                          setEmail(e.target.value);
                        }}
                        onBlur={handleBlur}
                        error={touched.email && errors.email}
                        className="w-full px-4 py-2 rounded-md bg-[#190F23] text-white border border-[#2c2a29] focus:outline-none focus:ring-1"
                      />
                    </div>
                  </div>

                  {/* <div className="flex-1 max-w-md mx-4 ">
                    <label className="p-2">Password</label>
                    <div className="mt-1">
                      <input
                        label="Password*"
                        id="password"
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.password && errors.password}
                        className="w-full px-4 py-2 rounded-md bg-[#190F23] text-white border border-[#2c2a29] focus:outline-none focus:ring-1"
                      />
                    </div>
                  </div> */}
                  <div className="flex-1 max-w-md mx-4">
                    <label className="p-2">Password</label>
                    <div className="relative">
                      <input
                        label="Password*"
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.password && errors.password}
                        className="w-full px-4 py-2 pr-10 rounded-md bg-[#190F23] text-white border border-[#2c2a29] focus:outline-none focus:ring-1"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-400 cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-center px-4">
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 cursor-pointer px-2 mt-4 rounded-md  transition duration-300 ease-in-out shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#101010]"
                      //   loading={isLoginPending}
                      //   disabled={isLoginPending}
                    >
                      Log in
                    </button>
                  </div>

                  {/* {UserAcceesibility === "admin" ? (
                    <div className="flex justify-end items-center mt-4">
                      <div
                        onClick={() => {
                          if (!sendingOtp) handleForgotPassword(values);
                        }}
                        className={`text-sm cursor-pointer hover:underline ${
                          sendingOtp ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {sendingOtp ? "Sending OTP..." : "Forgot Password?"}
                      </div>
                    </div>
                  ) : ( */}
                  <div className="flex justify-between items-center">
                    {/* <div
                        onClick={() => {
                          if (!sendingOtp) handleForgotPassword(values);
                        }}
                        className={`text-sm cursor-pointer hover:underline ${
                          sendingOtp ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {sendingOtp ? "Sending OTP..." : "Forgot Password?"}
                      </div> */}

                    <div className="flex">
                      <p className="text-md">
                        Don’t have an account?{" "}
                        <span
                          onClick={() => {
                            navigate("/auth/register");
                          }}
                          className="hover:underline font-semibold cursor-pointer"
                        >
                          Register
                        </span>
                      </p>
                    </div>
                  </div>
                  {/* )} */}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
