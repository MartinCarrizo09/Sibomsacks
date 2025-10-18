import axios from "./axios.config.js";

const obtenerTodos = async () => {
  const response = await axios.get("/api/productos");
  return response.data;
};

const obtenerPorId = async (id) => {
  const response = await axios.get(`/api/productos/${id}`);
  return response.data;
};

export default {
  obtenerTodos,
  obtenerPorId,
}