"use strict";
var net = require("net");
var resistance_1 = require("./resistance");
;
var server = net.createServer();
var clients = [];
var rm = new resistance_1.ResistanceManager();
server.on('connection', function (socket) {
    console.log('connected :' + socket.remoteAddress);
    clients.push(socket);
    socket.on('data', function (response) {
        var obj = JSON.parse(response.toString());
        if (obj.action === 'addMember') {
            console.log('Received: ' + obj.name + ' ' + obj.email + ' ' + obj.zip);
            console.log('Adding new member...');
            rm.addMember(obj.name, obj.email, obj.zip);
            console.log('New member added!');
        }
        if (obj.action === 'addProtest') {
            console.log('Received: ' + obj.name + ' ' + obj.zip + ' ' + obj.date);
            console.log('Adding new protest...');
            var protestName = rm.addProtest(obj.name, obj.zip, obj.date);
            console.log('New protest added!');
        }
    });
});
server.on('listening', function () {
    var addr = server.address();
    console.log(addr.address);
    console.log('server listening on port %d', addr.port);
});
server.listen(3000);
//# sourceMappingURL=server.js.map