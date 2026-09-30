package exercicio_biblioteca.servicos;

import exercicio_biblioteca.contrato.Config;
import exercicio_biblioteca.modelo.ItemAcervo;
import exercicio_biblioteca.modelo.Usuario;

public class Biblioteca {
    private final String nome;
    private final ItemAcervo[] acervo;
    private int totalItens;
    private final Usuario[] usuarios;
    private int totalUsuarios;

    public Biblioteca (String nome) {
        this.nome = nome;
        this.acervo = new ItemAcervo[Config.CAPACIDADE_ACERVO];
        this.usuarios = new Usuario[Config.CAPACIDADE_USUARIOS];
        this.totalItens = 0;
        this.totalItens = 0;
    }


    public void cadastarItem(ItemAcervo item) {
        acervo[totalItens++]  = item;
        totalItens++;
    }
}
