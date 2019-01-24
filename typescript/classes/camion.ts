import tools = require("../tools");
import Vehicle from "./vehicule_gen";

export default class Camion extends Vehicle{

  constructor(power:number, weight:number){
    super(power, weight);
    this.capacite_du_reservoir = 200;
    this.niveau_de_carburant = 150;//mettre 0 à la fin
    this.vitesse_max = 80;
    this.consommation = 30;
    this.type = this._types_accepted.camion;
    this.son_klaxonne = "Abouuuuah!";
    tools.show_message(`A wild ${this._type} appears`);
  }
}
