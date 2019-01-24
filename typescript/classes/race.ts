import {joueurs, timeoutsArray} from "../main";
import Participant from "./participants";
import tools = require("../tools");

export default class Race{
  protected _participants:Participant[];
  static _distance:number = 10; //de type km
  static _finishCondition:boolean = false;
  static _cycleCounter:number = 2;
  static _rank:number = 1;

  constructor(){
    this.participants = joueurs;
    console.log("race starts");
    Race.advance_participants(this.participants);
  }

  get participants():Participant[]{
    return this._participants;
  }
  set participants(participants:Participant[]){
    this._participants = participants;
  }
  static finishRace(participants:Participant[]):void{
    for(let participant of participants){
      if(participant.distance_parcourue >= Race._distance*Race._cycleCounter){
          tools.show_message(`${participant.distance_parcourue}`);
            tools.show_message(`${Race._distance*Race._cycleCounter}`);
          Race._finishCondition = true;



      }
    }
    for(let participant of participants){
      if(Race._finishCondition == true){

          tools.show_message(`${participant.name} = ${participant.distance_parcourue - Race._distance*Race._cycleCounter}`);
          Race._rank++;


      }
    }
  }
  static advance_participants(participants:Participant[]){
    //je fais un boucle des participants et j'ajoute la valeur de distance par seconde à la propriété distance_parcourue de leurs vehicule par seconde
    //je mets tous dans un setTimeout de 1000 pour faire correspondre les opérations à une seconde*

      let currentStep:any = setTimeout(function(){
        for(let participant of participants){
          if(participant.vehicule.vehiculeCondition){
            console.log(participant.vehicule.niveau_de_carburant);
              //je calcule la distance qu'il aurait parcourue en une seconde
            let distanceParSeconde:number = participant.vehicule.vitesse_max/360;
            participant.distance_parcourue = distanceParSeconde;
            participant.vehicule.niveau_de_carburant -= participant.vehicule.consommation;
            if(participant.vehicule.niveau_de_carburant -  participant.vehicule.consommation <= 0){
              participant.vehicule.vehiculeCondition = false;
              participant.vehicule.pit_stop();
            }
          }

        }

        if(Race._finishCondition === false){
          Race.advance_participants(participants);

          Race.finishRace(participants);
        }

      }, 1000);
      timeoutsArray.push(currentStep);
    }




  }
