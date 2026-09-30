// Array de números que será usado como entrada nas funções
let arr = [10, 2, 30, 123, 12]


// ─────────────────────────────────────────────
// 1. FUNCTION DECLARATION (Declaração de Função)
// ─────────────────────────────────────────────
// QUANDO USAR:
//   - Funções principais e reutilizáveis do seu programa
//   - Quando a ordem de declaração no código não importa (por causa do hoisting)
//   - Quando o nome da função precisa aparecer claramente no stack trace de erros
//
// HOISTING: o JavaScript "puxa" a declaração para o topo antes de executar.
// Por isso, a linha abaixo funcionaria mesmo estando ANTES da função:
//   console.log(somaElementos(arr))  ← sem erro!

function somaElementos(lista) {
    let soma = 0

    for (let i = 0; i < lista.length; i++) {
        soma += lista[i]
    }

    return soma
}

function mediaElementos(lista) {
    let soma = 0

    for (let i = 0; i < lista.length; i++) {
        soma += lista[i]
    }

    return soma / lista.length
}

function maiorElemento(lista) {
    let maior = lista[0]

    for (let i = 0; i < lista.length; i++) {
        if (lista[i] > maior) {
            maior = lista[i]
        }
    }

    return maior
}

function menorElemento(lista) {
    let menor = lista[0]

    for (let i = 0; i < lista.length; i++) {
        if (lista[i] < menor) {
            menor = lista[i]
        }
    }

    return menor
}

console.log(somaElementos(arr))      // 177
console.log(mediaElementos(arr))     // 35.4
console.log(maiorElemento(arr))      // 123
console.log(menorElemento(arr))      // 2


// O QUE É O "this" NA FUNCTION DECLARATION?
// ─────────────────────────────────────────────
// "this" é uma palavra reservada que representa O OBJETO que chamou a função.
// Seu valor muda dependendo de COMO e ONDE a função é chamada.
//
// Exemplo fora de objeto — "this" aponta para o objeto global (window no browser):
function quemSouEu() {
    console.log(this)                // window (browser) ou global (Node.js)
}
quemSouEu()
//
// Exemplo dentro de objeto — "this" aponta para o próprio objeto:
const calculadora = {
    valor: 100,
    mostrar: function() {
        console.log(this.valor)      // "this" é o objeto "calculadora" → imprime 100
    }
}
calculadora.mostrar()


// ─────────────────────────────────────────────
// 2. FUNCTION EXPRESSION (Expressão de Função)
// ─────────────────────────────────────────────
// QUANDO USAR:
//   - Quando quiser garantir que a função só existe a partir de certo ponto do código
//   - Para armazenar funções em variáveis e passá-las como argumento (callbacks)
//   - Quando quiser escolher entre duas funções dependendo de uma condição:
//
//   const operacao = condicao ? function(x) { return x * 2 } : function(x) { return x + 2 }
//
// NÃO sofre hoisting — chamar antes da declaração gera erro.

const somaExp = function(lista) {
    let soma = 0
    for (let i = 0; i < lista.length; i++) {
        soma += lista[i]
    }
    return soma
}

const mediaExp = function(lista) {
    let soma = 0
    for (let i = 0; i < lista.length; i++) {
        soma += lista[i]
    }
    return soma / lista.length
}

const maiorExp = function(lista) {
    let maior = lista[0]
    for (let i = 0; i < lista.length; i++) {
        if (lista[i] > maior) maior = lista[i]
    }
    return maior
}

const menorExp = function(lista) {
    let menor = lista[0]
    for (let i = 0; i < lista.length; i++) {
        if (lista[i] < menor) menor = lista[i]
    }
    return menor
}

console.log(somaExp(arr))            // 177
console.log(mediaExp(arr))           // 35.4
console.log(maiorExp(arr))           // 123
console.log(menorExp(arr))           // 2


// O QUE É O "this" NA FUNCTION EXPRESSION?
// ─────────────────────────────────────────────
// Funciona igual à Function Declaration — "this" depende de quem chamou.
// O comportamento é idêntico porque ambas criam seu próprio "this".

const obj = {
    nome: "calculadora",
    mostrar: function() {
        console.log(this.nome)       // "this" é o objeto "obj" → imprime "calculadora"
    }
}
obj.mostrar()


// ─────────────────────────────────────────────
// 3. ARROW FUNCTION (Função de Seta) — ES6+
// ─────────────────────────────────────────────
// QUANDO USAR:
//   - Funções curtas e callbacks (ex: dentro de map, filter, reduce)
//   - Quando precisar preservar o "this" do escopo externo (veja abaixo)
//   - Para deixar o código mais conciso e legível
//
// QUANDO NÃO USAR:
//   - Como métodos de objetos (o "this" não funcionará como esperado)
//   - Como construtores (não podem ser usadas com "new")
//   - Quando precisar de "arguments" (não possui esse objeto interno)

const somaArrow = (lista) => {
    let soma = 0
    for (let i = 0; i < lista.length; i++) {
        soma += lista[i]
    }
    return soma
}

const mediaArrow = (lista) => {
    let soma = 0
    for (let i = 0; i < lista.length; i++) {
        soma += lista[i]
    }
    return soma / lista.length
}

const maiorArrow = (lista) => {
    let maior = lista[0]
    for (let i = 0; i < lista.length; i++) {
        if (lista[i] > maior) maior = lista[i]
    }
    return maior
}

const menorArrow = (lista) => {
    let menor = lista[0]
    for (let i = 0; i < lista.length; i++) {
        if (lista[i] < menor) menor = lista[i]
    }
    return menor
}

console.log(somaArrow(arr))          // 177
console.log(mediaArrow(arr))         // 35.4
console.log(maiorArrow(arr))         // 123
console.log(menorArrow(arr))         // 2


// O QUE É O "this" NA ARROW FUNCTION?
// ─────────────────────────────────────────────
// Arrow functions NÃO têm seu próprio "this".
// Elas herdam o "this" do escopo onde foram CRIADAS (escopo léxico).
// Isso resolve um problema clássico do JavaScript:

const timer = {
    segundos: 0,

    // ❌ PROBLEMA com function normal dentro de setInterval:
    iniciarErrado: function() {
        // setInterval(function() {
        //     this.segundos++            // "this" aqui é o objeto global, NÃO é "timer"
        //     console.log(this.segundos) // NaN ou undefined — não funciona como esperado
        // }, 1000)
        console.log(this.segundos)
    },

    // ✅ SOLUÇÃO com arrow function:
    iniciarCerto: function() {
        setInterval(() => {
            this.segundos++            // "this" aqui é "timer", herdado do escopo externo
            console.log(this.segundos) // 1, 2, 3... funciona corretamente
        }, 3000)
    },

    mostrar: function() {
        console.log(this.segundos)      // "this" é o objeto "calculadora" → imprime 100
    }


}

// timer.iniciarCerto()
// timer.iniciarErrado()
// timer.mostrar()

// ─────────────────────────────────────────────
// 4. MÉTODOS NATIVOS DO ARRAY — forma funcional
// ─────────────────────────────────────────────
// QUANDO USAR:
//   - Quando o JavaScript já tem um método que faz o que você precisa
//   - Para deixar o código mais curto e declarativo
//   - Em projetos modernos onde legibilidade é prioridade
//
// QUANDO NÃO USAR:
//   - Arrays muito grandes onde performance é crítica (loops manuais podem ser mais rápidos)
//   - Quando a lógica de iteração é complexa demais para caber em uma linha
//
// "this" aqui não se aplica — são chamadas diretas em métodos do objeto Array.

const soma  = arr.reduce((acc, n) => acc + n, 0)   // acc acumula, n é o elemento atual
const media = soma / arr.length
const maior = Math.max(...arr)                       // spread espalha o array como argumentos
const menor = Math.min(...arr)

console.log(soma)                    // 177
console.log(media)                   // 35.4
console.log(maior)                   // 123
console.log(menor)                   // 2