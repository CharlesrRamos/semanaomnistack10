const socketio = require('socket.io');
const parseStringsAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = [];

// filtros para visualização dos devs dentro do app em tempo real.

exports.setupWebsocket = (server) => {
 io = socketio(server);

 io.on('connection', socket => {
          const {latitude, longitude, techs} =(socket.handshake.query);

     connections.push({
         id: socket.id,
         coordinates: {
             latitude: Number(latitude),
             longitude: Number(longitude),
         },

         techs: parseStringsAsArray(techs),
        }); 
 });
};

exports.findConnections = (coordinates, techs) =>{
    return connections.filter (connection => {
        return calculateDistance(coordinates, connection.coordinates) <10
        && connection.techs.some(item => techs.include(item))

    })
}

exports.sendMessage = (to, message, data) => {
    to.forEach (connection => {
        io.to(connection.id).emit(message, data);
    })
}