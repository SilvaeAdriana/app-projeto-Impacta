const { Router } = require('express');

const router = Router();

const UsuarioController = require('../controllers/usuario-controller');

router.get('/', UsuarioController.getAllUsuarios);

router.get('/:id', UsuarioController.getUsuarioById);

router.post('/cadastrar', UsuarioController.cadastrarUsuario);

router.post('/login', UsuarioController.loginUsuario);

router.delete('/:id', UsuarioController.deleteUsuario);

module.exports = router;