const fs = require("fs");
const path = require("path");

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
        //console.log(JSON.parse(data));
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
        GetAllProductsFromFile((products) => {
          if (this.id) {
            const editProductIndex = products.findIndex(
              (prod) => prod.id === this.id
            );
    
            products[editProductIndex] = this;
            fs.writeFile(dataPath, JSON.stringify(products), function (error) {
              console.log(error);
            });
          } else {
            this.id = Math.random().toString();
            products.push(this);
            fs.writeFile(dataPath, JSON.stringify(products), function (error) {
              console.log(error);
            });
          }
        });
      }


      static GetAll(cb) {
        GetAllProductsFromFile(cb);
      }



}