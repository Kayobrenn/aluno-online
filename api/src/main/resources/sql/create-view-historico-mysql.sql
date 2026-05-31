CREATE OR REPLACE VIEW vw_historico_aluno AS
SELECT
    ma.id AS matricula_id,
    a.id AS aluno_id,
    a.nome_completo AS nome_aluno,
    a.email AS email_aluno,
    a.cpf AS cpf_aluno,
    d.id AS disciplina_id,
    d.nome AS nome_disciplina,
    p.id AS professor_id,
    p.nome_completo AS nome_professor,
    ma.nota1 AS nota1,
    ma.nota2 AS nota2,
    ((ma.nota1 + ma.nota2) / 2.0) AS media,
    ma.status AS status_matricula
FROM matricula_aluno ma
JOIN aluno a ON a.id = ma.aluno_id
JOIN disciplina d ON d.id = ma.disciplina_id
JOIN professor p ON p.id = d.professor_id;