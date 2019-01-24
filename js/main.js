define(["require", "exports", "./tools", "./classes/race", "./classes/moto", "./classes/voiture", "./classes/camion", "./classes/participants"], function (require, exports, tools, race_1, moto_1, voiture_1, camion_1, participants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    tools.show_message("Testing use of separate files");
    tools.show_message("Creating an instance of Moto class with following parameters : (15, 200)");
    var moto = new moto_1.default(15, 200);
    tools.show_message("Creating an instance of voiture class with following parameters : (25, 1000)");
    var voiture = new voiture_1.default(25, 1000);
    tools.show_message("Creating an instance of Camion class with following parameters : (50, 3500)");
    var camion = new camion_1.default(50, 3500);
    tools.show_message("Creating an instance of Participant class with following parameters : (\"JoueurA\", moto)");
    var joueurA = new participants_1.default("JoueurA", moto);
    tools.show_message("Creating an instance of Participant class with following parameters : (\"JoueurB\", voiture)");
    var joueurB = new participants_1.default("JoueurB", voiture);
    tools.show_message("Creating an instance of Participant class with following parameters : (\"JoueurC\", camion)");
    var joueurC = new participants_1.default("JoueurC", camion);
    tools.show_message("Putting all of my participants in an array to be used later");
    exports.joueurs = [];
    exports.timeoutsArray = [];
    exports.joueurs.push(joueurA);
    exports.joueurs.push(joueurB);
    exports.joueurs.push(joueurC);
    tools.show_message("Testing usage of parent's method on a child object with .type");
    tools.show_message("moto.type = " + moto.type);
    tools.show_message("voiture.type = " + voiture.type);
    tools.show_message("camion.type = " + camion.type);
    tools.show_message("Testing the effect of different values for different child objects upon using the same function of the parent");
    tools.show_message("Fuel level for moto = " + moto.niveau_de_carburant);
    tools.show_message("Fuel level for truck = " + camion.niveau_de_carburant);
    tools.show_message("Fuel level for car = " + voiture.niveau_de_carburant);
    tools.show_message("They start filling their tank");
    moto.pit_stop();
    voiture.pit_stop();
    camion.pit_stop();
    var intervalRaceEnd = setInterval(function () {
        if (race_1.default._finishCondition && exports.timeoutsArray.length > 0) {
            for (var i = 0; i < exports.timeoutsArray.length; i++) {
                clearTimeout(exports.timeoutsArray[i]);
            }
            console.log(exports.timeoutsArray.length);
            exports.timeoutsArray.length = 0;
            console.log(exports.timeoutsArray.length);
            stopInterval();
        }
    }, 1);
    var stopInterval = function () {
        clearInterval(intervalRaceEnd);
    };
    var myCanvas = null;
    var myContext = null;
    myCanvas = document.getElementById("myCanvas");
    myContext = myCanvas.getContext("2d");
    tools.manageCanvasErrors(myCanvas, myContext);
    var canvasWidth = 800;
    var canvasHeight = 500;
    var canvasBorderWidth = 2;
    myContext.canvas.width = canvasWidth;
    myContext.canvas.height = canvasHeight;
    myCanvas.style.border = canvasBorderWidth + 'px solid teal';
    var pisteValeurBase = 80;
    var startRacePist = true;
    var baseImageDimensions = 20;
    var imageDimensionsX = pisteValeurBase - (baseImageDimensions / 2);
    var imageDimensionsY = pisteValeurBase - (baseImageDimensions / 2);
    var raceDistanceVisuelle = (canvasWidth * 2) + (canvasHeight * 2);
    var startX = pisteValeurBase - (baseImageDimensions / 2);
    var startY = pisteValeurBase - (baseImageDimensions / 2);
    var limiteX = canvasWidth - (pisteValeurBase + (baseImageDimensions / 2));
    var limiteY = canvasHeight - (pisteValeurBase + (baseImageDimensions / 2));
    var animate = function () {
        for (var _i = 0, joueurs_1 = exports.joueurs; _i < joueurs_1.length; _i++) {
            var joueur = joueurs_1[_i];
            console.log("testing distance parcourue " + joueur.distance_parcourue);
            if (joueur.raceStart) {
                joueur.dimensionX = 70;
                joueur.dimensionY = 70;
                joueur.raceStart = false;
            }
            if (!race_1.default._finishCondition) {
                myContext.clearRect(0, 0, myCanvas.width, myCanvas.height);
                myContext.rect(pisteValeurBase, pisteValeurBase, canvasWidth - pisteValeurBase * 2, canvasHeight - pisteValeurBase * 2);
                myContext.stroke();
                var localVitesse = (joueur.vehicule.vitesse_max) / 7;
                if (joueur.isX && joueur.isIncrease) {
                    joueur.dimensionX = joueur.dimensionX + localVitesse;
                    if (joueur.dimensionX >= limiteX - localVitesse) {
                        joueur.isX = false;
                        joueur.dimensionX = limiteX - 1;
                    }
                }
                if (!joueur.isX && joueur.isIncrease) {
                    joueur.dimensionY = joueur.dimensionY + localVitesse;
                    if (joueur.dimensionY >= limiteY - localVitesse) {
                        joueur.isX = true;
                        joueur.isIncrease = false;
                        joueur.dimensionY = limiteY - 1;
                    }
                }
                if (joueur.isX && !joueur.isIncrease) {
                    joueur.dimensionX = joueur.dimensionX - localVitesse;
                    if (joueur.dimensionX <= startX + localVitesse) {
                        joueur.isX = false;
                        joueur.dimensionX = startX + 1;
                    }
                }
                if (!joueur.isX && !joueur.isIncrease) {
                    joueur.dimensionY = joueur.dimensionY - localVitesse;
                    if (joueur.dimensionY <= startY + localVitesse) {
                        joueur.isX = true;
                        joueur.isIncrease = true;
                        joueur.dimensionY = startY + 1;
                    }
                }
                tools.drawCanvasImage(myContext, joueur.vehicule.type, baseImageDimensions, joueur.dimensionX, joueur.dimensionY);
            }
        }
    };
    var myInterval = setInterval(animate, 1000);
});