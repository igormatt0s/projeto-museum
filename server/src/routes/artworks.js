const express = require('express');
const { searchArtworks, insertArtwork, getArtworkById, getAllArtworks } = require('../controllers/artworksController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.get('/search', authenticateToken, searchArtworks);
router.post('/insert', authenticateToken, insertArtwork);
router.get('/artwork/:id', authenticateToken, getArtworkById);
router.get('/', getAllArtworks);

module.exports = router;