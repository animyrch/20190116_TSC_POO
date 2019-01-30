export default class CanvasManager{
  protected _canvas:any = null;
  protected _context:any;

  constructor(canvas:any, context:any){
    this.canvas = canvas;
    this.context = context;
    this.setCanvasAppereance(800, 500, 5);
  }

  get canvas():any{
    return this._canvas;
  }
  set canvas(myCanvas:any){
    this._canvas = myCanvas;
  }
  get context():any{
    return this._context;
  }
  set context(myContext:any){
    this._context = myContext;
  }
  get width():number{
    return this.canvas.width;
  }
  set width(newWidth:number){
    this.canvas.width = newWidth;
  }
  get height():number{
    return this.canvas.height;
  }
  set height(newHeight:number){
    this.canvas.height = newHeight;
  }
  get border():string{
    return this.canvas.style.border;
  }
  set border(newBorder:string){
    this.canvas.style.border = newBorder;
  }
  get borderWidth():number{
    let currentBorder = this.canvas.style.border;
    return currentBorder.substring(currentBorder.indexOf("px"));
  }
  set borderWidth(newBorder:number){
    let currentBorder = (this.canvas.style.border == "") ? "px solid teal" : this.canvas.style.border;
    this.canvas.style.border = newBorder+currentBorder.substring(currentBorder.indexOf("px"));
  }
  //gestion des erreurs lors de la création d'un canvas
  manageCanvasErrors = ():boolean => {
    if(!this.canvas)
    {
        alert("Impossible de récupérer le canvas");
        return false;
    }
    if(!this.context)
    {
        alert("Impossible de récupérer le context");
        return false;
    }
  };

  //on peut changer la largeur, la hauteur et les bordures du canvas
  setCanvasAppereance = (newWidth:number, newHeight:number, newBorder:number) =>{
    this.canvas.width = newWidth;
    this.canvas.height = newHeight;
    this.borderWidth = newBorder;
  };

  //pour insérer des images avec Canvas dans une position déterminée et dans des dimensions déterminées
  drawCanvasImage = (context:any, name:string, baseImageDimensions:number, imageDimensionsX:number, imageDimensionsY:number):void =>{
    let base_image:any =document.createElement('img');
    base_image.src = './images/'+name+'.png';
    base_image.onload = function(){
      context.drawImage(base_image, imageDimensionsX, imageDimensionsY, baseImageDimensions, baseImageDimensions);
    }
  };
   
}
