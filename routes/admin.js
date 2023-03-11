const express = require("express");

const adminController =require("../controllers/AdminController");

const router = express.Router();

router.get("/add-pelicula", adminController.GetAddPelicula);

router.post("/add-pelicula", adminController.PostAddPelicula);
router.get("/peliculas", adminController.GetAdminPeliculas);

router.get("/edit-pelicula/:peliculaId", adminController.GetEditPelicula); // route params , query params
router.post("/edit-pelicula", adminController.PostEditPelicula);

router.post("/delete-pelicula", adminController.DeletePelicula);

module.exports = router;