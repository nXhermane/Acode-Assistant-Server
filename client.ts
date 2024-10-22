// const { io } =require( 'socket.io-client');
// console.log("Begin")
// const socket = io('ws://localhost:3000', {
//   transports: ['websocket'],
// });

// socket.on('connect', () => {
//   console.log('Connecté au serveur WebSocket');
// });

// socket.on('welcome', (msg) => {
//   console.log('Message de bienvenue:', msg);
// });

// socket.on('response', (msg) => {
//   console.log('Réponse du serveur:', msg);
// });

// socket.on('broadcast', (msg) => {
//   console.log('Message broadcast:', msg);
// });

// socket.on('disconnect', () => {
//   console.log('Déconnecté du serveur WebSocket');
// });

// // Pour envoyer un message
// socket.emit('message', 'Hello, serveur!');

const io = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to Socket.IO server');
});

socket.on('message', (msg) => {
  console.log(`Received: ${msg}`);
});