const pool = require('../db');

exports.getAllProdutos = (request, response, next) => {
    pool.query(
            `SELECT 
                produtos.id as id,
                produtos.nome as nome,
                categoria,
                resumo,
                usuario_id,
                usuario,
                usuarios.tipo as tipo_usuario FROM produtos inner join usuarios on usuarios.id = produtos.usuario_id`, (err, res) => {
        if (err) return next(err);

        response.json(res.rows);
    });
}

exports.getProdutosById = (request, response, next) => {
    const { id } = request.params;

    pool.query('SELECT * FROM produtos WHERE id = $1', [id], (err, res) => {
        if (err) return next(err);

        response.json(res.rows);
    });
}

exports.getProdutosByNome = (request, response, next) => {
    const { nome } = request.params;

    pool.query('SELECT * FROM produtos WHERE nome ilike $1', [`${nome}%`], (err, res) => {
        if (err) return next(err);

        response.json(res.rows);
    })
}


exports.postProdutos = (request, response, next) => {
    const { nome, categoria, resumo, usuario_id } = request.body;

    pool.query('INSERT INTO produtos(nome, categoria, resumo, usuario_id) VALUES($1, $2, $3, $4)',
    [nome, categoria, resumo, usuario_id],
    (err, res) => {
        if (err) return next(err);

        response.redirect('/produtos');
    }
    );
}

exports.deleteProduto = (request, response, next) => {
    const { id } = request.params;

    pool.query('DELETE FROM produtos WHERE id=($1)', [id], (err, res) => {
        if (err) return next(err);

        response.redirect('/produtos');
    });
}
