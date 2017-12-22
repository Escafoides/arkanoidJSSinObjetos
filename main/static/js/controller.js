var pelota = document.getElementById("pelota");
var nave = document.getElementById("nave");
var canvasX = 300;
var canvasY = 500;
var velPelota = 1;
var velNave = 30;
var naveX = 100;
var naveY = 470;
var dimPelota = 10;
var dimNave = 100;
var pelotaX = naveX+dimNave/2;
var pelotaY = naveY-dimPelota-5;
var dx = true;
var dy = true;
var pararJuego = false;
var controlJuego = 0;
var bloqueA = document.getElementById("bloqueA");
var bloqueB = document.getElementById("bloqueB");
var bloqueC = document.getElementById("bloqueC");
var bloqueAX = 10;
var bloqueAY = 50;
var bloqueBX = 130;
var bloqueBY = 50;
var bloqueCX = 260;
var bloqueCY = 50;
var dimBloqueX = 30;
var dimBloqueY = 15;
var jugando = false;
var bloqueADestruido = false;
var bloqueBDestruido = false;
var bloqueCDestruido = false;
var puntuacion = 0;

document.addEventListener("keydown", lectorTeclas, false);
document.addEventListener('mousemove', mouse_monitor);


function mouse_monitor(e) {
var x = e.pageX;
if (jugando && controlJuego == 1){
    checkMousePositionWithBoundaries(x);
}

}

function checkMousePositionWithBoundaries(x){
if(!pararJuego){
    if((x) <=0){
        naveX = 0;
    }else{
        naveX = x;
    }
    if(x+dimNave >= canvasX){
        naveX = canvasX-dimNave;
    }else{
        naveX = x;
    }  
    pintarNave();
}
}

function lectorTeclas(e) {
var keyCode = e.keyCode;
if(jugando){
    if(keyCode==37 && controlJuego == 0) {
        checkNaveCollisionWithBoundaries(0);
    }
    if(keyCode==39 && controlJuego == 0 ) {
        checkNaveCollisionWithBoundaries(1);
    }
    if(keyCode==80){
        pausa();
    }
}else{
    if(keyCode==84) {
        controlJuego = 0;
        document.getElementById("selTeclado").style.backgroundColor = 'red';
        document.getElementById("selRaton").style.backgroundColor = 'pink';
    }
    if(keyCode==82) {
        controlJuego = 1;
        document.getElementById("selRaton").style.backgroundColor = 'red';
        document.getElementById("selTeclado").style.backgroundColor = 'pink';
    }
    if(keyCode == 32){
        jugando = true;
    }
}
}

function pausa(){
pararJuego^=true;
if(pararJuego){
document.getElementById("msgPausa").style.display = 'block';
}else{
document.getElementById("msgPausa").style.display = 'none';
}
}

function checkNaveCollisionWithBoundaries(dir){
    if(!pararJuego){
        if(dir == 0){
            if((naveX-velNave) <=0){
                naveX = 0;
            }else{
                naveX-=velNave;
            }
        }else{
            if((naveX+dimNave)+velNave >= canvasX){
                naveX = canvasX-dimNave;
            }else{
                naveX+=velNave;
            }
        }
        pintarNave();
    }
}

function pintarNave(){
    nave.style.left = naveX+"px";
}


window.onload = function() {
    setInterval(function(){ 
        gameController();
        }, 1);
};

function gameController(){
    if(jugando){
        if (!pararJuego && !hasganado()){
            checkCollisions();
        }
    }
}

function hasganado(){
    if (bloqueADestruido && bloqueBDestruido && bloqueCDestruido) {
        ganaste();
        return true;
    }
    else return false;
}

function ganaste(){
    pararJuego^=true;
    document.getElementById("msgGanaste").style.display = 'block';
}

function checkCollisions(){
    checkPelotaCollisionWithBoundaries();
    checkPelotaCollisionWithNave();
    checkCollisionWithBlocks();
}

function checkCollisionWithBlocks(){
    checkCollisionWithBlockA();
    checkCollisionWithBlockB();
    checkCollisionWithBlockC();
}

function checkCollisionWithBlockA(){
    if(!bloqueADestruido){
        if(pelotaX >= bloqueAX && pelotaX <= (bloqueAX+dimBloqueX)&&pelotaY == (bloqueAY+dimBloqueY)){
            dy^=true;
        bloqueADestruido = true;
        sumarPuntuacion();
        bloqueA.style.display = 'none';
        }

        if(pelotaX >= bloqueAX && pelotaX <= (bloqueAX+dimBloqueX)&&pelotaY == bloqueAY){
            dy^=true;
        bloqueADestruido = true;
        sumarPuntuacion();
        bloqueA.style.display = 'none';
        }

        if(pelotaX == bloqueAX && (pelotaY >=bloqueAY)&& (pelotaY <= bloqueAY+dimBloqueY)){
            dx^=true;
        bloqueADestruido = true;
        sumarPuntuacion();
        bloqueA.style.display = 'none';
        }

        if(pelotaX == (bloqueAX+dimBloqueX)&&(pelotaY >=bloqueAY)&& (pelotaY <= bloqueAY+dimBloqueY)){
            dx^=true;
        bloqueADestruido = true;
        sumarPuntuacion();
        bloqueA.style.display = 'none';
        }

    }
}
function checkCollisionWithBlockB(){
    if(!bloqueBDestruido){
        if(pelotaX >= bloqueBX && pelotaX <= (bloqueBX+dimBloqueX)&&pelotaY == (bloqueBY+dimBloqueY)){
            dy^=true;
        bloqueBDestruido = true;
        sumarPuntuacion();
        bloqueB.style.display = 'none';
        }

        if(pelotaX >= bloqueBX && pelotaX <= (bloqueBX+dimBloqueX)&&pelotaY == bloqueBY){
            dy^=true;
        bloqueBDestruido = true;
        sumarPuntuacion();
        bloqueB.style.display = 'none';
        }

        if(pelotaX == bloqueBX && (pelotaY >=bloqueBY)&& (pelotaY <= bloqueBY+dimBloqueY)){
            dx^=true;
        bloqueBDestruido = true;
        sumarPuntuacion();
        bloqueB.style.display = 'none';
        }

        if(pelotaX == (bloqueBX+dimBloqueX)&&(pelotaY >=bloqueBY)&& (pelotaY <= bloqueBY+dimBloqueY)){
            dx^=true;
        bloqueBDestruido = true;
        sumarPuntuacion();
        bloqueB.style.display = 'none';
        }

    }
}

function checkCollisionWithBlockC(){
    if(!bloqueCDestruido){
        if(pelotaX >= bloqueCX && pelotaX <= (bloqueCX+dimBloqueX)&&pelotaY == (bloqueCY+dimBloqueY)){
            dy^=true;
        bloqueCDestruido = true;
        sumarPuntuacion();
        bloqueC.style.display = 'none';
        }

        if(pelotaX >= bloqueCX && pelotaX <= (bloqueCX+dimBloqueX)&&pelotaY == bloqueCY){
            dy^=true;
        bloqueCDestruido = true;
        sumarPuntuacion();
        bloqueC.style.display = 'none';
        }

        if(pelotaX == bloqueCX && (pelotaY >=bloqueCY)&& (pelotaY <= bloqueCY+dimBloqueY)){
            dx^=true;
        bloqueCDestruido = true;
        sumarPuntuacion();
        bloqueC.style.display = 'none';
        }

        if(pelotaX == (bloqueCX+dimBloqueX)&&(pelotaY >=bloqueCY)&& (pelotaY <= bloqueCY+dimBloqueY)){
            dx^=true;
        bloqueCDestruido = true;
        sumarPuntuacion();
        bloqueC.style.display = 'none';
        }

    }
}

function sumarPuntuacion(){
	puntuacion +=5;
	document.getElementById("puntuacion").innerHTML = "Puntuacion: "+puntuacion;
}

function checkPelotaCollisionWithNave(){
    if((pelotaY+dimPelota == naveY) && ((pelotaX >= naveX ) && ( pelotaX < naveX+dimNave))){
        dy^=true;
    }
}

function checkPelotaCollisionWithBoundaries(){

    if((pelotaX >= canvasX-dimPelota)||(pelotaX <= 0)){
        dx^=true;
    }
    if(pelotaY <= 0){
        dy^=true;
    }
    if(pelotaY >= canvasY-dimPelota){
        finDelJuego();
    }

    movePelota();
}

function movePelota(){
    if(dx){
        pelotaX+=velPelota;
    }else{
        pelotaX-=velPelota;
    }
    
    if(dy){
        pelotaY+=velPelota;
    }else{
        pelotaY-=velPelota;
    }
    pintarPelota();
}

function pintarPelota(){
    pelota.style.top = pelotaY+"px";
    pelota.style.left = pelotaX+"px";
}

function finDelJuego(){
    pararJuego^=true;
    document.getElementById("msgGameOver").style.display = 'block';
}