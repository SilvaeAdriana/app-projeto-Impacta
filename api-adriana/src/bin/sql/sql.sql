CREATE TABLE IF NOT EXISTS usuarios (
    id serial primary key,
    nome VARCHAR(255) not null,
    usuario VARCHAR(255) not null,
    email VARCHAR(255) not null,
    endereco VARCHAR(255) not null,
    senha VARCHAR(255) not null,
    tipo VARCHAR(255) not null
);

CREATE TABLE IF NOT EXISTS produtos (
    id serial primary key,
    nome VARCHAR(255) not null,
    categoria VARCHAR(255) not null,
    resumo VARCHAR(255),
    reservado boolean,
    usuario_id integer not null,
    FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS produtos_reservados (
    id serial primary key,
    usuario_id integer not null,
    produto_id integer not null,
    FOREIGN KEY(usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY(produto_id) REFERENCES produtos(id)
)

