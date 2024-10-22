// const WebSocket = require('ws');
// const server = new WebSocket.Server({ port: 3000, host: '0.0.0.0' });

// server.on('connection', (ws) => {
//   console.log('Client connected');
// });

const io = require('socket.io')(3000, {
  cors: {
    origin: '*',  // Permet les connexions depuis n'importe quelle origine (CORS)
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('Client connected');

  // Événement de déconnexion
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});