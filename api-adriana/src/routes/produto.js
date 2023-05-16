const { Router } = require('express');
const ProdutoController = require('../controllers/produto-controller')

const router = Router();

router.get('/', ProdutoController.getAllProdutos);

router.get('/produto-reservado/:id', ProdutoController.getProdutosReservados);

router.get('/:id', ProdutoController.getProdutosById);

router.get('/categoria/:categoria', ProdutoController.getProdutosByCategoria);

router.post('/', ProdutoController.postProdutos);

router.post('/produto-reservado', ProdutoController.reservarProduto);

router.delete('/:id', ProdutoController.deleteProduto);


module.exports = router;