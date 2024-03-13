const express = require("express");
const mysql = require("mysql");

// Crear un pool de conexiones a la base de datos
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "strong_password",
  database: "persona",
  port: 33060,
});

// Establecer la conexión a la base de datos
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error al conectar a la base de datos: ", err);
    return;
  }
  console.log("Conexión exitosa a la base de datos");
  connection.release(); // Liberar la conexión
});

// Crear una instancia de la aplicación Express
const app = express();

// Endpoint GET para obtener los datos de la tabla persona
app.get("/personas", (req, res) => {
  const query = "SELECT * FROM persona";

  // Obtener una conexión del pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error al obtener una conexión del pool: ", err);
      res
        .status(500)
        .json({ error: "Error al obtener los datos de la tabla persona" });
      return;
    }

    // Ejecutar la consulta a la base de datos
    connection.query(query, (err, results) => {
      connection.release(); // Liberar la conexión

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
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
