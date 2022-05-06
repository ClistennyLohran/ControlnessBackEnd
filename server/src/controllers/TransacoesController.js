const Transacoes = require('../models/TransacoesData');

module.exports = {
  async read(req, res) {
    const transacoesList = await Transacoes.find();

    return res.json(transacoesList);
  },
  async create(req, res) {
    const {tipoTransacao, nomeTransacao, valores} = req.body;

    let date = new Date();
    let dia, mes, ano;

    dia = String(date.getDate()).padStart(2, '0');
    mes = String(date.getMonth() + 1).padStart(2, '0');
    ano = date.getFullYear();

    let dataTransacao = dia + '-' + mes + '-' + ano;

    const transacaoCreated = await Transacoes.create({
      tipoTransacao,
      nomeTransacao,
      dataTransacao,
      valores
    });

    return res.json(transacaoCreated);
  },
  async delete(req, res) {
    const {id} = req.params;

    const transacaoDeleted = await Transacoes.findOneAndDelete({
      _id: id
    });

    if(transacaoDeleted) {
      return res.json(transacaoDeleted);
    }

    return res.status(400).json({
      erro: "Não foi encontrado um registro para deletar."
    });
  },
  async sumAllValues(req, res) {
    const valorEntrada = await Transacoes.aggregate(
      [
        {$match: {tipoTransacao: true}},
        {$group: {_id: "1", total: {$sum: "$valores"}}}
      ],
    );
    const valorSaida = await Transacoes.aggregate(
      [
        {$match: {tipoTransacao: false}},
        {$group: {_id: "2", total: {$sum: "$valores"}}}
      ],
    );

    let checkEntrada = false, checkSaida = false;

    if(valorEntrada.length === 0) { 
      checkEntrada = true;
    }else {
      checkEntrada = false;
    }
    if(valorSaida.length === 0) {
      checkSaida = true;
    }else {
      checkSaida = false;
    }

    if(!checkEntrada && !checkSaida) {
      return res.json([valorEntrada, valorSaida]);
    }else if(checkEntrada && checkSaida) {
      return res.json([[{_id: "1", total: 0}], [{_id: "2", total: 0}]]);
    }else if(!checkEntrada){
      return res.json([valorEntrada, [{_id: "2", total: 0}]]);
    }else {
      return res.json([[{_id: "1", total: 0}], valorSaida]);
    }
  },
  async getTotalFromDates(req, res) {
    
  }
}