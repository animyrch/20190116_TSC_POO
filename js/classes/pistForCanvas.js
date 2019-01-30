define(["require", "exports", "../main"], function (require, exports, main_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PistForCanvas = (function () {
        function PistForCanvas() {
            var _this = this;
            this._valeurBase = 80;
            this._width = main_1.canvasManager.width - this.valeurBase * 2;
            this._height = main_1.canvasManager.height - this.valeurBase * 2;
            this._baseImageDimensions = 26;
            this._startPositionX = this.valeurBase - (this.baseImageDimensions / 2);
            this._startPositionY = this.valeurBase - (this.baseImageDimensions / 2);
            this._endPositionX = this.width + this.startPositionX;
            this._endPositionY = this.height + this.startPositionY;
            this.isTopCorner = function (pixelValue) {
                var result = (pixelValue > 0 && pixelValue < _this.getPistLength1Corner()) ? true : false;
                return result;
            };
            this.isRightCorner = function (pixelValue) {
                var result = (pixelValue >= _this.getPistLength1Corner() && pixelValue < _this.getPistLength2Corners()) ? true : false;
                return result;
            };
            this.isBottomCorner = function (pixelValue) {
                var result = (pixelValue >= _this.getPistLength2Corners() && pixelValue < _this.getPistLength3Corners()) ? true : false;
                return result;
            };
            this.isLeftCorner = function (pixelValue) {
                var result = (pixelValue >= _this.getPistLength3Corners() && pixelValue < _this.getPistLength4Corners()) ? true : false;
                return result;
            };
            this.getPistLength1Corner = function () {
                return _this.width;
            };
            this.getPistLength2Corners = function () {
                return _this.width + _this.height;
            };
            this.getPistLength3Corners = function () {
                return (_this.width * 2) + _this.height;
            };
            this.getPistLength4Corners = function () {
                return (_this.width * 2) + (_this.height * 2);
            };
            this.advanceUpperCorner = function (distance) {
                var horizontalOffset = _this.startPositionX;
                var distanceTotal = distance + horizontalOffset;
                return distanceTotal;
            };
            this.advanceRightCorner = function (distance) {
                var verticalOffset = _this.startPositionY;
                var distanceTotal = (distance - _this.getPistLength1Corner()) + verticalOffset;
                return distanceTotal;
            };
            this.advanceBottomCorner = function (distance) {
                var distanceTotal = _this.width - (distance - _this.getPistLength2Corners());
                return distanceTotal;
            };
            this.advanceLeftCorner = function (distance) {
                var distanceTotal = _this.height - (distance - _this.getPistLength3Corners());
                var verticalOffset = _this.startPositionY;
                console.log("testing my pos Y " + distanceTotal);
                if (distanceTotal < verticalOffset) {
                    distanceTotal = verticalOffset;
                }
                return distanceTotal;
            };
        }
        Object.defineProperty(PistForCanvas.prototype, "valeurBase", {
            get: function () {
                return this._valeurBase;
            },
            set: function (valeur) {
                this._valeurBase = valeur;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PistForCanvas.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (newWidth) {
                this._width = newWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PistForCanvas.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (newHeight) {
                this._height = newHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PistForCanvas.prototype, "baseImageDimensions", {
            get: function () {
                return this._baseImageDimensions;
            },
            set: function (dimension) {
                this._baseImageDimensions = dimension;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PistForCanvas.prototype, "startPositionX", {
            get: function () {
                return this._startPositionX;
            },
            set: function (position) {
                this._startPositionX = position;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PistForCanvas.prototype, "startPositionY", {
            get: function () {
                return this._startPositionY;
            },
            set: function (position) {
                this._startPositionY = position;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PistForCanvas.prototype, "endPositionX", {
            get: function () {
                return this._endPositionX;
            },
            set: function (position) {
                this._endPositionX = position;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PistForCanvas.prototype, "endPositionY", {
            get: function () {
                return this._endPositionY;
            },
            set: function (position) {
                this._endPositionY = position;
            },
            enumerable: true,
            configurable: true
        });
        return PistForCanvas;
    }());
    exports.default = PistForCanvas;
});
