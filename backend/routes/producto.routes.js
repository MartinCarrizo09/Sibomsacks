import express from "express";
import productoService from "../services/productoService.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { pagina, limite } = req.query;
        const productos = await productoService.obtenerTodos({ pagina, limite});
        res.json(productos);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

router.get("/:id", async (req, res) => {
    try {
        const producto = await productoService.obtenerPorId(parseInt(req.params.id));
        if (!producto) return res.status(404).json({ error:"Juego no encontrado. "});
        res.json(producto);
    } catch(err) {
        res.status(500).json({ error: err.message});
    }
});

export default router;