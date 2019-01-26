import tools = require("../tools");
import Vehicle from "./vehicule_gen";

export default class Voiture extends Vehicle{

  constructor(power:number, weight:number){
    super(power, weight);
    this.capacite_du_reservoir = 60;
    this.type = this._types_accepted.voiture;
    this.vitesse_max = 120;
    this.consommation = 10;
    this.son_klaxonne = "Duuut!";
    tools.show_message(`A wild ${this._type} appears`);
  }
}
