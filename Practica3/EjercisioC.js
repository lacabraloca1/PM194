function simularPeticionApi(){
    return new Promise((resolve => {
        setTimeout(() => {
            resolve("Datos Recibidos Correctamente");
        }, 5000);
    }));
}

async function obtenerDatos(){
    console.log("Iniciando la peticion a la API");
    const datos = await simularPeticionApi();
    console.log(datos);
}

function iniciar(){
    obtenerDatos();
}

iniciar();
