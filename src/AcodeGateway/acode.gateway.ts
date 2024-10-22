import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, WebSocket } from "ws";
type AcodeClient = {
   ws: WebSocket;
   lastConnexion: number;
   connexionCounter: number;
};
@WebSocketGateway(8080)
export class AcodeGateway implements OnGatewayConnection, OnGatewayDisconnect {
   @WebSocketServer()
   server: Server;
   private clients: Map<string, AcodeClient> = new Map<string, AcodeClient>();

   handleConnection(client: WebSocket, request: any) {
      console.log("Client connecté.");
      client.send("Bienvenue sur le serveur WebSocket !");
   }

   handleDisconnect(client: WebSocket) {
      console.log("Client déconnecté");
   }

   @SubscribeMessage("message")
   handleMessage(client: WebSocket, payload: string): void {
      console.log("Message reçu:", payload);
      this.server.clients.forEach((c) => {
         if (c.readyState === WebSocket.OPEN) {
            c.send(`Server: ${payload}`);
         }
      });
   }
}
