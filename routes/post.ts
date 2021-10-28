import { Router, Response } from 'express';
import { FileUpload } from '../interfaces/file-upload';
import { verificaToken } from '../middlewares/autenticacion';
import { Post } from '../models/post.model';
import FileSystem from '../classes/file-system';


const postRoutes = Router();
const fileSystem = new FileSystem();

//Obtener POSTS paginados
postRoutes.get( '/', async (req: any, res: Response) => {

    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina -1;
    skip = skip * 10;

    const posts = await Post.find()
                            .sort({ _id: -1 })
                            .limit(10)
                            .skip( skip )
                            .populate('usuario', '-password')
                            .exec();

    res.json({
        ok: true,
        pagina,
        posts
    });

});


//Crear POSTS con usuario
postRoutes.post( '/', [verificaToken], (req: any, res: Response) => {
    
    const body = req.body;
    body.usuario = req.usuario._id;
    
    const imagenes = fileSystem.imagenesDeTempHaciaPost( req.usuario._id );
    body.imgs = imagenes;

    Post.create( body ).then( async postDB => {

        await postDB.populate('usuario', '-password');

        res.json({
            ok: true,
            post: postDB
        });

    }).catch( err => {
        res.json(err);
    });

});

// Servicio para subir archivos
postRoutes.post( '/upload', [ verificaToken ], async ( req: any, res: Response ) => {

    if ( !req.files ){
        return res.status( 400 ).json({
            ok: false,
            mensaje: 'No se subió ningún archivo'
        });
    }

    const file: FileUpload = req.files.image;
    //console.log(file);
    if ( !file ){
        return res.status( 400 ).json({
            ok: false,
            mensaje: 'No se subió ningún archivo - image'
        });
    }

    if ( !file.mimetype.includes('image') ){
        return res.status( 400 ).json({
            ok: false,
            mensaje: 'Lo que subió no es una imagen'
        });
    }

    await fileSystem.guardarImagenTemporal( file, req.usuario._id );

    res.json({
        ok: true,
        file: file.mimetype
    });

});

postRoutes.get('/imagen/:userid/:img', (req: any, res: Response) => {

    const userId = req.params.userid;
    const img = req.params.img;

    const pathFoto = fileSystem.getFotoUrl( userId, img );
    //para enviar la imagen integra
    res.sendFile( pathFoto );
    /*
    para enviar el json 
    res.json({
        userId, img
    })
    */
});

export default postRoutes;