import Server from './classes/server';
import userRoutes from './routes/usuario';
import mongoose, { ConnectOptions } from 'mongoose';
import bodyParser from 'body-parser';

const server = new  Server();

//Body parser / va a actualizar los posteos los post, patch
server.app.use( bodyParser.urlencoded({extended: true}) );
server.app.use( bodyParser.json() );

//Rutas de mi app
server.app.use('/user', userRoutes);

//Conectar DB MongoDB
mongoose.connect('mongodb://localhost:27017/fotosgram', 
                {useNewUrlParser: true, useUnifiedTopology: true} as ConnectOptions , ( err ) => {    
    if( err ) throw err;
    console.log( "Base de datos ONLINE" );
})

//Levantar express
server.start( () => {
    console.log(`Servidor corriendo en el puerto ${ server.port }.`);
});


