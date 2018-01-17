'use strict';
var net = require("net");
var readline = require('readline');
var client = new net.Socket();
var rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '> ' });
var HOST = '127.0.0.1';
var PORT = 3000;
client.on('data', function (data) {
    console.log(data + '\n');
});
client.on('close', function () {
    console.log('Server disconnected');
    console.log('Closing client...');
    client.end();
    process.exit(0);
});
client.connect(PORT, HOST, function () {
    console.log('Connected to: ' + HOST + ':' + PORT);
    showMainMenu();
});
var obj = {};
obj.action = 'mainMenu';
rl.on('line', function (input) {
    if (obj.action === 'mainMenu') {
        switch (input) {
            case '1':
                obj.action = 'addMember';
                console.log('Add a new member.');
                console.log('Name: ');
                break;
            case '2':
                obj.action = 'addProtest';
                console.log('Add a new protest.');
                console.log('Title of protest: ');
                break;
            case '10':
                exit();
            default: console.log('Invalid option!');
        }
    }
    else if (obj.action === 'addMember') {
        if (!('name' in obj)) {
            obj.name = input;
            console.log('Email: ');
        }
        else if (!('email' in obj)) {
            obj.email = input;
            console.log('Zip Code: ');
        }
        else {
            obj.zip = input;
            console.log('Client sending new member to server...');
            client.write(JSON.stringify(obj));
            console.log('Successfully added new member!');
            obj = { action: 'mainMenu' };
            showMainMenu();
        }
    }
    else if (obj.action === 'addProtest') {
        if (!('name' in obj)) {
            obj.name = input;
            console.log('Location (zip code):');
        }
        else if (!('zip' in obj)) {
            obj.zip = input;
            console.log('Date and time (ex: Jan 21 2017 13:00 PST): ');
        }
        else {
            obj.date = input;
            console.log('Client sending new protest to server...');
            client.write(JSON.stringify(obj));
            console.log('Successfully added new protest!');
            obj = { action: 'mainMenu' };
            showMainMenu();
        }
    }
    else {
        console.log('Invalid state of program.');
        console.log('Exiting...');
        exit();
    }
});
function showMainMenu() {
    console.log("\nWelcome to the Resistance! Pick an option:\n    1. Register a new member\n    2. Register a new protest\n    3. Register a new movement\n    4. Add a member to a protest\n    5. Modify a protest\n    6. Add a protest to a movement\n    7. List protest members\n    8. List members near a protest\n    9. List protests near a location\n    10. Exit");
}
function exit() {
    client.end();
    console.log('Exiting...');
    console.log('Client disconnected');
    process.exit(0);
}
function invalidOption() {
    console.log('Invalid option!\n');
    showMainMenu();
}
//# sourceMappingURL=client.js.map