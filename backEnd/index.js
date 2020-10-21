import express from 'express';
import http from 'http';
import socket from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socket(server);

server.listen(8080, () => console.log('Servidor rodando na porta 8080'));

io.on('connection', (socket) => {
    console.log('Server has a new connection ');

    socket.on('gameChange', (game) => {
        console.log('gameChange -->', game);
        io.emit('gameChange', game);
    });
    socket.on('disconnect', () => {
        console.log('A connection was disconnected');
    });
});