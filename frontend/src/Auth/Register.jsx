import { useContext, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { AuthContext } from "../AuthProvider";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";

const Register = () => {
  const [passError, setPassError] = useState("");
  const [showPass, setShowPass] = useState(true);
  const [showPassC, setShowPassC] = useState(true);
  const { registerUser, setComponentRender, componentRender } =
    useContext(AuthContext);
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const imgUrl = e.target.imgUrl.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setPassError("Password & Confirm Password are not same!!!");
      return;
    }
    if (password.length < 6) {
      setPassError("Password must be at least 6 characters long!!!");
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
    registerUser(email, password)
      .then(() => {
        // Signed up
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: imgUrl,
        })
          .then(() => {
            let temp = componentRender;
            setComponentRender(!temp);
            toast.success("Successfully Regitered you account!", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
            });
          })
          .catch((error) => {
            const errorMessage = error.message;
            toast.error(errorMessage, {
              position: "bottom-right",
            });
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage, {
          position: "bottom-right",
        });
      });
  };
  return (
    <HelmetProvider>
      <Helmet>
        <title>Eco Voyager - Register</title>
      </Helmet>
      <div>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content w-[95%] md:w-[70%] lg:w-[50%] xl:w-[35] 2xl:w-[30%] flex-col">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold text-base-content">
                Register now!
              </h1>
            </div>
            <div className="card shrink-0 w-full shadow-2xl bg-base-100">
              <form className="card-body" onSubmit={handleRegister}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    className="input input-bordered text-base-content bg-base-100"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Image Link</span>
                  </label>
                  <input
                    name="imgUrl"
                    type="text"
                    placeholder="Image URL"
                    className="input input-bordered text-base-content bg-base-100"
                    required
                  />
                </div>
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
                    type={showPass ? "password" : "text"}
                    name="password"
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
                </div>

                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    type={showPassC ? "password" : "text"}
                    name="confirmPassword"
                    placeholder="Password"
                    className="input input-bordered text-base-content bg-base-100"
                    required
                  />
                  <FaRegEye
                    className={
                      showPassC
                        ? "absolute right-4 top-[3.2rem] hover:cursor-pointer select-none text-base-content bg-base-100"
                        : "hidden"
                    }
                    onClick={() => setShowPassC(!showPassC)}
                  />
                  <FaRegEyeSlash
                    className={
                      showPassC
                        ? "hidden"
                        : "absolute right-4 top-[3.2rem] hover:cursor-pointer select-none text-base-content bg-base-100"
                    }
                    onClick={() => setShowPassC(!showPassC)}
                  />
                </div>
                <div
                  className={
                    passError ? "text-red-500 text-xs ml-1 mt-2" : "hidden"
                  }
                >
                  {passError}
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Register</button>
                </div>
                <p className=" py-4 text-green-600">
                  Already have an account?{" "}
                  <NavLink
                    to="/login"
                    className="hover:underline text-blue-600 font-bold"
                  >
                    Login Now
                  </NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Register;
