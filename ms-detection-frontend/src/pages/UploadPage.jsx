import { useState } from "react";
import API from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";

import {
  FaCloudUploadAlt,
  FaBrain,
} from "react-icons/fa";

function UploadPage() {

  const [selectedFile, setSelectedFile] = useState(null);

  const [patientId, setPatientId] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {

    if (!selectedFile || !patientId) {
      alert("Please select MRI file and patient ID");
      return;
    }

    try {

      setLoading(true);
       
      const formData = new FormData();

      formData.append("patientId", patientId);

      formData.append("file", selectedFile);

      const response = await API.post(
        "/analysis/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

/* SAVE GLOBALLY */
localStorage.setItem(
  "analysisData",
  JSON.stringify(response.data)
);

navigate("/results", {
  state: {
    analysis: response.data,
  },
});

alert("MRI Analysis Completed");

    } catch (error) {

      console.error(error);

      alert("Upload Failed");

    } finally {

      setLoading(false);
    }
  };

  return (
    <DashboardLayout>

      {/* REDUCED TOP SPACING */}
      <div className="space-y-2">

        {/* MAIN GRID */}
        <div
          className="
            grid grid-cols-1
            xl:grid-cols-3

            gap-4

            items-stretch

            mt-0
          "
        >

          {/* LEFT SIDE */}
          <div className="xl:col-span-2">

            <div
              className="
                bg-[#020817]

                border border-cyan-500/20

                rounded-3xl

                p-5

                shadow-2xl

                h-full

                flex flex-col
              "
            >

              {/* HEADER */}
              <div
                className="
                  flex items-center justify-between

                  mb-4
                "
              >

                <div>

                  <h2
                    className="
                      text-2xl md:text-3xl

                      font-bold

                      text-white
                    "
                  >
                    MRI Scan Upload
                  </h2>

                  <p className="text-cyan-300 mt-1">
                    Supported: JPG, PNG, DICOM
                  </p>

                </div>

                {/* ICON */}
                <div
                  className="
                    w-14 h-14

                    rounded-2xl

                    bg-cyan-500/10

                    border border-cyan-500/20

                    flex items-center justify-center

                    text-cyan-400 text-2xl
                  "
                >
                  <FaBrain />
                </div>

              </div>

              {/* DRAG AREA */}
              <div
                className="
                  flex-1

                  border-2 border-dashed border-cyan-500/30

                  rounded-3xl

                  px-6 py-10

                  flex flex-col items-center justify-center

                  bg-[#0B1120]

                  hover:border-cyan-400

                  transition-all duration-300
                "
              >

                {/* ICON */}
                <div
                  className="
                    w-20 h-20

                    rounded-full

                    bg-cyan-500/10

                    flex items-center justify-center

                    text-cyan-400 text-4xl

                    mb-5
                  "
                >
                  <FaCloudUploadAlt />
                </div>

                {/* TITLE */}
                <h3
                  className="
                    text-2xl

                    font-bold

                    text-white
                  "
                >
                  Drag & Drop MRI Scan
                </h3>

                {/* DESCRIPTION */}
                <p
                  className="
                    text-cyan-200

                    mt-3

                    text-center

                    max-w-xl

                    text-base
                  "
                >
                  Upload brain MRI scans for AI-powered Multiple
                  Sclerosis detection and analysis.
                </p>

                <input
                  type="file"
                  accept=".png,.jpg,.jpeg,.dcm"
                  onChange={handleFileChange}
                  className="hidden"
                  id="mriUpload"
                />

                {/* BUTTON */}
                <label
                  htmlFor="mriUpload"
                  className="
                    mt-7

                    bg-cyan-500 hover:bg-cyan-400

                    text-black font-semibold

                    px-7 py-3

                    rounded-2xl

                    transition-all duration-300
                    hover:scale-105

                    cursor-pointer
                  "
                >
                  Browse MRI Files
                </label>

                {selectedFile && (
                  <p className="text-cyan-300 mt-4">
                    Selected: {selectedFile.name}
                  </p>
                )}

              </div>

              {/* RUN BUTTON */}
              <button
                onClick={handleUpload}
                className="
                  mt-5

                  w-full

                  bg-cyan-500 hover:bg-cyan-400

                  text-black font-bold

                  py-4

                  rounded-2xl

                  text-lg

                  transition-all duration-300
                  hover:scale-[1.01]

                  shadow-xl shadow-cyan-500/20
                "
              >
                {loading ? "Analyzing MRI..." : "Run AI Prediction"}
              </button>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div>

            <div
              className="
                bg-[#020817]

                border border-cyan-500/20

                rounded-3xl

                p-5

                shadow-2xl

                h-full

                flex flex-col
              "
            >

              {/* TITLE */}
              <h2
                className="
                  text-2xl md:text-3xl

                  font-bold

                  text-white

                  mb-4
                "
              >
                Patient Clinical Details
              </h2>

              {/* FORM */}
              <div className="space-y-4">

                {/* ROW 1 */}
                <div className="grid grid-cols-2 gap-4">

                  {/* PATIENT ID */}
                  <div>

                    <label className="text-cyan-300 text-sm">
                      Patient ID
                    </label>

                    <input
                      type="text"
                      placeholder="Patient ID"
                      value={patientId}
                      onChange={(e) => setPatientId(e.target.value)}
                      className="
                        mt-2

                        w-full

                        bg-[#0B1120]

                        border border-cyan-500/20

                        rounded-2xl

                        px-4 py-3

                        text-white

                        outline-none

                        focus:border-cyan-400
                      "
                    />

                  </div>

                  {/* CHECKUP */}
                  <div>

                    <label className="text-cyan-300 text-sm">
                      Checkup
                    </label>

                    <select
                      className="
                        mt-2

                        w-full

                        bg-[#0B1120]

                        border border-cyan-500/20

                        rounded-2xl

                        px-4 py-3

                        text-white

                        outline-none

                        focus:border-cyan-400
                      "
                    >
                      <option>Done</option>
                      <option>Pending</option>
                    </select>

                  </div>

                </div>

                {/* ROW 2 */}
                <div className="grid grid-cols-2 gap-4">

                  {/* WEIGHT */}
                  <div>

                    <label className="text-cyan-300 text-sm">
                      Weight (kg)
                    </label>

                    <input
                      type="number"
                      placeholder="Weight"
                      className="
                        mt-2

                        w-full

                        bg-[#0B1120]

                        border border-cyan-500/20

                        rounded-2xl

                        px-4 py-3

                        text-white

                        outline-none

                        focus:border-cyan-400
                      "
                    />

                  </div>

                  {/* HEIGHT */}
                  <div>

                    <label className="text-cyan-300 text-sm">
                      Height (cm)
                    </label>

                    <input
                      type="number"
                      placeholder="Height"
                      className="
                        mt-2

                        w-full

                        bg-[#0B1120]

                        border border-cyan-500/20

                        rounded-2xl

                        px-4 py-3

                        text-white

                        outline-none

                        focus:border-cyan-400
                      "
                    />

                  </div>

                </div>

                {/* CLINICAL NOTES */}
                <div>

                  <label className="text-cyan-300 text-sm">
                    Clinical Notes
                  </label>

                  <textarea
                    rows="8"
                    placeholder="Doctor observations and clinical notes..."
                    className="
                      mt-2

                      w-full

                      bg-[#0B1120]

                      border border-cyan-500/20

                      rounded-2xl

                      px-4 py-3

                      text-white

                      outline-none

                      resize-none

                      focus:border-cyan-400
                    "
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default UploadPage;