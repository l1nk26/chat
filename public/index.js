const agregar_mensaje = (mensaje, tipo) => {
    const body = document.getElementsByTagName('body')[0];
    const container = document.createElement('div');
    const new_element = document.createElement('p');
    
    container.className = "text-container"
    if (tipo == "recibido") {
        new_element.className = "mensaje";
    } else if (tipo == "enviado") {
        new_element.className = "mensaje-enviado";
    }

    body.appendChild(container);
    container.appendChild(new_element);
    new_element.innerHTML = `${mensaje.user_name}:<br><br>${mensaje.text}`;
};

const boton = document.getElementById("boton");
const texto = document.getElementById("texto");

// conectando con el web socket del servidor
const socket = new WebSocket("ws:localhost:8000");

socket.onopen = event => {
    
    socket.onmessage = message => {

        message = JSON.parse(message.data);

        agregar_mensaje(message, "recibido");
    }

    boton.addEventListener('click',() => {
        agregar_mensaje({user_name:'yo', text:`${texto.value}`}, "enviado");
        socket.send(`${texto.value}`);
        texto.value = "";
    } );
}