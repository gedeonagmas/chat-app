import React, { useEffect, useState } from "react";
import { useUserLoginMutation } from "../../features/api/apiSlice";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const Login = ({ setLogin }) => {
  const [loginData, loginResponse] = useUserLoginMutation();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [success, setSuccess] = useState(false);

  const loginHandler = () => {
    loginData({ userName, password });
  };

  useEffect(() => {
    if (loginResponse.status === "rejected") {
      setSuccess(false);
      setError(true);
      setErrorMessage(loginResponse.error.data.msg);
    } else if (loginResponse.status === "fulfilled") {
      setError(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
      window.localStorage.setItem("jwt", loginResponse.data.token);
      navigate("/chat", { state: { user: loginResponse.data.user } });
    } else if (loginResponse.status === "pending") {
      setError(false);
      setSuccess(false);
    }
  }, [loginResponse]);

  return (
    <div className="fixed text-sm flex flex-col items-center justify-center h-full w-full">
      <div
        onClick={() => setLogin(false)}
        className="fixed flex items-center justify-center top-0 left-0 backdrop-blur-sm backdrop-brightness-50 z-10 h-[100%] w-[100%]"
      ></div>
      <div className="absolute w-[80%] sm:w-[65%] md:w-[45%] lg:[35%] z-30 flex flex-col gap-2 items-center justify-center rounded-lg bg-white py-10 px-4 h-auto xl:w-[30%]">
        <div className="h-auto text-lg font-extrabold py-2 w-[90%] px-2 rounded-md uppercase">login</div>
        {error && errorMessage && (
          <div className="h-auto text-gray-600 text-lg py-2 w-[90%] px-2 rounded-md">{errorMessage}</div>
        )}
        {success && <div className="h-auto text-sm py-2 w-[70%] px-2 rounded-md">Login successful</div>}
        <input
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          className="h-14 border w-[90%] px-2 rounded-md"
          placeholder="user name"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="h-14 border w-[90%] px-2 rounded-md"
          placeholder="user name"
        />
        {loginResponse?.status === "pending" ? (
          <div className="h-14 text-xl border flex items-center justify-center w-[90%] mt-3 px-2 rounded-md text-white bg-[#00aeff] hover:text-gray-200">
            <Loading />
          </div>
        ) : (
          <button
            onClick={loginHandler}
            className="h-14 text-xl border w-[90%] mt-3 px-2 rounded-md text-white bg-[#00aeff] hover:text-gray-200"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
