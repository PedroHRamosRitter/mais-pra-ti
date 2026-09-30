/*
=======================================================================
  LAÇOS DE REPETIÇÃO EM JAVASCRIPT
  Exemplos didáticos de: for, while e do...while
  
  Um laço (ou loop) serve para repetir um bloco de código várias vezes
  sem precisar escrever a mesma coisa repetidamente.
=======================================================================
*/


// =====================================================================
// 1. LAÇO FOR
// =====================================================================
/*
  Use o FOR quando você SABE de antemão quantas vezes quer repetir.
  
  Estrutura:
  for (início; condição; incremento) {
      // código que se repete
  }
  
  - início     → executado UMA vez antes de tudo (geralmente cria o contador)
  - condição   → verificada ANTES de cada repetição. Se for false, para.
  - incremento → executado APÓS cada repetição (geralmente avança o contador)
*/

console.log("========== EXEMPLOS DE FOR ==========\n")

// ----- Exemplo 1.1: Contagem simples -----
// Conta de 1 até 5, imprimindo cada número.
// i começa em 1, vai enquanto i <= 5, e sobe 1 a cada volta (i++).
console.log("--- Contando de 1 até 5 ---")
for (let i = 1; i <= 5; i++) {
    console.log("Número: " + i)
}
// Saída: 1, 2, 3, 4, 5


// ----- Exemplo 1.2: Contagem regressiva -----
// Também dá para contar de trás para frente!
// i começa em 5, vai enquanto i >= 1, e desce 1 a cada volta (i--).
console.log("\n--- Contagem regressiva de 5 até 1 ---")
for (let i = 5; i >= 1; i--) {
    console.log("Número: " + i)
}
// Saída: 5, 4, 3, 2, 1


// ----- Exemplo 1.3: Pulando de 2 em 2 (números pares) -----
// O incremento não precisa ser sempre +1. Aqui usamos i += 2.
// i += 2 é o mesmo que: i = i + 2
console.log("\n--- Números pares de 0 até 10 ---")
for (let i = 0; i <= 10; i += 2) {
    console.log(i)
}
// Saída: 0, 2, 4, 6, 8, 10


// ----- Exemplo 1.4: Tabuada -----
// Um uso clássico do FOR: calcular a tabuada de qualquer número.
// Aqui multiplicamos o número escolhido por cada valor de 1 a 10.
let numero = 7
console.log("\n--- Tabuada do " + numero + " ---")
for (let i = 1; i <= 10; i++) {
    let resultado = numero * i
    console.log(numero + " x " + i + " = " + resultado)
}


// =====================================================================
// 2. LAÇO WHILE
// =====================================================================
/*
  Use o WHILE quando você NÃO SABE quantas vezes vai repetir.
  A repetição continua enquanto a condição for verdadeira.
  
  Estrutura:
  while (condição) {
      // código que se repete
  }
  
  ATENÇÃO: você precisa garantir que a condição um dia se torne falsa,
  senão o programa fica em loop infinito e trava!
  
  Diferença do FOR: no WHILE você gerencia o contador manualmente,
  fora e dentro do bloco. No FOR, tudo fica na mesma linha.
*/

console.log("\n\n========== EXEMPLOS DE WHILE ==========\n")

// ----- Exemplo 2.1: Contagem simples com while -----
// Fazemos a mesma contagem do Exemplo 1.1, mas com while.
// Note que o contador (i) é criado ANTES e incrementado DENTRO do bloco.
console.log("--- Contando de 1 até 5 com while ---")
let i = 1                  // início: criamos o contador fora do while
while (i <= 5) {           // condição: continua enquanto i for <= 5
    console.log("Número: " + i)
    i++                    // incremento: avançamos o contador DENTRO do bloco
}
// Se esquecer o i++, o while nunca para → loop infinito!


// ----- Exemplo 2.2: Validação de entrada do usuário -----
// Este é o uso mais natural do WHILE: repetir até o usuário acertar.
// Não sabemos quantas tentativas ele vai precisar, por isso usamos while.
// (Descomente as linhas com PROMPT para testar no terminal)
console.log("\n--- Simulação: Adivinhe o número secreto ---")
let numeroSecreto = 42
let chute = 0              // começamos com um valor que não é o secreto
let tentativas = 0

// O loop continua enquanto o chute for diferente do número secreto.
// while (chute !== numeroSecreto) {
//     chute = Number(PROMPT("Digite um número entre 1 e 100: "))
//     tentativas++
//     if (chute < numeroSecreto) console.log("Tente um número maior!")
//     if (chute > numeroSecreto) console.log("Tente um número menor!")
// }
// console.log("Parabéns! Você acertou em " + tentativas + " tentativa(s)!")

// Simulação sem PROMPT para este arquivo:
let palpites = [10, 60, 35, 42]   // simula as tentativas do usuário
let indice = 0
chute = 0
while (chute !== numeroSecreto) {
    chute = palpites[indice]
    tentativas++
    indice++
    if (chute < numeroSecreto) console.log("Chute " + chute + " → Tente um número maior!")
    else if (chute > numeroSecreto) console.log("Chute " + chute + " → Tente um número menor!")
}
console.log("Acertou! O número era " + numeroSecreto + ". Tentativas: " + tentativas)


// ----- Exemplo 2.3: Somar dígitos de um número -----
// Não sabemos quantos dígitos o número tem, então while é ideal.
// A cada volta, "arrancamos" o último dígito com % 10 e eliminamos ele com Math.floor.
let numeroParaSomar = 4823
let somaDosDigitos = 0
let auxiliar = numeroParaSomar    // usamos uma cópia para não destruir o original

console.log("\n--- Soma dos dígitos de " + numeroParaSomar + " ---")
while (auxiliar > 0) {
    let ultimoDigito = auxiliar % 10        // pega o último dígito (ex: 4823 % 10 = 3)
    somaDosDigitos += ultimoDigito          // adiciona à soma
    auxiliar = Math.floor(auxiliar / 10)   // remove o último dígito (ex: 4823 / 10 = 482)
    console.log("Dígito extraído: " + ultimoDigito + " | Restante: " + auxiliar)
}
console.log("Soma dos dígitos: " + somaDosDigitos)
// 4+8+2+3 = 17


// ----- Exemplo 2.4: Crescimento com juros compostos -----
// Não sabemos em quantos meses o saldo vai dobrar. Perfeito para while!
let saldo = 1000.00
let taxaMensal = 0.05   // 5% ao mês
let meses = 0
let meta = saldo * 2    // queremos dobrar o valor inicial

console.log("\n--- Quantos meses para dobrar R$ " + saldo.toFixed(2) + " a 5% ao mês? ---")
while (saldo < meta) {
    saldo = saldo * (1 + taxaMensal)   // aplica o rendimento do mês
    meses++
    console.log("Mês " + meses + ": R$ " + saldo.toFixed(2))
}
console.log("O saldo dobrou em " + meses + " meses!")


// =====================================================================
// 3. LAÇO DO...WHILE
// =====================================================================
/*
  O DO...WHILE é parecido com o WHILE, com UMA diferença fundamental:
  
  → O bloco de código é executado PELO MENOS UMA VEZ antes de verificar
    a condição. No while comum, se a condição já começar falsa, o bloco
    nunca executa.
  
  Estrutura:
  do {
      // código que se repete
  } while (condição)
  
  Use quando a ação precisa acontecer ao menos uma vez antes de decidir
  se repete ou não. Exemplo clássico: mostrar um menu ao usuário.
*/

console.log("\n\n========== EXEMPLOS DE DO...WHILE ==========\n")


// ----- Exemplo 3.1: Comparação while vs do...while -----
// Veja a diferença quando a condição começa FALSA:
console.log("--- Diferença: while vs do...while com condição falsa ---")

let contador = 10   // condição (contador < 5) já começa falsa

// O WHILE testa ANTES: como 10 < 5 é falso, NÃO executa nenhuma vez.
console.log("Resultado com while:")
while (contador < 5) {
    console.log("while executou! contador = " + contador)
}
console.log("O while não imprimiu nada pois a condição já era falsa.")

// O DO...WHILE executa PRIMEIRO, testa DEPOIS: imprime uma vez mesmo assim.
console.log("\nResultado com do...while:")
do {
    console.log("do...while executou! contador = " + contador)
} while (contador < 5)
console.log("O do...while executou uma vez antes de testar a condição.")


// ----- Exemplo 3.2: Menu de opções -----
// O caso de uso mais comum do do...while: um menu que sempre aparece
// ao menos uma vez, e repete até o usuário escolher sair.
// (Descomente as linhas com PROMPT para testar no terminal)
console.log("\n--- Simulação de Menu ---")

// let opcao
// do {
//     console.log("\n===== MENU =====")
//     console.log("1 - Cadastrar")
//     console.log("2 - Listar")
//     console.log("3 - Sair")
//     opcao = Number(PROMPT("Escolha uma opção: "))
//     
//     if (opcao === 1) console.log("→ Cadastrando...")
//     else if (opcao === 2) console.log("→ Listando...")
//     else if (opcao === 3) console.log("→ Saindo do sistema. Até logo!")
//     else console.log("→ Opção inválida!")
//     
// } while (opcao !== 3)   // continua até o usuário escolher sair

// Simulação sem PROMPT:
let opcao
let sequenciaOpcoes = [1, 2, 5, 3]   // simula as escolhas do usuário
let idx = 0

do {
    opcao = sequenciaOpcoes[idx]
    idx++
    console.log("\nOpção escolhida: " + opcao)
    if (opcao === 1)      console.log("→ Cadastrando...")
    else if (opcao === 2) console.log("→ Listando...")
    else if (opcao === 3) console.log("→ Saindo do sistema. Até logo!")
    else                  console.log("→ Opção inválida! Tente novamente.")
} while (opcao !== 3)


// ----- Exemplo 3.3: Validação de senha -----
// O usuário DEVE digitar ao menos uma vez. Se errar, tenta de novo.
// Não faz sentido verificar a senha antes de pedir para o usuário digitá-la.
console.log("\n--- Simulação: Validação de senha ---")

let senhaCorreta = "abc123"
let senhaDigitada
let tentativasSenha = 0
let maxTentativas = 3
let sequenciaSenhas = ["errada", "123456", "abc123"]  // simulação
let idxSenha = 0

do {
    senhaDigitada = sequenciaSenhas[idxSenha]   // simula o PROMPT
    idxSenha++
    tentativasSenha++
    console.log("Tentativa " + tentativasSenha + ": digitou '" + senhaDigitada + "'")

    if (senhaDigitada !== senhaCorreta && tentativasSenha < maxTentativas) {
        console.log("Senha incorreta! Tente novamente.")
    }
} while (senhaDigitada !== senhaCorreta && tentativasSenha < maxTentativas)

if (senhaDigitada === senhaCorreta) {
    console.log("Acesso liberado!")
} else {
    console.log("Número máximo de tentativas atingido. Acesso bloqueado.")
}


// =====================================================================
// RESUMO FINAL — Quando usar cada um?
// =====================================================================
/*
  ┌─────────────┬──────────────────────────────────────────────────────┐
  │    LAÇO     │  QUANDO USAR                                         │
  ├─────────────┼──────────────────────────────────────────────────────┤
  │    FOR      │ Quando se sabe o número exato de repetições.         │
  │             │ Ex: percorrer array, tabuada, contar de X até Y.     │
  ├─────────────┼──────────────────────────────────────────────────────┤
  │    WHILE    │ Quando NÃO se sabe quantas vezes vai repetir.        │
  │             │ Ex: aguardar entrada válida, simular processos,      │
  │             │ repetir até atingir uma meta.                        │
  ├─────────────┼──────────────────────────────────────────────────────┤
  │  DO...WHILE │ Igual ao while, mas garante ao menos UMA execução.   │
  │             │ Ex: menus, validação de senha, qualquer situação     │
  │             │ onde a ação deve ocorrer antes da verificação.       │
  └─────────────┴──────────────────────────────────────────────────────┘
*/