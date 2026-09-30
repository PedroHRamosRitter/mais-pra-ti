/* Criem um objeto carro - usem for in para imprimir cada propriedade no formato: "chave: valor" */

// let possante = { marca: "Ford", modelo: "Maverick", ano: 1980, cor: "Amarelo" }

// for (let chave in possante) {
//     console.log(`${chave}: ${possante[chave]}`)
// }

/*
    Criem um array de cidades, imprimam apenas as cidades que começam com a letra 's'. Usando for of
*/

// let cidades = ['Porto Alegre', 'Gramado', 'Salvador', 'Rio de Janeiro', 'Alvorada']

// for(let cidade of cidades) {
//     if(cidade.startsWith('S')) {
//         console.log(cidade)
//     }
// }

/* Criem um array de números e usem ForEach para somar tdos os números */
// let numeros = [4, 5, 6, 7, 8]
// let soma = 0

// numeros.forEach((n) => {
//     soma += n
// })

// console.log(soma)

/*Dado o array de alunos abaixo, use os loops que preferir para gerar um relatório com três informações: lista de aprovados, lista de reprovados e a média geral da turma: */

// const turma = [
//   { nome: 'Alice',   nota: 9.0 },
//   { nome: 'Bruno',   nota: 5.5 },
//   { nome: 'Carla',   nota: 7.0 },
//   { nome: 'Daniel',  nota: 3.8 },
//   { nome: 'Elisa',   nota: 8.2 },
// ]

// let aprovados = []
// let reprovados = []
// let soma = 0

// turma.forEach(({ nome, nota }) => {
//     soma += nota
//     if(nota >= 6) {
//         aprovados.push(nome)
//     } else {
//         reprovados.push(nome)
//     }
// })

// let media = soma / turma.length

// console.log('Aprovados: ' + aprovados)
// console.log('reprovados: ' + reprovados)
// console.log(`Média Geral: ${media.toFixed(2)}`)