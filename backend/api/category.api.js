const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category.controller');

module.exports = function () {
    router.post('/create', categoryController.createCategory);
    router.get('/', categoryController.getAllCategories);
    router.get('/:id', categoryController.getRoomsForCategory);
    router.get('/amount/:id', categoryController.calculateAmount);
    return router;
}