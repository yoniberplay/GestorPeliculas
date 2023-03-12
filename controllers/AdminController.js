const Peliculas = require("../models/Peliculas");

exports.GetAddPelicula = (req, res, next) => {
  res.render("admin/save-peliculas", {
    pageTitle: "Add Pelicula",
    AddPeliculatActive: true,
    editMode: false,
  });
};

exports.GetAdminPeliculas = (req, res, next) => {
  Peliculas.GetAll( (peliculas) => {
    res.render("admin/peliculas-list", {
      pageTitle: "Admin peliculas",
      AdminPeliculasActive: true,
      peliculas: peliculas,
      hasPeliculas: peliculas.length > 0,
    });
  });
};

exports.PostAddPelicula = (req, res, next) => {
  const title = req.body.Title;
  const image = req.body.ImageUrl;
  const genero = req.body.genero;
  const description = req.body.Description;
  const isActive = true;

  const peliculas = new Peliculas(null, title, image, genero, description,isActive);
  peliculas.Save();

  res.redirect("/");
};

exports.GetEditPelicula = (req, res, next) => {
  const peliculaId = req.params.peliculaId;
  const edit = req.query.edit;

  if (!edit) {
    return res.redirect("/");
  }

  Peliculas.GetById(peliculaId, (pelis) => {  
    res.render("admin/save-peliculas", {
      pageTitle: "Editar Pelicula",
      editMode: edit,
      pelicula: pelis,
    });
  });
};

exports.PostEditPelicula = (req, res, next) => {
  const id = req.body.peliculaId;
  const title = req.body.Title;
  const image = req.body.ImageUrl;
  const genero = req.body.genero;
  const description = req.body.Description;
  const isActive = req.body.isActive;

  const isTrueSet = (isActive === 'true');

  const pelicula = new Peliculas(id,title,image,genero,description,isTrueSet ? isTrueSet : false);
  pelicula.Save();

  res.redirect("/admin/peliculas");
};

exports.DeletePelicula = (req, res, next) => {
  const id = req.body.peliculaId;
  Peliculas.Delete(id);

  res.redirect("/admin/peliculas");
};
