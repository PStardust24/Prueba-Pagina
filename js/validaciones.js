export function valida(input) {
    const tipoDeInpunt = input.dataset.tipo;
    if (validadores[tipoDeInpunt]) {
        validadores[tipoDeInpunt](input);
    }

    //Accediendo al padre del elemento
    //console.log(input.parentElement);
    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInpunt,input);
    }
};

const mensajesDeError = {
    nombre: {
        valueMissing: "El nombre no puede estar vacio"
    },
    email: {
        valueMissing: "Debe colocar un correo",
        typeMismatch:"El correo no es valido"
    },
    password: {
        valueMissing: "La contraseña no puede estar vacia",
        patternMismatch : "AL menos 8 caracteres, máximo 15, debe contener una letra minúscula, una letra mayúscula, un número y un caracter especial"
    },
    numero: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 números"
    },
    nacimiento: {
        valueMissing: "Debe colocar su fecha de nacimiento",
        customError: "Debes tener al menos 18 años de edad para poder regitrarte"
    },
    direccion: {
        valueMissing: 'Debe ingresar una dirección',
        patternMismatch:'Formato incorrecta'
    },
    ciudad: {
        valueMissing : 'Debe seleccionar la Ciudad',
        patternMismatch: 'No se encuentra en el listado de paises'
    },
    estado: {
        valueMissing: "Debe colocar su estado",
        patternMismatch: "Estado no es correcto"
    }
};

const validadores = {
    nacimiento: input => validarNacimiento(input),
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

function mostrarMensajeDeError(tipoDeInpunt,input){
    let mensaje = "";
    tipoDeErrores.forEach(error => {
        if (input.validity[error]) {
            console.log(tipoDeInpunt,error);
            console.log(input.validity[error])
            console.log(mensajesDeError[tipoDeInpunt][error]);
            mensaje = mensajesDeError[tipoDeInpunt][error];
        }
    });

    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje ="";

    if(!mayorEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad para poder regitrarte";
    }

    input.setCustomValidity(mensaje)
}

function mayorEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFecha = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(),fecha.getUTCDate());
  
    return diferenciaFecha <= fechaActual;
}