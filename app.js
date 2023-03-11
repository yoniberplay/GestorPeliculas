const express = require("express");
const path = require("path");
const app = express();
const { engine } = require("express-handlebars");

const errorController = require("./controllers/ErrorController");
const adminRouter = require("./routes/admin");
const peliRouter = require("./routes/pelicula");

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
app.use("/admin",adminRouter);
app.use(peliRouter);

app.use("/", errorController.Get404);

app.listen(3000);

