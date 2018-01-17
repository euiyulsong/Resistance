'use strict';

//make the client
import net = require('net');
const readline = require('readline');
const client = new net.Socket();
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '> ' });
var HOST = '127.0.0.1';
var PORT = 3000;

// When we get data from the server...
client.on('data', function (data) {
  console.log(data + '\n');
});

// When server disconnects from client...
client.on('close', function () {
  console.log('Server disconnected');
  console.log('Closing client...');
  client.end();
  process.exit(0);
});

// When client connects to the server...
client.connect(PORT, HOST, function () {
  console.log('Connected to: ' + HOST + ':' + PORT);
  showMainMenu();
});

var obj:any = {};
obj.action = 'mainMenu';

rl.on('line', (input) => {
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
  } else if (obj.action === 'addMember') {
    if (!('name' in obj)) {
      obj.name = input;
      console.log('Email: ');
    } else if (!('email' in obj)) {
      obj.email = input;
      console.log('Zip Code: ');
    } else {
      obj.zip = input;
      console.log('Client sending new member to server...');
      client.write(JSON.stringify(obj));
      console.log('Successfully added new member!');
      obj = { action:'mainMenu' };
      showMainMenu();
    }
  } else if (obj.action === 'addProtest') {
    if (!('name' in obj)) {
      obj.name = input;
      console.log('Location (zip code):');
    } else if (!('zip' in obj)) {
      obj.zip = input;
      console.log('Date and time (ex: Jan 21 2017 13:00 PST): ');
    } else {
      obj.date = input;
      console.log('Client sending new protest to server...');
      client.write(JSON.stringify(obj));
      console.log('Successfully added new protest!');
      obj = { action:'mainMenu' };
      showMainMenu();
    }
  } else {
    console.log('Invalid state of program.');
    console.log('Exiting...');
    exit();
  }
});

function showMainMenu() {
  console.log(`\nWelcome to the Resistance! Pick an option:
    1. Register a new member
    2. Register a new protest
    3. Register a new movement
    4. Add a member to a protest
    5. Modify a protest
    6. Add a protest to a movement
    7. List protest members
    8. List members near a protest
    9. List protests near a location
    10. Exit`);
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
