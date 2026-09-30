package aula01;

public class NotificadorSMS implements Notificador {
    public void enviar(String destinatario, String meesagem) {
        System.out.println("Enviando mensagem via SMS: " + destinatario);
        System.out.println("    " + meesagem);
    }
}
