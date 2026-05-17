// DoctorProfileDrawer.jsx

import {
  useState,
  useEffect,
} from "react";

import {
  FaUserMd,
  FaEnvelope,
  FaPhoneAlt,
  FaHospital,
  FaGraduationCap,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";

function DoctorProfileDrawer({
  isOpen,
  onClose,
}) {

  const [doctorProfile, setDoctorProfile] =
    useState(null);

  const userId =
    localStorage.getItem("userId");

  // FETCH PROFILE
  const fetchDoctorProfile =
    async () => {

      try {

        const response =
          await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/doctor-profile/${userId}`
          );

        const data =
          await response.json();

        setDoctorProfile(data);

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    if (userId) {

      fetchDoctorProfile();

    }

  }, []);

  if (!isOpen) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="
          fixed inset-0
          bg-black/70
          backdrop-blur-sm
          z-40
        "
      />

      {/* DRAWER */}
      <div
        className="
          fixed top-0 right-0

          h-screen
          w-full sm:w-[380px]

          bg-[#07111F]

          border-l border-cyan-400/10

          z-50

          flex flex-col

          shadow-[0_0_40px_rgba(0,255,255,0.08)]
        "
      >

        {/* HEADER */}
        <div
          className="
            flex items-center justify-between

            px-2 py-2

            border-b border-white/5

            shrink-0
          "
        >

          <div>
            <h2
              className="
                text-2xl
                font-bold
                text-white
                tracking-wide
              "
            >
              Doctor Profile
            </h2>

            <p
              className="
                text-cyan-300/80
                text-xs
                mt-0
              "
            >
              Professional Information
            </p>
          </div>

          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="
              w-9 h-9

              rounded-xl

              bg-white/5

              border border-white/10

              text-cyan-200

              flex items-center justify-center

              hover:bg-cyan-500/10

              transition-all duration-300
            "
          >
            <FaTimes size={14} />
          </button>

        </div>

        {/* SCROLLABLE CONTENT */}
        <div
          className="
            flex-1

            overflow-y-auto

            px-2 py-2
          "
        >

          {/* PROFILE CARD */}
          <div
            className="
              bg-white/5

              border border-white/10

              rounded-3xl

              p-2

              flex flex-col items-center

              text-center

              shadow-xl
            "
          >

            {/* AVATAR */}
            {/* AVATAR */}
<div
  className="
    w-24 h-24

    rounded-full

    overflow-hidden

    border-[3px] border-cyan-400/30

    shadow-lg shadow-cyan-500/10
  "
>

  {doctorProfile?.profilePhoto ? (

    <img
     src={
  doctorProfile?.profilePhoto
    ? `${import.meta.env.VITE_BACKEND_URL}/uploads/${doctorProfile.profilePhoto}`
    : ""
}

      alt="Doctor"

      className="
        w-full
        h-full

        object-cover
      "
    />

  ) : (

    <div
      className="
        w-full h-full

        bg-gradient-to-br
        from-cyan-500/20
        to-blue-500/20

        flex items-center justify-center

        text-cyan-300

        text-4xl
      "
    >
      <FaUserMd />
    </div>

  )}

</div>

            {/* NAME */}
            <h3
              className="
                text-3xl

                font-bold

                text-white

                mt-4
              "
            >
              {doctorProfile?.fullName ||
                "Dr. Admin"}
            </h3>

            {/* ROLE */}
            <p
              className="
                text-cyan-300

                text-sm

                mt-1
              "
            >
              {doctorProfile?.department ||
                "Senior Neurologist"}
            </p>

            {/* BADGE */}
            <div
              className="
                mt-4

                px-4 py-1.5

                rounded-full

                bg-cyan-500/10

                border border-cyan-400/20

                text-cyan-200

                text-xs

                font-medium
              "
            >
              Active Medical Specialist
            </div>

          </div>

          {/* LOGOUT BUTTON */}
          <div className="mt-6 mb-4">

            <button
              onClick={() => {

                const confirmLogout =
                  window.confirm(
                    "Are you sure you want to logout?"
                  );

                if (confirmLogout) {

                  localStorage.clear();

                  window.location.href = "/";

                }

              }}
              className="
                w-full

                flex items-center justify-center gap-2

                bg-gradient-to-r
                from-red-500
                to-rose-600

                hover:from-red-400
                hover:to-rose-500

                text-white

                py-3

                rounded-2xl

                font-semibold

                shadow-lg shadow-red-500/20

                transition-all duration-300

                hover:scale-[1.02]
              "
            >
              <FaSignOutAlt />
              Logout
            </button>

          </div>

          {/* INFO SECTION */}
          <div className="mt-5">

            <h4
              className="
                text-white

                text-sm

                font-semibold

                mb-3

                tracking-wide
              "
            >
              INFORMATION
            </h4>

            {/* INFO GRID */}
            <div
              className="
                grid grid-cols-2

                gap-3
              "
            >

              <InfoCard
                icon={<FaPhoneAlt />}
                title="Contact"
                value={
                  doctorProfile?.phone ||
                  "Not Available"
                }
                color="text-green-400"
              />

              <InfoCard
                icon={<FaEnvelope />}
                title="Email"
                value={
                  doctorProfile?.email ||
                  "Not Available"
                }
                color="text-cyan-300"
              />

              <InfoCard
                icon={<FaGraduationCap />}
                title="Qualification"
                value={
                  doctorProfile?.qualification ||
                  "Not Available"
                }
                color="text-purple-300"
              />

              <InfoCard
                icon={<FaHospital />}
                title="Hospital"
                value={
                  doctorProfile?.hospital ||
                  "Not Available"
                }
                color="text-orange-300"
              />

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

/* INFO CARD */
function InfoCard({
  icon,
  title,
  value,
  color,
}) {

  return (

    <div
      className="
        bg-white/5

        border border-white/10

        rounded-2xl

        p-3.5

        min-h-[120px]

        hover:border-cyan-400/20

        hover:bg-white/[0.07]

        transition-all duration-300
      "
    >

      {/* ICON */}
      <div
        className={`
          w-10 h-10

          rounded-xl

          bg-[#0F172A]

          border border-white/5

          flex items-center justify-center

          text-sm

          ${color}
        `}
      >
        {icon}
      </div>

      {/* CONTENT */}
      <div className="mt-3">

        <p
          className="
            text-slate-400

            text-[11px]

            uppercase

            tracking-wider
          "
        >
          {title}
        </p>

        <h4
          className="
            text-white

            text-sm

            font-semibold

            mt-1

            leading-snug

            break-words
          "
        >
          {value}
        </h4>

      </div>

    </div>

  );
}

export default DoctorProfileDrawer;