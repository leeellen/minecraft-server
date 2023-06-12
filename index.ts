import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer();
const ioServer = new Server(httpServer, {
    cors: {
        origin: '*',
    },
});

let clients = {};

//Whenever someone connects this gets executed
ioServer.on('connection', function (client) {
    console.log(`User ${client.id} connected, there are currently ${ioServer.engine.clientsCount} users connected`);

    //Add a new client indexed by his id
    clients[client.id] = {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
    };

    ioServer.sockets.emit('move', clients);

    client.on('move', ({ id, rotation, position }) => {
        clients[id].position = position;
        clients[id].rotation = rotation;

        ioServer.sockets.emit('move', clients);
    });

    client.on('disconnect', () => {
        console.log(
            `User ${client.id} disconnected, there are currently ${ioServer.engine.clientsCount} users connected`,
        );

        //Delete this client from the object
        delete clients[client.id];

        ioServer.sockets.emit('move', clients);
    });
});

httpServer.listen(4000, function () {
    console.log('listening on *:4000');
});
