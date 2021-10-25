import { Router , Request, Response} from 'express';
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';

const userRoutes = Router();

//Login

userRoutes.post('/login', ( req: Request, res: Response ) => {

    const body = req.body;
    //Usuario.findOne({ email: body.email }, (err , userDB) => {
    //Usuario.findOne({ email: body.email }, (err: any , userDB: { compararPassword: (arg0: any) => any; }) => {
    Usuario.findOne({ email: body.email }, (err: any , userDB: { compararPassword: (argument: any) => any; _id: any; nombre: any; email: any; avatar: any; }) => {

        if ( err ) throw err;

        if ( !userDB ) {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos'
            });
        }

        if ( userDB.compararPassword( body.password ) ) {

            const tokenUser = Token.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });

            res.json({
                ok: true,
                token: tokenUser
            });
        } else {
            
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos ****'
            });
        }
        
    });

});


//Crear un Usuario
userRoutes.post('/create', (req: Request, res: Response) => {

    const user = {
        nombre   : req.body.nombre,
        avatar   : req.body.avatar,
        email    : req.body.email,
        password : bcrypt.hashSync(req.body.password, 10)
    };

    Usuario.create( user ).then( userDB => {

        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });

        res.json({
            ok: true,
            token: tokenUser
        });
        /* este es para enviar los datos del Usuario pero usaremos el token
        res.json({
            ok: true,            
            user: userDB
        });
        */

    }).catch( err => {
        res.json({
            ok: false,
            err
        });
    });

    //localhost:3000/user/prueba → para doder probar en GET por Postman
    /*
    userRoutes.get('/prueba', (req: Request, res: Response) => {
        res.json({
            ok: true,
            mensaje: 'Todo funciona bien!!'
        });

    });
    */

    /*
    res.json({
        ok: true,
        //mensaje: 'Todo funciona bien!!'
        // user : user → seria lo mismo que agregar esta sintaxy
        user
    });
    */

});

//Actualizar Usuario
userRoutes.post('/update',  verificaToken, ( req: any, res: Response ) => {

    const user = {
        nombre : req.body.nombre || req.usuario.nombre,
        email  : req.body.email  || req.usuario.email,
        avatar : req.body.avatar || req.usuario.avatar
    }

    Usuario.findByIdAndUpdate( req.usuario._id, user, { new: true }, ( err, userDB ) => {

        if ( err ) throw err;

        if ( !userDB ){
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }

        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });

        res.json({
            ok: true,
            token: tokenUser
        });

    });
   
});

export default userRoutes;