"use strict";
var data_1 = require("./data");
var Business = (function () {
    function Business() {
        this.model = new data_1.Data();
    }
    Business.prototype.isName = function (name, query) {
        return this.model.isName(name, query);
    };
    Business.prototype.addMember = function (name, email, zip) {
        this.model.addMember(name, email, zip);
    };
    Business.prototype.addProtest = function (name, zip, date) {
        return this.model.addProtest(name, zip, date);
    };
    Business.prototype.addMovement = function (name) {
        return this.model.addMovement(name);
    };
    Business.prototype.addMemberToProtest = function (memberName, protestName) {
        this.model.addMemberToProtest(memberName, protestName);
    };
    Business.prototype.addProtestToMovement = function (protestName, movementName) {
        this.model.addProtestToMovement(protestName, movementName);
    };
    Business.prototype.getMemberNames = function () {
        return this.model.getMemberNames();
    };
    Business.prototype.getProtestNames = function () {
        return this.model.getProtestNames();
    };
    Business.prototype.getMovementNames = function () {
        return this.model.getMovementNames();
    };
    Business.prototype.findMemberNames = function (query) {
        return this.model.findMemberNames(query);
    };
    Business.prototype.findProtestNames = function (query) {
        return this.model.findProtestNames(query);
    };
    Business.prototype.findMovementNames = function (query) {
        return this.model.findMovementNames(query);
    };
    Business.prototype.modifyProtest = function (protestName, newName, newTime) {
        return this.model.modifyProtest(protestName, newName, newTime);
    };
    Business.prototype.getProtesters = function (protestName) {
        return this.model.getProtesters(protestName);
    };
    Business.prototype.getUsersNearProtest = function (protestName, distance) {
        return this.model.getUsersNearProtest(protestName, distance);
    };
    Business.prototype.getNearbyProtests = function (zip, distance) {
        return this.model.getNearbyProtests(zip, distance);
    };
    return Business;
}());
exports.Business = Business;
//# sourceMappingURL=business.js.map