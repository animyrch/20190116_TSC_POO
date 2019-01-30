import Race from "./race";
import {timeoutsArray} from "../main";
import tools = require("../tools");

export default class Vehicule{
  protected _hp:number = 0; //de type "puissance en cheveux"
  protected _drag:number = 0; // de type kg
  protected _type:string;
  protected _types_accepted = {
    voiture : "voiture",
    moto : "moto",
    camion : "camion",
  };
  protected _capacite_du_reservoir:number; //de type litre
  protected _niveau_de_carburant:number = 0; //de type litre
  protected _son_klaxonne:string;
  protected _vitesse_max:number; //de type km par heure
  protected _consommation:number; //litre per km
  protected _vehiculeCondition:boolean = false; //est-ce que le véhicule est en état de rouler
  isIncrease:boolean = true;
  isX:boolean = true;
  
  static _start_condition:number = 0; //je vérifie que les réservoirs sont complets avant de commencer. Cela devient 3 quand  les 3 vehicules ont rempli leurs réservoir
  constructor(power:number, weight:number){
      this.power = power;
      this.weight = weight;
  }

  get power():number{
    return this._hp;
  }
  get weight():number{
    return this._drag;
  }
  get capacite_du_reservoir():number{
    return this._capacite_du_reservoir
  }
  get niveau_de_carburant():number{
    return this._niveau_de_carburant;
  }
  get son_klaxonne():string{
    return this._son_klaxonne;
  }
  get type():string{
    return this._type;
  }
  get start_condition():number{
    return Vehicule._start_condition;
  }
  get vitesse_max():number{
    return this._vitesse_max;
  }
  get consommation():number{
    return this._consommation;
  }
  get vehiculeCondition():boolean{
    return this._vehiculeCondition;
  }
  set power(power:number){
    this._hp = power;
  }
  set weight(weight:number){
    this._drag = weight;
  }
  set niveau_de_carburant(carburant:number){
    this._niveau_de_carburant = carburant;
  }
  set capacite_du_reservoir(reservoir:number){
    this._capacite_du_reservoir = reservoir;
  }
  set type(type:string){
    this._type = type;
  }
  set son_klaxonne(son:string){
    this._son_klaxonne = son;
  }
  set start_condition(counter:number){
    Vehicule._start_condition = counter;
  }
  set vitesse_max(vitesse:number){
    this._vitesse_max = vitesse;
  }
  set consommation(consommation:number){
    this._consommation = consommation;
  }
  set vehiculeCondition(condition:boolean){
    this._vehiculeCondition = condition;
  }
  static increment_start_condition(){
    Vehicule._start_condition++;
  }
  pit_stop():void{
    //je détermine le montant de carburant nécessaire pour faire le pleine
    let besoinCarburant:number = this.capacite_du_reservoir - this.niveau_de_carburant;
    //j'assume que la vitesse de la pompe de carburant est de 10 litre par seconde
    //je trouve combien de second il me faut pour faire le pleine
    let besoinTemps:number = besoinCarburant/10;
    //après avoir attendu autant que nécessaire, je lance mettre_du_carburant
    timeoutsArray.push(setTimeout(this.mettre_du_carburant, besoinTemps*1000, this));
  }
  mettre_du_carburant(vehicule:Vehicule):void{
    //j'égalise le niveau de carburant selon la capacité de réservoir car on a attendu autant que nécessaire
    vehicule.niveau_de_carburant = vehicule._capacite_du_reservoir;

    //je modifie le répère du vehicule comme étant "en état de conduire"
    vehicule.vehiculeCondition = true; 

    //j'incremente ma variable qui declencerait la course au début, cela se répète pendant la course sans avoir une influence
    Vehicule.increment_start_condition();

    //je klaxonne quand la réservoir est rempli
    vehicule.klaxonne(vehicule);

  }
  klaxonne(vehicule:Vehicule):void{
    tools.show_message(`${vehicule.type} dit que c'est bon : ${vehicule._son_klaxonne}, Niveau de carburant = ${vehicule.niveau_de_carburant}`);
    
     //je détermine le start pour la course selon l'attribut static _start_condition qui atteint 3 une fois les 3 véhicules ont rempli leurs réservoir
    // tools.show_message(vehicule.start_condition);
    if(vehicule.start_condition===3){/*
      console.log("testing when do I enter here");*/
      //starting the race in 1 second
      //let countdown = setTimeout(Race.createRace, 1000);
      //starting the race instantly
      Race.createRace();
      //putting start_condition of vehicule to 10 to ensure we don't reenter here
      vehicule.start_condition = 10;
    }
  }
  
}
