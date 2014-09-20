'use strict';

var Hapi = require('hapi'),
    Dice = require('node-dice-js'),
    Joi = require('joi');

var server = new Hapi.Server();

server.route({
    method: 'GET',
    path: '/execute/{command}',
    config: {
        validate: {
            params: {
                command: Joi.string()
            }
        },
        handler: function (req, reply) {
            var dice = new Dice();
            reply(dice.execute(req.params.command));
        }
    }
});

server.route({
    method: 'GET',
    path: '/parse/{command}',
    config: {
        validate: {
            params: {
                command: Joi.string()
            }
        },
        handler: function (req, reply) {
            var dice = new Dice();
            reply(dice.parse(req.params.command));
        }
    }
});

server.route({
    method: 'GET',
    path: '/roll/{faces}',
    config: {
        validate: {
            params: {
                faces: Joi.number().min(1)
            }
        },
        handler: function (req, reply) {
            var dice = new Dice();
            reply(dice.roll(req.params.faces));
        }
    }
});

server.start(function () {
    server.log('info', 'Server running at: ' + server.info.uri);
});

module.exports = server;
