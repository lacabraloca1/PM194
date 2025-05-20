const persona = {
    nombre: "Victor",
    edad: 21,
    dereccion: {
        ciudad: "Queretaro",
        pais: "Mexico",
    }
};

const { nombre, edad, dereccion: { ciudad, pais } } = persona;

console.log(`Hola, mi nombre es ${nombre}, tengo ${edad} años y vivo en ${ciudad}, ${pais}`);