// SettingsPage.jsx

import {
  useState,
  useEffect,
} from "react";

import DashboardLayout from "../layouts/DashboardLayout";

function SettingsPage() {

  /* PROFILE */
  const [fullName, setFullName] =
    useState("Dr. Admin");

  const [gender, setGender] =
    useState("Male");

  const [dob, setDob] =
    useState("1990-01-01");

  const [email, setEmail] =
    useState("doctor@hospital.com");

  const [phone, setPhone] =
    useState("+91 9876543210");

  const [qualification, setQualification] =
    useState("MBBS, MD");

  const [experience, setExperience] =
    useState("10 Years");

  const [hospital, setHospital] =
    useState("AI Medical Center");

  const [department, setDepartment] =
    useState("Neurology");

  const [profilePhoto, setProfilePhoto] =
  useState("");

  const [profileFile, setProfileFile] =
  useState(null);

  /* SECURITY */
  const [twoFA, setTwoFA] =
    useState(true);

  const [otpVerification, setOtpVerification] =
    useState(true);

  const [loginAlerts, setLoginAlerts] =
    useState(true);

  const [deviceVerification, setDeviceVerification] =
    useState(false);

  /* SYSTEM */
  const [systemName, setSystemName] =
    useState("AI MS Detection System");

  const [clinicName, setClinicName] =
    useState("AI Medical Center");

  const [systemVersion, setSystemVersion] =
    useState("v2.0.1");

  const [timezone, setTimezone] =
    useState("UTC +05:30");

  const [language, setLanguage] =
    useState("English");

  const [dateFormat, setDateFormat] =
    useState("DD/MM/YYYY");

  const userId =
    localStorage.getItem("userId");

  /* FETCH DOCTOR PROFILE */


  /* FETCH DOCTOR PROFILE */
const fetchDoctorProfile =
  async () => {

    try {

      const response =
        await fetch(
  `${import.meta.env.VITE_BACKEND_URL}/api/doctor-profile/${userId}`
);

      const data =
        await response.json();

      if (data) {

        setProfilePhoto(
          data.profilePhoto || ""
        );

        setFullName(
          data.fullName || ""
        );

        setGender(
          data.gender || ""
        );

        setDob(
          data.dob || ""
        );

        setEmail(
          data.email || ""
        );

        setPhone(
          data.phone || ""
        );

        setQualification(
          data.qualification || ""
        );

        setExperience(
          data.experience || ""
        );

        setHospital(
          data.hospital || ""
        );

        setDepartment(
          data.department || ""
        );
      }

    } catch (error) {

      console.log(error);
    }
  };







 const handleSaveProfile =
  async () => {

    try {

      const formData =
        new FormData();

      formData.append(
        "userId",
        userId
      );

      formData.append(
        "fullName",
        fullName
      );

      formData.append(
        "gender",
        gender
      );

      formData.append(
        "dob",
        dob
      );

      formData.append(
        "email",
        email
      );

      formData.append(
        "phone",
        phone
      );

      formData.append(
        "qualification",
        qualification
      );

      formData.append(
        "experience",
        experience
      );

      formData.append(
        "hospital",
        hospital
      );

      formData.append(
        "department",
        department
      );

      if (profileFile) {

          formData.append(
            "profilePhoto",
            profileFile
          );

        } else if (
          profilePhoto &&
          !profilePhoto.startsWith("blob:")
        ) {

          formData.append(
            "existingProfilePhoto",
            profilePhoto
          );
        }

      const response =
        await fetch(
  `${import.meta.env.VITE_BACKEND_URL}/api/doctor-profile`,
          {
            method: "POST",
            body: formData,
          }
        );

      const data =
        await response.json();

      console.log(data);

      alert(
        "Profile Saved Successfully"
      );

      fetchDoctorProfile();

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    if (userId) {

      fetchDoctorProfile();

    }

  }, []);

  return (

    <DashboardLayout>

      <div className="space-y-6">

        {/* =========================
   DOCTOR PROFILE CONTAINER
========================= */}

<div
  className="
    w-full

    bg-[#020817]

    border border-cyan-500/10

    rounded-[32px]

    shadow-[0_0_40px_rgba(0,255,255,0.05)]

    overflow-hidden
  "
>

  {/* HEADER */}
  <div
    className="
      flex flex-col
      xl:flex-row

      xl:items-center
      xl:justify-between

      gap-4

      p-4 sm:p-1

      border-b border-white/5
    "
  >

    {/* LEFT */}
    <div className="ml-2 sm:ml-4">
      <h2
        className="
          text-3xl
          sm:text-4xl
          
          font-bold

          text-white
        "
      >
        Doctor Profile
      </h2>

      <p
        className="
          text-slate-400

          mt-0

          text-sm sm:text-base
        "
      >
        Manage your professional and personal information
      </p>
    </div>

    {/* SAVE BUTTON */}
    <button
      onClick={handleSaveProfile}
      className="
        hidden xl:flex

        items-center justify-center
        mr-4
        h-[52px]

        px-7

        rounded-2xl

        bg-cyan-400

        hover:bg-cyan-300

        text-black

        font-semibold

        transition-all duration-300

        hover:scale-[1.02]

        shadow-lg shadow-cyan-500/20
      "
    >
      Save Changes
    </button>

  </div>

  {/* MAIN CONTENT */}
  <div
    className="
      grid
      grid-cols-1
      xl:grid-cols-[320px_1fr]

      gap-4

      p-6 sm:p-6
    "
  >

    {/* =========================
       LEFT PROFILE CARD
    ========================= */}

    <div
      className="
        bg-[#071224]

        border border-white/5

        rounded-3xl

        p-6

        flex flex-col
        items-center

        h-fit
      "
    >

      {/* PROFILE IMAGE */}
      <div
  className="
    w-32 h-32

    rounded-full

    overflow-hidden

    border-4 border-cyan-400/20

    shadow-xl
  "
>

  {profilePhoto ? (

    <img
     src={
  profilePhoto &&
  profilePhoto.startsWith("blob:")
    ? profilePhoto
    : profilePhoto
    ? `${import.meta.env.VITE_BACKEND_URL}/uploads/${profilePhoto}`
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

        text-5xl

        font-bold
      "
    >
      DR
    </div>

  )}

</div>

      {/* NAME */}
      <h3
        className="
          text-white

          text-2xl

          font-semibold

          mt-5
        "
      >
        {fullName}
      </h3>

      <p
        className="
          text-cyan-300

          text-sm

          mt-1
        "
      >
        {department}
      </p>

      {/* BUTTON */}
     <label
  className="
    mt-6

    w-full

    bg-cyan-500/10

    hover:bg-cyan-500

    border border-cyan-400/20

    hover:border-cyan-400

    text-cyan-300
    hover:text-black

    font-semibold

    py-3

    rounded-2xl

    transition-all duration-300

    cursor-pointer

    flex items-center justify-center
  "
>

  Upload Profile Photo

  <input
    type="file"

    accept="image/*"

    hidden

    onChange={(e) => {

  const file =
  e.target.files[0];

if (!file) return;

setProfileFile(file);

setProfilePhoto(
  URL.createObjectURL(file)
);

}}
  />

</label>
      {/* EXTRA INFO */}
      <div
        className="
          w-full

          mt-8

          space-y-4
        "
      >

        <div
          className="
            flex items-center justify-between

            text-sm
          "
        >
          <span className="text-slate-400">
            E-Mail:
          </span>

          <span className="text-white font-medium">
            {email}
          </span>
        </div>

        <div
          className="
            flex items-center justify-between

            text-sm
          "
        >
          <span className="text-slate-400">
            Phone
          </span>

          <span className="text-white font-medium">
            {phone}
          </span>
        </div>

      </div>

    </div>

    {/* =========================
       RIGHT FORM SECTION
    ========================= */}

    <div className="space-y-8">

      {/* PERSONAL INFO */}
      <div>

        <h3
          className="
            text-white

            text-xl

            font-semibold

            mb-5
          "
        >
          Personal Information
        </h3>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2

            gap-5
          "
        >

          <InputField
            label="Full Name"
            value={fullName}
            setValue={setFullName}
          />

          <SelectField
            label="Gender"
            value={gender}
            setValue={setGender}
            options={[
              "Male",
              "Female",
              "Other",
            ]}
          />

          <InputField
            label="Date of Birth"
            value={dob}
            setValue={setDob}
            type="date"
          />

          <InputField
            label="Phone Number"
            value={phone}
            setValue={setPhone}
          />

        </div>

      </div>

      {/* PROFESSIONAL INFO */}
      <div>

        <h3
          className="
            text-white

            text-xl

            font-semibold

            mb-5
          "
        >
          Professional Information
        </h3>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2

            gap-5
          "
        >

          <InputField
            label="Email Address"
            value={email}
            setValue={setEmail}
          />

          <InputField
            label="Qualification"
            value={qualification}
            setValue={setQualification}
          />

        </div>

      </div>

      <div>

        {/* MOBILE ONLY SAVE BUTTON */}
        <div className="flex justify-center">

          <button
            onClick={handleSaveProfile}
            className="
              flex xl:hidden

              items-center justify-center
              
              w-40

              h-[52px]

              px-7

              rounded-2xl

              bg-cyan-400

              hover:bg-cyan-300

              text-black

              font-bold

              transition-all duration-300

              shadow-lg shadow-cyan-500/20
            "
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>

  </div>

</div>

        {/* SECURITY + SYSTEM */}
        <div
          className="
            grid grid-cols-1
            2xl:grid-cols-2

            gap-6
          "
        >

          {/* SECURITY SETTINGS */}
          <div  id="security-section"
            className="
              bg-[#020817]

              border border-cyan-500/20

              rounded-3xl

              p-6 sm:p-8

              shadow-2xl
            "
          >

            <h2
              className="
                text-3xl

                font-bold

                text-white

                mb-8
              "
            >
              Security Settings
            </h2>

            <div className="space-y-5">

              <InputField
                label="Current Password"
                type="password"
              />

              <InputField
                label="New Password"
                type="password"
              />

              <InputField
                label="Confirm New Password"
                type="password"
              />

              <div className="flex justify-center">

                <button
                  className="
                    mt-4

                    bg-cyan-500

                    hover:bg-cyan-400

                    text-black

                    font-semibold

                    px-6 py-3

                    rounded-2xl

                    transition-all duration-300
                  "
                >
                  Update Password
                </button>

              </div>

            </div>

          </div>

          {/* SYSTEM SETTINGS */}
          <div id="system-section"
            className="
              bg-[#020817]

              border border-cyan-500/20

              rounded-3xl

              p-6 sm:p-8

              shadow-2xl
            "
          >

            <h2
              className="
                text-3xl

                font-bold

                text-white

                mb-8
              "
            >
              System Preferences
            </h2>

            <div className="space-y-5">

              <InputField
                label="Hospital/Clinic Name"
                value={clinicName}
                setValue={setClinicName}
              />

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2

                  gap-5
                "
              >

                <SelectField
                  label="Time Zone"
                  value={timezone}
                  setValue={setTimezone}
                  options={[
                    "UTC +05:30",
                    "UTC +00:00",
                    "UTC -04:00",
                  ]}
                />

                <SelectField
                  label="Date Format"
                  value={dateFormat}
                  setValue={setDateFormat}
                  options={[
                    "DD/MM/YYYY",
                    "MM/DD/YYYY",
                    "YYYY/MM/DD",
                  ]}
                />

              </div>

              <SelectField
                label="Language Selection"
                value={language}
                setValue={setLanguage}
                options={[
                  "English",
                  "Hindi",
                ]}
              />

              <div className="flex justify-center">

                <button
                  className="
                    mt-4

                    bg-cyan-500

                    hover:bg-cyan-400

                    text-black

                    font-semibold

                    px-6 py-3

                    rounded-2xl

                    transition-all duration-300
                  "
                >
                  Save Preferences
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );
}

/* INPUT FIELD */
function InputField({
  label,
  value,
  setValue,
  type = "text",
}) {

  return (

    <div>

      <label
        className="
          text-cyan-300

          text-sm
        "
      >
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          setValue &&
          setValue(e.target.value)
        }
        className="
          w-full

          mt-2

          bg-[#0B1120]

          border border-cyan-500/20

          rounded-2xl

          px-4 py-3

          text-white

          outline-none
        "
      />

    </div>

  );
}

/* SELECT FIELD */
function SelectField({
  label,
  value,
  setValue,
  options,
}) {

  return (

    <div>

      <label
        className="
          text-cyan-300

          text-sm
        "
      >
        {label}
      </label>

      <select
        value={value}
        onChange={(e) =>
          setValue(e.target.value)
        }
        className="
          w-full

          mt-2

          bg-[#0B1120]

          border border-cyan-500/20

          rounded-2xl

          px-4 py-3

          text-white

          outline-none
        "
      >

        {options.map((option) => (

          <option
            key={option}
            value={option}
          >
            {option}
          </option>

        ))}

      </select>

    </div>

  );
}

/* TOGGLE ITEM */
function ToggleItem({
  title,
  value,
  setValue,
}) {

  return (

    <div
      className="
        flex items-center
        justify-between

        bg-[#0B1120]

        border border-cyan-500/10

        rounded-2xl

        px-5 py-4
      "
    >

      <span className="text-white">
        {title}
      </span>

      <button
        onClick={() =>
          setValue(!value)
        }
        className={`
          w-14 h-8

          rounded-full

          relative

          transition-all duration-300

          ${
            value
              ? "bg-cyan-500"
              : "bg-gray-700"
          }
        `}
      >

        <div
          className={`
            absolute top-1

            w-6 h-6

            rounded-full

            bg-white

            transition-all duration-300

            ${
              value
                ? "left-7"
                : "left-1"
            }
          `}
        />

      </button>

    </div>

  );
}

export default SettingsPage;