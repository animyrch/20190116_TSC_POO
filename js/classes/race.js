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
                if (participant.distance_parcourue >= Race._distance * Race._cycleCounter) {
                    tools.show_message("" + participant.distance_parcourue);
                    tools.show_message("" + Race._distance * Race._cycleCounter);
                    Race._finishCondition = true;
                }
            }
            for (var _a = 0, participants_2 = participants; _a < participants_2.length; _a++) {
                var participant = participants_2[_a];
                if (Race._finishCondition == true) {
                    tools.show_message(participant.name + " = " + (participant.distance_parcourue - Race._distance * Race._cycleCounter));
                    Race._rank++;
                }
            }
        };
        Race.advance_participants = function (participants) {
            var currentStep = setTimeout(function () {
                for (var _i = 0, participants_3 = participants; _i < participants_3.length; _i++) {
                    var participant = participants_3[_i];
                    if (participant.vehicule.vehiculeCondition) {
                        console.log(participant.vehicule.niveau_de_carburant);
                        var distanceParSeconde = participant.vehicule.vitesse_max / 360;
                        participant.distance_parcourue = distanceParSeconde;
                        participant.vehicule.niveau_de_carburant -= participant.vehicule.consommation;
                        if (participant.vehicule.niveau_de_carburant - participant.vehicule.consommation <= 0) {
                            participant.vehicule.vehiculeCondition = false;
                            participant.vehicule.pit_stop();
                        }
                    }
                }
                if (Race._finishCondition === false) {
                    Race.advance_participants(participants);
                    Race.finishRace(participants);
                }
            }, 1000);
            main_1.timeoutsArray.push(currentStep);
        };
        Race._distance = 10;
        Race._finishCondition = false;
        Race._cycleCounter = 2;
        Race._rank = 1;
        return Race;
    }());
    exports.default = Race;
});