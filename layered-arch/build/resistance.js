"use strict";
var movement_1 = require("./movement");
var protest_1 = require("./protest");
var member_1 = require("./member");
var location_1 = require("./location");
var ResistanceManager = (function () {
    function ResistanceManager() {
        this.members = [];
        this.protests = [];
        this.movements = [];
    }
    ResistanceManager.isName = function (name, query) {
        return name.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    };
    ResistanceManager.prototype.addMember = function (name, email, zip) {
        this.members.push(new member_1.Member(name, email, zip));
    };
    ResistanceManager.prototype.addProtest = function (name, zip, date) {
        this.protests.push(new protest_1.Protest(name, zip, date));
        return name;
    };
    ResistanceManager.prototype.addMovement = function (name) {
        this.movements.push(new movement_1.Movement(name));
        return name;
    };
    ResistanceManager.prototype.addMemberToProtest = function (memberName, protestName) {
        var _this = this;
        this.protests.forEach(function (protest) {
            if (protest.getName() === protestName) {
                _this.members.forEach(function (member) {
                    if (member.getName() === memberName) {
                        protest.addMember(memberName);
                    }
                });
            }
        });
    };
    ResistanceManager.prototype.addProtestToMovement = function (protestName, movementName) {
        var _this = this;
        this.movements.forEach(function (movement) {
            if (movement.getName() === movementName) {
                _this.protests.forEach(function (protest) {
                    if (protest.getName() === protestName) {
                        movement.addProtest(protestName);
                    }
                });
            }
        });
    };
    ResistanceManager.prototype.getMemberNames = function () {
        var names = [];
        this.members.forEach(function (member) {
            names.push(member.getName());
        });
        return names;
    };
    ResistanceManager.prototype.getProtestNames = function () {
        var names = [];
        this.protests.forEach(function (protest) {
            names.push(protest.getName());
        });
        return names;
    };
    ResistanceManager.prototype.getMovementNames = function () {
        var names = [];
        this.movements.forEach(function (movement) {
            names.push(movement.getName());
        });
        return names;
    };
    ResistanceManager.prototype.findMemberNames = function (query) {
        var names = this.getMemberNames();
        return names.filter(function (name) {
            return ResistanceManager.isName(name, query);
        });
    };
    ResistanceManager.prototype.findProtestNames = function (query) {
        var names = this.getProtestNames();
        return names.filter(function (name) {
            return ResistanceManager.isName(name, query);
        });
    };
    ResistanceManager.prototype.findMovementNames = function (query) {
        var names = this.getMovementNames();
        return names.filter(function (name) {
            return ResistanceManager.isName(name, query);
        });
    };
    ResistanceManager.prototype.modifyProtest = function (protestName, newName, newTime) {
        this.protests.forEach(function (protest) {
            if (protest.getName() === protestName) {
                if (newName) {
                    protest.setName(newName);
                }
                if (newTime) {
                    protest.setTime(newTime);
                }
            }
        });
    };
    ResistanceManager.prototype.getProtesters = function (protestName) {
        var protesters = [];
        this.protests.forEach(function (protest) {
            if (protest.getName() === protestName) {
                protesters = protest.getMembers();
            }
        });
        return protesters;
    };
    ResistanceManager.prototype.getUsersNearProtest = function (protestName, distance) {
        var _this = this;
        var membersNearby = [];
        this.protests.forEach(function (protest) {
            if (protest.getName() === protestName) {
                membersNearby = _this.members.filter(function (member) {
                    return location_1.Location.isClose(member.getLocation(), protest.getLocation(), distance);
                });
            }
        });
        var memberNames = membersNearby.map(function (member) {
            return member.getName() + " - " + member.getEmail();
        });
        return memberNames;
    };
    ResistanceManager.prototype.getNearbyProtests = function (zip, distance) {
        var _this = this;
        var protestsNearby = this.protests.filter(function (protest) {
            return location_1.Location.isClose(protest.getLocation(), new location_1.Location(zip), distance);
        });
        var protestNames = protestsNearby.map(function (protest) {
            var info = "";
            info += protest.getName();
            _this.movements.forEach(function (movement) {
                movement.getProtests().forEach(function (protestInMovement) {
                    if (protestInMovement === protest.getName()) {
                        info += " (" + movement.getName() + ")";
                    }
                });
            });
            return info;
        });
        return protestNames;
    };
    return ResistanceManager;
}());
exports.ResistanceManager = ResistanceManager;
//# sourceMappingURL=resistance.js.map