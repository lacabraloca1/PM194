const Persona = [
    { nombre: "Ana", edad: 22},
    { nombre: "Luis", edad: 35},
    { nombre: "Maria", edad: 28}
]

const personaLuis = Persona.find(({ nombre }) => nombre === "Luis");
console.log(personaLuis);

Persona.forEach(({ nombre, edad }) => {
    console.log(`${nombre} tiene ${edad} años`);
});

const totalEdades = Persona.reduce((total, { edad }) => total + edad, 0);
console.log(`La suma de las edades es: ${totalEdades}`);                                                                                  