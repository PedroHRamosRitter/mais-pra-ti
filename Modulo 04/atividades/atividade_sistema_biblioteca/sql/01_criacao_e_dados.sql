-- SISTEMA DE BIBLIOTECA — PostgreSQL
-- Execute este script em um banco de dados de testes.

DROP TABLE IF EXISTS emprestimo;
DROP TABLE IF EXISTS item;
DROP TABLE IF EXISTS usuario;

-- 1. Tabela de itens do acervo.
CREATE TABLE item (
    id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    codigo       VARCHAR(20) NOT NULL UNIQUE,
    titulo       VARCHAR(200) NOT NULL,
    tipo         VARCHAR(20) NOT NULL CHECK (tipo IN ('livro', 'revista')),
    autor        VARCHAR(150),
    edicao       INTEGER CHECK (edicao IS NULL OR edicao > 0),
    disponivel   BOOLEAN NOT NULL DEFAULT TRUE,
    -- Livro usa autor; revista usa edicao.
    CONSTRAINT ck_item_dados_tipo CHECK (
        (tipo = 'livro' AND autor IS NOT NULL AND edicao IS NULL)
        OR
        (tipo = 'revista' AND edicao IS NOT NULL AND autor IS NULL)
    )
);

-- 2. Tabela de usuários.
CREATE TABLE usuario (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome          VARCHAR(150) NOT NULL,
    tipo          VARCHAR(20) NOT NULL CHECK (tipo IN ('aluno', 'professor')),
    limite_itens  INTEGER NOT NULL CHECK (limite_itens > 0),
    CONSTRAINT ck_usuario_limite_tipo CHECK (
        (tipo = 'aluno' AND limite_itens = 3)
        OR
        (tipo = 'professor' AND limite_itens = 5)
    )
);

-- 3. Tabela de empréstimos: depende de item e usuario.
CREATE TABLE emprestimo (
    id                       BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    item_id                  BIGINT NOT NULL REFERENCES item(id),
    usuario_id               BIGINT NOT NULL REFERENCES usuario(id),
    data_retirada            DATE NOT NULL,
    data_devolucao_prevista  DATE NOT NULL,
    data_devolucao           DATE,
    valor_multa              NUMERIC(10,2) NOT NULL DEFAULT 0
                             CHECK (valor_multa >= 0),
    CONSTRAINT ck_datas_emprestimo CHECK (
        data_devolucao_prevista >= data_retirada
        AND (data_devolucao IS NULL OR data_devolucao >= data_retirada)
    )
);

-- Dados de teste: quatro itens.
INSERT INTO item (codigo, titulo, tipo, autor, edicao, disponivel) VALUES
('L001', 'Clean Code', 'livro', 'Robert C. Martin', NULL, FALSE),
('L002', 'Effective Java', 'livro', 'Joshua Bloch', NULL, TRUE),
('R001', 'Java Magazine', 'revista', NULL, 42, TRUE),
('R002', 'Mundo Java', 'revista', NULL, 18, TRUE);

-- Dois usuários.
INSERT INTO usuario (nome, tipo, limite_itens) VALUES
('Ana Souza', 'aluno', 3),
('Carlos Lima', 'professor', 5);

-- Dois empréstimos: um aberto e um já devolvido.
-- As datas são fixas para que os exemplos sejam reproduzíveis.
INSERT INTO emprestimo
    (item_id, usuario_id, data_retirada, data_devolucao_prevista,
     data_devolucao, valor_multa)
VALUES
    (1, 1, DATE '2026-11-10', DATE '2026-11-24', NULL, 0.00),
    (3, 2, DATE '2026-10-01', DATE '2026-10-08', DATE '2026-10-10', 2.00);

-- Mantém a disponibilidade coerente com o empréstimo em aberto.
UPDATE item
SET disponivel = FALSE
WHERE id IN (
    SELECT item_id FROM emprestimo WHERE data_devolucao IS NULL
);
