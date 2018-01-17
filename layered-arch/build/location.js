"use strict";
var geolib = require("geolib");
var locations = require('../data/zipcode-locations');
var Location = (function () {
    function Location(zip) {
        this.zip = zip;
    }
    Location.isClose = function (locationA, locationB, distance) {
        var locationDistance = geolib.getDistance({ latitude: locationA.getLatitude(), longitude: locationA.getLongitude() }, { latitude: locationB.getLatitude(), longitude: locationB.getLongitude() });
        locationDistance = geolib.convertUnit("mi", locationDistance);
        return locationDistance <= distance;
    };
    Location.prototype.getZip = function () {
        return this.zip;
    };
    Location.prototype.getLatitude = function () {
        return locations[this.zip][0];
    };
    Location.prototype.getLongitude = function () {
        return locations[this.zip][1];
    };
    return Location;
}());
exports.Location = Location;
//# sourceMappingURL=location.js.map