


export interface FileUpload {

    name: string;
    data: any;
    size: 30264;
    encoding: string;
    tempFilePath: string;
    truncated: boolean;
    mimetype: string;
    md5: string;

    //crear para que no de error al traspasar la imagen a temp
    mv: Function;
}

/*
"name": "img_01.jpg",
"data": {
    "type": "Buffer",
    "data": [120,11,0,450]
},
"size": 30264,
"encoding": "7bit",
"tempFilePath": "",
"truncated": false,
"mimetype": "image/jpeg",
"md5": "6e3523e3ffc197a27b7bd2121f2a1271"
*/