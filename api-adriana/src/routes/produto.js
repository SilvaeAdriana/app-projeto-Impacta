const { Router } = require('express');
const ProdutoController = require('../controllers/produto-controller')

const router = Router();

router.get('/', ProdutoController.getAllProdutos);

router.get('/:id', ProdutoController.getProdutosById);

router.get('/nome/:nome', ProdutoController.getProdutosByNome);

router.post('/', ProdutoController.postProdutos);

router.delete('/:id', ProdutoController.deleteProduto);


module.exports = router;