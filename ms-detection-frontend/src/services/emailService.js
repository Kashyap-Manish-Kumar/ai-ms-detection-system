import API from "../api/axios";

export const sendReport = async (analysisId) => {

  return await API.post(
    `/analysis/send-report/${analysisId}`
  );

};