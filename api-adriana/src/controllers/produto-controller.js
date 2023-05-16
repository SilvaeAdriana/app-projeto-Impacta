const pool = require('../db');

exports.getAllProdutos = (request, response, next) => {
    pool.query(
            `SELECT 
                produtos.id as id,
                produtos.nome as nome,
                categoria,
                resumo,
                reservado,
                usuario_id,
                usuario,
                usuarios.tipo as tipo_usuario FROM produtos inner join usuarios on usuarios.id = produtos.usuario_id`, (err, res) => {
        if (err) return next(err);

        response.json(res.rows);
    });
}

exports.getProdutosReservados = (request, response, next) => {
    const { id } = request.params;
    pool.query(
            `SELECT
            produto_id as id,
            produtos_reservados.usuario_id as usuario_id,
            produtos.nome as nome,
            categoria,
            reservado,
            resumo,
            usuario,
            usuarios.tipo as tipo_usuario
            FROM produtos_reservados inner join produtos on produtos.id = produtos_reservados.produto_id 
            inner join usuarios on usuarios.id = produtos_reservados.usuario_id
                WHERE produtos_reservados.usuario_id = $1`, [id], (err, res) => {
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

exports.getProdutosByCategoria = (request, response, next) => {
    const { categoria } = request.params;

    pool.query(`
        SELECT 
        produtos.id as id,
        produtos.nome as nome,
        categoria,
        resumo,
        reservado,
        usuario_id,
        usuario,
        usuarios.tipo as tipo_usuario
            FROM produtos inner join usuarios on usuarios.id = produtos.usuario_id WHERE categoria ilike $1
            `, [`${categoria}%`], (err, res) => {
        if (err) return next(err);

        response.json(res.rows);
    })
}


exports.postProdutos = (request, response, next) => {
    const { nome, categoria, resumo, usuario_id } = request.body;

    pool.query('INSERT INTO produtos(nome, categoria, resumo, reservado, usuario_id) VALUES($1, $2, $3, $4, $5)',
    [nome, categoria, resumo, reservado = false, usuario_id],
    (err, res) => {
        if (err) return next(err);

        response.redirect('/produtos');
    }
    );
}

exports.reservarProduto = (request, response, next) => {
    const { usuario_id, produto_id } = request.body;

   pool.query(
        `UPDATE produtos SET reservado = true WHERE id=($1)`,
        [produto_id])

    pool.query('INSERT INTO produtos_reservados(usuario_id, produto_id) VALUES($1, $2)',
    [usuario_id, produto_id],
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
