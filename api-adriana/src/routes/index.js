
const { Router } = require('express');
const usuarios = require('./usuario');
const produtos = require('./produto');
const router = Router();


router.use('/usuarios', usuarios);
router.use('/produtos', produtos);

module.exports = router;