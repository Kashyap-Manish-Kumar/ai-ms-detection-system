import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

function LoginPage() {

  const navigate = useNavigate();

  // FORM STATE
  const [formData, setFormData] =
    useState({
      username: "",
      password: "",
      rememberMe: false,
    });

  // LOADING
  const [loading, setLoading] =
    useState(false);

  // MESSAGE
  const [message, setMessage] =
    useState("");

  // HANDLE INPUT
  const handleChange = (e) => {

    const { name, value, type, checked } =
      e.target;

    setFormData({
      ...formData,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      setMessage("");

      const response = await fetch(
        "http://localhost:8080/auth/login",
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

      const data = await response.json();

      if (response.ok) {

        // SAVE TOKEN
        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "userId",
          data.userId
        );

        localStorage.setItem(
          "username",
          data.username
        );

        // SAVE REMEMBER OPTION
        localStorage.setItem(
          "rememberMe",
          formData.rememberMe
        );

        setMessage(
          "Login Successful!"
        );

        // NAVIGATE
        setTimeout(() => {

          navigate("/dashboard");

        }, 1000);

      } else {

        setMessage(
          data.message ||
          "Invalid Credentials"
        );
      }

    } catch (error) {

      console.log(error);

      setMessage(
        "Login Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-blue-700">
            Turing Body
          </h1>

          <p className="text-gray-500 mt-2">
            Doctor Login Portal
          </p>

        </div>

        {/* MESSAGE */}
        {message && (

          <div
            className={`
              mb-5

              p-3

              rounded-lg

              text-center

              font-medium

              ${
                message.includes(
                  "Successful"
                )
                  ? `
                    bg-green-100
                    text-green-700
                  `
                  : `
                    bg-red-100
                    text-red-700
                  `
              }
            `}
          >
            {message}
          </div>

        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* USERNAME */}
          <div>

            <label className="block mb-2 text-gray-700">
              Username
            </label>

            <input
              type="text"

              name="username"

              value={formData.username}

              onChange={handleChange}

              placeholder="Enter username"

              required

              className="
                w-full p-3

                border rounded-lg

                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="block mb-2 text-gray-700">
              Password
            </label>

            <input
              type="password"

              name="password"

              value={formData.password}

              onChange={handleChange}

              placeholder="Enter password"

              required

              className="
                w-full p-3

                border rounded-lg

                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

          </div>

          {/* REMEMBER ME */}
          <div className="flex items-center justify-between text-sm">

            <label className="flex items-center gap-2">

              <input
                type="checkbox"

                name="rememberMe"

                checked={
                  formData.rememberMe
                }

                onChange={handleChange}
              />

              Remember Me

            </label>

            <a
              href="#"
              className="
                text-blue-600
                hover:underline
              "
            >
              Forgot Password?
            </a>

          </div>

          {/* BUTTON */}
          <button
            type="submit"

            disabled={loading}

            className="
              w-full

              bg-blue-700
              hover:bg-blue-800

              text-white

              p-3

              rounded-lg

              font-semibold

              transition-all duration-300

              disabled:opacity-60
            "
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        <p className="text-center text-gray-500 mt-6">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="
              text-blue-600
              font-semibold
            "
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default LoginPage;