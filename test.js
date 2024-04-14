let start = 25;
let matriz = new Array(4).fill("").map(() => {
    start -= 5;
    return new Array(5).fill("").map((x ,i) => start - i);
});;

const mostrar = () => {
    matriz.forEach((i) => console.log(i));
}
mostrar();

const recorrido = (matriz, filas, columnas, i) => {
    let aux;
    if (filas == 0 && i == 0) {
        aux = matriz[0][0];
    } else if (i == 0) {
        aux = matriz[filas][i] + recorrido(matriz, filas-1, columnas, columnas);
    } else if (i <= columnas) {
        aux = matriz[filas][i] + recorrido(matriz, filas, columnas, i-1);
    } else {
        aux = -1;
    }
    return aux;
};

console.log(`resultado de suma = ${recorrido(matriz, 3, 4, 4)}`)