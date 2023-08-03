// La escuela de música Always Music es reconocida en la ciudad por graduar a grandes músicos de reconocimiento
// mundial, sin embargo, a pesar de lo mucho que ha crecido con el tiempo, nunca dejaron de utilizar excel como base
// de datos y han decidido cambiar esto por un desarrollo personalizado.
// En este desafío deberás desarrollar una aplicación en Node que realice consultas a Base de Datos (usada en el
// correspondiente Reading) con el paquete para:
//  Agregar un nuevo estudiante.
//  Consultar los estudiantes registrados.
//  Consultar estudiante por rut.
//  Actualizar la información de un estudiante.
//  Eliminar el registro de un estudiante.
// Ya que el caso se trata de un proceso de desarrollo, la interacción la debes realizar con argumentos por la línea de
// comandos.
// Antes de iniciar este desafío deberás crear una base de datos y una tabla con las siguientes columnas:
//  Nombre
//  Rut
//  Curso
//  Nivel
// Usa las siguientes imágenes como referencia de lo que debes lograr en el desarrollo de este desafío.

import pg from 'pg';

const client = new pg.Client({
    host: 'localhost',
    user: 'postgres',
    password: 'pipe1234',
    database: 'postgres',
    port: 5432
});

client.connect();

client.query("SELECT * FROM estudiantes", (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log(res.rows);
    }
    client.end(); // Cerrar la conexión después de la consulta
});


