import pg from 'pg';

const client = new pg.Client({
  host: 'localhost',
  user: 'postgres',
  password: 'pipe1234',
  database: 'postgres',
  port: 5432
});

client.connect();

const id = process.argv[2];  //para que funcionara le agregue la id, la otra opcion era borrar la tabvla y crearla de nuevo
const nombre = process.argv[3];
const rut = process.argv[4];
const curso = process.argv[5];
const nivel = process.argv[6];

client.query("INSERT INTO estudiantes (id, nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4, $5)", [id, nombre, rut, curso, nivel], (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log("registro insertado");
  }
  client.end(); // Cerrar la conexión después de la consulta
});

//para que funcionara debi colocar asi en la consola
