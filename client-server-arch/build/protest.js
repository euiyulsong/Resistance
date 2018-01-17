"use strict";
var location_1 = require("./location");
var Protest = (function () {
    function Protest(name, zip, date) {
        this.name = name;
        this.location = new location_1.Location(zip);
        this.date = new Date(date);
        this.members = [];
    }
    Protest.prototype.addMember = function (memberName) {
        if (this.members.indexOf(memberName) === -1) {
            this.members.push(memberName);
        }
    };
    Protest.prototype.getName = function () {
        return this.name;
    };
    Protest.prototype.getZip = function () {
        return this.location.getZip();
    };
    Protest.prototype.getLocation = function () {
        return this.location;
    };
    Protest.prototype.getDate = function () {
        return this.date.toString();
    };
    Protest.prototype.getMembers = function () {
        return this.members;
    };
    Protest.prototype.setName = function (newName) {
        this.name = newName;
    };
    Protest.prototype.setTime = function (newTime) {
        this.date = new Date(newTime);
    };
    return Protest;
}());
exports.Protest = Protest;
//# sourceMappingURL=protest.js.map