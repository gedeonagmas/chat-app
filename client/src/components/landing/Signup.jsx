import React, { useEffect, useState } from "react";
import { useUserRegisterMutation } from "../../features/api/apiSlice";
import Loading from "./Loading";

const Signup = ({ setSignup }) => {
  const [signupData, signupResponse] = useUserRegisterMutation();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [success, setSuccess] = useState(false);

  //signup variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const signupHandler = () => {
    const form = new FormData();
    form.append("firstName", firstName);
    form.append("lastName", lastName);
    form.append("userName", userName);
    form.append("email", email);
    form.append("phone", phone);
    form.append("password", password);
    form.append("confirmPassword", confirmPassword);
    form.append("profilePicture", profilePicture);
    signupData(form);
  };

  useEffect(() => {
    if (signupResponse.status === "rejected") {
      setSuccess(false);
      setError(true);
      setErrorMessage(signupResponse.error.data.msg);
    } else if (signupResponse.status === "fulfilled") {
      setError(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
      setFirstName(" ");
      setLastName(" ");
      setEmail(" ");
      setPhone(" ");
      setUserName(" ");
      setPassword(" ");
      setConfirmPassword(" ");
      setProfilePicture(" ");
    } else if (signupResponse.status === "pending") {
      setError(false);
      setSuccess(false);
    }
  }, [signupResponse]);

  return (
    <div className="fixed text-xs md:text-sm flex items-center justify-center h-full w-full">
      <div
        onClick={() => setSignup(false)}
        className="fixed flex items-center justify-center top-0 left-0 backdrop-blur-sm backdrop-brightness-50 z-10 h-[100%] w-[100%]"
      ></div>
      <div className="absolute z-30 w-[85%] sm:w-[75%] md:w-[65%] lg:w-[55%] flex gap-2 items-center justify-center rounded-lg bg-white py-4 mt-14 px-2 h-auto xl:w-[50%]">
        <div className="flex flex-col gap-1 items-center justify-center w-[90%] h-auto">
          <div className="h-auto text-lg font-extrabold py-2 w-[90%] px-2 rounded-md uppercase">Sign up</div>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            className=" h-9 border w-[90%] px-2 rounded-md"
            placeholder="first name"
          />
          <input
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            className=" h-9 border w-[90%] px-2 rounded-md"
            placeholder="last name"
          />
          <input
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            className=" h-9 border w-[90%] px-2 rounded-md"
            placeholder="user name"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className=" h-9 border w-[90%] px-2 rounded-md"
            placeholder="email"
          />
          <input
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            className=" h-9 border w-[90%] px-2 rounded-md"
            placeholder="phone"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className=" h-9 border w-[90%] px-2 rounded-md"
            placeholder="password"
          />
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            className=" h-9 border w-[90%] px-2 rounded-md"
            placeholder="confirm password"
          />
          <input
            onChange={(e) => setProfilePicture(e.target.files[0])}
            type="file"
            className="h-12 opacity-0 absolute bottom-20 border w-[80%] px-2 rounded-md"
            placeholder="confirm password"
          />
          <p className="h-12 border py-2 w-[90%] px-2 rounded-md">
            profile picture {"("} optional {")"}
          </p>
          {signupResponse?.status === "pending" ? (
            <div className="h-12 text-xl flex items-center justify-center border w-[100%] mt-3 px-2 rounded-md text-white bg-[#00aeff] hover:text-gray-200">
              <Loading />
            </div>
          ) : (
            <button
              onClick={signupHandler}
              className="h-12 text-xl border w-[100%] mt-3 px-2 rounded-md text-white bg-[#00aeff] hover:text-gray-200"
            >
              Sign up
            </button>
          )}
        </div>
        {error && errorMessage && (
          <div className="h-auto text-xs py-2 w-[70%] px-2 rounded-md">
            {errorMessage.map((e) => {
              return <p>. {e.msg}</p>;
            })}
          </div>
        )}
        {success && <div className="h-auto text-sm py-2 w-[70%] px-2 rounded-md">Account Created</div>}
      </div>
    </div>
  );
};

export default Signup;
