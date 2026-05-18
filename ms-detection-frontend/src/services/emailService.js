import emailjs from "@emailjs/browser";

export const sendReportEmail = async (
  patientEmail,
  patientId,
  reportUrl
) => {

  try {

    const response = await emailjs.send(
      "service_urep6my",
      "template_k56x1lb",
      {
        to_email: patientEmail,
        patient_id: patientId,
        report_url: reportUrl,
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