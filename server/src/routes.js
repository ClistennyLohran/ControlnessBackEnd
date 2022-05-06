const express = require('express');
const routes = express.Router();

const TransacoesController = require('./controllers/TransacoesController');

routes.get('/transacoes', TransacoesController.read);
routes.post('/transacoes', TransacoesController.create);
routes.delete('/transacoes/:id', TransacoesController.delete);

routes.get('/sumAllValues', TransacoesController.sumAllValues);

module.exports = routes;