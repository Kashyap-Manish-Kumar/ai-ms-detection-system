import { useState, useEffect } from "react";

import { FaTimes } from "react-icons/fa";

function EditPatientModal({
  isOpen,
  onClose,
  patient,
  onPatientUpdated,
}) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    age: "",
    gender: "",
    status: "",
    phone: "",
    address: "",
    bloodGroup: "",
    disease: "",
    emergencyContact: "",
    profilePhoto: null,
  });

  // PREFILL DATA
  useEffect(() => {
    if (patient) {
      setFormData({
        id: patient.id || "",
        name: patient.name || "",
        email: patient.email || "",
        age: patient.age || "",
        gender: patient.gender || "",
        status: patient.status || "",
        phone: patient.phone || "",
        address: patient.address || "",
        bloodGroup: patient.bloodGroup || "",
        disease: patient.disease || "",
        emergencyContact: patient.emergencyContact || "",
        profilePhoto: null,
      });
    }
  }, [patient]);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE IMAGE
  const handleImageChange = (e) => {

    setFormData({
      ...formData,
      profilePhoto: e.target.files[0],
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const dataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        dataToSend.append(key, formData[key]);
      });

      const response = await fetch(
       `${import.meta.env.VITE_BACKEND_URL}/api/patients/${formData.id}`,
        {
          method: "PUT",
          body: dataToSend,
        }
      );

      const data = await response.json();

      console.log(data);

      if (onPatientUpdated) {
        onPatientUpdated();
      }

      onClose();

    } catch (error) {

      console.log(error);
    }
  };

  if (!isOpen || !patient) return null;

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
              font-bold text-white
            "
          >
            Edit Patient
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
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* ROW 1 */}
          <div
            className="
              grid grid-cols-1
              md:grid-cols-2
              gap-5
            "
          >

            {/* ID */}
            <div>

              <label className="block mb-2 font-medium text-slate-300">
                Patient ID
              </label>

              <input
                type="text"
                value={formData.id}
                disabled
                className="
                  w-full

                  bg-white/5

                  border border-cyan-400/20
                  rounded-xl

                  px-4 py-3

                  text-white

                  placeholder:text-slate-400

                  outline-none

                  opacity-70
                  cursor-not-allowed
                "
              />

            </div>

            {/* NAME */}
            <div>

              <label className="block mb-2 font-medium text-slate-300">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
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

            {/* EMAIL */}
            <div>

              <label className="block mb-2 font-medium text-slate-300">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
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

            {/* AGE */}
            <div>

              <label className="block mb-2 font-medium text-slate-300">
                Age
              </label>

              <input
                type="number"
                name="age"
                value={formData.age}
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

            {/* GENDER */}
            <div>

              <label className="block mb-2 font-medium text-slate-300">
                Gender
              </label>

              <select
                name="gender"
                value={formData.gender}
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

                <option value="">
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

            {/* STATUS */}
            <div>

              <label className="block mb-2 font-medium text-slate-300">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
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

                <option value="">
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

            {/* PHONE */}
            <div>

              <label className="block mb-2 font-medium text-slate-300">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
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

            {/* ADDRESS */}
            <div>

              <label className="block mb-2 font-medium text-slate-300">
                Address
              </label>

              <input
                type="text"
                name="address"
                value={formData.address}
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

          {/* ROW 5 */}
          <div
            className="
              grid grid-cols-1
              md:grid-cols-2
              gap-5
            "
          >

            {/* BLOOD GROUP */}
            <div>

              <label className="block mb-2 font-medium text-slate-300">
                Blood Group
              </label>

              <input
                type="text"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="
                  w-full

                  bg-white/5

                  border border-cyan-400/20
                  rounded-xl

                  px-4 py-3

                  text-white

                  outline-none

                  focus:ring-2
                  focus:ring-cyan-400
                "
              />

            </div>

            {/* DISEASE */}
            <div>

              <label className="block mb-2 font-medium text-slate-300">
                Disease
              </label>

              <input
                type="text"
                name="disease"
                value={formData.disease}
                onChange={handleChange}
                className="
                  w-full

                  bg-white/5

                  border border-cyan-400/20
                  rounded-xl

                  px-4 py-3

                  text-white

                  outline-none

                  focus:ring-2
                  focus:ring-cyan-400
                "
              />

            </div>

          </div>

          {/* ROW 6 */}
          <div>

            <label className="block mb-2 font-medium text-slate-300">
              Emergency Contact
            </label>

            <input
              type="text"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              className="
                w-full

                bg-white/5

                border border-cyan-400/20
                rounded-xl

                px-4 py-3

                text-white

                outline-none

                focus:ring-2
                focus:ring-cyan-400
              "
            />

          </div>

          {/* PATIENT IMAGE + BUTTONS */}
          <div
            className="
              flex flex-col
              lg:flex-row

              lg:items-end
              lg:justify-between

              gap-5

              pt-2
            "
          >

            {/* PATIENT IMAGE */}
            <div className="flex-1">

              <label className="block mb-2 font-medium text-slate-300">
                Update Patient Photo
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
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
                flex items-center

                gap-3

                lg:pb-[2px]
              "
            >

              <button
                type="button"
                onClick={onClose}
                className="
                  px-5 py-2.5

                  rounded-xl

                  bg-white/5

                  border border-cyan-400/20

                  text-slate-300

                  hover:bg-white/10

                  transition-all duration-300
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                className="
                  px-5 py-2.5

                  rounded-xl

                  bg-cyan-500 hover:bg-cyan-400

                  text-slate-900

                  font-semibold

                  transition-all duration-300
                "
              >
                Update Patient
              </button>

            </div>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditPatientModal;