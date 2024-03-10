const express = require("express");
const mysql = require("mysql");

// Crear una conexión a la base de datos
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Temporal2021+",
  database: "persona",
});

// Establecer la conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos: ", err);
    return;
  }
  console.log("Conexión exitosa a la base de datos");
});

// Crear una instancia de la aplicación Express
const app = express();

// Endpoint GET para obtener los datos de la tabla persona
app.get("/personas", (req, res) => {
  const query = "SELECT * FROM persona";

  // Ejecutar la consulta a la base de datos
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta: ", err);
      res
        .status(500)
        .json({ error: "Error al obtener los datos de la tabla persona" });
      return;
    }

    // Enviar los resultados en formato JSON al navegador web
    res.json(results);
  });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
