import emailjs from "@emailjs/browser";

export const sendReportEmail = async (
  patientEmail,
  patientName,
  reportUrl,
  prediction,
  severity
) => {

  try {

    const response = await emailjs.send(
      "service_urep6my",
      "template_k56x1lb",
      {
        to_email: patientEmail,

        patient_name: patientName,

        report_link: reportUrl,

        prediction: prediction,

        severity: severity,
      },

      "BRQ_clHIMSCqSPU0T"
    );

    console.log("EMAIL SENT:", response);

    return response;

  } catch (error) {

    console.error("EMAIL ERROR:", error);

    throw error;
  }
};