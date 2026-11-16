import java.time.LocalDate;

public class Emprestimo {
    private final ItemBiblioteca item;
    private final Usuario usuario;
    private final LocalDate dataRetirada;
    private final LocalDate dataPrevista;
    private LocalDate dataDevolucao;

    public Emprestimo(ItemBiblioteca item, Usuario usuario, LocalDate dataRetirada) {
        this.item = item;
        this.usuario = usuario;
        this.dataRetirada = dataRetirada;
        this.dataPrevista = dataRetirada.plusDays(item.getPrazoDevolucaoDias());
    }

    public ItemBiblioteca getItem() { return item; }
    public Usuario getUsuario() { return usuario; }
    public LocalDate getDataRetirada() { return dataRetirada; }
    public LocalDate getDataPrevista() { return dataPrevista; }
    public LocalDate getDataDevolucao() { return dataDevolucao; }

    public void registrarDevolucao(LocalDate data) { this.dataDevolucao = data; }

    public double calcularMulta(LocalDate dataDevolucaoEfetiva) {
        long diasAtraso = Math.max(0, java.time.temporal.ChronoUnit.DAYS.between(
                dataPrevista, dataDevolucaoEfetiva));
        return diasAtraso * item.getMultaPorDia();
    }

    public boolean estaAberto() { return dataDevolucao == null; }
}
