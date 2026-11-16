import java.time.LocalDate;

public class Biblioteca {
    private final ItemBiblioteca[] acervo = new ItemBiblioteca[100];
    private final Usuario[] usuarios = new Usuario[50];
    private final Emprestimo[] emprestimos = new Emprestimo[200];
    private int totalItens;
    private int totalUsuarios;
    private int totalEmprestimos;

    public boolean cadastrarItem(ItemBiblioteca item) {
        if (item == null || totalItens == acervo.length) return false;
        if (buscarItem(item.getCodigo()) != null) return false;
        acervo[totalItens++] = item;
        return true;
    }

    public boolean cadastrarUsuario(Usuario usuario) {
        if (usuario == null || totalUsuarios == usuarios.length) return false;
        usuarios[totalUsuarios++] = usuario;
        return true;
    }

    public boolean emprestar(String codigoItem, Usuario usuario) {
        ItemBiblioteca item = buscarItem(codigoItem);

        if (item == null) {
            System.out.println("Empréstimo recusado: item não encontrado.");
            return false;
        }
        if (!item.isDisponivel()) {
            System.out.println("Empréstimo recusado: item indisponível.");
            return false;
        }
        if (usuario == null || !usuario.podeEmprestar()) {
            System.out.println("Empréstimo recusado: limite de itens atingido.");
            return false;
        }
        if (totalEmprestimos == emprestimos.length) {
            System.out.println("Empréstimo recusado: capacidade de registros esgotada.");
            return false;
        }

        item.marcarEmprestado();
        usuario.registrarEmprestimo();
        emprestimos[totalEmprestimos++] =
                new Emprestimo(item, usuario, LocalDate.now());

        System.out.println("Empréstimo realizado: " + item.getTitulo()
                + " para " + usuario.getNome());
        return true;
    }

    public boolean devolver(String codigoItem, Usuario usuario) {
        for (int i = 0; i < totalEmprestimos; i++) {
            Emprestimo e = emprestimos[i];
            if (e.estaAberto()
                    && e.getItem().getCodigo().equals(codigoItem)
                    && e.getUsuario() == usuario) {
                LocalDate hoje = LocalDate.now();
                double multa = e.calcularMulta(hoje);
                e.registrarDevolucao(hoje);
                e.getItem().marcarDevolvido();
                usuario.registrarDevolucao();
                System.out.printf("Devolução registrada. Multa: R$ %.2f%n", multa);
                return true;
            }
        }
        System.out.println("Devolução não encontrada para esse usuário e item.");
        return false;
    }

    public void listarAcervo() {
        System.out.println("\n--- ACERVO ---");
        // Polimorfismo: um único laço, sem verificar Livro/Revista/DVD.
        for (int i = 0; i < totalItens; i++) {
            ItemBiblioteca item = acervo[i];
            System.out.printf("%s | prazo: %d dias | multa: R$ %.2f/dia%n",
                    item, item.getPrazoDevolucaoDias(), item.getMultaPorDia());
        }
    }

    private ItemBiblioteca buscarItem(String codigo) {
        for (int i = 0; i < totalItens; i++) {
            if (acervo[i].getCodigo().equals(codigo)) return acervo[i];
        }
        return null;
    }
}
