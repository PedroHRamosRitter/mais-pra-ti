import aula01.NotificadoEmail;
import aula01.Notificador;
import aula01.NotificadorSMS;

public class main {
    public static class Main {
        public static void main(String[] args) {
    //        Pessoa p1 = new Pessoa();
    //        p1.nome = "Pedro";
    //        p1.idade = 18;
    //
    //        Pessoa p2 = new Pessoa();
    //        p2.nome = "Luciano";
    //        p2.idade = 48;
    //
    //        p1.apresentar("Brasileiro");
    //        p2.apresentar("Brasileiro");
    //
    //        Pessoa p3 = p1;
    //        p3.nome = "Eduardo";
    //        System.out.println(p1.nome);
    //
    //        Pessoa p4 = null;
    ////        p4.apresentar();
    //
    //        Pessoa p5 = new Pessoa("Eu", 15);
    //
    //        int numeroTeste = 10;
    //
    //        double resultado = p1.calcularDesconto(numeroTeste, 10);
    //        System.out.println(numeroTeste);
    //        System.out.println(resultado);
    //
    //        int[] a = {10, 20};
    //
    //        p1.alterar(a);
    //        System.out.println(a[0]);
    //
    //        System.out.println(Pessoa.getSexo());

            Notificador[] canais = {
                    new NotificadoEmail(),
                    new NotificadorSMS()
            };

            for(Notificador canal : canais) {
                canal.enviar("Adriano", "Ta me ouvindo?");
            }
        }
    }
}
