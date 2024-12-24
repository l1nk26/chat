const express = require("express");
const bodyParser = require("body-parser")
const dataBase = require("./dataBaseHandler");
const app = express();
const port = 3000;
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8000 });

// establece los archivos estaticos en la  carpeta public
app.use(express.static("./public"));

// Configura body-parser para analizar datos POST
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

let users_num = 0;
const users = new Map();

// determina la accion despues de recibir una conexion
wss.on('connection', ws => {
    console.log("usuario numero "+ (users_num + 1) +" conectado");
    users.set(`${users_num}`, ws);
    
    users_num++;

    ws.on('message', message => {
        console.log(`${message}`);
        for (const i of users) {
            if (i[1] == ws) {
                continue;
            }
            i[1].send(JSON.stringify( {user_name: i[0], text:`${message}`} ));
        }
    } );
    ws.on('close', () => {
        console.log("usuario desconectado")
    } );
} );

app.get('/', (req, res) => {
    res.sendFile(__dirname +'/public/login.html');
});

app.get('/sing-up.html', (req, res) => {
    res.sendFile(__dirname +'/public/register.html');
});

app.post("/register.html",(req, res) => {
    const {username} = req.body;
    const {password} = req.body;
    dataBase.appendUser(username, password).then(
        res.sendFile(__dirname + "/public/login.html")
    ).catch(console.error);
});

app.post('/chat.html', async (req, res) => {

    const {username} = req.body;
    const {password} = req.body;
    dataBase.getUserbyName(username).then( result => {
        console.log(result);
        if (result.length === 0) {
            res.send("usuario incorrecto");
        } else if (result[0].Password !== password) {
            res.send("contraseña incorrecta")
        } else {
            res.sendFile(__dirname + '/public/chat.html');
        }
    }
    ).catch(console.error);
    

});

app.listen(port, () => {
    console.log("servidor listo");
});