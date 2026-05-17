import { useState } from "react";
import { FaTimes } from "react-icons/fa";

function AddPatientModal({
  isOpen,
  onClose,
  onPatientAdded,
}) {

  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    bloodGroup: "",
    disease: "",
    emergencyContact: "",
    status: "",
    profilePhoto: null,
  });

  if (!isOpen) return null;

  const handleChange = (e) => {

    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {

    setPatient({
      ...patient,
      profilePhoto: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData();

      Object.keys(patient).forEach((key) => {
        formData.append(key, patient[key]);
      });

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/patients`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      console.log(data);

      if (onPatientAdded) {
        onPatientAdded();
      }

      onClose();

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div
      className="
        fixed inset-0 z-50

        bg-black/60 backdrop-blur-md

        flex items-center justify-center

        p-4
      "
    >

      {/* MODAL */}
      <div
        className="
          bg-gradient-to-br
          from-[#0f172a]
          via-[#111827]
          to-[#172554]

          border border-cyan-400/20

          rounded-3xl

          shadow-[0_0_50px_rgba(6,182,212,0.12)]

          w-full max-w-2xl

          max-h-[90vh]
          overflow-y-auto

          p-5 sm:p-6 lg:p-8
        "
      >

        {/* HEADER */}
        <div
          className="
            flex items-center justify-between

            mb-6
          "
        >

          <h2
            className="
              text-2xl sm:text-3xl

              font-bold

              text-white
            "
          >
            Add Patient
          </h2>

          <button
            onClick={onClose}
            className="
              w-10 h-10

              rounded-xl

              bg-white/5

              border border-cyan-400/20

              text-cyan-200

              hover:bg-red-500
              hover:text-white

              flex items-center justify-center

              transition-all duration-300
            "
          >
            <FaTimes />
          </button>

        </div>

        {/* FORM */}
        <form
          className="space-y-6"
          onSubmit={handleSubmit}
        >

          {/* ROW 1 */}
          <div
            className="
              grid grid-cols-1
              md:grid-cols-2
              gap-5
            "
          >

            {/* Patient ID */}
            <div>

              <label className="block mb-2 font-medium text-slate-300">
                Patient ID
              </label>

              <input
                type="text"
                placeholder="Enter Patient ID"
                className="
                  w-full

                  bg-white/5

                  border border-cyan-400/20

                  rounded-xl

                  px-4 py-3

                  text-white

                  placeholder:text-slate-400

                  outline-none

                  focus:ring-2
                  focus:ring-cyan-400
                "
              />

            </div>

            {/* Full Name */}
            <div>

              <label className="block mb-2 font-medium text-slate-300">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter Full Name"
                onChange={handleChange}
                className="
                  w-full

                  bg-white/5

                  border border-cyan-400/20

                  rounded-xl

                  px-4 py-3

                  text-white

                  placeholder:text-slate-400

                  outline-none

                  focus:ring-2
                  focus:ring-cyan-400
                "
              />

            </div>

          </div>

          {/* ROW 2 */}
          <div
            className="
              grid grid-cols-1
              md:grid-cols-2
              gap-5
            "
          >

            {/* Email */}
            <div>

              <label className="block mb-2 font-medium text-slate-300">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                onChange={handleChange}
                className="
                  w-full

                  bg-white/5

                  border border-cyan-400/20

                  rounded-xl

                  px-4 py-3

                  text-white

                  placeholder:text-slate-400

                  outline-none

                  focus:ring-2
                  focus:ring-cyan-400
                "
              />

            </div>

            {/* Age */}
            <div>

              <label className="block mb-2 font-medium text-slate-300">
                Age
              </label>

              <input
                type="number"
                name="age"
                placeholder="Enter Age"
                onChange={handleChange}
                className="
                  w-full

                  bg-white/5

                  border border-cyan-400/20

                  rounded-xl

                  px-4 py-3

                  text-white

                  placeholder:text-slate-400

                  outline-none

                  focus:ring-2
                  focus:ring-cyan-400
                "
              />

            </div>

          </div>

          {/* ROW 3 */}
          <div
            className="
              grid grid-cols-1
              md:grid-cols-2
              gap-5
            "
          >

            {/* Gender */}
            <div>

              <label className="block mb-2 font-medium text-slate-300">
                Gender
              </label>

              <select
                name="gender"
                onChange={handleChange}
                className="
                  w-full

                  bg-[#111827]

                  border border-cyan-400/20

                  rounded-xl

                  px-4 py-3

                  text-white

                  outline-none

                  focus:ring-2
                  focus:ring-cyan-400
                "
              >

                <option>
                  Select Gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

              </select>

            </div>

            {/* Status */}
            <div>

              <label className="block mb-2 font-medium text-slate-300">
                Status
              </label>

              <select
                name="status"
                onChange={handleChange}
                className="
                  w-full

                  bg-[#111827]

                  border border-cyan-400/20

                  rounded-xl

                  px-4 py-3

                  text-white

                  outline-none

                  focus:ring-2
                  focus:ring-cyan-400
                "
              >

                <option>
                  Select Status
                </option>

                <option value="Stable">
                  Stable
                </option>

                <option value="Critical">
                  Critical
                </option>

                <option value="Recovering">
                  Recovering
                </option>

              </select>

            </div>

          </div>

          {/* ROW 4 */}
          <div
            className="
              grid grid-cols-1
              md:grid-cols-2
              gap-5
            "
          >

            {/* Phone */}
            <div>

              <label className="block mb-2 font-medium text-slate-300">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                placeholder="Enter Phone Number"
                onChange={handleChange}
                className="
                  w-full

                  bg-white/5

                  border border-cyan-400/20

                  rounded-xl

                  px-4 py-3

                  text-white

                  placeholder:text-slate-400

                  outline-none

                  focus:ring-2
                  focus:ring-cyan-400
                "
              />

            </div>

            {/* Blood Group */}
            <div>

              <label className="block mb-2 font-medium text-slate-300">
                Blood Group
              </label>

              <input
                type="text"
                name="bloodGroup"
                placeholder="Enter Blood Group"
                onChange={handleChange}
                className="
                  w-full

                  bg-white/5

                  border border-cyan-400/20

                  rounded-xl

                  px-4 py-3

                  text-white

                  placeholder:text-slate-400

                  outline-none

                  focus:ring-2
                  focus:ring-cyan-400
                "
              />

            </div>

          </div>

          {/* PATIENT PHOTO */}
          <div>

            <label className="block mb-2 font-medium text-slate-300">
              Patient Photo
            </label>

            <input
  type="file"
  accept="image/*"
  onChange={(e) => {

  const file =
    e.target.files[0];

  if (!file) return;

  setProfileFile(file);

  setProfilePhoto(
    URL.createObjectURL(file)
  );
}}
  className="
    w-full

    bg-white/5

    border border-cyan-400/20

    rounded-xl

    px-4 py-3

    text-slate-300

    file:mr-4
    file:py-2
    file:px-4
    file:rounded-lg
    file:border-0

    file:bg-cyan-400/20
    file:text-cyan-200

    hover:file:bg-cyan-400/30

    transition-all duration-300
  "
/>

          </div>

          {/* BUTTONS */}
          <div
            className="
              flex items-center justify-end

              gap-4

              pt-4
            "
          >

            <button
              type="button"
              onClick={onClose}
              className="
                px-5 py-3

                rounded-xl

                border border-cyan-400/20

                text-slate-300

                hover:bg-white/5

                transition-all duration-300
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                px-5 py-3

                rounded-xl

                bg-cyan-400

                text-slate-900

                font-semibold

                hover:bg-cyan-300

                transition-all duration-300
              "
            >
              Save Patient
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddPatientModal;