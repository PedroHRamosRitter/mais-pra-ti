package aula01;

public class NotificadoEmail implements Notificador {
    public void enviar(String destinatario, String mensagem)  {
        System.out.println("[E-mail] para: "  + destinatario);
        System.out.println("    " + mensagem);
    }
}
