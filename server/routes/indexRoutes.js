// routes/indexRoutes.js
const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.getFilmesPorCategoria);

module.exports = router;
