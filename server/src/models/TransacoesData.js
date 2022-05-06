const mongoose = require('mongoose');

const TransacoesDataSchema = new mongoose.Schema({
  tipoTransacao: {
    type: Boolean,
    default: true
  },
  nomeTransacao: {
    type: String,
    default: "Sem Nome"
  },
  dataTransacao: {
    type: String,
    default: "00-00-0000"
  },
  valores: {
    type: Number,
    default: 0.0
  }
});

module.exports = mongoose.model('Transacoes', TransacoesDataSchema);