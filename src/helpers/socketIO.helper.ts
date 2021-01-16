import http from 'http';
import socketIO from 'socket.io';
import { config } from 'dotenv';
import winston from 'winston';

import eventEmitter from './eventEmitter';
import { IMessage } from '../database/models/interfaces/message.interface';

config();
const port = process.env.SOCKET_PORT || 5000;

const SocketIO = (app: any) => {
  const server = http.createServer(app);
  const io = new socketIO.Server(server, {
    cors: {
      origin: '*',
      methods: '*',
    },
  });

  io.listen(
    app.listen(port, () => {
      winston.info(`Socket.IO is running on port: ${port}`);
    }),
  );

  io.on('connection', (socket) => {
    eventEmitter.on('notify', (message: IMessage) => {
      socket.emit('newMessage', {
        message,
      });
    });
  });

  return io;
};

export default SocketIO;
