import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";
import dotenv from 'dotenv/config';

const app = express();

//conectando con la base de datos
db.authenticate()
  .then(() => console.log("Base de datos conectada"))
  .catch((error) => console.log(error));

//Definir puerto
const PORT = process.env.PORT || 4000;

//habilitar pug
app.set("view engine", "pug");

//habilitar año actual
app.use((req, res, next) => {
  const year = new Date();
  res.locals.actualYear = year.getFullYear();
  res.locals.nombresitio = "Agencia de viajes";
  next();
});
//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

//Definir la carpeta public
app.use(express.static("public"));

//Agregar router
app.use("/", router);

//escuchando el puerto
app.listen(PORT, () => {
  console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});
