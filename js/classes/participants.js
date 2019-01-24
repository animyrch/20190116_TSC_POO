define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Participant = (function () {
        function Participant(name, vehicule) {
            this._distance_parcourue = 0;
            this._dimensionX = 60;
            this._dimensionY = 60;
            this.raceStart = true;
            this.isIncrease = true;
            this.isX = true;
            this.name = name;
            this.vehicule = vehicule;
        }
        Object.defineProperty(Participant.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (newName) {
                this._name = newName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Participant.prototype, "vehicule", {
            get: function () {
                return this._vehicule;
            },
            set: function (newVehicule) {
                this._vehicule = newVehicule;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Participant.prototype, "distance_parcourue", {
            get: function () {
                return this._distance_parcourue;
            },
            set: function (distance) {
                this._distance_parcourue += distance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Participant.prototype, "dimensionX", {
            get: function () {
                return this._dimensionX;
            },
            set: function (direction) {
                this._dimensionX = direction;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Participant.prototype, "dimensionY", {
            get: function () {
                return this._dimensionY;
            },
            set: function (direction) {
                this._dimensionY = direction;
            },
            enumerable: true,
            configurable: true
        });
        return Participant;
    }());
    exports.default = Participant;
});
