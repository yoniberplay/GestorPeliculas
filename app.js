const express = require("express");
const path = require("path");
const app = express();
const { engine } = require("express-handlebars");

const homeRouter = require("./routes/home");
const errorController = require("./controllers/ErrorController");

//? render engine configuration
app.engine(
  "hbs",
  engine({
    layoutsDir: "views/layouts/",
    defaultLayout: "main-layout",
    extname: "hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "views");

// Convertir la data recibida por post en un json
app.use(express.urlencoded({ extended: false }));
//Hacer los datos de la dentro de la carpeta public publicos
app.use(express.static(path.join(__dirname, "public")));

//Mejor manejo de rutas
app.use(homeRouter.Router);


// app.use((req, res, next) => {
//   res.status(404).render("404", { layout: false, title: "404 page not found" });
// });

app.use("/", errorController.Get404);

app.listen(3000);
