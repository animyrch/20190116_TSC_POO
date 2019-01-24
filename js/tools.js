define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.show_message = function (message) {
        console.log(message);
        console.log("\n");
    };
    exports.manageCanvasErrors = function (canvas, context) {
        if (!canvas) {
            alert("Impossible de récupérer le canvas");
            return false;
        }
        if (!context) {
            alert("Impossible de récupérer le context");
            return false;
        }
    };
    exports.drawCanvasImage = function (context, name, baseImageDimensions, imageDimensionsX, imageDimensionsY) {
        var base_image = document.createElement('img');
        base_image.src = './images/' + name + '.png';
        base_image.onload = function () {
            context.drawImage(base_image, imageDimensionsX, imageDimensionsY, baseImageDimensions, baseImageDimensions);
        };
    };
});
