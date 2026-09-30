package exercicio_biblioteca.modelo;

public class ObraReferencia extends ItemAcervo {

    private final String tipoObra;
    private final String localizacaoEstante;

    public ObraReferencia(String codigo, String titulo, int ano,
                          String tipoObra, String localizacaoEstante) {

        super(codigo, titulo, ano);

        this.tipoObra = tipoObra;
        this.localizacaoEstante = localizacaoEstante;
    }

    public void consultarNoLocal(Usuario usuario) {
        System.out.println(
                "Obra referência consultada pelo usuário: " + usuario.getNome()
        );

        System.out.println(
                "Localização da obra referência: " + localizacaoEstante
        );
    }

    @Override
    public String getCategoria() {
        return "Referência";
    }

    @Override
    public String getDescricao() {
        return "Tipo de obra: " + tipoObra +
                " | Localização: " + localizacaoEstante;
    }

    public String getLocalizacaoEstante() {
        return this.localizacaoEstante;
    }
}