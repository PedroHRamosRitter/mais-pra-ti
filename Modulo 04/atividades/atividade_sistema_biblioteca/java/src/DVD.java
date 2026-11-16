// Classe extra para demonstrar extensibilidade: Biblioteca não precisa ser alterada.
public class DVD extends ItemBiblioteca {
    public DVD(String codigo, String titulo) {
        super(codigo, titulo);
    }

    @Override public int getPrazoDevolucaoDias() { return 3; }
    @Override public double getMultaPorDia() { return 2.00; }
    @Override public String getTipo() { return "DVD"; }
}
