define(["require", "exports", "../main", "../tools"], function (require, exports, main_1, tools) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Vehicule = (function () {
        function Vehicule(power, weight) {
            this._hp = 0;
            this._drag = 0;
            this._types_accepted = {
                voiture: "voiture",
                moto: "moto",
                camion: "camion",
            };
            this._niveau_de_carburant = 0;
            this._vehiculeCondition = false;
            this.power = power;
            this.weight = weight;
        }
        Object.defineProperty(Vehicule.prototype, "power", {
            get: function () {
                return this._hp;
            },
            set: function (power) {
                this._hp = power;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vehicule.prototype, "weight", {
            get: function () {
                return this._drag;
            },
            set: function (weight) {
                this._drag = weight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vehicule.prototype, "capacite_du_reservoir", {
            get: function () {
                return this._capacite_du_reservoir;
            },
            set: function (reservoir) {
                this._capacite_du_reservoir = reservoir;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vehicule.prototype, "niveau_de_carburant", {
            get: function () {
                return this._niveau_de_carburant;
            },
            set: function (carburant) {
                this._niveau_de_carburant = carburant;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vehicule.prototype, "son_klaxonne", {
            get: function () {
                return this._son_klaxonne;
            },
            set: function (son) {
                this._son_klaxonne = son;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vehicule.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (type) {
                this._type = type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vehicule.prototype, "start_condition", {
            get: function () {
                return Vehicule._start_condition;
            },
            set: function (counter) {
                Vehicule._start_condition = counter;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vehicule.prototype, "vitesse_max", {
            get: function () {
                return this._vitesse_max;
            },
            set: function (vitesse) {
                this._vitesse_max = vitesse;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vehicule.prototype, "consommation", {
            get: function () {
                return this._consommation;
            },
            set: function (consommation) {
                this._consommation = consommation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vehicule.prototype, "vehiculeCondition", {
            get: function () {
                return this._vehiculeCondition;
            },
            set: function (condition) {
                this._vehiculeCondition = condition;
            },
            enumerable: true,
            configurable: true
        });
        Vehicule.increment_start_condition = function () {
            Vehicule._start_condition++;
        };
        Vehicule.prototype.pit_stop = function () {
            var besoinCarburant = this.capacite_du_reservoir - this.niveau_de_carburant;
            var besoinTemps = besoinCarburant / 10;
            main_1.timeoutsArray.push(setTimeout(this.mettre_du_carburant, besoinTemps * 1000, this));
        };
        Vehicule.prototype.mettre_du_carburant = function (vehicule) {
            vehicule.niveau_de_carburant = vehicule._capacite_du_reservoir;
            vehicule.vehiculeCondition = true;
            Vehicule.increment_start_condition();
            vehicule.klaxonne(vehicule);
        };
        Vehicule.prototype.klaxonne = function (vehicule) {
            tools.show_message(vehicule.type + " dit que c'est bon : " + vehicule._son_klaxonne + ", Niveau de carburant = " + vehicule.niveau_de_carburant);
        };
        Vehicule._start_condition = 0;
        return Vehicule;
    }());
    exports.default = Vehicule;
});
