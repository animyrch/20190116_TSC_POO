define(["require", "exports", "../main", "../tools"], function (require, exports, main_1, tools) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Race = (function () {
        function Race() {
            this.participants = main_1.joueurs;
            console.log("race starts");
            Race.advance_participants(this.participants);
        }
        Object.defineProperty(Race.prototype, "participants", {
            get: function () {
                return this._participants;
            },
            set: function (participants) {
                this._participants = participants;
            },
            enumerable: true,
            configurable: true
        });
        Race.finishRace = function (participants) {
            for (var _i = 0, participants_1 = participants; _i < participants_1.length; _i++) {
                var participant = participants_1[_i];
                if (participant.distance_parcourue >= Race._distance) {
                    Race._finishCondition = true;
                }
            }
            for (var _a = 0, participants_2 = participants; _a < participants_2.length; _a++) {
                var participant = participants_2[_a];
                if (Race._finishCondition == true) {
                    tools.show_message(participant.name + " = " + (participant.distance_parcourue - Race._distance));
                    Race._rank++;
                }
            }
        };
        Race.advance_participants = function (participants) {
            var currentStep = setTimeout(function () {
                for (var _i = 0, participants_3 = participants; _i < participants_3.length; _i++) {
                    var participant = participants_3[_i];
                    if (participant.vehicule.vehiculeCondition) {
                        var distanceParSeconde = participant.vehicule.vitesse_max / 360;
                        participant.distance_parcourue = distanceParSeconde;
                        participant.vehicule.niveau_de_carburant -= participant.vehicule.consommation;
                        if (participant.vehicule.niveau_de_carburant - participant.vehicule.consommation <= 0) {
                            participant.vehicule.vehiculeCondition = false;
                            participant.vehicule.pit_stop();
                        }
                    }
                }
                Race.finishRace(participants);
                if (Race._finishCondition === false) {
                    Race.advance_participants(participants);
                }
                tools.show_message("testing the creation of each timeout " + counter);
                counter++;
            }, 1000);
            main_1.timeoutsArray.push(currentStep);
        };
        Race.createRace = function () {
            var race = new Race();
        };
        Race._distance = 10;
        Race._finishCondition = false;
        Race._rank = 1;
        return Race;
    }());
    exports.default = Race;
    var counter = 0;
});
