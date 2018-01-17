"use strict";
var Movement = (function () {
    function Movement(name) {
        this.name = name;
        this.protests = [];
    }
    Movement.prototype.addProtest = function (protestName) {
        if (this.protests.indexOf(protestName) === -1) {
            this.protests.push(protestName);
        }
    };
    Movement.prototype.getName = function () {
        return this.name;
    };
    Movement.prototype.getProtests = function () {
        return this.protests;
    };
    return Movement;
}());
exports.Movement = Movement;
//# sourceMappingURL=movement.js.map