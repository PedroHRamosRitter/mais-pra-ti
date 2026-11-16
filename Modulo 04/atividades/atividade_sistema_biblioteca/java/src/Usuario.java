public abstract class Usuario {
    private final String nome;
    private int quantidadeEmprestada;

    public Usuario(String nome) {
        if (nome == null || nome.isBlank()) {
            throw new IllegalArgumentException("O nome é obrigatório.");
        }
        this.nome = nome;
        this.quantidadeEmprestada = 0;
    }

    public String getNome() { return nome; }
    public int getQuantidadeEmprestada() { return quantidadeEmprestada; }

    public abstract int getLimiteItens();
    public abstract String getTipo();

    boolean podeEmprestar() {
        return quantidadeEmprestada < getLimiteItens();
    }

    void registrarEmprestimo() { quantidadeEmprestada++; }

    void registrarDevolucao() {
        if (quantidadeEmprestada > 0) quantidadeEmprestada--;
    }
}
