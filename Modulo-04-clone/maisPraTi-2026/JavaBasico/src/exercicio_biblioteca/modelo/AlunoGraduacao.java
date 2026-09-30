package exercicio_biblioteca.modelo;

public class AlunoGraduacao extends Usuario {
    private final String curso;
    private final int periodo;

    public AlunoGraduacao(String matricula, String nome, String email,
                          String curso, int periodo) {
        super(matricula, nome, email);

        this.curso = curso;
        this.periodo = periodo;
    }

    @Override
    public int getLimiteEmprestimos() {
        return 3;
    }

    @Override
    public double getPercentualDesconto() {
        return 0.0;
    }

    @Override
    public String getCategoria() {
        return "ALUNO_GRADUACAO";
    }

    @Override
    public boolean podeRetirarMaterialRestrito() {
        return false;
    }
}