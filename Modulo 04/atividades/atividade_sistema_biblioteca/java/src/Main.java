public class Main {
    public static void main(String[] args) {
        Biblioteca biblioteca = new Biblioteca();

        // Cadastro de itens: inclui DVD para demonstrar que a hierarquia é extensível.
        biblioteca.cadastrarItem(new Livro("L001", "Clean Code", "Robert C. Martin"));
        biblioteca.cadastrarItem(new Livro("L002", "Effective Java", "Joshua Bloch"));
        biblioteca.cadastrarItem(new Revista("R001", "Java Magazine", 42));
        biblioteca.cadastrarItem(new DVD("D001", "Introdução à Programação"));

        Aluno aluno = new Aluno("Ana Souza");
        Professor professor = new Professor("Carlos Lima");
        biblioteca.cadastrarUsuario(aluno);
        biblioteca.cadastrarUsuario(professor);

        // O aluno pode pegar três itens; o quarto empréstimo será recusado.
        biblioteca.emprestar("L001", aluno);
        biblioteca.emprestar("L002", aluno);
        biblioteca.emprestar("R001", aluno);
        biblioteca.emprestar("D001", aluno); // recusado: limite de 3 atingido

        // O professor possui limite independente de cinco itens.
        biblioteca.emprestar("D001", professor);

        biblioteca.listarAcervo();
        biblioteca.devolver("D001", professor);
        biblioteca.listarAcervo();
    }
}
