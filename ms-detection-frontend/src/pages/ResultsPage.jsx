import { useLocation } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

function ResultsPage() {

  const location = useLocation();

  const analysis = location.state?.analysis;

  const safeAnalysis = analysis || {

    prediction: "No Analysis",

    lesionVolume: 0,

    diseaseSeverity: "N/A",

    totalLesionsDetected: 0,

    averageLesionSizePixels: 0,

    largestLesionAreaPixels: 0,

    primaryBrainRegion: "N/A",

    overlayImage: null,
  };

  return (
    <DashboardLayout>

      <div className="space-y-3">

        {/* MAIN GRID */}
        <div
          className="
            grid grid-cols-1
            xl:grid-cols-3

            gap-3

            items-stretch
          "
        >

          {/* LEFT SIDE */}
          <div className="xl:col-span-2">

            {/* MRI PREVIEW */}
            <div
              className="
                bg-[#020817]

                border border-cyan-500/20

                rounded-3xl

                p-5

                shadow-2xl

                flex flex-col

                h-full
              "
            >

              {/* HEADER */}
              <div className="mb-3">

                <h2
                  className="
                    text-2xl
                    font-bold
                    text-white
                  "
                >
                  MRI Scan Preview
                </h2>

                <p className="text-cyan-300 mt-1">
                  AI generated lesion overlay analysis
                </p>

              </div>

              {/* MRI IMAGES */}
<div
  className="
    h-[435px]

    rounded-3xl

    bg-[#0B1120]

    border border-cyan-500/20

    overflow-hidden

    p-4
  "
>

  {safeAnalysis?.overlayImage ? (

    <div
      className="
        grid grid-cols-1
        md:grid-cols-2

        gap-4

        h-full
      "
    >

      {/* MASK IMAGE */}
      <div
        className="
          bg-black

          rounded-2xl

          border border-cyan-500/10

          overflow-hidden

          flex flex-col
        "
      >

        {/* TITLE */}
        <div
          className="
            px-4 py-3

            border-b border-cyan-500/10

            bg-[#020817]
          "
        >
          <h3
            className="
              text-cyan-300

              font-semibold

              text-sm
            "
          >
            Mask Image
          </h3>
        </div>

        {/* IMAGE */}
        <div
          className="
            flex-1

            flex items-center justify-center

            overflow-hidden
          "
        >
          <img
            src={`${import.meta.env.VITE_ML_URL}${safeAnalysis?.maskImage}`}
            alt="Mask MRI"
            className="
              h-full
              w-full

              object-contain
            "
          />
        </div>

      </div>

      {/* OVERLAY IMAGE */}
      <div
        className="
          bg-black

          rounded-2xl

          border border-cyan-500/10

          overflow-hidden

          flex flex-col
        "
      >

        {/* TITLE */}
        <div
          className="
            px-4 py-3

            border-b border-cyan-500/10

            bg-[#020817]
          "
        >
          <h3
            className="
              text-cyan-300

              font-semibold

              text-sm
            "
          >
            Overlay Image
          </h3>
        </div>

        {/* IMAGE */}
        <div
          className="
            flex-1

            flex items-center justify-center

            overflow-hidden
          "
        >
          <img
            src={`${import.meta.env.VITE_ML_URL}${safeAnalysis?.overlayImage}`}
            alt="Overlay MRI"
            className="
              h-full
              w-full

              object-contain
            "
          />
        </div>

      </div>

    </div>

  ) : (

    <div
      className="
        h-full

        flex items-center justify-center
      "
    >

      <div className="text-center px-6">

        <h3
          className="
            text-2xl

            font-bold

            text-cyan-400
          "
        >
          No MRI Analysis Yet
        </h3>

        <p
          className="
            text-cyan-200/70

            mt-3

            text-sm
          "
        >
          Upload MRI images to generate
          mask and overlay analysis previews.
        </p>

      </div>

    </div>

  )}

</div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div
            className="
              flex flex-col

              gap-3

              h-full
            "
          >

            {/* AI PREDICTION */}
            <div
              className="
                bg-[#020817]

                border border-cyan-500/20

                rounded-3xl

                p-4

                shadow-2xl
              "
            >

              <h2
                className="
                  text-xl

                  font-bold

                  text-white

                  mb-4
                "
              >
                AI Prediction Analysis
              </h2>

              {/* STATS */}
              <div
                className="
                  grid grid-cols-3

                  gap-3
                "
              >

                {/* PREDICTION */}
                <div
                  className="
                    bg-[#0B1120]

                    border border-red-500/20

                    rounded-2xl

                    p-4
                  "
                >

                  <p className="text-gray-400 text-xs">
                    Prediction
                  </p>

                  <h3
                    className="
                      text-lg

                      font-bold

                      text-red-400

                      mt-3
                    "
                  >
                    {safeAnalysis?.prediction}
                  </h3>

                </div>

                {/* VOLUME */}
                <div
                  className="
                    bg-[#0B1120]

                    border border-cyan-500/20

                    rounded-2xl

                    p-4
                  "
                >

                  <p className="text-gray-400 text-xs">
                    Lesion Volume
                  </p>

                  <h3
                    className="
                      text-lg

                      font-bold

                      text-cyan-400

                      mt-3
                    "
                  >
                    {safeAnalysis?.lesionVolume}
                  </h3>

                </div>

                {/* SEVERITY */}
                <div
                  className="
                    bg-[#0B1120]

                    border border-green-500/20

                    rounded-2xl

                    p-4
                  "
                >

                  <p className="text-gray-400 text-xs">
                    Severity
                  </p>

                  <h3
                    className="
                      text-lg

                      font-bold

                      text-green-400

                      mt-3
                    "
                  >
                    {safeAnalysis?.diseaseSeverity}
                  </h3>

                </div>

              </div>

            </div>

            {/* REPORT SUMMARY */}
            <div
              className="
                bg-[#020817]

                border border-cyan-500/20

                rounded-3xl

                p-5

                shadow-2xl

                flex-1
              "
            >

              <h2
                className="
                  text-3xl

                  font-bold

                  text-white

                  mb-4
                "
              >
                Report Summary
              </h2>

              <p
                className="
                  text-cyan-200

                  leading-relaxed

                  text-sm
                "
              >
                {safeAnalysis?.prediction === "No Lesion Detected" ? (

                  `AI analysis indicates no visible Multiple Sclerosis lesions in the uploaded MRI scan. 
                  Brain tissue patterns appear normal with no abnormal white matter activity detected.
                  Lesion volume remains minimal and no clinically significant inflammatory regions were identified.`

                ) : (

                  `AI analysis detected ${safeAnalysis?.totalLesionsDetected} lesion(s) 
                  primarily located in the ${safeAnalysis?.primaryBrainRegion} region.
                  
                  The detected lesions show an estimated total lesion volume of 
                  ${safeAnalysis?.lesionVolume} mm³ with the largest lesion area measuring 
                  ${safeAnalysis?.largestLesionAreaPixels} pixels.
                  
                  Disease severity is currently classified as 
                  ${safeAnalysis?.diseaseSeverity}.
                  
                  Average lesion size is approximately 
                  ${safeAnalysis?.averageLesionSizePixels} pixels, suggesting ongoing 
                  white matter abnormality patterns associated with Multiple Sclerosis.
                  
                  Further neurological and radiological evaluation is recommended 
                  for clinical confirmation and treatment planning.`

                )}
              </p>

            </div>

          </div>

        </div>

        {/* STATISTICAL DATA SECTION */}
        <div
          className="
            bg-[#020817]

            border border-cyan-500/20

            rounded-3xl

            p-5

            shadow-2xl
          "
        >

          <h2
            className="
              text-2xl

              font-bold

              text-white

              mb-5
            "
          >
            Statistical Analysis
          </h2>

          <div
            className="
              grid grid-cols-1
              md:grid-cols-2
              xl:grid-cols-4

              gap-4
            "
          >

            {/* TOTAL LESIONS */}
            <div
              className="
                bg-[#0B1120]

                border border-cyan-500/20

                rounded-2xl

                p-5
              "
            >
              <p className="text-gray-400 text-sm">
                Total Lesions
              </p>

              <h3
                className="
                  text-3xl

                  font-bold

                  text-cyan-400

                  mt-3
                "
              >
                {safeAnalysis?.totalLesionsDetected}
              </h3>
            </div>

            {/* AVG SIZE */}
            <div
              className="
                bg-[#0B1120]

                border border-cyan-500/20

                rounded-2xl

                p-5
              "
            >
              <p className="text-gray-400 text-sm">
                Avg Lesion Size
              </p>

              <h3
                className="
                  text-3xl

                  font-bold

                  text-cyan-400

                  mt-3
                "
              >
                {safeAnalysis?.averageLesionSizePixels}
              </h3>
            </div>

            {/* LARGEST AREA */}
            <div
              className="
                bg-[#0B1120]

                border border-cyan-500/20

                rounded-2xl

                p-5
              "
            >
              <p className="text-gray-400 text-sm">
                Largest Lesion
              </p>

              <h3
                className="
                  text-3xl

                  font-bold

                  text-cyan-400

                  mt-3
                "
              >
                {safeAnalysis?.largestLesionAreaPixels}
              </h3>
            </div>

            {/* REGION */}
            <div
              className="
                bg-[#0B1120]

                border border-cyan-500/20

                rounded-2xl

                p-5
              "
            >
              <p className="text-gray-400 text-sm">
                Brain Region
              </p>

              <h3
                className="
                  text-lg

                  font-bold

                  text-cyan-400

                  mt-3
                "
              >
                {safeAnalysis?.primaryBrainRegion}
              </h3>
            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default ResultsPage;