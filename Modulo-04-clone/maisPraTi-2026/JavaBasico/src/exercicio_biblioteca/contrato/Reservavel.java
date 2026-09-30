package exercicio_biblioteca.contrato;

import exercicio_biblioteca.modelo.Usuario;

public interface Reservavel {
    void reservar(Usuario usuario);
    boolean temReserva();
    String getReservante();

}
