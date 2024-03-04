// import React from "react";
import "#/css/style.css";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Key, Mail } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import loginValidator from "@/Validators/loginValidator";
import CustomInput from "@/components/customSubComponents/customInput";
import Axios from "@/Axios";
import {
  clearServerError,
  clearValidationErrors,
  setServerError,
  setValidationError,
} from "@/store/UserSlices/errorSlice";
import { setLoginState } from "@/store/UserSlices/loginSlice";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { clearLoading, setLoading } from "@/store/generalSlice";
import axios from "axios";

export default function Login() {
  let navigate = useNavigate();
  const loginStates = useSelector((state: any) => state.login);
  const errors = useSelector((state: any) => state.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearServerError());
    dispatch(clearValidationErrors());
    dispatch(clearLoading());
  }, []);

  async function requestLogin() {
    dispatch(setLoading());
    try {
      let response = await Axios.post("/auth/login", loginStates.data, {
        timeout: 5000,
      });
      if (response.data.token && response.status === 201) {
        Cookies.set("_auth", response.data.token, {
          expires: 3,
          sameSite: "strict",
        });
        dispatch(clearLoading());-
        navigate("/");
      }
      return;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK" || error.message.includes("timeout")) {
          dispatch(
            setServerError(
              "Server is not responding. Please check your internet connection and try again later."
            )
          );
        } else {
          if (error.response?.status == 401 || error.response?.status == 400) {
            dispatch(setServerError("Invalid email or password"));
          } else {
            dispatch(
              setServerError(
                "An unexpected error occurred. Please try again later."
              )
            );
          }
        }
      }
      dispatch(clearLoading());
    }
  }

  // * Handling Change in Input

  function handleChange(e: any) {
    let { name, value } = e.target;
    dispatch(setLoginState({ name, value }));
  }

  // * Handling Submit

  function handleSubmit(e: any) {
    e.preventDefault();
    dispatch(clearValidationErrors());
    dispatch(clearServerError());
    let { error } = loginValidator.validate(loginStates.data);

    if (error) {
      const validationError = error.details[0];
      dispatch(
        setValidationError({
          name: String(validationError.path[0]),
          value: validationError.message,
        })
      );
      return;
    }
    requestLogin();
  }

  return (
    <>
      <div className=" px-10 py-10 rounded-lg sm:input_box my-auto">
        <div className="flex justify-between items-center mb-3">
          <Label className="text-xl">Welcome Back</Label>
        </div>
        {errors.serverErrors && (
          <div
            className={`bg-red-400 my-3 dark:bg-red-800 rounded-sm bg-opacity-50 p-2 list-item list-inside text-[10px] transition-all`}
          >
            {errors.serverErrors}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid  gap-1">
            {errors.validationErrors.email ? (
              <div>
                <CustomInput
                  value={loginStates.data.email}
                  type="email"
                  placeholder={"Email"}
                  icon={<Mail color="#EF4040" />}
                  name="email"
                  func={(e: any) => {
                    return handleChange(e);
                  }}
                  classNames="border-[#EF4040]"
                />
                <div className="text-sm text-[#EF4040]">
                  {errors.validationErrors.email}
                </div>
              </div>
            ) : (
              <CustomInput
                value={loginStates.data.email}
                type="email"
                placeholder="Email"
                icon={<Mail />}
                name="email"
                func={(e: any) => {
                  return handleChange(e);
                }}
              />
            )}
            {errors.validationErrors.password ? (
              <div>
                <CustomInput
                  value={loginStates.data.password}
                  type="password"
                  placeholder={"Password"}
                  icon={<Key color="#EF4040" />}
                  name="password"
                  func={(e: any) => {
                    return handleChange(e);
                  }}
                  classNames="border-[#EF4040]"
                />
                <div className="text-sm text-[#EF4040]">
                  {errors.validationErrors.password}
                </div>
              </div>
            ) : (
              <CustomInput
                value={loginStates.data.password}
                type="password"
                placeholder="Password"
                icon={<Key />}
                name="password"
                func={(e: any) => {
                  return handleChange(e);
                }}
              />
            )}

            <Link to={""} className="flex justify-end hover:underline m-1">
              Forget Password
            </Link>
          </div>
          <br />
          <div className="flex gap-3 items-center">
            <Button type="submit" variant="default">
              LOG IN
            </Button>
            <div className="flex gap-3 items-center">
              <span>|</span>
              <FaGoogle />
              <FaFacebook />
              <FaXTwitter />
              <FaGithub />
            </div>
          </div>
        </form>

        <div className="mt-4">
          Don't have an account?{" "}
          <Link
            to={"/auth/signup"}
            className="hover:underline text-primary px-2"
          >
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
}
