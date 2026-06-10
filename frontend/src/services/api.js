import axios from "axios";

const api = axios.create({
  baseURL: "https://talentiq-ai-backend.onrender.com",
});

export default api;