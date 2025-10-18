import express from "express";
import SectoresService from "../services/sectoresService.js"; // Ajustá la ruta si es diferente

const router = express.Router();
// const sectoresService = new SectoresService();

// GET /sectores — usado para el <select>
router.get("/", async (req, res) => {
  try {
    const sectores = await SectoresService.obtenerOpcionesParaSelect();
    res.json(sectores);
  } catch (error) {
    console.error("Error al obtener sectores:", error.message);
    res.status(500).json({ error: "Error al obtener los sectores" });
  }
});

export default router;