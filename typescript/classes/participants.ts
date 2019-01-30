import Vehicle from "./vehicule_gen";

export default class Participant{
  protected _name:string;
  protected _vehicule:Vehicle;
  protected _distance_parcourue:number = 0; //de type km
  protected _dimensionX:number;
  protected _dimensionY:number;
  protected _raceStart:boolean = false;

  constructor(name:string, vehicule:Vehicle){
      this.name = name;
      this.vehicule = vehicule;
  }
  get name():string{
    return this._name;
  }
  get vehicule():Vehicle{
    return this._vehicule;
  }
  get distance_parcourue():number{
    return this._distance_parcourue;
  }
  get dimensionX():number{
    return this._dimensionX;
  }
  get dimensionY():number{
    return this._dimensionY;
  }
  get raceStart():boolean{
    return this._raceStart;
  }
  set name(newName:string){
    this._name = newName;
  }
  set vehicule(newVehicule:Vehicle){
    this._vehicule = newVehicule;
  }
  set distance_parcourue(distance:number){
    this._distance_parcourue += distance;
  }
  set dimensionX(direction:number){
    this._dimensionX = direction;
  }
  set dimensionY(direction:number){
    this._dimensionY = direction;
  }
  set raceStart(value:boolean){
    this._raceStart = value;
  }
}
