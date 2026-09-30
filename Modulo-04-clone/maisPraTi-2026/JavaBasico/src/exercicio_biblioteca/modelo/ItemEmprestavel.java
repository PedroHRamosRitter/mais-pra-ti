package exercicio_biblioteca.modelo;

import exercicio_biblioteca.contrato.Emprestavel;

public abstract class ItemEmprestavel extends ItemAcervo implements Emprestavel {
    private Usuario usuarioAtual;

    protected ItemEmprestavel(String codigo, String titulo, int ano) {
        super(codigo, titulo, ano);
        this.usuarioAtual = null;
    }

    @Override
    public boolean emprestar(Usuario usuario) {
        if(usuario == null) {
            throw new IllegalArgumentException("Usuario não pode sernulo");
        }

        if(!isDisponivel()) {
           System.out.println("Item indisponível.");
           return false;
        }

        marcarComoEmprestado();
        return true;
    }

    @Override
    public boolean devolver() {
        if (isDisponivel()) {
            return false;
        }

        usuarioAtual = null;
        marcarComoDisponivel();
        return true;
    }

}
