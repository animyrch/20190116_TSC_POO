define(["require", "exports", "./tools", "./classes/race", "./classes/moto", "./classes/voiture", "./classes/camion", "./classes/participants", "./classes/canvasManager", "./classes/pistForCanvas"], function (require, exports, tools, race_1, moto_1, voiture_1, camion_1, participants_1, canvasManager_1, pistForCanvas_1) {
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
            exports.timeoutsArray.length = 0;
            stopInterval();
        }
    }, 10);
    var stopInterval = function () {
        clearInterval(intervalRaceEnd);
    };
    var myCanvas = document.getElementById("myCanvas");
    var myContext = myCanvas.getContext("2d");
    exports.canvasManager = new canvasManager_1.default(myCanvas, myContext);
    exports.canvasManager.manageCanvasErrors();
    var canvasWidth = exports.canvasManager.width;
    var canvasHeight = exports.canvasManager.height;
    var pistForCanvas = new pistForCanvas_1.default();
    var startRacePist = true;
    var visualCounter = 3;
    var pisteValeurBase = 80;
    var pistWidth = canvasWidth - pisteValeurBase * 2;
    var pistHeight = canvasHeight - pisteValeurBase * 2;
    for (var _i = 0, joueurs_1 = exports.joueurs; _i < joueurs_1.length; _i++) {
        var joueur = joueurs_1[_i];
        joueur.dimensionX = Math.floor(pistForCanvas.startPositionX * 0.5);
        joueur.dimensionY = pistForCanvas.startPositionY;
    }
    var animate = function () {
        for (var _i = 0, joueurs_2 = exports.joueurs; _i < joueurs_2.length; _i++) {
            var joueur = joueurs_2[_i];
            var tauxDistanceParcourue = race_1.default._distance / joueur.distance_parcourue;
            var distanceParcourueEnPx = pistForCanvas.getPistLength4Corners() / tauxDistanceParcourue;
            if (!race_1.default._finishCondition) {
                myContext.clearRect(0, 0, myCanvas.width, myCanvas.height);
                myContext.rect(pisteValeurBase, pisteValeurBase, pistWidth, pistHeight);
                myContext.stroke();
                if (pistForCanvas.isTopCorner(distanceParcourueEnPx)) {
                    joueur.dimensionX = distanceParcourueEnPx + pistForCanvas.startPositionX;
                    joueur.dimensionY = pistForCanvas.startPositionY;
                }
                if (pistForCanvas.isRightCorner(distanceParcourueEnPx)) {
                    joueur.dimensionX = pistForCanvas.endPositionX;
                    joueur.dimensionY = (distanceParcourueEnPx - pistWidth) + pistForCanvas.startPositionY;
                }
                if (pistForCanvas.isBottomCorner(distanceParcourueEnPx)) {
                    joueur.dimensionY = pistForCanvas.endPositionY;
                    joueur.dimensionX = (pistWidth - (distanceParcourueEnPx - (pistWidth + pistHeight)));
                }
                if (pistForCanvas.isLeftCorner(distanceParcourueEnPx)) {
                    joueur.dimensionX = pistForCanvas.startPositionX;
                    joueur.dimensionY = (pistHeight - (distanceParcourueEnPx - ((pistWidth * 2) + pistHeight)));
                }
                if (!joueur.vehicule.vehiculeCondition) {
                    exports.canvasManager.drawCanvasImage(myContext, "gas", pistForCanvas.baseImageDimensions, joueur.dimensionX, joueur.dimensionY - pistForCanvas.baseImageDimensions);
                }
                else {
                    joueur.raceStart = true;
                }
                exports.canvasManager.drawCanvasImage(myContext, joueur.vehicule.type, pistForCanvas.baseImageDimensions, joueur.dimensionX, joueur.dimensionY);
            }
            if (joueur.raceStart) {
                joueur.dimensionX = pistForCanvas.startPositionX;
                joueur.dimensionY = pistForCanvas.startPositionY;
            }
        }
    };
    var myInterval = setInterval(animate, 1000);
});
