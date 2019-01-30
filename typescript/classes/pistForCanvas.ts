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
}