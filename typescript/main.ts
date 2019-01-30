import tools = require("./tools");
import Race from "./classes/race";
import CanvasManager from "./classes/canvasManager";
import PistForCanvas from "./classes/pistForCanvas";
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
    // console.log(timeoutsArray.length);
    timeoutsArray.length = 0;
        // console.log(timeoutsArray.length);
    stopInterval();
  }
}, 10);

let stopInterval = () =>{
  clearInterval(intervalRaceEnd);
}


// ============= PARTIE VISUELLE (CANVAS) ================//
//je commence la visualisation de la course avec l'API canvas
let myCanvas:any = document.getElementById("myCanvas");
let myContext:any = myCanvas.getContext("2d");

// j"instantie la classe CanvasManager pour manipuler le canvas
export let canvasManager = new CanvasManager(myCanvas, myContext);
canvasManager.manageCanvasErrors();
let canvasWidth:number = canvasManager.width;
let canvasHeight:number = canvasManager.height;
// tests pour integration de jquery dans typescript
// let body:any = $('body');
// $('body').csss('background', "red"); //cela donne erreur à la compilation car nous avons installé les typings pour jquery et node sait que csss n'exite pas pour $
// body.css('background', "red"); //cela ne donne pas erreur à la compilation car nous ciblons pas directement un objet $ mais un variable. Par contre, la navigateur ne donnerait erreur

//j'instantie la classe PistForCanvas pour manipuler la piste
let pistForCanvas = new PistForCanvas();
//définition des valeurs pour la piste

let startRacePist:boolean = true;
let visualCounter: number = 3;

let pisteValeurBase:number = 80;
let pistWidth:number = canvasWidth-pisteValeurBase*2;
let pistHeight:number = canvasHeight-pisteValeurBase*2;

//placement des joueurs à la position avant la ligne de start (moitié de la distance entre le coin gauche supérieur de la piste et la bordure gauche du canvas)
for(let joueur of joueurs){
   joueur.dimensionX = Math.floor(pistForCanvas.startPositionX * 0.5);
   joueur.dimensionY = pistForCanvas.startPositionY;
 }
//animation des images
let animate = () =>{
console.log("testing generation of timeouts "+timeoutsArray.length);
  for(let joueur of joueurs){
    // console.log("testing total distance " + Race._distance + "distance parcourue " + joueur.distance_parcourue);
    //je trouve le rapport entre distance total de Race et distance parcourue de joueur
    let tauxDistanceParcourue:number = Race._distance/joueur.distance_parcourue; //% de la route est accompli
    //Je connais la distance total en px (getPistLength4Corners()). Avec ce taux, je peux trouver où en est le véhicule
    let distanceParcourueEnPx:number = pistForCanvas.getPistLength4Corners()/tauxDistanceParcourue;

  // tools.show_message(`testing taux restant : ${tauxDistanceParcourue}`);
  if(tauxDistanceParcourue <= 0.1){
      // tools.show_message(`testing taux restant : ${tauxDistanceParcourue}`);

      Race._finishCondition = true;
  }

    if(!Race._finishCondition){

      //nettoyage du canvas
      myContext.clearRect(0, 0, myCanvas.width, myCanvas.height);
      //creation de la piste
      myContext.rect(pisteValeurBase, pisteValeurBase, pistWidth,  pistHeight);
      // console.log("testing pist values " + pistWidth + " and " + pistHeight);
      myContext.stroke();


      //calcul de correspondance entre distance parcourue en pixel et le placemet sur le canvas
      // console.log("testing the current position of " + joueur.vehicule.type + " which is " + distanceParcourueEnPx);
      //le coin supérieur de la piste
      if(pistForCanvas.isTopCorner(distanceParcourueEnPx)){
        //je peux integrer distanceParcourueEnPx au sein de joueur (participant) et
        joueur.dimensionX = pistForCanvas.advanceUpperCorner(distanceParcourueEnPx);
        joueur.dimensionY = pistForCanvas.startPositionY;
      }
      //le coin droit de la piste
      if(pistForCanvas.isRightCorner(distanceParcourueEnPx)){
        joueur.dimensionX = pistForCanvas.endPositionX;
        joueur.dimensionY = pistForCanvas.advanceRightCorner(distanceParcourueEnPx);

      }
      //le coin inférieure de la piste
      if(pistForCanvas.isBottomCorner(distanceParcourueEnPx)){
        joueur.dimensionY = pistForCanvas.endPositionY;
        joueur.dimensionX = pistForCanvas.advanceBottomCorner(distanceParcourueEnPx);
      }
      //le coin gauche de la piste
      if(pistForCanvas.isLeftCorner(distanceParcourueEnPx)){
        joueur.dimensionX = pistForCanvas.startPositionX;
        joueur.dimensionY = pistForCanvas.advanceLeftCorner(distanceParcourueEnPx);
      }

      //implementation des pit stops sur le canvas
      // console.log("testing if I can manage this with vehiculeCondition " + joueur.vehicule.vehiculeCondition + " for " + joueur.vehicule.type);
      if(!joueur.vehicule.vehiculeCondition){
        // console.log("testing way to prevent last gas fill "+ joueur.raceStart)
        canvasManager.drawCanvasImage(myContext, "gas", pistForCanvas.baseImageDimensions, joueur.dimensionX, joueur.dimensionY-pistForCanvas.baseImageDimensions);
      }else{
        joueur.raceStart = true;
      }

      //insertion des images pour les différents véhicules selon leur distanceParcourueEnPx
      // myContext.font = "20px Georgia";
      // myContext.fillText("3", canvasWidth/2, canvasHeight/2);
      canvasManager.drawCanvasImage(myContext, joueur.vehicule.type, pistForCanvas.baseImageDimensions, joueur.dimensionX, joueur.dimensionY);

    }
    //placement des voitures carburées dans la ligne de Start, seulement fonctionnelle au début, une fois course commence les dimensionX et dimensionY sont recalculé en debut de la boucle
    if(joueur.raceStart){
       joueur.dimensionX = pistForCanvas.startPositionX;
       joueur.dimensionY = pistForCanvas.startPositionY;
       // console.log("testing start condition value" + joueur.vehicule.start_condition);
    }
    if(joueur.distance_parcourue >= Race._distance){
        /*tools.show_message(`${participant.distance_parcourue}`);
        */
        Race._finishCondition = true;
    }
    if(joueur.vehicule.start_condition===3){
      console.log("testing when do I enter here");
      //starting the race in 1 second
      let countdown = setTimeout(Race.createRace, 1000);
      //starting the race instantly
      // let race = new Race;
      //putting start_condition of vehicule to 10 to ensure we don't reenter here
      joueur.vehicule.start_condition = 10;
    }
  }
};
let myInterval = setInterval(animate, 1000); //Notre boucle de rafraîchissement.
