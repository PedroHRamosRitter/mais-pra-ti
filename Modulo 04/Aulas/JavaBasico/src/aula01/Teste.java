package aula01;//public class main.Main {
//    public static void main(String[] args) {
//        System.out.println("Olá, Mundo!");

        /*
        * TIpos Primitivos -> Guardam o valor diretamente - São 8 byte, short, int, float...
        * Tipos Por Referência -> Guardam o endereço de um objeto. String, Arrays...
        *
        * byte    - 8 bits - -128 a 127
        * short   - 16 bits
        * int     - 32 bits
        * long    - 64 bits
        * float   - 32 bits ~7 casas de precição.
        * double  - 64 bits ~15 casas de precisão
        * char    - 16 bits
        * boolean - true or false
        *
         */

//        byte idade = 35;
//        short ano = 2026;
//        int populacao = 213000;
//        long distancia = 1002021902L;
//        float altura = 1.75f;
//        double pi = 3.14123213123;
//        char inicial = 'J';
//        boolean certo = true;
//
//        System.out.println("Idade: " + idade + " | Altura: " + altura + "m");
//        System.out.println(0.1 + 0.2);
//
//        String nome = "Pedro Henrique";
//        System.out.println(nome.length());
//        System.out.println(nome.toUpperCase());
//        System.out.println(nome.charAt(0));

//        String a = "Java";
//        String b = "Java";
//        String c = new String("Java");
//
//        System.out.println(a == b);
//        System.out.println(a == c);
//        System.out.println(a.equals(c)); // equals -> ver o conteudo se é igual

//        var nome = "Pedro";
//
//        final double Taxa_juros = 0.05;
//        int soma = 7 + 3;
//        int div = 7/2;
//        double d = 7/2.0;

//        int nota = 75;
//        if(nota >= 90) {
//            System.out.println("Excelente");
//        } else if (nota >= 70) {
//            System.out.println("Bom");
//        } else {
//            System.out.println("Reprovado");
//        }

//        int idade = 18;
//        String status = (idade >= 18) ? "Maior de Idade" : "Menor de idade";
//
//        System.out.println(status);

//        int diaSemana = 1;
//
//        switch (diaSemana) {
//            case 1:
//                System.out.println("Domingo");
//                break;
//            case 2:
//                System.out.println("Segunda");
//            default:
//                System.out.println("Dia inválido");
//        }
//
//        int mes = 7;
//
//        String estacao = switch (mes) {
//            case 12, 1, 2 -> "Verão";
//            case 3, 4, 5 -> "Outono";
//            case 6, 7, 8 -> "Inverno";
//            case 9, 10, 11 -> "Primavera";
//            default -> "mês inválido";
//        };
//
//        System.out.println(estacao);

//        int contador = 1;
//
//                while(contador <= 5) {
//                System.out.println("Contagem " + contador);
//        contador++;
//                }

//       int[] numeros = {10, 20, 30, 40, 50};
//
//       System.out.println(Arrays.toString(numeros));

//    }
//}

public class Teste {
    public static void main(String[] args) {
        int[][] matriz = new int[3][4];

                int[][] tabela = {
                        {1, 2, 3},
                        {4, 5, 6},
                        {7, 8, 9}
                };
        System.out.println(java.util.Arrays.deepToString(tabela));


    }
}