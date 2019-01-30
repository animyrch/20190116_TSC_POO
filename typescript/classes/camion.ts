import tools = require("../tools");
import Vehicle from "./vehicule_gen";

export default class Camion extends Vehicle{

  constructor(power:number, weight:number){
    super(power, weight);
    this.capacite_du_reservoir = 400;
    this.niveau_de_carburant = 300;//mettre 0 à la fin
    this.vitesse_max = 100;
    this.consommation = 15;
    this.type = this._types_accepted.camion;
    this.son_klaxonne = "Abouuuuah!";
    tools.show_message(`A wild ${this._type} appears`);
  }
}
