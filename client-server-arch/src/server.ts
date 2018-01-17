import net = require('net');
import ip = require('ip');
// import readlineSync = require('readline-sync');
import { ResistanceManager } from './resistance';

interface Address { port:number; family:string; address:string; };
let server:net.Server = net.createServer();
let clients:net.Socket[] = [];
let rm = new ResistanceManager();

// On connection with server...
server.on('connection', function(socket:net.Socket) {
  // Establish a socket and add it to the list
  console.log('connected :' + socket.remoteAddress);
  clients.push(socket);

  // When we get data from the client...
  socket.on('data', function(response) {
    let obj = JSON.parse(response.toString());

    if (obj.action === 'addMember') {
      console.log('Received: ' + obj.name + ' ' + obj.email + ' ' + obj.zip);
      console.log('Adding new member...');
      rm.addMember(obj.name, obj.email, obj.zip);
      console.log('New member added!');
    }
    if (obj.action === 'addProtest') {
      console.log('Received: ' + obj.name + ' ' + obj.zip + ' ' + obj.date);
      console.log('Adding new protest...');
      let protestName:string = rm.addProtest(obj.name, obj.zip, obj.date);
      console.log('New protest added!');
    }
  });
});

// When the server starts listening...
server.on('listening', function () {
  var addr: Address = server.address();
  console.log(addr.address);
  console.log('server listening on port %d', addr.port);
});

// Start the server
server.listen(3000);