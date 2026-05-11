import { useState } from "react";
import { runAnalysis } from "../services/api";

function Analysis() {

  const [patientId, setPatientId] = useState("");
  const [result, setResult] = useState(null);

  const handleRun = async () => {

    const res = await runAnalysis(patientId);

    setResult(res.data);

  };

  return (

    <div>

      <h2>Run MRI Analysis</h2>

      <input
        placeholder="Patient ID"
        onChange={(e) => setPatientId(e.target.value)}
      />

      <button onClick={handleRun}>
        Run Analysis
      </button>

      {result && (

        <div style={{
          marginTop: "20px",
          padding: "20px",
          background: "#e6f7ff",
          borderRadius: "10px",
          width: "400px"
        }}>

          <h3>Analysis Result</h3>

          <p><b>Patient:</b> {result.analysis.patient_id}</p>

          <p><b>Slices Analyzed:</b> {result.analysis.slices_analyzed}</p>

          <p><b>Lesion Slices:</b> {result.analysis.lesion_slices}</p>

          <p><b>Total Lesion Pixels:</b> {result.analysis.total_lesion_pixels}</p>

          <p><b>Lesion Volume:</b> {result.analysis.volume_mm3} mm³</p>

          <a
            href={`http://localhost:8000/${result.analysis.report_path}`}
            target="_blank"
            rel="noreferrer"
          >
            Download Report
          </a>

        </div>

      )}

    </div>

  );
}

export default Analysis;