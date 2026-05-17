import {
  FaTimes,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaEnvelope,
  FaHeartbeat,
  FaIdBadge,
} from "react-icons/fa";

function PatientDetailsPanel({
  patient,
  isOpen,
  onClose,
}) {
  if (!isOpen || !patient) return null;

  return (
    <>
      {/* OVERLAY */}
      <div
        className="
          fixed inset-0
          bg-black/50
          backdrop-blur-sm
          z-40
        "
        onClick={onClose}
      />

      {/* PANEL */}
      <div
        className="
          fixed top-0 right-0

          h-screen

          w-full sm:w-[430px]

          bg-gradient-to-br
          from-[#0f172a]
          via-[#111827]
          to-[#172554]

          border-l border-cyan-400/20

          shadow-2xl

          z-50

          overflow-y-auto

          transition-all duration-300
        "
      >

        {/* HEADER */}
        <div
          className="
            flex items-center justify-between

            px-6 py-5

            border-b border-cyan-400/10
          "
        >

          <div>

            <h2
              className="
                text-2xl font-bold
                text-white
              "
            >
              Patient Profile
            </h2>

            <p className="text-sm text-cyan-200 mt-1">
              Complete patient information
            </p>

          </div>

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

              shadow-sm

              transition-all duration-300
            "
          >
            <FaTimes />
          </button>

        </div>

        {/* PROFILE */}
        <div className="p-6">

          {/* AVATAR */}
          <div className="flex flex-col items-center">

            <div
              className="
                w-28 h-28

                rounded-full

                bg-gradient-to-br
                from-cyan-400/20
                to-blue-500/20

                border-4 border-cyan-400/20

                shadow-lg

                flex items-center justify-center

                text-cyan-300

                text-5xl
              "
            >
              {patient.profilePhoto ? (
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${patient.profilePhoto}`}
                    alt="Patient"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <FaUser />
                )}
            </div>

            <h3
              className="
                mt-4

                text-2xl font-bold
                text-white
              "
            >
              {patient.name || "Unknown Patient"}
            </h3>

            <p className="text-cyan-200 mt-1">
              {patient.id}
            </p>

          </div>

          {/* DETAILS */}
          <div className="mt-8 space-y-5">

            {/* EMAIL */}
            <div
              className="
                bg-white/5

                border border-cyan-400/10

                rounded-2xl

                p-4

                flex items-center gap-4

                backdrop-blur-sm

                shadow-sm
              "
            >

              <div
                className="
                  w-12 h-12

                  rounded-xl

                  bg-cyan-400/10 text-cyan-300

                  flex items-center justify-center
                "
              >
                <FaEnvelope />
              </div>

              <div>

                <p className="text-cyan-200 text-sm">
                  Email Address
                </p>

                <h4 className="font-semibold text-lg text-white">
                  {patient.email || "Not Available"}
                </h4>

              </div>

            </div>

            {/* AGE */}
            <div
              className="
                bg-white/5

                border border-cyan-400/10

                rounded-2xl

                p-4

                flex items-center gap-4

                backdrop-blur-sm

                shadow-sm
              "
            >

              <div
                className="
                  w-12 h-12

                  rounded-xl

                  bg-blue-400/10 text-blue-300

                  flex items-center justify-center
                "
              >
                <FaCalendarAlt />
              </div>

              <div>

                <p className="text-cyan-200 text-sm">
                  Age
                </p>

                <h4 className="font-semibold text-lg text-white">
                  {patient.age || 0} Years
                </h4>

              </div>

            </div>

            {/* GENDER */}
            <div
              className="
                bg-white/5

                border border-cyan-400/10

                rounded-2xl

                p-4

                flex items-center gap-4

                backdrop-blur-sm

                shadow-sm
              "
            >

              <div
                className="
                  w-12 h-12

                  rounded-xl

                  bg-purple-400/10 text-purple-300

                  flex items-center justify-center
                "
              >
                <FaUser />
              </div>

              <div>

                <p className="text-cyan-200 text-sm">
                  Gender
                </p>

                <h4 className="font-semibold text-lg text-white">
                  {patient.gender || "Not Available"}
                </h4>

              </div>

            </div>

            {/* PHONE */}
            <div
              className="
                bg-white/5

                border border-cyan-400/10

                rounded-2xl

                p-4

                flex items-center gap-4

                backdrop-blur-sm

                shadow-sm
              "
            >

              <div
                className="
                  w-12 h-12

                  rounded-xl

                  bg-green-400/10 text-green-300

                  flex items-center justify-center
                "
              >
                <FaPhone />
              </div>

              <div>

                <p className="text-cyan-200 text-sm">
                  Phone Number
                </p>

                <h4 className="font-semibold text-lg text-white">
                  {patient.phone || "Not Available"}
                </h4>

              </div>

            </div>

            {/* ADDRESS */}
            <div
              className="
                bg-white/5

                border border-cyan-400/10

                rounded-2xl

                p-4

                flex items-center gap-4

                backdrop-blur-sm

                shadow-sm
              "
            >

              <div
                className="
                  w-12 h-12

                  rounded-xl

                  bg-red-400/10 text-red-300

                  flex items-center justify-center
                "
              >
                <FaMapMarkerAlt />
              </div>

              <div>

                <p className="text-cyan-200 text-sm">
                  Address
                </p>

                <h4 className="font-semibold text-lg text-white">
                  {patient.address || "Not Available"}
                </h4>

              </div>

            </div>

            {/* BLOOD GROUP */}
            <div
              className="
                bg-white/5
                border border-cyan-400/10
                rounded-2xl
                p-4
                flex items-center gap-4
                backdrop-blur-sm
                shadow-sm
              "
            >

              <div
                className="
                  w-12 h-12
                  rounded-xl
                  bg-pink-400/10 text-pink-300
                  flex items-center justify-center
                "
              >
                <FaHeartbeat />
              </div>

              <div>

                <p className="text-cyan-200 text-sm">
                  Blood Group
                </p>

                <h4 className="font-semibold text-lg text-white">
                  {patient.bloodGroup || "Not Available"}
                </h4>

              </div>

            </div>

            {/* DISEASE */}
            <div
              className="
                bg-white/5
                border border-cyan-400/10
                rounded-2xl
                p-4
                flex items-center gap-4
                backdrop-blur-sm
                shadow-sm
              "
            >

              <div
                className="
                  w-12 h-12
                  rounded-xl
                  bg-orange-400/10 text-orange-300
                  flex items-center justify-center
                "
              >
                <FaHeartbeat />
              </div>

              <div>

                <p className="text-cyan-200 text-sm">
                  Disease
                </p>

                <h4 className="font-semibold text-lg text-white">
                  {patient.disease || "Not Available"}
                </h4>

              </div>

            </div>

            {/* EMERGENCY CONTACT */}
            <div
              className="
                bg-white/5
                border border-cyan-400/10
                rounded-2xl
                p-4
                flex items-center gap-4
                backdrop-blur-sm
                shadow-sm
              "
            >

              <div
                className="
                  w-12 h-12
                  rounded-xl
                  bg-yellow-400/10 text-yellow-300
                  flex items-center justify-center
                "
              >
                <FaPhone />
              </div>

              <div>

                <p className="text-cyan-200 text-sm">
                  Emergency Contact
                </p>

                <h4 className="font-semibold text-lg text-white">
                  {patient.emergencyContact || "Not Available"}
                </h4>

              </div>

            </div>

            {/* CREATED DATE */}
            <div
              className="
                bg-white/5
                border border-cyan-400/10
                rounded-2xl
                p-4
                flex items-center gap-4
                backdrop-blur-sm
                shadow-sm
              "
            >

              <div
                className="
                  w-12 h-12
                  rounded-xl
                  bg-cyan-400/10 text-cyan-300
                  flex items-center justify-center
                "
              >
                <FaCalendarAlt />
              </div>

              <div>

                <p className="text-cyan-200 text-sm">
                  Created At
                </p>

                <h4 className="font-semibold text-lg text-white">
                  {patient.createdAt
                    ? new Date(patient.createdAt).toLocaleString()
                    : "Not Available"}
                </h4>

              </div>

            </div>

            {/* PATIENT ID */}
            <div
              className="
                bg-white/5

                border border-cyan-400/10

                rounded-2xl

                p-4

                flex items-center gap-4

                backdrop-blur-sm

                shadow-sm
              "
            >

              <div
                className="
                  w-12 h-12

                  rounded-xl

                  bg-indigo-400/10 text-indigo-300

                  flex items-center justify-center
                "
              >
                <FaIdBadge />
              </div>

              <div>

                <p className="text-cyan-200 text-sm">
                  Patient ID
                </p>

                <h4 className="font-semibold text-lg text-white">
                  {patient.id}
                </h4>

              </div>

            </div>

            {/* STATUS */}
            <div
              className="
                bg-white/5

                border border-cyan-400/10

                rounded-2xl

                p-4

                flex items-center justify-between

                backdrop-blur-sm

                shadow-sm
              "
            >

              <div className="flex items-center gap-4">

                <div
                  className="
                    w-12 h-12

                    rounded-xl

                    bg-pink-400/10 text-pink-300

                    flex items-center justify-center
                  "
                >
                  <FaHeartbeat />
                </div>

                <div>

                  <p className="text-cyan-200 text-sm">
                    Current Status
                  </p>

                  <h4 className="font-semibold text-lg text-white">
                    {patient.status || "Unknown"}
                  </h4>

                </div>

              </div>

              <span
                className={`
                  px-4 py-2

                  rounded-full

                  text-sm font-medium

                  ${
                    patient.status === "Stable"
                      ? "bg-green-400/10 text-green-300"
                      : patient.status === "Critical"
                      ? "bg-red-400/10 text-red-300"
                      : "bg-yellow-400/10 text-yellow-300"
                  }
                `}
              >
                {patient.status || "Unknown"}
              </span>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default PatientDetailsPanel;