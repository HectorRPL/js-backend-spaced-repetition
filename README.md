Correr el demonio de mongo

    Abrir una nueva consola y copiar/pegar esta linea:

    "C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe"

To start server:

    npm start
    
Importante para desarrollar localmente hay que añadir el nodemon al "start" en el package.json, ejemplo

      "scripts": {
        "start": "nodemon app.js",
        otras cosas ...
      }, 

No se ocurra darle commit, porque se va a heroku y vale madres, porque no puede encontarr el nodemon

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* 
* 
*   APUNTES EXTRA 
* 
* 
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  

Para crear un proyecto de node desde cero, se abre la carpeta y se ejecuta

    npm init

después casi todo es enter, enter, enter, excepto descripción, es buena idea colocar una descripción y el autor

Luego agregamso express con el comando:

    npm intall express --save
    
Una vez instalado se importa en el index.js, para el caso de este proyecto en app.js

