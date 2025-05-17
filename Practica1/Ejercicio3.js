/*Crea una arrow funtion llamada saludoPerzonalizado que reciba dos
parametros nombre y edad , y retorne una cadena como la siguinete*/

// "Hola , me llamo Isay y tengo 37 años"

const saludoPerzonalizado = (nombre, edad) => { 
    return `Hola, me llamo ${nombre} y tengo ${edad} años`;
}

console.log(saludoPerzonalizado("Victor", 21));