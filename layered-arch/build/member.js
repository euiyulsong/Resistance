"use strict";
var location_1 = require("./location");
var Member = (function () {
    function Member(name, email, zip) {
        this.name = name;
        this.email = email;
        this.location = new location_1.Location(zip);
    }
    Member.prototype.getName = function () {
        return this.name;
    };
    Member.prototype.getEmail = function () {
        return this.email;
    };
    Member.prototype.getZip = function () {
        return this.location.getZip();
    };
    Member.prototype.getLocation = function () {
        return this.location;
    };
    return Member;
}());
exports.Member = Member;
//# sourceMappingURL=member.js.map