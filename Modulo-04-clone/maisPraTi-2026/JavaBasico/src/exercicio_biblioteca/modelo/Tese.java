package exercicio_biblioteca.modelo;

public class Tese extends ItemEmprestavel {

    private final String autor;
    private final String orientador;
    private final String programaPosGraduacao;

    public Tese(String codigo, String titulo, int ano, String autor,
                String orientador, String programaPosGraduacao) {

        super(codigo, titulo, ano);

        if (autor == null || autor.isBlank()) {
            throw new IllegalArgumentException("Autor da tese e obrigatorio.");
        }

        this.autor = autor;
        this.orientador = orientador;
        this.programaPosGraduacao = programaPosGraduacao;
    }

    @Override
    public int getPrazoEmprestimoDias() {
        return 7;
    }

    @Override
    public double getMultaPorDia() {
        return 1.50;
    }

    @Override
    public boolean emprestar(Usuario usuario) {

        if (usuario == null) {
            throw new IllegalArgumentException("Usuario nao pode ser nulo.");
        }

        if (!usuario.podeRetirarMaterialRestrito()) {
            System.out.printf(
                    "   [X] %-22s tentou \"%s\" - restrito a pos-graduacao%n",
                    usuario.getNome(),
                    getTitulo()
            );
            return false;
        }

        return super.emprestar(usuario);
    }

    @Override
    public String getCategoria() {
        return "TESE";
    }

    @Override
    public String getDescricao() {
        return autor + " | Orient.: " + orientador +
                " | " + programaPosGraduacao;
    }
}