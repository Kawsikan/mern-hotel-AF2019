const express = require('express');
const router = express.Router();
const roomController = require('../controller/room.controller');

module.exports = function () {
    router.post('/create', roomController.createRoom);
    router.get('/', roomController.getAllRooms);
    return router;
}