export const sleep = (ms: number = 1000) => {
    return new Promise ((resolve) => setTimeout(resolve, ms))
}


//este componente hace que el poceso es actualizacion del producto sea mas lento
//para que se pueda apreciar en la pantalla la notificacion del toast de que esta bien o hubo un error
