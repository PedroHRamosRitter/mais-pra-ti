package aula07;

public abstract class Funcionario {
    protected String nome;
    protected double salario;
    protected final String cpf; // final nao pode alterar e impede a heranca

    public Funcionario(String nome, double salario, String cpf) {
        this.nome = nome;
        this.salario = salario;
        this.cpf = cpf;
    }

    public double calcularSalario() { // abstrata implementa, interface extende
        return this.salario;

    }

    public String toString() {
        return "Nome: " + this.nome + "\nSalário: " + this.salario;
    }

}