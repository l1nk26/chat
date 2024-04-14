const express = require("express");
const body = require("body-parser")
const app = express();
const port = 3000;
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8000 });

app.use(express.static("./public"));

let users_num = 0;
const users = new Map();

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

app.post('/chat.html', (req, res) => {
    console.log(req.body);

    res.sendFile(__dirname + '/public/chat.html');
});

app.listen(port, () => {
    console.log("servidor listo");
});