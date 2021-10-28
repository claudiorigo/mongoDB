"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = __importDefault(require("./classes/server"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const post_1 = __importDefault(require("./routes/post"));
const server = new server_1.default();
//Body parser / va a actualizar los posteos los post, patch
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//FileUpload
server.app.use((0, express_fileupload_1.default)());
//En caso que al subir la imagen el resultado es una imagen con 0 bits
//server.app.use( fileUpload( useTempFiles: true ) );
//Rutas de mi app
server.app.use('/user', usuario_1.default);
server.app.use('/posts', post_1.default);
//Conectar DB MongoDB
mongoose_1.default.connect('mongodb://localhost:27017/fotosgram', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err)
        throw err;
    console.log("Base de datos ONLINE");
});
//Levantar express
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}.`);
});
