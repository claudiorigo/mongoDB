* Despues de instalar MongoDB abrimos el powershell y navegamos a carpeta de proyecto mongoDb
* CREANDO EL ARCHIVO package.jason en el directorio del proyecto
* Estamos creando el package.json el cual contendra toda la información de como trabajara esta aplicación
> npm init
* Sugiere el mismo nombre del proyecto, lo dejamos asi precionamos Enter
> version: (1.0.0) 		Enter
> Description: 			Enter
> entry point: (index.js)	Enter (aunque luego lo cambiaremos precionamos Enter)
> test command: 		Enter
> git repository:		Enter
> keywords:			Enter
> author:			Enter
> license:			Enter
About to write to C:\Users\RIGOLLET-NB\Documents\ionic\mongoDb\package.json:
{
  "name": "mongodb",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


> Is this OK? (yes)		Enter
* Al final quedaremos en la ruta del proyecto, en todos los casos solo dejamos por defecto con Enter
* Con esto nos creamos un package.json en el directorio del proyecto y luego nos queda abrir con vscode
----------------------------------------------------------------------------------------------------------
* Una vez dentro de vscode creamos el archivo index.ts este sera el archivo inicial de todo mi servidor agregamos un console.log('Hola Mundo');
* para usar tsc o comandos TypeScript es necesario instalar
> npm install typescript -g
* Y si la última versión 4.4.4 está instalada correctamente puedo verificarlo mirando la ruta que se muestra siguiendo el comando:
> npm list typescript -g
* Y para verificar la Versión
> tsc -v
* Para test un archivo TypeScript TS usamos el siguiente comando
> tsc index.ts 
* Crea archivo index.js en el mismo directorio, luego lo leemos con node:
> node index.js
* Para no estar usando el mismo comando de crear el index.js desde el index.ts usaremos el siguiente comando que creara el archivo tsconfig.json:
> tsc --init
* Ahora escribimos el siguiente comando para que entre en modo observador TypeScript y realice cualquier tipo de cambios:
> tsc -w
* Abrimos otra terminal con el mismo directorio del proyecto y agregamos el siguiente comando para que este a la escucha de nuevos cambios:
https://nodemon.io/
> npm install -g nodemon
* despues de instalar el paquete de nodemon lo ejecutamos
> nodemon dist
-----------------------------------------------------------------------------------------------------------
* Las nuevas instalacioes que haremos pueden ser en la primera que es una sola linea de codigo o instalar una por una, acontinuación detallare:
> npm install express body-parser cors mongoose express-fileupload jsonwebtoken bcrypt

> npm install express			Permite crear un servidor web y tambien tiene todo lo necesario para montar un servidor REST
> npm install body-parser		Permitira recibir la información que viene de cors, cuando creemos un nuevo post o subamos información, me permite tomar la información del POST y transformarla en un objeto javascript que me permita trabajar tranquilamente en el lado de node
> npm install cors			Para asegurarme que pueda hacer peticiones cros no mail
> npm install mongoose			Trabajar con el modelado de datos del lado de node y me permite hacer las interacciones directamene con la bd
> npm install express-fileupload	Me permitira recir las peticiones de imagenes que voy a postear en mi aplicación de Ioni
> npm install jsonwebtoken		Es para la autenticación de mi app vamos a crear unos web token, para mantener de forma pasiva el estado de la sesión del usurio
> npm install bcrypt			Es para inscriptar las contraseñas de los usuarios y hacer seguras las password.

* Ejecutar los comandos ya utiliados para dejar en escucha los cambios.
> tsc -w		activar servicio de escucha
> nodemon dist/		activar update de la carpeta en tiempo de ejecución, del archivo por defecto index.js
* Crear nueva carpeta "classes" donde guardaremos las clases y dentro un archivo "server.ts" para crear configuración de servidor GET,POST
* Paralas lineas de comando dentro del archivo "server.ts" si muestran error en su sintaxis, aplicamos la recomendación de la instalación que da en el error. es una dependencia de desarrollo
* quere decir que cuando uno pase todo el servidor a producción, todas las dependencia de desrrollo no son necesarias para la aplicación no para correrla.
> npm i --save-dev @types/express
* Crear carpeta "routes" o rutas y dentro el archivo "usuario.ts" este archivo se encargara de definir las rutas que tengan que ver con el usuario ya sea el login, crear nuevo usuario.
----------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------
* Subir el server virtual en escucha
> tsc -w
> nodemon dist
----------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------
* Para crear el metodo //Conectar DB MongoDB puede crear error en import el 'mongoose' y usamos este comando para que TypeScript reconozca sintaxy
> npm i --save-dev @types/mongoose
* Para usar la encriptación de la password import "bcrypt" y si da error ver el comentario su instalacion TypeScript.
> npm i --save-dev @types/bcrypt
* Para agregar en "token.ts" el import de json web token
> npm i --save-dev @types/jsonwebtoken
