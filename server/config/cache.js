const NodeCache = require('node-cache');

// Configura o cache com tempo padrão de 60s e verificação periódica a cada 120s.
const cache = new NodeCache({ stdTTL: process.env.CACHE_TTL || 60, checkperiod: 120 });

module.exports = cache;