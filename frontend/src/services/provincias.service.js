import axios from "./axios.config.js";

const obtenerTodos = async () => {
  const response = await axios.get("/api/provincias");
  return response.data;
};

export default {
  obtenerTodos
}