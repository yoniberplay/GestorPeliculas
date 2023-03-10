const PeliculasModel = require("../models/Peliculas");

exports.GetIndex = (req, res, next) => {
  //arrow functions
  PeliculasModel.GetAll((peliculas) => {
    res.render("peliculas/index", {
      pageTitle: "Peliculas",
      peliculas: peliculas,
      hasPeliculas: peliculas.length > 0,
      peliculaActive: true,
    });
  });
};

exports.GetPeliculas = (req, res, next) => {
  //arrow functions
  PeliculasModel.GetAll(function (peliculas) {
    res.render("peliculas/product-list", {
      pageTitle: "Peliculas",
      peliculas: peliculas,
      hasPeliculas: peliculas.length > 0,
      peliculaActive: true,
    });
  });
};

// exports.GetCart = (req, res, next) => {
//   //arrow functions
//   res.render("shop/cart", {
//     pageTitle: "Cart",
//     CartActive: true,
//   });
// };

// exports.GetOrders = (req, res, next) => {
//   //arrow functions
//   res.render("shop/orders", {
//     pageTitle: "Orders",
//     OrdersActive: true,
//   });
// };

// exports.GetCheckout = (req, res, next) => {
//   //arrow functions
//   res.render("shop/checkout", {
//     pageTitle: "Checkout",
//     CartActive: true,
//   });
// };

exports.GetPelicula = (req, res, next) => {
  const peliculaId = req.params.peliculaId;

  //arrow functions
  PeliculasModel.GetById(peliculaId, (pelicula) => {
    res.render("peliculas/pelicula-details", {
      pageTitle: "Detalles Pelicula",
      peliculas: pelicula,
      peliculaActive: true,
    });
  });
};
