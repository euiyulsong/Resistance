"use strict";
var readlineSync = require("readline-sync");
var resistance_1 = require("./resistance");
function start() {
    showMainMenu(new resistance_1.ResistanceManager());
}
exports.start = start;
function showMainMenu(rm) {
    while (true) {
        console.log("Welcome to the Resistance! Pick an option:\n  1. Register a new member\n  2. Register a new protest\n  3. Register a new movement\n  4. Add a member to a protest\n  5. Modify a protest\n  6. Add a protest to a movement\n  7. List protest members\n  8. List members near a protest\n  9. List protests near a location\n  10. Exit");
        var response = readlineSync.question('> ');
        if (response === '10' || response.slice(0, 2).toLowerCase() === ':q') {
            break;
        }
        switch (response) {
            case '1':
                showNewMemberMenu(rm);
                break;
            case '2':
                showNewProtestMenu(rm);
                break;
            case '3':
                showNewMovementMenu(rm);
                break;
            case '4':
                showAddToProtestMenu(rm);
                break;
            case '5':
                showModifyProtestMenu(rm);
                break;
            case '6':
                showAddToMovementMenu(rm);
                break;
            case '7':
                showListProtestersMenu(rm);
                break;
            case '8':
                showListNearbyMembersMenu(rm);
                break;
            case '9':
                showListNearbyProtestsMenu(rm);
                break;
            default: console.log('Invalid option!');
        }
        console.log('');
    }
}
function showNewMemberMenu(rm) {
    console.log('Add a new member.');
    var name = readlineSync.question('  Name: ');
    var email = readlineSync.question('  Email: ');
    var zip = readlineSync.question('  Zip Code: ');
    rm.addMember(name, email, zip);
    console.log('User added!');
}
function showNewProtestMenu(rm) {
    console.log('Add a new protest.');
    var newProtestName = readlineSync.question('  Title of protest: ');
    var zipcode = readlineSync.question('  Location (zip code): ');
    var date = readlineSync.question('  Date and time (ex: Jan 21 2017 13:00 PST): ');
    var protestName = rm.addProtest(newProtestName, zipcode, date);
    showAddToProtestMenu(rm, protestName);
}
function showNewMovementMenu(rm) {
    console.log('Add a new movement.');
    var newMovementName = readlineSync.question('  Title of movement: ');
    var movementName = rm.addMovement(newMovementName);
    var adding = readlineSync.question('Add protests to movement? (y/n): ');
    while (adding.toLowerCase().startsWith('y')) {
        showAddToMovementMenu(rm, movementName);
        adding = readlineSync.question('Add another protest? (y/n): ');
    }
}
function showAddToProtestMenu(rm, protestName) {
    if (!protestName) {
        protestName = showSearchProtestsMenu(rm);
        if (!protestName) {
            return;
        }
    }
    var adding = readlineSync.question('Add a member to protest? (y/n): ');
    while (adding.toLowerCase().startsWith('y')) {
        var memberName = showSearchMembersMenu(rm);
        if (memberName) {
            rm.addMemberToProtest(memberName, protestName);
        }
        else {
            console.log('No member selected.');
        }
        adding = readlineSync.question('Add another member? (y/n): ');
    }
}
function showSearchMembersMenu(rm) {
    return _searchListMenu('member', function (q) { return rm.findMemberNames(q); });
}
function showSearchProtestsMenu(rm) {
    return _searchListMenu('protest', function (q) { return rm.findProtestNames(q); });
}
function showSearchMovementsMenu(rm) {
    return _searchListMenu('movement', function (q) { return rm.findMovementNames(q); });
}
function _searchListMenu(type, searchCallback) {
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
}
function showModifyProtestMenu(rm, protestName) {
    if (!protestName) {
        protestName = showSearchProtestsMenu(rm);
        if (!protestName) {
            return;
        }
    }
    while (true) {
        console.log("Edit protest '" + protestName + "'.\n  1. Change title\n  2. Change time\n  3. Add to movement\n  4. Return to previous menu");
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
            showAddToMovementMenu(rm, undefined, protestName);
        }
        else if (response == 4) {
            break;
        }
        else {
            console.log('Invalid option!');
        }
    }
}
function showAddToMovementMenu(rm, movementName, protestName) {
    if (!protestName) {
        protestName = showSearchProtestsMenu(rm);
        if (!protestName) {
            return;
        }
    }
    if (!movementName) {
        movementName = showSearchMovementsMenu(rm);
        if (!movementName) {
            return;
        }
    }
    rm.addProtestToMovement(protestName, movementName);
}
function showListProtestersMenu(rm) {
    var protestName = showSearchProtestsMenu(rm);
    var members = rm.getProtesters(protestName);
    console.log('Members participating in this action:');
    console.log('  ' + members.join('\n  ') + '\n');
    readlineSync.keyInPause('(Press any letter to continue)', { guide: false });
}
function showListNearbyMembersMenu(rm) {
    var protestName = showSearchProtestsMenu(rm);
    var DEFAULT_DISTANCE = 20;
    var distance = parseInt(readlineSync.question("Distance in miles from protest (default: " + DEFAULT_DISTANCE + "): ")) | DEFAULT_DISTANCE;
    var members = rm.getUsersNearProtest(protestName, distance);
    console.log('Members participating in this action:');
    console.log('  ' + members.join('\n  ') + '\n');
    readlineSync.keyInPause('(Press any letter to continue)', { guide: false });
}
function showListNearbyProtestsMenu(rm) {
    var zip = readlineSync.question('Zip code to search near: ');
    var DEFAULT_DISTANCE = 50;
    var distance = parseInt(readlineSync.question("Distance in miles from protest (default: " + DEFAULT_DISTANCE + "): ")) | DEFAULT_DISTANCE;
    var protests = rm.getNearbyProtests(zip, distance);
    console.log('Nearby protests:');
    console.log('  ' + protests.join('\n  ') + '\n');
    readlineSync.keyInPause('(Press any letter to continue)', { guide: false });
}
//# sourceMappingURL=ui.js.map