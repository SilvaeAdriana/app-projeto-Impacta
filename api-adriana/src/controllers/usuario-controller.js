const pool = require('../db');

exports.getAllUsuarios = (request, response, next) => {
    pool.query('SELECT * FROM usuarios ORDER BY id ASC', (err, res) => {
        if (err) return next(err);

        response.json(res.rows);
    });
}

exports.getUsuarioById = (request, response, next) => {
    const { id } = request.params;

    pool.query('SELECT * FROM usuarios WHERE id = $1', [id], (err, res) => {
        if (err) return next(err);

        response.json(res.rows);
    });
}

exports.loginUsuario = async (req, res, next) => {

    const { id, usuario, senha } = req.body;

    try {
        const query = `SELECT * FROM usuarios WHERE usuario = $1`;
        var results = await pool.query(query, [usuario]);

        if (results.length < 1) {
            return res.status(401).send({message: 'Falha na autenticação'})
        }

        if (senha == results.rows[0].senha) {
            return res.status(200).send({
             mensagem: 'Autenticado com sucessso',
             id: results.rows[0].id,
             usuario: usuario,
        });
        }
        return res.status(401).send({ message: 'Falha na autenticação'})

    } catch (error) {
        return res.status(500).send({ message: 'Falha na autenticação'});
    }
    
    
};

exports.cadastrarUsuario = (request, response, next) => {
    const { nome, usuario, email, endereco, tipo, senha} = request.body;

    pool.query('INSERT INTO usuarios (nome, usuario, email, endereco, tipo, senha) VALUES($1, $2, $3, $4, $5, $6)',
    [nome, usuario, email, endereco, tipo, senha],
    (err, res) => {
        if (err) return next(err);

        response.status(200).send({ message: 'Usuário cadastrado com sucesso!'})
    }
    );
};

exports.deleteUsuario = (request, response, next) => {
    const { id } = request.params;

    pool.query('DELETE FROM usuarios WHERE id=($1)', [id], (err, res) => {
        if (err) return next(err);

        response.redirect('/usuarios');
    });
}
