const mongoose = require('mongoose');
const Artwork = require('../models/Artwork');
const cache = require('../../config/cache');

// Serviço para buscar obras de arte por query
const searchArtworksService = async (query) => {
    const cacheKey = `search:${query}`; // Chave de cache baseada no termo de busca

    // Verifica se os resultados já estão no cache
    const cachedResults = cache.get(cacheKey);
    if (cachedResults) {
        logger.info(`Resultados da busca para "${query}" retornados do cache.`);
        return cachedResults;
    }

    // Buscar obras do banco de dados
    const artworks = await Artwork.find({
        $or: [
            { title: { $regex: query, $options: 'i' } },
            { artistDisplayName: { $regex: query, $options: 'i' } },
        ],
    });

    // Renomeia _id para objectID
    const formattedArtworks = artworks.map((art) => {
        const { _id, ...rest } = art.toObject(); // Converte o documento Mongoose para objeto JS
        return { objectID: _id, ...rest }; // Renomeia _id para objectID
    });

    // Armazena o resultado no cache
    cache.set(cacheKey, formattedArtworks);

    return formattedArtworks;
};

// Serviço para inserir uma nova obra de arte
const insertArtworkService = async (artworkData) => {
    const { image, title, year, artist, artistNationality, city, country, objectName, department } = artworkData;

    if (!image || !title || !year || !artist || !artistNationality || !city || !country || !objectName || !department) {
        throw new Error('Todos os campos obrigatórios devem ser preenchidos.');
    }

    const newArtwork = new Artwork({
        primaryImageSmall: image,
        primaryImage: image,
        title,
        objectDate: year,
        artistDisplayName: artist,
        artistNationality,
        city,
        country,
        objectName,
        department,
    });

    return await newArtwork.save();
};

// Serviço para buscar obra de arte pelo ID
const getArtworkByIdService = async (id) => {
    if (!mongoose.isValidObjectId(id)) {
        throw new Error('ID inválido.');
    }

    const cacheKey = `artwork:${id}`; // Chave de cache baseada no ID da obra

    // Verifica se a obra está no cache
    const cachedArtwork = cache.get(cacheKey);
    if (cachedArtwork) {
        logger.info(`Obra com ID ${id} retornada do cache.`);
        return cachedArtwork;
    }

    // Busca a obra no banco de dados
    const artwork = await Artwork.findById(id);

    // Armazena a obra no cache
    cache.set(cacheKey, artwork);

    return artwork;
};

// Serviço para listar todas as obras de arte
const getAllArtworksService = async () => {
    const cachedArtworks = cache.get('artworks');
    if (cachedArtworks) {
        logger.info('Retornando obras do cache');
        return res.json(cachedArtworks);
    }
    const artworks = await Artwork.find();
    cache.set('artworks', artworks);
    return artworks;
};

module.exports = {
    searchArtworksService,
    insertArtworkService,
    getArtworkByIdService,
    getAllArtworksService
};
