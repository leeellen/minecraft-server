import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: '*',
    },
});

let clients = 0;

//Whenever someone connects this gets executed
io.on('connection', function (socket) {
    clients++;
    console.log('A user connected');

    io.sockets.emit('broadcast', clients);

    socket.on('disconnect', function () {
        clients--;
        console.log('A user disconnected');
        io.sockets.emit('broadcast', clients);
    });
});

httpServer.listen(4000, function () {
    console.log('listening on *:4000');
});
