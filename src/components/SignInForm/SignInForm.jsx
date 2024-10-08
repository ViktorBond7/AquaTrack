import * as yup from "yup";
import { login } from "../../redux/auth/operations";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { selectClick } from "../../redux/auth/selectors";

import css from "./SignInForm.module.css";
import GoogleLoginButton from "../GoogleLoginButton/GoogleLoginButton";
import toast from "react-hot-toast";

const SignInSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const SignInForm = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const stopClick = useSelector(selectClick);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(login(data)).unwrap();
      const { accessToken, refreshToken } = response;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/tracker");
    } catch (error) {
      // console.error("Login failed:", error);
      // toast.error(`Login failed: ${error}`);
    }
  };

  const handleLoginSuccess = (user) => {
    localStorage.setItem("accessToken", user.accessToken);
    localStorage.setItem("refreshToken", user.refreshToken);
    navigate("/tracker");
  };

  return (
    <div className={css.signInForm}>
      <h2 className={css.signInFormHeader}>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={css.signInFormLabel}>Email</label>
        <input
          className={`${css.signInFormInput} ${
            errors.email ? `${css.errorPlaceholder} ${css.errorInput}` : ""
          }`}
          type="email"
          placeholder={errors.email ? "Invalid email" : "Enter your email"}
          {...register("email")}
        />
        {errors.email && (
          <p className={css.errorMessage}>{errors.email.message}</p>
        )}

        <label className={css.signInFormLabel}>Password</label>
        <div className={css.inputContainer}>
          <input
            className={`${css.signInFormInput} ${
              errors.password ? `${css.errorPlaceholder} ${css.errorInput}` : ""
            }`}
            type={passwordShown ? "text" : "password"}
            placeholder={
              errors.password ? "Invalid password" : "Enter your password"
            }
            {...register("password")}
          />
          <FaRegEyeSlash
            className={css.togle}
            onClick={togglePasswordVisibility}
          />
        </div>

        {errors.password && (
          <p className={css.errorMessage}>{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={stopClick === "pending"}
          className={css.signInBtn}
        >
          Sign In
        </button>
      </form>
      <p className={css.signInPageText}>
        Don't have an account?{" "}
        <Link to="/signup" className={css.SignInPageLink}>
          Sign Up
        </Link>
      </p>
      <GoogleLoginButton onSuccess={handleLoginSuccess} />
    </div>
  );
};

export default SignInForm;
