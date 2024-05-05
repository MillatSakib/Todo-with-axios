import { useContext, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { AuthContext } from "../AuthProvider";

const Login = () => {
  const [passError, setPassError] = useState("");
  const [showPass, setShowPass] = useState(true);
  const { logInUser, GoogleSignIn, githubSignIn } = useContext(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (password.length < 6) {
      setPassError("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setPassError("There have at least one uppercase!");

      return;
    }
    if (!/[a-z]/.test(password)) {
      setPassError("There have at least one lowercase!");
      return;
    }
    setPassError("");
    logInUser(email, password);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Eco Voyager - Login</title>
      </Helmet>
      <div>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content w-[95%] md:w-[70%] lg:w-[50%] xl:w-[35] 2xl:w-[30%] flex-col">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold text-base-content">
                Login now!
              </h1>
            </div>
            <div className="card shrink-0 w-full shadow-2xl bg-base-100">
              <form className="card-body" onSubmit={handleLogin}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="input input-bordered text-base-content bg-base-100"
                    required
                  />
                </div>
                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    name="password"
                    type={showPass ? "password" : "text"}
                    placeholder="Password"
                    className="input input-bordered text-base-content bg-base-100"
                    required
                  />
                  <FaRegEye
                    className={
                      showPass
                        ? "absolute right-4 top-[3.2rem] hover:cursor-pointer select-none text-base-content bg-base-100"
                        : "hidden"
                    }
                    onClick={() => setShowPass(!showPass)}
                  />
                  <FaRegEyeSlash
                    className={
                      showPass
                        ? "hidden"
                        : "absolute right-4 top-[3.2rem] hover:cursor-pointer select-none text-base-content bg-base-100"
                    }
                    onClick={() => setShowPass(!showPass)}
                  />
                  <div
                    className={
                      passError ? "text-red-500 text-xs ml-1 mt-2" : "hidden"
                    }
                  >
                    {passError}
                  </div>
                </div>
                <div className="form-control mt-1">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Login"
                  ></input>
                </div>
                <p className=" py-4 text-green-600">
                  New in this site?{" "}
                  <NavLink
                    to="/register"
                    className="hover:underline text-blue-600 font-bold"
                  >
                    Register Now
                  </NavLink>
                </p>
              </form>
            </div>

            <div className="my-10 w-full">
              <hr className="border-t-[1px] border-slate-400"></hr>
              <button
                onClick={GoogleSignIn}
                className="btn mt-6 mb-4 border-[1px] border-slate-400 w-full flex gap-4 max-w-[400px] mx-auto"
              >
                <span>
                  <img
                    src="https://i.ibb.co/GfwD09T/google.png"
                    className="h-6 w-6"
                  />
                </span>{" "}
                <span>Continue with Google</span>
              </button>
              <button
                onClick={githubSignIn}
                className="btn border-[1px] mb-4 border-slate-400 w-full flex gap-4  max-w-[400px] mx-auto"
              >
                <span>
                  <img
                    src="https://i.ibb.co/bR1nzwX/github.png"
                    className="h-6 w-6"
                  />
                </span>{" "}
                <span>Continue with Github</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Login;
