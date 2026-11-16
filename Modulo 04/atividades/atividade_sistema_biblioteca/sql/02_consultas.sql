-- EXERCÍCIO 3 — QUATRO CONSULTAS SQL

-- 1. Todo o acervo: código, título, tipo e disponibilidade.
SELECT codigo, titulo, tipo, disponivel
FROM item
ORDER BY codigo;

-- 2. Empréstimos em aberto, com usuário e item.
SELECT
    u.nome AS usuario,
    i.titulo AS item,
    e.data_retirada,
    e.data_devolucao_prevista
FROM emprestimo AS e
JOIN usuario AS u ON u.id = e.usuario_id
JOIN item AS i ON i.id = e.item_id
WHERE e.data_devolucao IS NULL
ORDER BY e.data_devolucao_prevista;

-- 3. Total de multas acumuladas por usuário.
-- LEFT JOIN também inclui usuários que ainda não tiveram multas/empréstimos.
SELECT
    u.id,
    u.nome,
    COALESCE(SUM(e.valor_multa), 0.00) AS total_multas
FROM usuario AS u
LEFT JOIN emprestimo AS e ON e.usuario_id = u.id
GROUP BY u.id, u.nome
ORDER BY u.nome;

-- 4. Itens que nunca foram emprestados.
SELECT
    i.id,
    i.codigo,
    i.titulo,
    i.tipo
FROM item AS i
LEFT JOIN emprestimo AS e ON e.item_id = i.id
WHERE e.id IS NULL
ORDER BY i.codigo;
