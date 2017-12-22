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
var bloqueAY = 50;
var bloqueAX = 10;
var bloqueBY = 50;
var bloqueBX = 130;
var bloqueCY = 50;
var bloqueCX = 260;
var dimBloqueX = 30;
var dimBloqueY = 15;
var jugando = false;
var bloqueADestruido = false;
var bloqueBDestruido = false;
var bloqueCDestruido = false;
var puntuacion = 0;
var toquesA = 2;
var toquesB = 2; 
var toquesC = 2;

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
            if (toquesA > 1){
            	toquesA--;
            	bloqueA.style.backgroundColor = 'darkred';
            }else{
            	bloqueADestruido = true;
            	bloqueA.style.display = 'none';
            }
            dy^=true;
            sumarPuntuacion();
        }

        if(pelotaX >= bloqueAX && pelotaX <= (bloqueAX+dimBloqueX)&&pelotaY == bloqueAY){
        	if (toquesA > 1){
            	toquesA--;
            	bloqueA.style.backgroundColor = 'darkred';
            }else{
		        bloqueADestruido = true;
		        bloqueA.style.display = 'none';
            }
        	dy^=true;
        	sumarPuntuacion();
        }

        if(pelotaX == bloqueAX && (pelotaY >=bloqueAY)&& (pelotaY <= bloqueAY+dimBloqueY)){
        	if (toquesA > 1){
            	toquesA--;
            	bloqueA.style.backgroundColor = 'darkred';
            }else{
		        bloqueADestruido = true;
		        bloqueA.style.display = 'none';
            }
        	dx^=true;
        	sumarPuntuacion();
        }

        if(pelotaX == (bloqueAX+dimBloqueX)&&(pelotaY >=bloqueAY)&& (pelotaY <= bloqueAY+dimBloqueY)){
        	if (toquesA > 1){
            	toquesA--;
            	bloqueA.style.backgroundColor = 'darkred';
            }else{
		        bloqueADestruido = true;
		        bloqueA.style.display = 'none';
            }
        	dx^=true;
        	sumarPuntuacion();
        }

    }
}
function checkCollisionWithBlockB(){
    if(!bloqueBDestruido){
        if(pelotaX >= bloqueBX && pelotaX <= (bloqueBX+dimBloqueX)&&pelotaY == (bloqueBY+dimBloqueY)){
        	if (toquesB > 1){
            	toquesB--;
            	bloqueB.style.backgroundColor = 'darkgoldenrod';
            }else{
		        bloqueBDestruido = true;
		        bloqueB.style.display = 'none';
            }
        	dy^=true;
        	sumarPuntuacion();
        }

        if(pelotaX >= bloqueBX && pelotaX <= (bloqueBX+dimBloqueX)&&pelotaY == bloqueBY){
           	if (toquesB > 1){
            	toquesB--;
            	bloqueB.style.backgroundColor = 'darkgoldenrod';
            }else{
		        bloqueBDestruido = true;
		        bloqueB.style.display = 'none';
            }
           	dy^=true;
           	sumarPuntuacion();
        }

        if(pelotaX == bloqueBX && (pelotaY >=bloqueBY)&& (pelotaY <= bloqueBY+dimBloqueY)){
           	if (toquesB > 1){
            	toquesB--;
            	bloqueB.style.backgroundColor = 'darkgoldenrod';
            }else{
		        bloqueBDestruido = true;
		        bloqueB.style.display = 'none';
            }
           	dx^=true;
           	sumarPuntuacion();
        }

        if(pelotaX == (bloqueBX+dimBloqueX)&&(pelotaY >=bloqueBY)&& (pelotaY <= bloqueBY+dimBloqueY)){
           	if (toquesB > 1){
            	toquesB--;
            	bloqueB.style.backgroundColor = 'darkgoldenrod';
            }else{
		        bloqueBDestruido = true;
		        bloqueB.style.display = 'none';
            }
           	dx^=true;
           	sumarPuntuacion();
        }

    }
}

function checkCollisionWithBlockC(){
    if(!bloqueCDestruido){
        if(pelotaX >= bloqueCX && pelotaX <= (bloqueCX+dimBloqueX)&&pelotaY == (bloqueCY+dimBloqueY)){
           	if (toquesC > 1){
            	toquesC--;
            	bloqueC.style.backgroundColor = 'darkgreen';
            }else{
		        bloqueCDestruido = true;
		        bloqueC.style.display = 'none';
            }
           	dy^=true;
           	sumarPuntuacion();
        }

        if(pelotaX >= bloqueCX && pelotaX <= (bloqueCX+dimBloqueX)&&pelotaY == bloqueCY){
        	if (toquesC > 1){
            	toquesC--;
            	bloqueC.style.backgroundColor = 'darkgreen';
            }else{
		        bloqueCDestruido = true;
		        bloqueC.style.display = 'none';
            }
        	dy^=true;
        	sumarPuntuacion();
        }

        if(pelotaX == bloqueCX && (pelotaY >=bloqueCY)&& (pelotaY <= bloqueCY+dimBloqueY)){
        	if (toquesC > 1){
            	toquesC--;
            	bloqueC.style.backgroundColor = 'darkgreen';
            }else{
		        bloqueCDestruido = true;
		        bloqueC.style.display = 'none';
            }
        	dx^=true;
	        sumarPuntuacion();
        }

        if(pelotaX == (bloqueCX+dimBloqueX)&&(pelotaY >=bloqueCY)&& (pelotaY <= bloqueCY+dimBloqueY)){
        	if (toquesC > 1){
            	toquesC--;
            	bloqueC.style.backgroundColor = 'darkgreen';
            }else{
		        bloqueCDestruido = true;
		        bloqueC.style.display = 'none';
            }
        	dx^=true;
	        sumarPuntuacion();
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