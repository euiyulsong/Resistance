"use strict";
var protest_1 = require("./protest");
var member_1 = require("./member");
var movement_1 = require("./movement");
var location_1 = require("./location");
var Data = (function () {
    function Data() {
        this.members = [];
        this.protests = [];
        this.movements = [];
    }
    Data.prototype.isName = function (name, query) {
        return name.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    };
    Data.prototype.addMember = function (name, email, zip) {
        this.members.push(new member_1.Member(name, email, zip));
    };
    Data.prototype.addProtest = function (name, zip, date) {
        this.protests.push(new protest_1.Protest(name, zip, date));
        return name;
    };
    Data.prototype.addMovement = function (name) {
        this.movements.push(new movement_1.Movement(name));
        return name;
    };
    Data.prototype.addMemberToProtest = function (memberName, protestName) {
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
    Data.prototype.addProtestToMovement = function (protestName, movementName) {
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
    Data.prototype.getMemberNames = function () {
        var names = [];
        this.members.forEach(function (member) {
            names.push(member.getName());
        });
        return names;
    };
    Data.prototype.getProtestNames = function () {
        var names = [];
        this.protests.forEach(function (protest) {
            names.push(protest.getName());
        });
        return names;
    };
    Data.prototype.getMovementNames = function () {
        var names = [];
        this.movements.forEach(function (movement) {
            names.push(movement.getName());
        });
        return names;
    };
    Data.prototype.findMemberNames = function (query) {
        var _this = this;
        var names = this.getMemberNames();
        return names.filter(function (name) {
            return _this.isName(name, query);
        });
    };
    Data.prototype.findProtestNames = function (query) {
        var _this = this;
        var names = this.getProtestNames();
        return names.filter(function (name) {
            return _this.isName(name, query);
        });
    };
    Data.prototype.findMovementNames = function (query) {
        var _this = this;
        var names = this.getMovementNames();
        return names.filter(function (name) {
            return _this.isName(name, query);
        });
    };
    Data.prototype.modifyProtest = function (protestName, newName, newTime) {
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
    Data.prototype.getProtesters = function (protestName) {
        var protesters = [];
        this.protests.forEach(function (protest) {
            if (protest.getName() === protestName) {
                protesters = protest.getMembers();
            }
        });
        return protesters;
    };
    Data.prototype.getUsersNearProtest = function (protestName, distance) {
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
    Data.prototype.getNearbyProtests = function (zip, distance) {
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
    return Data;
}());
exports.Data = Data;
//# sourceMappingURL=data.js.map