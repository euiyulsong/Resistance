"use strict";
var business_1 = require("./business");
var readlineSync = require("readline-sync");
var Presentation = (function () {
    function Presentation() {
    }
    Presentation.prototype.start = function () {
        this.showMainMenu(new business_1.Business());
    };
    Presentation.prototype.showMainMenu = function (rm) {
        while (true) {
            console.log("Welcome to the Resistance! Pick an option:\n    1. Register a new member\n    2. Register a new protest\n    3. Register a new movement\n    4. Add a member to a protest\n    5. Modify a protest\n    6. Add a protest to a movement\n    7. List protest members\n    8. List members near a protest\n    9. List protests near a location\n    10. Exit");
            var response = readlineSync.question('> ');
            if (response === '10' || response.slice(0, 2).toLowerCase() === ':q') {
                break;
            }
            switch (response) {
                case '1':
                    this.showNewMemberMenu(rm);
                    break;
                case '2':
                    this.showNewProtestMenu(rm);
                    break;
                case '3':
                    this.showNewMovementMenu(rm);
                    break;
                case '4':
                    this.showAddToProtestMenu(rm);
                    break;
                case '5':
                    this.showModifyProtestMenu(rm);
                    break;
                case '6':
                    this.showAddToMovementMenu(rm);
                    break;
                case '7':
                    this.showListProtestersMenu(rm);
                    break;
                case '8':
                    this.showListNearbyMembersMenu(rm);
                    break;
                case '9':
                    this.showListNearbyProtestsMenu(rm);
                    break;
                default: console.log('Invalid option!');
            }
            console.log('');
        }
    };
    Presentation.prototype.showNewMemberMenu = function (rm) {
        console.log('Add a new member.');
        var name = readlineSync.question('  Name: ');
        var email = readlineSync.question('  Email: ');
        var zip = readlineSync.question('  Zip Code: ');
        rm.addMember(name, email, zip);
        console.log('User added!');
    };
    Presentation.prototype.showNewProtestMenu = function (rm) {
        console.log('Add a new protest.');
        var newProtestName = readlineSync.question('  Title of protest: ');
        var zipcode = readlineSync.question('  Location (zip code): ');
        var date = readlineSync.question('  Date and time (ex: Jan 21 2017 13:00 PST): ');
        var protestName = rm.addProtest(newProtestName, zipcode, date);
        this.showAddToProtestMenu(rm, protestName);
    };
    Presentation.prototype.showNewMovementMenu = function (rm) {
        console.log('Add a new movement.');
        var newMovementName = readlineSync.question('  Title of movement: ');
        var movementName = rm.addMovement(newMovementName);
        var adding = readlineSync.question('Add protests to movement? (y/n): ');
        while (adding.toLowerCase().startsWith('y')) {
            this.showAddToMovementMenu(rm, movementName);
            adding = readlineSync.question('Add another protest? (y/n): ');
        }
    };
    Presentation.prototype.showAddToProtestMenu = function (rm, protestName) {
        if (!protestName) {
            protestName = this.showSearchProtestsMenu(rm);
            if (!protestName) {
                return;
            }
        }
        var adding = readlineSync.question('Add a member to protest? (y/n): ');
        while (adding.toLowerCase().startsWith('y')) {
            var memberName = this.showSearchMembersMenu(rm);
            if (memberName) {
                rm.addMemberToProtest(memberName, protestName);
            }
            else {
                console.log('No member selected.');
            }
            adding = readlineSync.question('Add another member? (y/n): ');
        }
    };
    Presentation.prototype.showSearchMembersMenu = function (rm) {
        return this._searchListMenu('member', function (q) { return rm.findMemberNames(q); });
    };
    Presentation.prototype.showSearchProtestsMenu = function (rm) {
        return this._searchListMenu('protest', function (q) { return rm.findProtestNames(q); });
    };
    Presentation.prototype.showSearchMovementsMenu = function (rm) {
        return this._searchListMenu('movement', function (q) { return rm.findMovementNames(q); });
    };
    Presentation.prototype._searchListMenu = function (type, searchCallback) {
        console.log("Searching for a " + type + ".");
        var query = readlineSync.question('Search query: ');
        var results = searchCallback(query);
        if (results.length > 0) {
            console.log('Results found: ');
            var resultsDisplay = '  ' + (results.map(function (item, idx) { return idx + 1 + ". " + item; }).join('\n  '));
            console.log(resultsDisplay);
            var choiceIdx = parseInt(readlineSync.question("Choose a " + type + " (1-" + results.length + "): "));
            return results[choiceIdx - 1];
        }
        else {
            console.log('No results found.');
            return undefined;
        }
    };
    Presentation.prototype.showModifyProtestMenu = function (rm, protestName) {
        if (!protestName) {
            protestName = this.showSearchProtestsMenu(rm);
            if (!protestName) {
                return;
            }
        }
        while (true) {
            console.log("Edit protest '" + protestName + "'.\n        1. Change title\n        2. Change time\n        3. Add to movement\n        4. Return to previous menu");
            var response = parseInt(readlineSync.question('> '));
            if (response == 1) {
                var newTitle = readlineSync.question('  New title: ');
                rm.modifyProtest(protestName, newTitle);
            }
            else if (response == 2) {
                var newTime = readlineSync.question('  New date and time (ex: Jan 21 2017 13:00 PST): ');
                rm.modifyProtest(protestName, undefined, newTime);
            }
            else if (response == 3) {
                this.showAddToMovementMenu(rm, undefined, protestName);
            }
            else if (response == 4) {
                break;
            }
            else {
                console.log('Invalid option!');
            }
        }
    };
    Presentation.prototype.showAddToMovementMenu = function (rm, movementName, protestName) {
        if (!protestName) {
            protestName = this.showSearchProtestsMenu(rm);
            if (!protestName) {
                return;
            }
        }
        if (!movementName) {
            movementName = this.showSearchMovementsMenu(rm);
            if (!movementName) {
                return;
            }
        }
        rm.addProtestToMovement(protestName, movementName);
    };
    Presentation.prototype.showListProtestersMenu = function (rm) {
        var protestName = this.showSearchProtestsMenu(rm);
        var members = rm.getProtesters(protestName);
        console.log('Members participating in this action:');
        console.log('  ' + members.join('\n  ') + '\n');
        readlineSync.keyInPause('(Press any letter to continue)', { guide: false });
    };
    Presentation.prototype.showListNearbyMembersMenu = function (rm) {
        var protestName = this.showSearchProtestsMenu(rm);
        var DEFAULT_DISTANCE = 20;
        var distance = parseInt(readlineSync.question("Distance in miles from protest (default: " + DEFAULT_DISTANCE + "): ")) | DEFAULT_DISTANCE;
        var members = rm.getUsersNearProtest(protestName, distance);
        console.log('Members participating in this action:');
        console.log('  ' + members.join('\n  ') + '\n');
        readlineSync.keyInPause('(Press any letter to continue)', { guide: false });
    };
    Presentation.prototype.showListNearbyProtestsMenu = function (rm) {
        var zip = readlineSync.question('Zip code to search near: ');
        var DEFAULT_DISTANCE = 50;
        var distance = parseInt(readlineSync.question("Distance in miles from protest (default: " + DEFAULT_DISTANCE + "): ")) | DEFAULT_DISTANCE;
        var protests = rm.getNearbyProtests(zip, distance);
        console.log('Nearby protests:');
        console.log('  ' + protests.join('\n  ') + '\n');
        readlineSync.keyInPause('(Press any letter to continue)', { guide: false });
    };
    return Presentation;
}());
exports.Presentation = Presentation;
//# sourceMappingURL=presentation.js.map