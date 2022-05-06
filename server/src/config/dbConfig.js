const mongoose = require('mongoose');

const dbConfig = 'mongodb+srv://usuarios:usuarios@cluster0.dipz0.mongodb.net/transacoes?retryWrites=true&w=majority';

const conn = mongoose.connect(dbConfig, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = conn;