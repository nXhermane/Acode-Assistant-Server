const { Server } = require('socket.io');
try {
  const io = new Server({
    cors: {
      origin: '*', // Permettre toutes les origines pour les tests
      methods: ['GET', 'POST'],
    },
  });

  const PORT = process.env.PORT || 3000;

  io.on('connection', (socket) => {
    console.log("Un utilisateur s'est connecté:", socket.id);

    socket.emit('welcome', 'Bienvenue sur le serveur WebSocket!');

    socket.on('message', (message) => {
      console.log('Message reçu:', message);
      socket.emit('response', `Serveur a reçu: ${message}`);
      io.emit('broadcast', `Diffusion: ${message}`);
    });

    socket.on('disconnect', () => {
      console.log('Utilisateur déconnecté:', socket.id);
    });
  });

  io.listen(PORT);
  console.log(`Serveur en écoute sur le port ${PORT}`);
} catch (e) {
  
}
