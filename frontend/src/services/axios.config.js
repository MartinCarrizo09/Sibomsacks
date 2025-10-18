import axios from "axios";

const instancia = axios.create({
  headers: {
    "Content-Type": "application/json"
  }
});

export default instancia;
