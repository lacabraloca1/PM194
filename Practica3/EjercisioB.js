function verificarUsu (usuario){
   return new Promise((resolve, reject) => {
       if (usuario === 'admin') {
           resolve('Acceso concedido');
       } else {
           reject('Acceso denegado');
       }
   });
}

verificarUsu('admin')
    .then((mensaje) => {
         console.log(mensaje);
    })
    .catch((error) => {
         console.log(error);
    });

verificarUsu('VICTOR')
    .then((mensaje) => {
         console.log(mensaje);
    })
    .catch((error) => {
         console.log(error);
    });