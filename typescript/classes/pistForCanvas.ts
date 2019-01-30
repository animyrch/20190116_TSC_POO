import {canvasManager} from "../main";

export default class PistForCanvas{
	protected _valeurBase:number = 80;
	protected _width:number = canvasManager.width-this.valeurBase*2;
	protected _height:number = canvasManager.height-this.valeurBase*2;
	protected _baseImageDimensions:number = 26;
	//pour centrer les images sur les lignes, j'applique un offset- de this.baseImageDimensions/2
	protected _startPositionX:number = this.valeurBase-(this.baseImageDimensions/2);
	protected _startPositionY:number = this.valeurBase-(this.baseImageDimensions/2);
	//pour centrer les images sur les lignes, j'applique un offset+ de this.baseImageDimensions/2
	protected _endPositionX:number = this.width+this.startPositionX;
	protected _endPositionY:number = this.height+this.startPositionY;


	constructor(){

	}

	get valeurBase():number{
		return this._valeurBase;
	}
	set valeurBase(valeur:number){
		this._valeurBase = valeur;
	}
	get width():number{
		return this._width;
	}
	set width(newWidth:number){
		this._width = newWidth;
	}
	get height():number{
		return this._height;
	}
	set height(newHeight:number){
		this._height = newHeight;
	}
	get baseImageDimensions():number{
		return this._baseImageDimensions;
	}
	set baseImageDimensions(dimension:number){
		this._baseImageDimensions = dimension;
	}
	get startPositionX():number{
		return this._startPositionX;
	}
	set startPositionX(position:number){
		this._startPositionX = position;
	}
	get startPositionY():number{
		return this._startPositionY;
	}
	set startPositionY(position:number){
		this._startPositionY = position;
	}
	get endPositionX():number{
		return this._endPositionX;
	}
	set endPositionX(position:number){
		this._endPositionX = position;
	}
	get endPositionY():number{
		return this._endPositionY;
	}
	set endPositionY(position:number){
		this._endPositionY = position;
	}

	isTopCorner = (pixelValue:number):boolean => {
		let result:boolean = (pixelValue > 0 && pixelValue<this.getPistLength1Corner()) ? true : false;
		return result;
	};
	isRightCorner = (pixelValue:number):boolean => {
		let result:boolean = (pixelValue >= this.getPistLength1Corner() && pixelValue<this.getPistLength2Corners()) ? true : false;
		return result;
	};
	isBottomCorner = (pixelValue:number):boolean => {
		let result:boolean = (pixelValue >= this.getPistLength2Corners() && pixelValue<this.getPistLength3Corners()) ? true : false;
		return result;
	};
	isLeftCorner = (pixelValue:number):boolean => {
		let result:boolean = (pixelValue >= this.getPistLength3Corners() && pixelValue<this.getPistLength4Corners()) ? true : false;
		return result;
	};

	getPistLength1Corner=():number=>{
	return this.width;
	}
	getPistLength2Corners=():number=>{
	return this.width+this.height;
	}
	getPistLength3Corners=():number=>{
	return (this.width*2)+this.height;
	}
	getPistLength4Corners=():number=>{
	return (this.width*2)+(this.height*2);
	}

	advanceUpperCorner = (distance:number):number => {
		//on est sur la bordure du haut, notre distance en px correspond directement à notre avancement sur cette bordure
		//ensuite j'ajoute l'offset de la piste par rapport au canvas pour bien positionner sur la ligne
		let horizontalOffset:number = this.startPositionX;
		let distanceTotal:number = distance+horizontalOffset;
		return distanceTotal;
	};
	advanceRightCorner = (distance:number):number => {
		//on est sur la bordure droite, si on soustrait la largeur du coin du haut de notre distance, on trouve combien de pixel on doit avancer sur la bordure droite
		//ensuite j'ajoute l'offset de la piste par rapport au canvas pour bien positionner sur la ligne
		let verticalOffset:number = this.startPositionY;
		let distanceTotal:number = (distance-this.getPistLength1Corner())+verticalOffset;
		return distanceTotal;
	};
	advanceBottomCorner = (distance:number):number => {
		//on est sur la bordure du bas, si on soustrait la largeur des deux coins déjà parcourus de notre distance, on trouve combien de pixel on doit reculer sur la bordure du bas
		//puisque je dois reculer, donc diminuer la position X, je soustrait le résultat de la bordure vertical de la piste
		//ex; une piste de 10 x 5 px. Si j'ai avancé 16 px, mon X doit être 16-(10+5) = 1 px à reculer sur pos X. 15-1 = 14 est ma position X
		let distanceTotal:number = this.width-(distance-this.getPistLength2Corners());
		return distanceTotal;
	};
	advanceLeftCorner = (distance:number):number => {
		//on est sur la bordure de gauche, si on soustrait la largeur des trois coins déjà parcourus de notre distance, on trouve combien de pixel on doit reculer sur la bordure de gauche
		//puisque je dois reculer, donc diminuer la position Y, je soustrait donc le résultat de la bordure horizontal de la piste
		//ex; une piste de 10 x 5 px. Si j'ai avancé 27 px, mon Y doit être 27-(10+5+10) = 2 px à reculer sur pos Y. 5-2 = 3 est ma position Y
		let distanceTotal:number = this.height-(distance-this.getPistLength3Corners());

		//sauf que, si ma distance totale peut être inférieure à 0+verticalOffset, Dans ces cas là, je mets la position Y à 0+verticalOffset
		let verticalOffset:number = this.startPositionY;
		console.log("testing my pos Y " + distanceTotal);
		if(distanceTotal<verticalOffset){
			distanceTotal = verticalOffset;
		}
		return distanceTotal;
	};

}
