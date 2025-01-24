const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

    // Configurações do pool de conexões
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(mongoURI, options);
    console.log('Conexão ao MongoDB bem-sucedida!');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1); // Encerra o processo em caso de erro
  }
};

module.exports = connectDB;