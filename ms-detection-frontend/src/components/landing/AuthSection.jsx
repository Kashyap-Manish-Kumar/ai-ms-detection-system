// components/landing/AuthSection.jsx

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  ShieldCheck,
  Lock,
  User,
} from "lucide-react";

function AuthSection() {

  const navigate = useNavigate();

  const [activeTab, setActiveTab] =
    useState("login");

  const [formData, setFormData] =
    useState({
      username: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [popup, setPopup] =
    useState({
      show: false,
      type: "",
      text: "",
    });

  // POPUP FUNCTION
  const showPopup = (
    type,
    text
  ) => {

    setPopup({
      show: true,
      type,
      text,
    });

    setTimeout(() => {

      setPopup({
        show: false,
        type: "",
        text: "",
      });

    }, 3000);
  };

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const endpoint =
        activeTab === "login"
          ? `${import.meta.env.VITE_BACKEND_URL}/auth/login`
          : `${import.meta.env.VITE_BACKEND_URL}/auth/register`

      const response = await fetch(
        endpoint,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            username:
              formData.username,

            password:
              formData.password,
          }),
        }
      );

      // LOGIN
      if (activeTab === "login") {

        const data =
          await response.json();

        if (response.ok) {

          // SAVE TOKEN
          localStorage.setItem(
            "token",
            data.token
          );

          // SAVE USER DATA
          localStorage.setItem(
            "userId",
            data.userId
          );

          localStorage.setItem(
            "username",
            data.username
          );

          localStorage.setItem(
            "rememberMe",
            "true"
          );

          // OPTIONAL FULL USER OBJECT
          localStorage.setItem(
            "doctor",
            JSON.stringify(data)
          );

          showPopup(
            "success",
            "Login Successful!"
          );

          setTimeout(() => {

            navigate("/dashboard");

          }, 1000);

        } else {

          showPopup(
            "error",
            data.message ||
            "Invalid User, Try Again"
          );
        }

      }

      // REGISTER
      else {

        const data =
          await response.text();

        if (response.ok) {

          showPopup(
            "success",
            "Registration Successful!"
          );

          setTimeout(() => {

            setActiveTab("login");

          }, 1200);

        } else {

          showPopup(
            "error",
            data ||
            "Registration Failed"
          );
        }
      }

    } catch (error) {

      console.log(error);

      showPopup(
        "error",
        activeTab === "login"
          ? "Invalid User, Try Again"
          : "Registration Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div
      className="
        relative

        w-full

        max-w-md

        min-h-[500px]
        min-w-[250px]

        overflow-hidden

        rounded-[40px]

        border border-cyan-500

       

    

        border-1

       
         bg-gradient-to-b
            from-[#021229]
            to-[#060e2b]
            shadow-[0_0_60px_rgba(6,182,212,0.08)]

        backdrop-blur-2xl

        px-8
        py-6

        
      "
    >

      {/* POPUP */}
      {popup.show && (

        <div
          className={`
            fixed

            top-0
            right-30

            z-[9999]

            px-4
            py-4

            rounded-2xl

            shadow-2xl

            backdrop-blur-xl

            border

            text-sm
            font-semibold

            transition-all duration-300

            ${
              popup.type === "success"
                ? `
                  bg-green-500/20
                  text-green-300
                  border-green-400/30
                `
                : `
                  bg-red-500/20
                  text-red-300
                  border-red-400/30
                `
            }
          `}
        >
          {popup.text}
        </div>

      )}

      {/* GLOW */}
      <div
        className="
          absolute
          -top-32
          -right-32

          w-72 h-72

          rounded-full

          bg-cyan-500/10

          blur-3xl
        "
      />

      {/* HEADER */}
      <div className="relative z-10 text-center">

        <h2
          className="
            mt-5

            text-3xl

            font-black

            tracking-tight

            bg-gradient-to-r
            from-white
            via-cyan-100
            to-cyan-300

            bg-clip-text
            text-transparent
          "
        >
          Turing Body
        </h2>

        {/* BADGES */}
        <div
          className="
            mt-5

            flex items-center
            justify-center

            gap-3

            flex-wrap
          "
        >

          <div
            className="
              flex items-center gap-2

              border border-white/60

        border-1
              px-4 py-2

              rounded-full

              bg-cyan-500/10

              border border-cyan-400/10
            "
          >
            <ShieldCheck
              className="
                w-4 h-4
                

                text-cyan-300
              "
            />

            <span
              className="
                text-xs
                
                font-medium

                text-cyan-200
              "
            >
              Enterprise Security
            </span>
          </div>

          <div
            className="
              flex items-center gap-2

              px-4 py-2

              rounded-full
              border border-white/60

        border-1

              bg-white/5

              border border-white/10
            "
          >
            <Lock
              className="
                w-4 h-4

                text-slate-300
              "
            />

            <span
              className="
                text-xs

                font-medium

                text-slate-300
              "
            >
              Encrypted Access
            </span>
          </div>

        </div>

      </div>

      {/* TOGGLE BUTTONS */}
      <div
        className="
          relative

          mt-7

          

          grid grid-cols-2

          bg-[#041849]

          border border-white/5

          rounded-2xl

          p-1.5
        "
      >

        {/* LOGIN */}
        <button
          onClick={() =>
            setActiveTab("login")
          }
          className={`
            py-3

            rounded-xl

            font-semibold

            text-sm

            tracking-wide

            transition-all duration-300

            ${
              activeTab === "login"
                ? `
                  bg-gradient-to-r
                  from-cyan-400
                  to-blue-500

                  text-black

                  shadow-lg
                  shadow-cyan-500/20
                `
                : `
                  text-slate-400

                  hover:text-white
                `
            }
          `}
        >
          Login
        </button>

        {/* REGISTER */}
        <button
          onClick={() =>
            setActiveTab("register")
          }
          className={`
            py-3

            rounded-xl

            font-semibold

            text-sm

            

            tracking-wide

            transition-all duration-300

            ${
              activeTab === "register"
                ? `
                  bg-gradient-to-r
                  from-cyan-400
                  to-blue-500

                  text-black

                  shadow-lg
                  shadow-cyan-500/20
                `
                : `
                  text-slate-400

                  hover:text-white
                `
            }
          `}
        >
          Register
        </button>

      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="
          mt-7

          space-y-5
        "
      >

        {/* USERNAME */}
        <div>

          <label
            className="
              block
                
              mb-2

              text-sm

              font-medium

              text-slate-300
            "
          >
            Username
          </label>

          <div className="relative ">

            <User
              className="
                absolute
                left-5
                top-1/2
                -translate-y-1/2

                w-5 h-5

                

                text-slate-500
              "
            />

            <input
              type="text"

              name="username"

              value={formData.username}

              onChange={handleChange}

              placeholder="Enter username"

              required

              className="
                w-full

                border border-white/60

        border-1

                bg-[#020817]

                

                rounded-2xl

                pl-14
                pr-5
                py-3.5

                text-white

                placeholder:text-slate-500

                focus:outline-none

                focus:border-cyan-400

                focus:shadow-[0_0_25px_rgba(34,211,238,0.12)]

                transition-all duration-300
              "
            />

          </div>

        </div>

        {/* PASSWORD */}
        <div>

          <label
            className="
              block

              mb-2

              text-sm

              font-medium

              text-slate-300
            "
          >
            Password
          </label>

          <div className="relative">

            <Lock
              className="
                absolute
                left-5
                top-1/2
                -translate-y-1/2

                w-5 h-5

                text-slate-500
              "
            />

            <input
              type="password"

              name="password"

              value={formData.password}

              onChange={handleChange}

              placeholder="Enter password"

              required

              className="
                w-full



                

        

                bg-[#020817]

                border border-white/60

       

        border-1

                rounded-2xl

                pl-14
                pr-5
                py-3.5

                text-white

                placeholder:text-slate-500

                focus:outline-none

                focus:border-cyan-400

                focus:shadow-[0_0_25px_rgba(34,211,238,0.12)]

                transition-all duration-300
              "
            />

          </div>

        </div>

        {/* BUTTON */}
        <button
          type="submit"

          disabled={loading}

          className="
            relative

            w-full

            overflow-hidden

            bg-gradient-to-r
            from-cyan-400
            to-blue-500

            hover:from-cyan-300
            hover:to-blue-400

            text-black

            py-3.5

            rounded-2xl

            text-lg

            font-bold

            shadow-[0_0_30px_rgba(34,211,238,0.25)]

            transition-all duration-300

            hover:scale-[1.01]

            disabled:opacity-60
          "
        >

          <span className="relative z-10">

            {loading
              ? activeTab === "login"
                ? "Logging in..."
                : "Registering..."
              : activeTab === "login"
              ? "Login"
              : "Register"}

          </span>

        </button>

      </form>

    </div>

  );
}

export default AuthSection;





