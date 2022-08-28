console.log("Esta pagina muestra fotos de Marte con una API de la nasa");

var llaveApi = "2beDh9nfmquHiJ1nmPDEg4bMJCSz4r7CwGokgnYd";
var urlFotosMarte = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=${llaveApi}`
var pagina = 1;

function Buscar(){
    var robot = document.getElementById("robot");
    var robotSel = robot.value;
    console.log(robotSel);
    traerFotos(robotSel);
}

async function traerFotos(robot, pagina){
    urlFotosMarte = `https://api.nasa.gov/mars-photos/api/v1/rovers/${robot}/photos?sol=1000&page=${pagina}&api_key=${llaveApi}`
    
    var respuestaApi = await fetch(urlFotosMarte);
    console.log(respuestaApi);

    var respuestaApiJson = await respuestaApi.json();
    console.log(respuestaApiJson);

    var listaFotos = respuestaApiJson.photos;
    console.log(listaFotos);

    //tomamos el contenedor donde depositaremos nuestras fotos
    var contenedor = document.getElementById("fotos");
    contenedor.innerHTML = "";

    //recorremos el vector de las fotos
    listaFotos.forEach((elemento, indice, arreglo)=>{
        contenedor.innerHTML += `<div class="card" style="width: 18rem;">
        <img src=${elemento.img_src} class="card-img-top" alt=${elemento.id} style="height: 100%">
        <div class="card-body">
          <h5 class="card-title">${elemento.id}</h5>
          <p class="card-text">${elemento.camera.full_name} </p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>`
    }) 

    var next = document.getElementById("next");
    var previous = document.getElementById("previous");

    if(listaFotos.length>=25){
        next.classList.remove("oculto");
        if(pagina>1){
            previous.classList.remove("oculto");
        }
    }

}

function siguiente(){
    pagina ++;
    var robot = document.getElementById("robot");
    var robotSel = robot.value;
    console.log(robotSel);
    console.log(pagina);
    traerFotos(robotSel,pagina);
}

function anterior(){
    pagina --;
    var robot = document.getElementById("robot");
    var robotSel = robot.value;
    console.log(robotSel);
    console.log(pagina)
    if(pagina==1){
        traerFotos(robotSel,pagina);
        previous.classList.add("oculto");
    }
    
}