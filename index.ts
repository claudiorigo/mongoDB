import mongoose, { ConnectOptions } from 'mongoose';
import Server from './classes/server';

import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import userRoutes from './routes/usuario';
import postRoutes from './routes/post';

const server = new  Server();

//Body parser / va a actualizar los posteos los post, patch
server.app.use( bodyParser.urlencoded({extended: true}) );
server.app.use( bodyParser.json() );

//FileUpload
server.app.use( fileUpload() );
//En caso que al subir la imagen el resultado es una imagen con 0 bits
//server.app.use( fileUpload( useTempFiles: true ) );

//Rutas de mi app
server.app.use( '/user', userRoutes );
server.app.use( '/posts', postRoutes );

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


