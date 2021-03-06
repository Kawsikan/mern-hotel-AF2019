const Category = require('../models/category.model');

const createCategory = async (req, res) => {
    if (req.body) {
        const category = new Category(req.body);
        await category.save()
            .then(data => {
                res.status(200).send({ data: data });
            }).catch(error => {
                res.status(500).send({ error: error.message })
            });
    }
}

const getAllCategories = async (req, res) => {
    await Category.find({}).populate('rooms', 'code amount wing pax')
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getRoomsForCategory = async (req, res) => {
    if (req.params && req.params.id) {
        const category = await Category.findById(req.params.id)
            .populate('rooms', 'code amount wing pax')
            .then(data => {
                res.status(200).send({ data: data.rooms });
            }).catch(error => {
                res.status(500).send({ error: error.message })
            });
    }
}

const calculateAmount = async (req, res) => {
    if (req.params && req.params.id) {
        const category = await Category.findById(req.params.id)
            .populate('rooms', 'code amount wing pax')
        let totAmount = 0;
        if (category.rooms.length > 0) {
            category.rooms.map((room) => {
                totAmount += room.amount;
            });
        }
        res.status(200).send({ totAmount: totAmount })
    }
}

module.exports = {
    createCategory, getAllCategories, getRoomsForCategory, calculateAmount
}