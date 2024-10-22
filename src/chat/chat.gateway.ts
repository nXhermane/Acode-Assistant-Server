/*
import { WebSocketGateway, SubscribeMessage, WebSocketServer, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
})
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: Server) {
    this.logger.log('WebSocket Gateway initialisé');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connecté : ${client.id}`);
    // Envoyer un message de bienvenue au client
    client.emit('welcome', 'Bienvenue sur le serveur WebSocket!');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client déconnecté : ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string): void {
    this.logger.log(`Message reçu de ${client.id}: ${payload}`);
    client.emit('response', `Réponse du serveur : ${payload}`);
    this.server.emit('broadcast', `Broadcast: ${payload}`);
  }
}*/

import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';

@WebSocketGateway(8080)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: WebSocket) {
    console.log('Client connecté');
    client.send('Bienvenue sur le serveur WebSocket !');
  }

  handleDisconnect(client: WebSocket) {
    console.log('Client déconnecté');
  }

  @SubscribeMessage('message')
  handleMessage(client: WebSocket, payload: string): void {
    console.log('Message reçu:', payload);
    this.server.clients.forEach((c) => {
      if (c.readyState === WebSocket.OPEN) {
        c.send(`Server: ${payload}`);
      }
    });
  }
}