public class Revista extends ItemBiblioteca {
    private final int edicao;

    public Revista(String codigo, String titulo, int edicao) {
        super(codigo, titulo);
        if (edicao <= 0) throw new IllegalArgumentException("A edição deve ser positiva.");
        this.edicao = edicao;
    }

    public int getEdicao() { return edicao; }

    @Override public int getPrazoDevolucaoDias() { return 7; }
    @Override public double getMultaPorDia() { return 1.00; }
    @Override public String getTipo() { return "Revista"; }
}
