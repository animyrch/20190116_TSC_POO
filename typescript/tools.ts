//ma fonction pour afficher mes messages au console
export let show_message = (message:string):void=>{
  console.log(message);
  console.log("\n");
};
//gestion des erreurs lors de la création d'un canvas
export let manageCanvasErrors = (canvas:any, context:any):boolean => {
  if(!canvas)
  {
      alert("Impossible de récupérer le canvas");
      return false;
  }
  if(!context)
  {
      alert("Impossible de récupérer le context");
      return false;
  }
};
//pour insérer des images avec Canvas dans une position déterminée et dans des dimensions déterminées
export let drawCanvasImage = (context:any, name:string, baseImageDimensions:number, imageDimensionsX:number, imageDimensionsY:number):void =>{
  let base_image:any =document.createElement('img');
  base_image.src = './images/'+name+'.png';
  base_image.onload = function(){
    context.drawImage(base_image, imageDimensionsX, imageDimensionsY, baseImageDimensions, baseImageDimensions);
  }
};
