/*
=======================================================================
  EXERCÍCIOS DE LÓGICA DE PROGRAMAÇÃO
=======================================================================
*/

// Esta linha importa o módulo 'prompt-sync', que permite ao programa
// pausar e esperar que o usuário digite algo no terminal.
// Sem isso, JavaScript (no Node.js) não consegue ler entradas do teclado.
const PROMPT = require('prompt-sync')()


// =====================================================================
// EXERCÍCIO 1 — Conversão de Celsius para Fahrenheit
// =====================================================================
/*
    Escreva um algoritmo para ler uma temperatura em graus Celsius, calcular e escrever o
    valor correspondente em graus Fahrenheit.
*/

// PROMPT() exibe a mensagem entre aspas e aguarda o usuário digitar.
// Number() converte o que foi digitado (que chega como texto/string) para número.
// Sem Number(), a conta matemática não funcionaria corretamente.
let celsius = Number(PROMPT('Informe a temperatura que deseja converter em Fahrenheit: '))

// Fórmula oficial de conversão: F = (C × 9/5) + 32
// Multiplicamos por 9/5 (equivale a 1.8) e somamos 32 ao final.
let fahrenheit = (celsius * 9/5) + 32

// Exibe o resultado para o usuário no terminal.
console.log('O resultado em fahrenheit é: ' + fahrenheit)


// =====================================================================
// EXERCÍCIO 2 — Percentual de Votos em uma Eleição
// =====================================================================
/*
    Escreva um algoritmo para ler o número de eleitores de um município, o número de
    votos brancos, nulos e válidos. Calcular e escrever o percentual que cada um representa
    em relação ao total de eleitores.
*/

// Lemos cada dado separadamente, sempre convertendo para número.
let totalEleitores = Number(PROMPT("Informe o número total de eleitores do município: "))
let votosBrancos   = Number(PROMPT("Informe o número total de votos em branco: "))
let votosNulos     = Number(PROMPT("Informe o número total de votos nulos: "))
let votosValidos   = Number(PROMPT("Informe o número total de votos válidos: "))

// Somamos os três tipos de voto para saber quantas pessoas votaram de fato.
let totalVotos = votosBrancos + votosNulos + votosValidos

// Abstenções = quem tinha direito a votar mas não apareceu.
// Subtraímos o total de votos do total de eleitores cadastrados.
let abstencoes = totalEleitores - totalVotos

// Regra de três simples: (parte / total) × 100 = percentual
// Fazemos isso para cada categoria de voto.
let percentualBrancos    = (votosBrancos  / totalEleitores) * 100
let percentualNulos      = (votosNulos    / totalEleitores) * 100
let percentualValidos    = (votosValidos  / totalEleitores) * 100
let percentualAbstencoes = (abstencoes    / totalEleitores) * 100

// Exibimos um relatório formatado. O uso de '======' e '------' é apenas
// visual, para deixar o resultado mais organizado no terminal.
console.log('======= Resultado da Eleição =========')
console.log('Total de eleitores: ' + totalEleitores)
console.log('----------------------')
console.log('Votos válidos: '  + votosValidos  + " -> " + percentualValidos    + "%")
console.log('Votos brancos: '  + votosBrancos  + " -> " + percentualBrancos    + "%")
console.log('Votos nulos: '    + votosNulos    + " -> " + percentualNulos      + "%")
console.log('Abstenções: '     + abstencoes    + " -> " + percentualAbstencoes + "%")


// =====================================================================
// EXERCÍCIO 3 — Números de 1000 a 1999 com resto 5 ao dividir por 11
// =====================================================================
/*
    Escreva um algoritmo que gere os números de 1000 a 1999 e escreva aqueles que,
    divididos por 11, dão resto igual a 5.
*/

// Criamos um array vazio para guardar os números que satisfazem a condição.
let encontrados = []

// O laço FOR percorre todos os números de 1000 até 1999 (inclusive).
// - let numero = 1000  → começa em 1000
// - numero <= 1999     → continua enquanto não passar de 1999
// - numero++           → a cada volta, soma 1 ao número atual
for (let numero = 1000; numero <= 1999; numero++) {

    // O operador % (módulo) retorna o RESTO da divisão inteira.
    // Exemplo: 1016 % 11 = 5, pois 11 × 92 = 1012 e 1016 - 1012 = 4... 
    // O programa testa cada número automaticamente.
    if (numero % 11 === 5) {

        // Se o resto for exatamente 5, exibimos o número...
        console.log(numero)

        // ...e também o guardamos no array para contar depois.
        encontrados.push(numero)
    }
}

// Ao final, .length nos diz quantos números foram encontrados no total.
console.log("Quantidade: " + encontrados.length)


// =====================================================================
// EXERCÍCIO 4 — Redução do Tempo de Vida de um Fumante
// =====================================================================
/*
    Escreva um programa para calcular a redução do tempo de vida de um fumante.
    Pergunte a quantidade de cigarros fumados por dia e quantos anos ele já fumou.
    Considere que um fumante perde 10 min de vida a cada cigarro. Calcule quantos dias de
    vida um fumante perderá e exiba o total em dias.
*/

// Coletamos os dois dados necessários para o cálculo.
let fumadosPorDia = Number(PROMPT('Informe o número de cigarros fumados por dia: '))
let anosFumando   = Number(PROMPT('Informe há quantos anos você fuma: '))

// Convertemos anos em dias (usamos 365 dias por ano, sem considerar bissexto).
let diasFumando = anosFumando * 365

// Total de cigarros = quantos por dia × quantos dias fumou no total.
let totalCigarros = fumadosPorDia * diasFumando

// Cada cigarro = 10 minutos perdidos. Multiplicamos pelo total de cigarros.
let minutosPerdidos = totalCigarros * 10

// Convertemos minutos em horas (60 minutos = 1 hora).
let horasPerdidas = minutosPerdidos / 60

// Convertemos horas em dias (24 horas = 1 dia).
let diasPerdidos = horasPerdidas / 24

// Convertemos dias em anos para dar uma perspectiva mais impactante.
let anosPerdidos = diasPerdidos / 365

// Exibimos o relatório completo mostrando cada etapa do cálculo.
// .toFixed(2) arredonda o número para 2 casas decimais (ex: 3.14159 → 3.14).
console.log("==================================")
console.log("    REDUÇÃO DO TEMPO DE VIDA    ")
console.log("==================================")
console.log("Cigarros por dia: " + fumadosPorDia)
console.log("Anos fumando: "     + anosFumando)
console.log("Dias Fumando: "     + diasFumando)
console.log('-------------------------------')
console.log('Total de cigarros: ' + totalCigarros)
console.log('Minutos Perdidos: '  + minutosPerdidos)
console.log('Horas Perdidas: '    + horasPerdidas.toFixed(2))
console.log('Dias Perdidos: '     + diasPerdidos.toFixed(2))
console.log('Anos Perdidos: '     + anosPerdidos.toFixed(2))


// =====================================================================
// EXERCÍCIO 5 — Preço de Maçãs com Desconto por Quantidade
// =====================================================================
/*
    As maçãs custam R$ 0,30 se forem compradas menos do que uma dúzia, e R$ 0,25 se
    forem compradas pelo menos doze. Escreva um algoritmo que leia o número de maçãs
    compradas, calcule e escreva o valor total da compra.
*/

// Quantidade de maçãs desejada (poderia vir de um PROMPT também).
let quantidade = 15

// Declaramos a variável sem valor ainda — ela será definida pelo IF abaixo.
// É boa prática declarar antes do bloco condicional.
let precoPorUnidade

// Estrutura condicional: tomamos uma decisão com base na quantidade.
// SE a quantidade for MENOR que 12, o preço é o maior (R$ 0,30).
if (quantidade < 12) {
    precoPorUnidade = 0.30
} else {
    // SENÃO (ou seja, se for 12 ou mais), aplica o preço com desconto.
    precoPorUnidade = 0.25
}

// Valor total = quantidade comprada × preço unitário escolhido acima.
let totalCompra = quantidade * precoPorUnidade

// Exibimos os três dados: quantidade, preço e total.
// .toFixed(2) garante que o valor sempre apareça com 2 casas decimais (R$ 3.75, não R$ 3.75000...).
console.log("Quantidade comprada: " + quantidade      + " maçãs")
console.log("Preço por unidade: R$ " + precoPorUnidade.toFixed(2))
console.log("Total da compra: R$ "   + totalCompra.toFixed(2))


// =====================================================================
// EXERCÍCIO 6 — Exibir 2 Valores em Ordem Crescente
// =====================================================================
/*
    Escreva um algoritmo para ler 2 valores (considere que não serão lidos valores iguais)
    e escreve-los em ordem crescente.
*/

// Dois valores fixos para teste. O enunciado garante que nunca serão iguais.
let a = 30
let b = 45

// Comparamos os dois valores para descobrir qual é o menor.
// SE 'a' for menor que 'b', a ordem crescente já está correta: a, b.
if (a < b) {
    console.log(a + ", " + b)
} else {
    // SENÃO, significa que 'b' é o menor, então invertemos a exibição: b, a.
    console.log(b + ", " + a)
}

// Nota: como o enunciado garante que nunca serão iguais, não precisamos
// tratar o caso a === b. Se precisássemos, adicionaríamos um else if.


// =====================================================================
// EXERCÍCIO 7 — Soma, Média, Maior e Menor de um Array
// =====================================================================
/*
    Escreva um algoritmo que percorra o array e calcule:
    A soma de todos os elementos
    A média dos elementos
    O maior valor encontrado
    O menor valor encontrado
*/

// O array é uma lista de valores armazenados em sequência.
// Cada posição tem um índice começando em 0: valores[0]=7, valores[1]=3, etc.
let valores = [7, 3, 9, 5, 8]

// Iniciamos a soma em 0, pois ainda não somamos nada.
let soma = 0

// Uma boa estratégia é assumir que o primeiro elemento é tanto o maior
// quanto o menor. Conforme percorremos o array, vamos corrigindo essa suposição.
let maior = valores[0]  // Começa assumindo que 7 é o maior
let menor = valores[0]  // Começa assumindo que 7 é o menor

// Percorremos o array do índice 0 até o último (valores.length - 1).
// .length retorna o tamanho do array (5 neste caso), então i vai de 0 a 4.
for (let i = 0; i < valores.length; i++) {

    // A cada iteração, adicionamos o elemento atual à soma acumulada.
    // += é o mesmo que: soma = soma + valores[i]
    soma += valores[i]

    // Se o elemento atual for MAIOR que o maior registrado até agora,
    // atualizamos o maior.
    if (valores[i] > maior) {
        maior = valores[i]
    }

    // Se o elemento atual for MENOR que o menor registrado até agora,
    // atualizamos o menor.
    if (valores[i] < menor) {
        menor = valores[i]
    }
}

// A média é a soma de todos os elementos dividida pela quantidade de elementos.
// Calculamos APÓS o loop, pois só então temos a soma completa.
let media = soma / valores.length

// Exibimos os quatro resultados calculados.
console.log("Soma: "  + soma)
console.log("Média: " + media)
console.log("Maior: " + maior)
console.log("Menor: " + menor)