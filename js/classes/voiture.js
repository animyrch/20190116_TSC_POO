var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "../tools", "./vehicule_gen"], function (require, exports, tools, vehicule_gen_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Voiture = (function (_super) {
        __extends(Voiture, _super);
        function Voiture(power, weight) {
            var _this = _super.call(this, power, weight) || this;
            _this.capacite_du_reservoir = 50;
            _this.type = _this._types_accepted.voiture;
            _this.vitesse_max = 130;
            _this.consommation = 10;
            _this.son_klaxonne = "Duuut!";
            tools.show_message("A wild " + _this._type + " appears");
            return _this;
        }
        return Voiture;
    }(vehicule_gen_1.default));
    exports.default = Voiture;
});
