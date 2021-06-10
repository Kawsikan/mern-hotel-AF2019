const Room = require('../models/room.model');

const createRoom = async (req, res) => {
    if (req.body) {
        const room = Room(req.body);
        await room.save()
            .then(data => {
                res.status(200).send({ data: data });
            }).catch(error => {
                res.status(500).send({ error: error.message })
            });
    }
}

const getAllRooms = async (req, res) => {
    await Room.find({}).populate('categories', 'name description')
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(error => {
            res.status(500).send({ error: error.message });
        })
}

module.exports = {
    createRoom, getAllRooms
}