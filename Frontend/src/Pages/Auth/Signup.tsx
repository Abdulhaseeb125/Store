// import React from "react";
import "#/css/style.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Key, Mail, User } from "lucide-react";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Axios from "@/Axios";
import { getUser } from "@/store/UserSlices/userSlice";
import CustomInput from "@/components/subComponents/customInput";
import {
  clearServerError,
  clearValidationErrors,
  setServerError,
  setValidationError,
} from "@/store/UserSlices/errorSlice";
import Cookies from "js-cookie";
import { setState } from "@/store/UserSlices/signUpSlice";
import signUpValidator from "@/Validators/signUpValidator";
import { useEffect } from "react";
import { clearLoading, setLoading } from "@/store/generalSlice";
import axios from "axios";

// Sign up Component
export default function SignUp() {
  //.....States + useHook......
  let signUpStates = useSelector((state: any) => state.signUp);
  let errors = useSelector((state: any) => state.errors);
  let dispatch = useDispatch();
  const navigator = useNavigate();
  // ........Initialization.........
  useEffect(() => {
    dispatch(clearServerError());
    dispatch(clearValidationErrors());
    dispatch(clearLoading());
  }, []);

  //.......Functions.........

  async function requestSignUp() {
    try {
      dispatch(setLoading());
      let response = await Axios.post("/user/signup", signUpStates.data, {
        timeout: 5000,
      });
      if (response.data.token && response.status === 201) {
        Cookies.set("_auth", response.data.token, {
          expires: 3,
          sameSite: "strict",
        });
        dispatch(getUser());
        dispatch(clearLoading());
        navigator("/");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK" || error.message.includes("timeout")) {
          dispatch(
            setServerError(
              "Server is not responding. Please check your internet connection and try again later."
            )
          );
        } else {
          if (error.response?.status == 409) {
            dispatch(setServerError("Email already exists"));
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

  // ......On Input Change..........
  function handleChange(e: any) {
    let { name, value } = e.target;
    dispatch(setState({ name: name, value: value }));
    dispatch(clearValidationErrors());
  }
  // .......On Form Submit............
  function handleSubmit(e: any) {
    e.preventDefault();
    dispatch(clearValidationErrors());
    dispatch(clearServerError());
    let { error } = signUpValidator.validate(signUpStates.data);
    if (error) {
      const validationError = error.details[0];
      if (validationError.path[0] == "confirm") {
        dispatch(
          setValidationError({
            name: "confirm",
            value: "Password did not matched",
          })
        );
      } else {
        dispatch(
          setValidationError({
            name: String(validationError.path[0]),
            value: validationError.message,
          })
        );
      }
      return;
    }
    requestSignUp();
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
            {errors.validationErrors.name ? (
              <div>
                <CustomInput
                  value={signUpStates.data.name}
                  type="text"
                  placeholder={"Name"}
                  icon={<User color="#EF4040" />}
                  name="name"
                  func={(e: any) => {
                    return handleChange(e);
                  }}
                  classNames="border-[#EF4040]"
                />
                <div className="text-sm text-[#EF4040]">
                  {errors.validationErrors.name}
                </div>
              </div>
            ) : (
              <CustomInput
                value={signUpStates.data.name}
                type="name"
                placeholder="Name"
                icon={<User />}
                name="name"
                func={(e: any) => {
                  return handleChange(e);
                }}
              />
            )}
            {errors.validationErrors.email ? (
              <div>
                <CustomInput
                  value={signUpStates.data.email}
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
                value={signUpStates.data.email}
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
                  value={signUpStates.data.password}
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
                value={signUpStates.data.password}
                type="password"
                placeholder="Password"
                icon={<Key />}
                name="password"
                func={(e: any) => {
                  return handleChange(e);
                }}
              />
            )}
            {errors.validationErrors.confirm ? (
              <div>
                <CustomInput
                  value={signUpStates.data.confirm}
                  type="password"
                  placeholder="Confirm Password"
                  icon={<Key color="#EF4040" />}
                  name="confirm"
                  func={(e: any) => {
                    return handleChange(e);
                  }}
                  classNames="border-[#EF4040]"
                />
                <div className="text-sm text-[#EF4040]">
                  {errors.validationErrors.confirm}
                </div>
              </div>
            ) : (
              <CustomInput
                value={signUpStates.data.confirm}
                type="password"
                placeholder="Confirm Password"
                icon={<Key />}
                name="confirm"
                func={(e: any) => {
                  return handleChange(e);
                }}
              />
            )}
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
            to={"/auth/login"}
            className="hover:underline text-primary px-2"
          >
            Log in
          </Link>
        </div>
      </div>
    </>
  );
}
