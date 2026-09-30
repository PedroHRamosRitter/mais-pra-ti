package exercicio_biblioteca.contrato;

import exercicio_biblioteca.modelo.Usuario;

public interface Emprestavel {
    int getPrazoEmprestimoDias();
    double getMultaPorDia();
    boolean emprestar(Usuario usuario);
    boolean devolver();

    default boolean permiteRenovacao() {
        return false;
    }

    default double calcularMulta(int diasAtraso) {
        if (diasAtraso <= 0) {
            return 0;
        }
        return diasAtraso * getMultaPorDia();
    }

}
