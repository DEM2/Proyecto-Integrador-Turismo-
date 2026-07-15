import dotenv from "dotenv";
import app from "./app.js"
import pool from "./config/db.js"

dotenv.config()

const PORT = process.env.PORT || 3000;

async function startserver(){
  try{
    const result = await pool.query("SELECT NOW()")
    console.log("PostgreSQL conectado correctamente.");
    console.log("Hora de PostgreSQL:", result.rows[0].now);

    app.listen(PORT, ()=>{
      console.log(`Servidor ejecutandose en http://localhost:${PORT}`)
      
    } );
  }catch (error) {
  console.error(" Error al conectar con la base de datos:", error);
}
}

startserver()


/*import dotenv from "dotenv";
import app from "./app.js";
import pool from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await pool.query("SELECT NOW()");

    console.log(" PostgreSQL conectado.");

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(" Error al conectar con la base de datos:", error);
  }
}

startServer();*/