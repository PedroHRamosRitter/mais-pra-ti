// ─────────────────────────────────────────────
// 1. OBJETO LITERAL
// ─────────────────────────────────────────────
// QUANDO USAR:
//   - Quando precisar de apenas UMA instância daquele objeto
//   - Para agrupar dados relacionados em uma estrutura única
//   - Configurações, constantes, módulos simples
//
// "this" aqui aponta para o próprio objeto "serie" quando
// o método é chamado através dele (serie.mostrarCaracteristicas())

let serie = {
    nome: "Two and a Half Men",       // propriedade do tipo string
    genero: "Comédia",
    nrTemporadas: 12,
    status: "Finalizada",
    classificacao: 16,
    nrEpisodios: {                    // propriedade cujo valor é outro objeto (objeto aninhado)
        temp1: 10,
        temp2: 30
    },

    mostrarCaracteristicas: function() {
        return `Série: ${this.nome} | Classificação: ${this.classificacao}`
        // "this" → refere-se ao objeto "serie", que chamou este método
        // this.nome        → "Two and a Half Men"
        // this.classificacao → 16
    }
}

console.log(serie.nome)                    // "Two and a Half Men"
console.log(serie.nrEpisodios.temp1)       // 10 — acessando objeto aninhado
console.log(serie.mostrarCaracteristicas()) // "Série: Two and a Half Men | Classificação: 16"


// ─────────────────────────────────────────────
// 2. OBJETO SIMPLES (sem métodos)
// ─────────────────────────────────────────────
// QUANDO USAR:
//   - Quando precisar apenas armazenar dados, sem comportamento
//   - Para representar entidades simples como registros de banco de dados
//   - Muito comum para trafegar dados entre funções

let livro = {
    titulo: "O Hobbit",
    autor: "J. R. R. Tolkien"
    // sem métodos — apenas dados
}

console.log(livro.titulo)                  // "O Hobbit"
console.log(livro.autor)                   // "J. R. R. Tolkien"


// ─────────────────────────────────────────────
// 3. CONSTRUCTOR FUNCTION (Função Construtora)
// ─────────────────────────────────────────────
// QUANDO USAR:
//   - Quando precisar criar MÚLTIPLOS objetos com a mesma estrutura
//   - Alternativa mais antiga às classes (ES5 e anterior)
//   - Quando quiser usar herança via prototype
//
// CONVENÇÃO: nome começa com letra maiúscula para indicar que é um construtor
//
// "this" aqui NÃO aponta para o objeto global.
// Quando usada com "new", o JavaScript cria um objeto vazio {}
// e "this" passa a apontar para esse novo objeto sendo construído.
//
// O que "new" faz nos bastidores:
//   1. Cria um objeto vazio {}
//   2. Aponta "this" para esse objeto
//   3. Executa o corpo da função (preenchendo o objeto via this)
//   4. Retorna o objeto automaticamente

function Computador(processador, gpu, ram, armazenamento) {
    this.processador   = processador    // this → objeto que está sendo criado
    this.gpu           = gpu
    this.ram           = ram
    this.armazenamento = armazenamento
}

let pc1 = new Computador("i3",  "RX6600", "16gb", "1TB SSD")  // cria um objeto
let pc2 = new Computador("i9",  "RTX4090", "32gb", "2TB SSD") // cria outro objeto independente
let pc3 = new Computador("Ryzen 5", "RX7600", "16gb", "512GB SSD")

console.log(pc1.processador)   // "i3"
console.log(pc2.gpu)           // "RTX4090"
console.log(pc3.ram)           // "16gb"


// ─────────────────────────────────────────────
// 4. FACTORY FUNCTION (Função Fábrica)
// ─────────────────────────────────────────────
// QUANDO USAR:
//   - Quando precisar criar múltiplos objetos, assim como o construtor
//   - Quando quiser EVITAR o uso de "new" e "this" (mais simples de entender)
//   - Quando precisar de lógica condicional antes de montar o objeto
//   - Preferida em código moderno por ser mais previsível
//
// Diferença para o construtor: simplesmente retorna um objeto {} explicitamente.
// NÃO usa "new" para ser chamada.
//
// "this" dentro do método mostrarCaracteristicas() aponta para
// o objeto retornado, assim como no objeto literal.

function criarComputador(processador, gpu, ram, armazenamento) {
    return {
        processador,        // shorthand: equivale a processador: processador
        gpu,
        ram,
        armazenamento,
        mostrarCaracteristicas() {
            console.log(`Processador: ${this.processador} | GPU: ${this.gpu}`)
            // "this" → o objeto retornado por criarComputador()
        }
    }
}

let computador1 = criarComputador("i3",     "RX6600",  "16gb", "1TB SSD")
let computador2 = criarComputador("Ryzen 7","RTX3080", "32gb", "2TB SSD")

computador1.mostrarCaracteristicas()   // "Processador: i3 | GPU: RX6600"
computador2.mostrarCaracteristicas()   // "Processador: Ryzen 7 | GPU: RTX3080"


// ─────────────────────────────────────────────
// 5. ARRAY DE OBJETOS
// ─────────────────────────────────────────────
// QUANDO USAR:
//   - Quando precisar de uma coleção de objetos do mesmo tipo
//   - Listas de produtos, filmes, usuários, registros em geral
//   - Base para aplicar filter, map, reduce futuramente
//
// Cada elemento do array é um objeto literal independente.
// console.table() exibe o array em formato de tabela no console — útil para debug.

let movies = [
    { title: "Spider-Man",  genre: "Herói"   },   // índice 0
    { title: "As Branquelas", genre: "Comédia" }, // índice 1
    { title: "007",         genre: "Ação"    }    // índice 2
]

console.table(movies)          // exibe em tabela: index | title | genre
console.log(movies[0].title)   // "Spider-Man"  — acessa o objeto no índice 0, propriedade title
console.log(movies[1].genre)   // "Comédia"     — acessa o objeto no índice 1, propriedade genre
console.log(movies.length)     // 3             — quantidade de elementos no array