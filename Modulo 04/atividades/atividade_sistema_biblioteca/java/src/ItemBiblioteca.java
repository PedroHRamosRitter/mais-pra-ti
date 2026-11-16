public abstract class ItemBiblioteca {
    private final String codigo;
    private final String titulo;
    private boolean disponivel;

    public ItemBiblioteca(String codigo, String titulo) {
        if (codigo == null || codigo.isBlank()) {
            throw new IllegalArgumentException("O código é obrigatório.");
        }
        if (titulo == null || titulo.isBlank()) {
            throw new IllegalArgumentException("O título é obrigatório.");
        }
        this.codigo = codigo;
        this.titulo = titulo;
        this.disponivel = true;
    }

    public String getCodigo() { return codigo; }
    public String getTitulo() { return titulo; }
    public boolean isDisponivel() { return disponivel; }

    // O prazo e a multa dependem da categoria concreta do item.
    public abstract int getPrazoDevolucaoDias();
    public abstract double getMultaPorDia();

    // Visibilidade de pacote: a alteração é controlada pela Biblioteca.
    void marcarEmprestado() { this.disponivel = false; }
    void marcarDevolvido() { this.disponivel = true; }

    public abstract String getTipo();

    @Override
    public String toString() {
        return String.format("%s | %s | %s | %s",
                codigo, titulo, getTipo(), disponivel ? "Disponível" : "Emprestado");
    }
}
