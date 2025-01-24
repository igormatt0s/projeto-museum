const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors, json } = format;

// Formato de saída customizado
const customFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
});

// Criação do logger
const logger = createLogger({
  level: 'info', // Define o nível padrão de log
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Adiciona timestamp ao log
    errors({ stack: true }), // Inclui stack traces para erros
    json() // Formato JSON para logs estruturados
  ),
  transports: [
    new transports.Console({
      format: combine(
        format.colorize(), // Adiciona cores para logs no console
        customFormat // Usa o formato customizado para o console
      ),
    }),
    new transports.File({
      filename: 'logs/errors.log', 
      level: 'error', // Apenas erros são salvos neste arquivo
    }),
    new transports.File({
      filename: 'logs/combined.log', // Salva todos os logs neste arquivo
    }),
  ],
});

module.exports = logger;
