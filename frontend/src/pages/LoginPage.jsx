import React from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const handleGoogle = () => {
    window.open("http://localhost:8080/auth/google", "_self");
  };
 
  return (
    <div className="login-screen  w-full flex items-center justify-center h-[100vh]">
      <div className="login-box">
        <div className="right">
          <div className="context">
            <button
              onClick={handleGoogle}
              className="btn flex items-center gap-2"
            >
              {" "}
              <FcGoogle size={20} /> Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
