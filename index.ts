import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: '*',
    },
});

io.on('connection', async (socket) => {
    const count = (await io.fetchSockets()).length;
    io.emit('enter', count);
});

httpServer.listen(4000, () => console.log('Listening on port 4000'));
