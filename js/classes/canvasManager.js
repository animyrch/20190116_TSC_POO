define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CanvasManager = (function () {
        function CanvasManager(canvas, context) {
            var _this = this;
            this._canvas = null;
            this.manageCanvasErrors = function () {
                if (!_this.canvas) {
                    alert("Impossible de récupérer le canvas");
                    return false;
                }
                if (!_this.context) {
                    alert("Impossible de récupérer le context");
                    return false;
                }
            };
            this.setCanvasAppereance = function (newWidth, newHeight, newBorder) {
                _this.canvas.width = newWidth;
                _this.canvas.height = newHeight;
                _this.borderWidth = newBorder;
            };
            this.drawCanvasImage = function (context, name, baseImageDimensions, imageDimensionsX, imageDimensionsY) {
                var base_image = document.createElement('img');
                base_image.src = './images/' + name + '.png';
                base_image.onload = function () {
                    context.drawImage(base_image, imageDimensionsX, imageDimensionsY, baseImageDimensions, baseImageDimensions);
                };
            };
            this.canvas = canvas;
            this.context = context;
            this.setCanvasAppereance(800, 500, 5);
        }
        Object.defineProperty(CanvasManager.prototype, "canvas", {
            get: function () {
                return this._canvas;
            },
            set: function (myCanvas) {
                this._canvas = myCanvas;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasManager.prototype, "context", {
            get: function () {
                return this._context;
            },
            set: function (myContext) {
                this._context = myContext;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasManager.prototype, "width", {
            get: function () {
                return this.canvas.width;
            },
            set: function (newWidth) {
                this.canvas.width = newWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasManager.prototype, "height", {
            get: function () {
                return this.canvas.height;
            },
            set: function (newHeight) {
                this.canvas.height = newHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasManager.prototype, "border", {
            get: function () {
                return this.canvas.style.border;
            },
            set: function (newBorder) {
                this.canvas.style.border = newBorder;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasManager.prototype, "borderWidth", {
            get: function () {
                var currentBorder = this.canvas.style.border;
                return currentBorder.substring(currentBorder.indexOf("px"));
            },
            set: function (newBorder) {
                var currentBorder = (this.canvas.style.border == "") ? "px solid teal" : this.canvas.style.border;
                this.canvas.style.border = newBorder + currentBorder.substring(currentBorder.indexOf("px"));
            },
            enumerable: true,
            configurable: true
        });
        return CanvasManager;
    }());
    exports.default = CanvasManager;
});
