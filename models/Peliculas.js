const fs = require("fs");
const path = require("path");
const { v4 } = require('uuid');


const dataPath = path.join(
    path.dirname(require.main.filename),
    "data",
    "peliculasList.json"
  );

  const GetAllProductsFromFile = function (callBack) {
    fs.readFile(dataPath, function (error, data) {
      
      if (error) {
        callBack([]);
      } else {
        callBack(JSON.parse(data));
      }
    });
  };

module.exports = class Peliculas {
    constructor(id, title, imageUrl, genero, description,isActive) {
      this.id = id;
      this.title = title;
      this.imageUrl = imageUrl;
      this.genero = genero;
      this.description = description;
      this.isActive = isActive;
    }

    Save() {
        GetAllProductsFromFile((peliculas) => {
          if (this.id) {
            const editPeliIndex = peliculas.findIndex(
              (peli) => peli.id === this.id
            ); 
            peliculas[editPeliIndex] = this;
            fs.writeFile(dataPath, JSON.stringify(peliculas), (error) => {
              console.log(error);
            });
          } else {
            this.id = v4();
            peliculas.push(this);
            fs.writeFile(dataPath, JSON.stringify(peliculas), (error) => {
              console.log(error);
            });
          }
        });
      }


      static GetAll(cb) {
        GetAllProductsFromFile(cb);
      }

      static GetById(id, cb) {
        // console.log(id)
        GetAllProductsFromFile((pelis) => {
          const peliss = pelis.find((p) => p.id === id);
          cb(peliss);
        });
      }


      static Delete(id) {
        GetAllProductsFromFile((pelis) => {

          const peli = pelis.find((p) => p.id === id);    
          const newPelisList = pelis.filter((prod) => prod.id !== id);
    
          fs.writeFile(dataPath, JSON.stringify(newPelisList),  (error) => {
            console.log(error);
          });
        });
      }
      
}