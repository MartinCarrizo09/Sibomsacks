import express from "express";
import ProvinciasService from "../services/provinciasService.js"; // Ajustá la ruta si es diferente

const router = express.Router();
// const provinciasService = new ProvinciasService();

// GET /provincias — usado para el <select>
router.get("/", async (req, res) => {
  try {
    const provincias = await ProvinciasService.obtenerOpcionesParaSelect();
    res.json(provincias);
  } catch (error) {
    console.error("Error al obtener provincias:", error.message);
    res.status(500).json({ error: "Error al obtener las provincias" });
  }
});

export default router;