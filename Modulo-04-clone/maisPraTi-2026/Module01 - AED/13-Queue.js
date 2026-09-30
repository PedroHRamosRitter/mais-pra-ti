// =============================================================
// FILA (QUEUE) — IMPLEMENTAÇÃO COM LINKED LIST
// =============================================================
//
// Uma fila segue a política FIFO: First In, First Out.
// O primeiro elemento que entra é o primeiro a sair —
// exatamente como uma fila de banco ou fila de impressão.
//
// Para implementar com LinkedList de forma eficiente,
// mantemos ponteiros para as DUAS extremidades:
//
//   front (frente): de onde saem os elementos — dequeue
//   rear  (fundo):  onde entram os novos elementos — enqueue
//
//  enqueue(10):   front → [10|null] ← rear
//  enqueue(20):   front → [10|►]──►[20|null] ← rear
//  enqueue(30):   front → [10|►]──►[20|►]──►[30|null] ← rear
//  dequeue():     retorna 10, front avança → [20|►]──►[30|null] ← rear
//
// Por que manter `rear`?
//   Sem ele, cada enqueue precisaria percorrer toda a lista para
//   achar o último nó — O(n). Com `rear`, o encadeamento é direto — O(1).
//
// =============================================================


// Nó da lista encadeada.
// Cada nó armazena um valor e uma referência ao próximo nó.
class Node {
  constructor(value) {
    this.value = value  // dado armazenado neste nó
    this.next = null    // ← BUG CORRIGIDO: era `this.next = next`
                        //   (next não existe como variável no escopo
                        //    do constructor — lançaria ReferenceError)
                        //   O correto é inicializar com null
  }
}

// Estrutura principal da fila encadeada.
class Queue {
  constructor() {
    this.front = null  // primeiro nó — próximo a ser removido
    this.rear = null   // último nó — onde novos elementos são adicionados
    this.size = 0      // contador de elementos (evita percurso O(n) para tamanho)
  }

  // Insere um novo valor no FUNDO da fila — O(1).
  //
  // Há dois cenários:
  //
  //   1. Fila vazia (rear === null):
  //      O novo nó é o único elemento — ele é simultaneamente
  //      front e rear.
  //
  //   2. Fila com elementos (rear !== null):
  //      O atual rear aponta para o novo nó (encadeamento),
  //      e rear é atualizado para o novo nó.
  //
  // Nota: a versão original verificava `if(this.rear)` para encadear
  // e `if(!this.front)` para definir o front. O resultado é o mesmo,
  // mas a lógica abaixo torna o raciocínio mais explícito.
  enqueue(value) {
    let newNode = new Node(value)

    if (!this.rear) {
      // fila vazia: o novo nó é frente e fundo ao mesmo tempo
      this.front = newNode
      this.rear = newNode
    } else {
      // fila com elementos: encadeia ao final e avança rear
      this.rear.next = newNode  // atual rear aponta para o novo nó
      this.rear = newNode        // rear agora é o novo nó
    }

    this.size++
  }

  // Remove e retorna o valor da FRENTE da fila — O(1).
  //
  // Passos:
  //   1. Salva o valor do front atual
  //   2. Avança front para o próximo nó
  //   3. Se a fila ficou vazia, rear também vai a null
  //      (sem isso, rear ficaria apontando para um nó morto)
  dequeue() {
    if (!this.front) return null  // fila vazia: nada a remover

    let dequeuedValue = this.front.value
    this.front = this.front.next  // front avança para o próximo nó

    if (!this.front) {
      // não há mais nós — a fila está vazia
      // rear precisa ser zerado para não apontar para o nó removido
      this.rear = null
    }

    this.size--
    return dequeuedValue
  }

  // Retorna o valor da FRENTE da fila SEM removê-lo — O(1).
  // Útil para consultar quem vai sair a seguir sem alterar a fila.
  peek() {
    return this.front ? this.front.value : null
  }

  // Retorna o número de elementos — O(1) graças ao contador `size`.
  tamanho() {
    return this.size
  }

  // Verifica se a fila está vazia — O(1).
  estaVazia() {
    return this.size === 0
  }

  // Exibe a fila da frente ao fundo.
  // "null" ao final indica o fim da lista encadeada.
  imprimir() {
    let atual = this.front
    let resultado = "frente → "
    while (atual) {
      resultado += `${atual.value} → `
      atual = atual.next
    }
    console.log(resultado + "null ← fundo")
  }
}


// =============================================================
// EXEMPLO DE USO
// =============================================================

const fila = new Queue()

console.log("Enfileirando: 10, 20, 30")
fila.enqueue(10)
fila.enqueue(20)
fila.enqueue(30)
fila.imprimir()                           // frente → 10 → 20 → 30 → null ← fundo
console.log("Tamanho:", fila.tamanho())   // 3
console.log("Peek:", fila.peek())         // 10

console.log("\nDequeue:", fila.dequeue()) // 10
console.log("Dequeue:", fila.dequeue())  // 20
fila.imprimir()                           // frente → 30 → null ← fundo
console.log("Tamanho:", fila.tamanho())   // 1

console.log("\nDequeue:", fila.dequeue()) // 30
console.log("Fila vazia?", fila.estaVazia()) // true
console.log("Dequeue em fila vazia:", fila.dequeue()) // null