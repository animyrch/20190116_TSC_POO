import tools = require("../tools");
import Vehicle from "./vehicule_gen";

export default class Moto extends Vehicle{

  constructor(power:number, weight:number){
    super(power, weight);
    this.capacite_du_reservoir = 20;
    this.type = this._types_accepted.moto;
    this.vitesse_max = 130;
    this.consommation = 5;
    this.son_klaxonne = "bibip";
    tools.show_message(`A wild ${this._type} appears`);
  }


}
