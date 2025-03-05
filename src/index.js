import app from './server.js'
import connection from './database.js'


const IniciarServidor = async () => {
    try {
        await connection(); // conexion a la base de datos        
        app.listen(app.get('port'),()=>{
            console.log(`El servidor se está ejecutando http/localhost:${app.get('port')}`)
        })
    } catch (error) {
        console.error('Error al inicializar servidor:', error);
    }
}

IniciarServidor();


