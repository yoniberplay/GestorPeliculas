const express = require("express");
const path = require("path");

const router = express.Router();

const peliculaController = require("../controllers/peliculaController");

router.get("/", peliculaController.GetIndex);
router.get("/peliculas", peliculaController.GetPeliculas);
router.get("/peliculas/:peliculaId", peliculaController.GetPelicula);
router.get("/peliculas/bygenero/:genero", peliculaController.GetPeliculabygenero);
// router.get("/orders", peliculaController.GetOrders);
// router.get("/cart", peliculaController.GetCart);
router.get("/checkout", peliculaController.GetCheckout);



module.exports = router;