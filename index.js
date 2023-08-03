import pg  from 'pg';


const client = new pg.Client({
    host: 'localhost',
    user: 'postgres',
    password: 'pipe1234',
    database: 'postgres',
    port: 5432
});

async function conectar() {
  try {
    await client.connect();
    console.log('Conexión a la base de datos establecida');
  } catch (error) {
    console.error('Error al conectar a la base de datos', error);
  }
}

// Función para agregar un nuevo estudiante
async function agregarEstudiante(id, nombre, rut, curso, nivel) {
    try {
      const query = `
        INSERT INTO estudiantes (id, nombre, rut, curso, nivel)
        VALUES ($1, $2, $3, $4, $5)
      `;
      const values = [id, nombre, rut, curso, nivel];
      await client.query(query, values);
      console.log('Estudiante', nombre, 'Agregado con éxito');
    } catch (error) {
      console.error('Error al agregar el estudiante', error);
    }
  } //esta funcion esta bien
  
  // Función para consultar todos los estudiantes
  async function consultarEstudiantes() {
    try {
      const result = await client.query('SELECT * FROM estudiantes');
      console.log('Registro actual', result.rows);
    } catch (error) {
      console.error('Error al consultar los estudiantes', error);
    }
  }   //esta funcion esta bien
  
  // Función para consultar un estudiante por rut
  async function consultarEstudiantePorRut(rut) {
    try {
      const query = 'SELECT * FROM estudiantes WHERE rut = $1';
      const result = await client.query(query, [rut]);
      console.log(result.rows);
    } catch (error) {
      console.error('Error al consultar el estudiante', error);
    }
  }
  
  // Función para editar los datos de un estudiante
  async function editarEstudiante(id, nombre, rut, curso, nivel) {
    try {
      const query = `
        UPDATE estudiantes
        SET nombre = $2, curso = $3, nivel = $4
        WHERE rut = $1
      `;
      const values = [rut, nombre, curso, nivel];
      await client.query(query, values);
      console.log('Estudiante', nombre, 'editado con éxito');
    } catch (error) {
      console.error('Error al editar el estudiante', error);
    }
  }
  
  // Función para eliminar un estudiante por rut
  async function eliminarEstudiantePorRut(rut) {
    try {
      const query = 'DELETE FROM estudiantes WHERE rut = $1';
      await client.query(query, [rut]);
      console.log('Registro de estudiante con rut', rut, 'eliminado');
    } catch (error) {
      console.error('Error al eliminar el estudiante', error);
    }
  }
  
  // Aca manejamos los comandos de la línea de comandos
async function main() {
  await conectar();

  const command = process.argv[2];

  switch (command) {
    case 'nuevo':
      const nuevoArgs = process.argv.slice(3);
      await agregarEstudiante(...nuevoArgs);
      break;
    case 'consulta':
      await consultarEstudiantes();
      break;
    case 'editar':
      const editarArgs = process.argv.slice(3);
      await editarEstudiante(...editarArgs);
      break;
    case 'rut':
      const rutArg = process.argv[3];
      await consultarEstudiantePorRut(rutArg);
      break;
    case 'eliminar':
      const eliminarArg = process.argv[3];
      await eliminarEstudiantePorRut(eliminarArg);
      break;
    default:
      console.log('Comando no reconocido');
      break;
  }

  await client.end();
}

// Ejecutar la aplicación
main().catch((error) => console.error('Error en la aplicación', error));