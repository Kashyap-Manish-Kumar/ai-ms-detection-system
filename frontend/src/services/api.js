import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const getPatients = () => API.get("/patients");

export const createPatient = (data) =>
  API.post("/patients", data);

export const deletePatient = (id) =>
  API.delete(`/patients/${id}`);

export const runAnalysis = (patientId) =>
  API.post(`/analysis/run/${patientId}`);

export const getAnalyses = () =>
  API.get("/analysis");