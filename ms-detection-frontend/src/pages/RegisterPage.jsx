import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {

  const navigate = useNavigate();

  // FORM STATE
  const [formData, setFormData] =
    useState({
      username: "",
      password: "",
    });

  // LOADING
  const [loading, setLoading] =
    useState(false);

  // MESSAGE
  const [message, setMessage] =
    useState("");

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

      setMessage("");

      const response = await fetch(
        "http://localhost:8080/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        }
      );

      const data = await response.text();

      if (response.ok) {

        setMessage(
          "Registration Successful!"
        );

        setTimeout(() => {

          navigate("/login");

        }, 1500);

      } else {

        setMessage(data);
      }

    } catch (error) {

      console.log(error);

      setMessage(
        "Registration Failed"
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
            Doctor Registration
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

              placeholder="Create password"

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
              ? "Registering..."
              : "Register"}
          </button>

        </form>

        <p className="text-center text-gray-500 mt-6">

          Already have an account?{" "}

          <Link
            to="/login"
            className="
              text-blue-600
              font-semibold
            "
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default RegisterPage;