'use strict';

const ServerEngine = require('incheon').ServerEngine;

class NetpongServerEngine extends ServerEngine{
    constructor(io, gameEngine, inputOptions){
        super(io, gameEngine, inputOptions);

        this.serializer.registerClass(require('../common/Paddle'));
        this.serializer.registerClass(require('../common/Ball'));
    };

    start(){
        super.start();

        this.gameEngine.initGame();

        this.players = {
            player1: null,
            player2: null
        };
    };

    onPlayerConnected(socket){
        super.onPlayerConnected(socket);

        // attach newly connected player an available paddle
        if (this.players.player1 == null){
            this.players.player1 = socket.id;
            this.gameEngine.attachPaddle(0, socket.playerId);
        } else if (this.players.player2 == null) {
            this.players.player2 = socket.id;
            this.gameEngine.attachPaddle(1, socket.playerId);
        }

    };

    onPlayerDisconnected(socketId, playerId){
        super.onPlayerDisconnected(socketId, playerId);

        if (this.players.player1 == socketId){
            console.log('Player 1 disconnected');
            this.players.player1 = null;
        } else if (this.players.player2 == socketId){
            console.log('Player 2 disconnected');
            this.players.player2 = null;
        }

    };
}

module.exports = NetpongServerEngine;
