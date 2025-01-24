const express = require('express');
const authRoutes = require('./auth');
const artworkRoutes = require('./artworks');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/artworks', artworkRoutes);

module.exports = router;
