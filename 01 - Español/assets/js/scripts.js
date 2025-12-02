
let orden = [];
let jugadorOrden = [];
let destello;
let turno;
let bien;
let compTurno;
let intervaloID;
let estricto = false;
let ruido = true;
let prendido = false;
let ganar;

const turnoContador = document.querySelector("#turno");
const arribaIzquierda = document.querySelector("#arriba-izquierda");
const arribaDerecha = document.querySelector("#arriba-derecha");
const abajoIzquierda = document.querySelector("#abajo-izquierda");
const abajoDerecha = document.querySelector("#abajo-derecha");
const botonEstricto = document.querySelector("#estricto");
const botonPrendido = document.querySelector("#encendido");
const botonIniciar = document.querySelector("#iniciar");

botonEstricto.addEventListener("click", (event) => {
    if (botonEstricto.checked == true) {
        estricto = true;
    } else {
        estricto = false;
    }
});

botonPrendido.addEventListener("click", (event) => {
    if (botonPrendido.checked == true) {
        prendido = true;
        turnoContador.innerHTML = "-";
    } else {
        prendido = false;
        turnoContador.innerHTML = "";
        limpiarColor();
        clearInterval(intervaloID);
    }
});

botonIniciar.addEventListener("click", (event) => {
    if (prendido || ganar) {
        jugar();
    }
});

function jugar() {
    ganar = false;
    orden = [];
    jugadorOrden = [];
    destello = 0;
    intervaloID = 0;
    turno = 1;
    turnoContador.innerHTML = 1;
    bien = true;
    for (var i = 0; i < 20; i++) {
        orden.push(Math.floor(Math.random() * 4) + 1);
    }
    compTurno = true;
    intervaloID = setInterval(juegoTurno, 800);
}

function juegoTurno() {
    prendido = false;
    if (destello == turno) {
        clearInterval(intervaloID);
        compTurno = false;
        limpiarColor();
        prendido
         = true;
    }

    if (compTurno) {
        limpiarColor();
        setTimeout(() => {
            if (orden[destello] == 1) uno();
            if (orden[destello] == 2) dos();
            if (orden[destello] == 3) tres();
            if (orden[destello] == 4) cuatro();
            destello++;
        }, 200);
    }
}

function uno() {
    if (ruido) {
        let audio = document.getElementById("clip-1");
        audio.play();
    }
    ruido = true;
    arribaIzquierda.style.backgroundColor = "lightgreen";
}

function dos() {
    if (ruido) {
        let audio = document.getElementById("clip-2");
        audio.play();
    }
    ruido = true;
    arribaDerecha.style.backgroundColor = "tomato";
}

function tres() {
    if (ruido) {
        let audio = document.getElementById("clip-3");
        audio.play();
    }
    ruido = true;
    abajoIzquierda.style.backgroundColor = "yellow";
}

function cuatro() {
    if (ruido) {
        let audio = document.getElementById("clip-4");
        audio.play();
    }
    ruido = true;
    abajoDerecha.style.backgroundColor = "lightskyblue";
}

function limpiarColor() {
    arribaIzquierda.style.backgroundColor = "darkgreen";
    arribaDerecha.style.backgroundColor = "darkred";
    abajoIzquierda.style.backgroundColor = "goldenrod";
    abajoDerecha.style.backgroundColor = "darkblue";
}

function destelloColor() {
    arribaIzquierda.style.backgroundColor = "lightgreen";
    arribaDerecha.style.backgroundColor = "tomato";
    abajoIzquierda.style.backgroundColor = "yellow";
    abajoDerecha.style.backgroundColor = "lightskyblue";
}

arribaIzquierda.addEventListener("click", (event) => {
    if (prendido) {
        jugadorOrden.push(1);
        comprobar();
        uno();
        if (!ganar) {
            setTimeout(() => {
                limpiarColor();
            }, 300);
        }
    }
});

arribaDerecha.addEventListener("click", (event) => {
    if (prendido) {
        jugadorOrden.push(2);
        comprobar();
        dos();
        if (!ganar) {
            setTimeout(() => {
                limpiarColor();
            }, 300);
        }
    }
});

abajoIzquierda.addEventListener("click", (event) => {
    if (prendido) {
        jugadorOrden.push(3);
        comprobar();
        tres();
        if (!ganar) {
            setTimeout(() => {
                limpiarColor();
            }, 300);
        }
    }
});

abajoDerecha.addEventListener("click", (event) => {
    if (prendido) {
        jugadorOrden.push(4);
        comprobar();
        cuatro();
        if (!ganar) {
            setTimeout(() => {
                limpiarColor();
            }, 300);
        }
    }
});

function comprobar() {
    if (jugadorOrden[jugadorOrden.length - 1] !== orden[jugadorOrden.length - 1]) bien = false;
    if (jugadorOrden.length == 3 && bien) {
        juegoGanado();
    }

    if (bien == false) {
        destelloColor();
        turnoContador.innerHTML = "No!";
        setTimeout(() => {
            turnoContador.innerHTML = turno;
            limpiarColor();
            if (estricto) {
                play();
            } else {
                compTurno = true;
                destello = 0;
                jugadorOrden = [];
                bien = true;
                intervaloID = setInterval(juegoTurno, 800);
            }
        }, 800)
        ruido = false;
    }

    if (turno == jugadorOrden.length && bien && !ganar) {
        turno++;
        jugadorOrden = [];
        compTurno = true;
        destello = 0;
        turnoContador.innerHTML = turno;
        intervaloID = setInterval(juegoTurno, 800);
    }
}

function juegoGanado() {
    destelloColor();
    turnoContador.innerHTML = "Ganaste!";
    prendido = false;
    ganar = true;
}
