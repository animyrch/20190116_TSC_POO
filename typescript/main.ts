import tools = require("./tools");
import Race from "./classes/race";
import Vehicle from "./classes/vehicule_gen";
import Moto from "./classes/moto";
import Voiture from "./classes/voiture";
import Camion from "./classes/camion";
import Participant from "./classes/participants";
// declare var $:any;
import $ = require("jquery");
//import {Moto, Voiture, Camion} from "./classes/vehicule_types"; //on peut importer plusieurs elements d'un autre fichier mais il est meilleur de faire un fichier par class meme si ce sont des sous-classes
// import vehicle = require("./classes/vehicule_gen");
tools.show_message("Testing use of separate files");

tools.show_message(`Creating an instance of Moto class with following parameters : (15, 200)`);
// let genericVehicle = new Vehicle(12, 1000, VehicleType.Voiture);
let moto = new Moto(15, 200);
tools.show_message(`Creating an instance of voiture class with following parameters : (25, 1000)`);
let voiture = new Voiture(25, 1000);
tools.show_message(`Creating an instance of Camion class with following parameters : (50, 3500)`);
let camion = new Camion(50, 3500);
tools.show_message(`Creating an instance of Participant class with following parameters : ("JoueurA", moto)`);
let joueurA = new Participant("JoueurA", moto);
tools.show_message(`Creating an instance of Participant class with following parameters : ("JoueurB", voiture)`);
let joueurB = new Participant("JoueurB", voiture);
tools.show_message(`Creating an instance of Participant class with following parameters : ("JoueurC", camion)`);
let joueurC = new Participant("JoueurC", camion);
tools.show_message(`Putting all of my participants in an array to be used later`);
export var joueurs:Participant[] = [];
export var timeoutsArray:number[] = [];
joueurs.push(joueurA);
joueurs.push(joueurB);
joueurs.push(joueurC);


tools.show_message(`Testing usage of parent's method on a child object with .type`);
tools.show_message(`moto.type = ${moto.type}`);
tools.show_message(`voiture.type = ${voiture.type}`);
tools.show_message(`camion.type = ${camion.type}`);

tools.show_message(`Testing the effect of different values for different child objects upon using the same function of the parent`);
tools.show_message(`Fuel level for moto = ${moto.niveau_de_carburant}`);
tools.show_message(`Fuel level for truck = ${camion.niveau_de_carburant}`);
tools.show_message(`Fuel level for car = ${voiture.niveau_de_carburant}`);
tools.show_message(`They start filling their tank`);
moto.pit_stop();
voiture.pit_stop();
camion.pit_stop();

let intervalRaceEnd:any = setInterval(function(){
  //console.log("test");
  //console.dir(timeoutsArray[0]);
  if(Race._finishCondition && timeoutsArray.length>0){
    for (var i = 0; i < timeoutsArray.length; i++) {
        clearTimeout(timeoutsArray[i]);

    }
    console.log(timeoutsArray.length);
    timeoutsArray.length = 0;
        console.log(timeoutsArray.length);
        stopInterval();
  }
}, 1);
let stopInterval = () =>{
  clearInterval(intervalRaceEnd);
}


// ============= PARTIE VISUELLE (CANVAS) ================//
//je commence la visualisation de la course avec l'API canvas
let myCanvas:any = null;
let myContext:any = null;
myCanvas = document.getElementById("myCanvas");
myContext = myCanvas.getContext("2d");
tools.manageCanvasErrors(myCanvas, myContext);

let canvasWidth:number = 800;
let canvasHeight:number = 500;
let canvasBorderWidth:number = 2;
myContext.canvas.width = canvasWidth;
myContext.canvas.height = canvasHeight;
myCanvas.style.border = canvasBorderWidth + 'px solid teal';
// let body:any = $('body');
// $('body').csss('background', "red"); //cela donne erreur à la compilation car nous avons installé les typings pour jquery et node sait que csss n'exite pas pour $
// body.css('background', "red"); //cela ne donne pas erreur à la compilation car nous ciblons pas directement un objet $ mais un variable. Par contre, la navigateur ne donnerait erreur

//définition des valeurs pour la piste
let pisteValeurBase:number = 80;
let pistWidth:number = canvasWidth-pisteValeurBase*2;
let pistHeight:number = canvasHeight-pisteValeurBase*2;
let startRacePist:boolean = true;
// $('body').css('background', 'red');
//définition des valeurs des images des vehicules
// let myContext2 = myCanvas.getContext("2d");
let baseImageDimensions:number = 20; //valeur de base pour pouvoir changer l'échelle des images d'un coup
let imageDimensionsX:number = pisteValeurBase-(baseImageDimensions/2);
let imageDimensionsY:number = pisteValeurBase-(baseImageDimensions/2);
let raceDistanceVisuelle:number = (pistWidth*2)+(pistHeight*2);
let startX:number = pisteValeurBase-(baseImageDimensions/2);
let startY:number = pisteValeurBase-(baseImageDimensions/2);
let limiteX:number = canvasWidth-(pisteValeurBase+(baseImageDimensions/2));
let limiteY:number = canvasHeight-(pisteValeurBase+(baseImageDimensions/2));

//animation des images
let animate = () =>{

  for(let joueur of joueurs){
    // console.log("testing total distance " + Race._distance + "distance parcourue " + joueur.distance_parcourue);
    //je trouve le rapport entre distance total et distance parcourue selon les classes
    let tauxDistanceParcourue = Race._distance/joueur.distance_parcourue; //% de la route est accompli
    //Je connais la distance total en px. Avec ce taux, je peux trouver où en est le véhicule
    let distanceParcourueEnPx = raceDistanceVisuelle/tauxDistanceParcourue;


    console.log("testing rate of advance in px "+distanceParcourueEnPx);
    if(joueur.raceStart){
      joueur.dimensionX = startX;
      joueur.dimensionY = startY;
      joueur.raceStart = false;
    }
    if(!Race._finishCondition){
      //nettoyage du canvas
      myContext.clearRect(0, 0, myCanvas.width, myCanvas.height);
      //creation de la piste
      myContext.rect(pisteValeurBase, pisteValeurBase, pistWidth,  pistHeight);
      console.log("testing pist values " + pistWidth + " and " + pistHeight);
      myContext.stroke();
      //insertion des images pour les différents véhicules selon leur distanceParcourueEnPx
      // console.log("testing the current position of " + joueur.vehicule.type + " which is " + distanceParcourueEnPx);
      //le coin supérieur de la piste
      if(distanceParcourueEnPx > 0 && distanceParcourueEnPx<pistWidth){
        joueur.dimensionX = distanceParcourueEnPx+startX;
        joueur.dimensionY = startY;
      }
      //le coin droit de la piste
      if(distanceParcourueEnPx >= pistWidth && distanceParcourueEnPx<(pistWidth + pistHeight)){
        joueur.dimensionX = pistWidth+startX;
        joueur.dimensionY = (distanceParcourueEnPx-pistWidth)+startY;
      }
      //le coin inférieure de la piste
      if(distanceParcourueEnPx >= (pistWidth + pistHeight) && distanceParcourueEnPx<((pistWidth*2) + pistHeight)){
        joueur.dimensionY = pistHeight +startY;
        joueur.dimensionX = (pistWidth-(distanceParcourueEnPx-(pistWidth + pistHeight)));
      }
      //le coin gauche de la piste
      if(distanceParcourueEnPx >= ((pistWidth*2) + pistHeight) && distanceParcourueEnPx<((pistWidth*2) + (pistHeight*2))){
        joueur.dimensionX = startX;
        joueur.dimensionY = (pistHeight-(distanceParcourueEnPx-((pistWidth*2) + pistHeight)));
      }



      tools.drawCanvasImage(myContext, joueur.vehicule.type, baseImageDimensions, joueur.dimensionX, joueur.dimensionY);

    }

      // console.log("testing positions for "+joueur.vehicule.type + "="+joueur.dimensionX + "and" + joueur.dimensionY);
  }


};
let myInterval = setInterval(animate, 1000); //Notre boucle de rafraîchissement.
// let carImage = tools.insertCanvasImg("voiture", myContext);
