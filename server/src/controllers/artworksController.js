const {
    searchArtworksService,
    insertArtworkService,
    getArtworkByIdService,
    getAllArtworksService
} = require('../services/artworkService');
const { insertArtworkValidationRules, validate } = require('../validators/artworkValidator');

// Controlador para buscar obras de arte com base em uma query
const searchArtworks = async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ message: 'A query de busca é obrigatória.' });
    }

    try {
        const artworks = await searchArtworksService(query);
        res.json(artworks);
    } catch (error) {
        console.error('Erro ao buscar obras de arte:', error);
        res.status(500).json({ message: 'Erro ao buscar obras de arte.' });
    }
};

// Controlador para inserir uma nova obra de arte
const insertArtwork = [
    ...insertArtworkValidationRules, // Regras de validação
    validate, // Middleware de validação
    async (req, res) => {
        const artworkData = req.body;

        try {
            const newArtwork = await insertArtworkService(artworkData);
            res.status(201).json(newArtwork);
        } catch (error) {
            console.error('Erro ao inserir obra de arte:', error);
            res.status(500).json({ message: 'Erro ao inserir obra de arte.' });
        }
    },
];

// Controlador para buscar uma obra de arte pelo ID
const getArtworkById = async (req, res) => {
    const { id } = req.params;

    try {
        const artwork = await getArtworkByIdService(id);
        if (!artwork) {
            return res.status(404).json({ message: 'Obra de arte não encontrada.' });
        }
        res.json(artwork);
    } catch (error) {
        console.error('Erro ao buscar obra de arte pelo ID:', error);
        res.status(500).json({ message: 'Erro ao buscar obra de arte.' });
    }
};

// Controlador para listar todas as obras de arte
const getAllArtworks = async (req, res) => {
    try {
        const artworks = await getAllArtworksService();
        res.json(artworks);
    } catch (error) {
        console.error('Erro ao listar todas as obras de arte:', error);
        res.status(500).json({ message: 'Erro ao listar obras de arte.' });
    }
};

module.exports = {
    searchArtworks,
    insertArtwork,
    getArtworkById,
    getAllArtworks
};
