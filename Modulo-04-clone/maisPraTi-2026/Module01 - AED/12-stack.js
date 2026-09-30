// =============================================================
// TAD — TIPO ABSTRATO DE DADO
// =============================================================
//
// Um TAD define O QUÊ uma estrutura faz, sem ditar COMO ela faz.
// É um "contrato" entre o programador e quem usa a estrutura:
// você especifica operações e comportamentos sem expor a
// implementação interna.
//
// Pense num controle remoto de TV:
//   • Você sabe o que os botões fazem (ligar, mudar canal...)
//   • Não sabe (nem precisa saber) o circuito interno
//
// Dois TADs clássicos são a PILHA e a FILA.
// Ambos podem ser implementados com Arrays ou com LinkedLists —
// a escolha afeta desempenho e memória, mas não o comportamento
// observável de fora.
//
// =============================================================
// PILHA vs FILA — DIFERENÇAS FUNDAMENTAIS
// =============================================================
//
//  PILHA (Stack)                   FILA (Queue)
//  ─────────────────────────────   ─────────────────────────────
//  Política: LIFO                  Política: FIFO
//  Last In, First Out              First In, First Out
//  (último a entrar, primeiro      (primeiro a entrar, primeiro
//   a sair)                         a sair)
//
//  Visualização:                   Visualização:
//
//    ┌───┐  ← topo (top)             entrada        saída
//    │ 3 │  ← push/pop aqui          ──►[1][2][3]──►
//    │ 2 │                           enqueue →   → dequeue
//    │ 1 │  ← base
//    └───┘
//
//  Inserção: no topo               Inserção: no fim (rear)
//  Remoção:  no topo               Remoção:  no início (front)
//
//  Casos de uso:                   Casos de uso:
//  • Ctrl+Z (desfazer)             • Fila de impressão
//  • Call stack do JS              • Fila de processos do SO
//  • Verificação de parênteses     • BFS (busca em largura)
//  • Navegação: voltar/avançar     • Sistemas de mensagens
//
//  ┌──────────────────────┬────────────┬────────────┐
//  │ Operação             │  Pilha     │   Fila     │
//  ├──────────────────────┼────────────┼────────────┤
//  │ Inserir elemento     │ push(topo) │ enqueue(fim│
//  │ Remover elemento     │ pop(topo)  │ dequeue(ini│
//  │ Ver próximo a sair   │ peek(topo) │ peek(início│
//  │ Política             │ LIFO       │ FIFO       │
//  └──────────────────────┴────────────┴────────────┘
//
// =============================================================
// ARRAY vs LINKED LIST — QUANDO USAR CADA UM?
// =============================================================
//
//  ┌─────────────────────────────┬──────────────┬─────────────┐
//  │ Critério                    │ Array        │ LinkedList  │
//  ├─────────────────────────────┼──────────────┼─────────────┤
//  │ push / pop (topo/fim)       │ O(1) ✓       │ O(1) ✓      │
//  │ Memória (overhead por item) │ menor        │ maior*      │
//  │ Acesso aleatório            │ O(1) ✓       │ O(n)        │
//  │ Tamanho dinâmico            │ caro (copia) │ fácil ✓     │
//  │ Cache-friendly              │ sim ✓        │ não         │
//  └─────────────────────────────┴──────────────┴─────────────┘
//  * Cada nó guarda valor + ponteiro, o que usa mais memória
//    que um simples slot de array
//
//  Na prática: para pilhas e filas comuns, o Array é mais simples
//  e geralmente mais rápido em JS (otimizações de cache do engine).
//  A LinkedList brilha quando inserções/remoções no início são
//  frequentes e o tamanho é muito dinâmico.
//
// =============================================================


// =============================================================
// NÓ — bloco de construção da LinkedList
// =============================================================
// O mesmo Node serve tanto para a Pilha quanto para a Fila.
// Cada nó carrega seu valor e um ponteiro para o próximo nó.

class Node {
  constructor(value) {
    this.value = value  // dado armazenado neste nó
    this.next = null    // referência ao próximo nó (null = fim da cadeia)
  }
}


// =============================================================
// PILHA — IMPLEMENTAÇÃO COM LINKED LIST
// =============================================================
//
// A linked list é naturalmente adequada para pilhas: inserir e
// remover do início (head) são ambas O(1) e não exigem percurso.
//
// Aqui chamamos o início de `top` (topo), refletindo a metáfora
// visual da pilha. Cada push "empurra" um novo nó para o topo;
// cada pop "popa" o nó do topo.
//
//  push(3):   [3|►]──►[2|►]──►[1|null]
//                ↑ top
//  pop():     remove o 3, top passa a apontar para o 2

class StackLinkedList {
  constructor() {
    this.top = null  // topo da pilha (primeiro nó da lista)
    this.size = 0    // contador de elementos — evita percurso O(n) para tamanho
  }

  // Insere um novo valor no TOPO — O(1).
  // Passos:
  //   1. Cria o novo nó com o valor
  //   2. Faz o novo nó apontar para o atual topo
  //   3. Atualiza `top` para o novo nó
  push(value) {
    let newNode = new Node(value)
    newNode.next = this.top   // novo nó aponta para quem era o topo
    this.top = newNode         // topo agora é o novo nó
    this.size++
  }

  // Remove e retorna o valor do TOPO — O(1).
  // Passos:
  //   1. Salva o valor do topo atual
  //   2. Move `top` para o próximo nó (descarta o topo antigo)
  //   3. O nó removido perde todas as referências → coletado pelo GC
  pop() {
    if (!this.top) return null      // pilha vazia: nada a remover
    let poppedValue = this.top.value
    this.top = this.top.next         // topo avança para o próximo nó
    this.size--
    return poppedValue
  }

  // Retorna o valor do topo SEM removê-lo — O(1).
  // Útil para "espiar" o próximo a ser removido sem alterar a pilha.
  peek() {
    return this.top ? this.top.value : null
  }

  // Retorna o número de elementos — O(1) graças ao contador `size`.
  tamanho() {
    return this.size
  }

  // Exibe a pilha do topo à base, separada por " → ".
  // "null" ao final indica o fim da lista encadeada.
  imprimir() {
    let atual = this.top
    let resultado = "topo → "
    while (atual) {
      resultado += `${atual.value} → `
      atual = atual.next
    }
    console.log(resultado + "null")
  }
}


// =============================================================
// PILHA — IMPLEMENTAÇÃO COM ARRAY
// =============================================================
//
// O Array do JavaScript já tem push() e pop() nativos que operam
// no FINAL do array — ambos são O(1) amortizado. Basta envolver
// esses métodos para criar a interface de Pilha.
//
// Visualmente, o FINAL do array é o TOPO da pilha:
//   items = [1, 2, 3]
//                  ↑ topo (índice length-1)

class StackArray {
  constructor() {
    this.items = []  // array interno que guarda os elementos
  }

  // Adiciona um elemento no TOPO (fim do array) — O(1) amortizado.
  // O método nativo Array.push() faz exatamente isso.
  push(value) {
    this.items.push(value)
  }

  // Remove e retorna o elemento do TOPO (fim do array) — O(1) amortizado.
  // O método nativo Array.pop() remove e retorna o último elemento.
  // Retorna undefined se o array estiver vazio (comportamento nativo).
  pop() {
    if (this.items.length === 0) return null
    return this.items.pop()
  }

  // Retorna o valor do topo SEM removê-lo — O(1).
  // Acessa o último índice: length - 1.
  peek() {
    if (this.items.length === 0) return null
    return this.items[this.items.length - 1]
  }

  // Retorna o número de elementos — O(1) (propriedade nativa do Array).
  tamanho() {
    return this.items.length
  }

  // Exibe os elementos do topo para a base (ordem invertida do array).
  imprimir() {
    console.log("topo → [" + [...this.items].reverse().join(", ") + "] ← base")
  }
}


// =============================================================
// FILA — IMPLEMENTAÇÃO COM LINKED LIST
// =============================================================
//
// A fila tem duas extremidades:
//   • front (frente): de onde saem os elementos (dequeue) — O(1)
//   • rear  (fundo):  onde entram os novos elementos (enqueue)
//
// Mantemos ponteiros para AMBAS as extremidades.
// Sem o ponteiro `rear`, cada enqueue exigiria percorrer toda a
// lista para achar o último nó — O(n). Com `rear`, é O(1).
//
//  enqueue(4):   front → [1|►]──►[2|►]──►[3|►]──►[4|null] ← rear
//  dequeue():    remove o 1, front avança para o 2

class QueueLinkedList {
  constructor() {
    this.front = null  // primeiro nó — próximo a sair
    this.rear = null   // último nó — onde novos elementos entram
    this.size = 0
  }

  // Insere um novo valor no FINAL da fila — O(1).
  // Graças ao ponteiro `rear`, não precisamos percorrer nada:
  //   1. Cria o novo nó
  //   2. Se a fila estiver vazia, ele é tanto front quanto rear
  //   3. Senão, encadeia ao rear atual e atualiza rear
  enqueue(value) {
    let newNode = new Node(value)
    if (!this.rear) {
      // fila vazia: o único nó é simultaneamente frente e fundo
      this.front = newNode
      this.rear = newNode
    } else {
      this.rear.next = newNode  // o atual rear aponta para o novo nó
      this.rear = newNode        // rear agora é o novo nó
    }
    this.size++
  }

  // Remove e retorna o valor do INÍCIO da fila — O(1).
  // Mesmo mecanismo do pop da pilha com linked list:
  //   1. Salva o valor do front
  //   2. Avança front para o próximo nó
  //   3. Se a fila ficou vazia, rear também vai a null
  dequeue() {
    if (!this.front) return null   // fila vazia
    let dequeuedValue = this.front.value
    this.front = this.front.next   // front avança para o próximo
    if (!this.front) {
      // se não há mais nós, rear também deve ser null
      // (evita rear apontar para um nó que não existe mais)
      this.rear = null
    }
    this.size--
    return dequeuedValue
  }

  // Retorna o valor do INÍCIO da fila SEM removê-lo — O(1).
  peek() {
    return this.front ? this.front.value : null
  }

  // Retorna o número de elementos — O(1).
  tamanho() {
    return this.size
  }

  // Exibe a fila da frente ao fundo.
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
// FILA — IMPLEMENTAÇÃO COM ARRAY
// =============================================================
//
// Com Array, usamos push() para enqueue (adiciona no fim) e
// shift() para dequeue (remove do início).
//
// ATENÇÃO: shift() é O(n) — ele remove o índice 0 e desloca
// todos os outros elementos uma posição para a esquerda.
// Para filas de alto desempenho, prefira a LinkedList ou implemente
// um índice de cabeça (head pointer) para evitar o shift.
//
// Aqui a implementação com shift() é apresentada por clareza.
// items = [1, 2, 3, 4]
//          ↑ frente     ↑ fundo
//        dequeue       enqueue

class QueueArray {
  constructor() {
    this.items = []  // array interno
  }

  // Adiciona um elemento no FUNDO da fila (fim do array) — O(1).
  enqueue(value) {
    this.items.push(value)
  }

  // Remove e retorna o elemento da FRENTE (início do array) — O(n).
  // shift() remove o índice 0 e reorganiza os índices restantes.
  // Em filas pequenas isso é negligenciável; em filas grandes, prefira LinkedList.
  dequeue() {
    if (this.items.length === 0) return null
    return this.items.shift()
  }

  // Retorna o valor da frente SEM remover — O(1).
  peek() {
    if (this.items.length === 0) return null
    return this.items[0]
  }

  // Retorna o número de elementos — O(1).
  tamanho() {
    return this.items.length
  }

  // Exibe a fila da frente ao fundo.
  imprimir() {
    console.log("frente → [" + this.items.join(", ") + "] ← fundo")
  }
}


// =============================================================
// EXEMPLOS DE USO
// =============================================================

console.log("============================================")
console.log("PILHA com LinkedList")
console.log("============================================")

const pilhaLL = new StackLinkedList()
pilhaLL.push(10)
pilhaLL.push(20)
pilhaLL.push(30)
pilhaLL.imprimir()                         // topo → 30 → 20 → 10 → null
console.log("Peek:", pilhaLL.peek())       // 30
console.log("Pop:", pilhaLL.pop())         // 30
pilhaLL.imprimir()                         // topo → 20 → 10 → null
console.log("Tamanho:", pilhaLL.tamanho()) // 2

console.log("\n============================================")
console.log("PILHA com Array")
console.log("============================================")

const pilhaArr = new StackArray()
pilhaArr.push(10)
pilhaArr.push(20)
pilhaArr.push(30)
pilhaArr.imprimir()                          // topo → [30, 20, 10] ← base
console.log("Peek:", pilhaArr.peek())        // 30
console.log("Pop:", pilhaArr.pop())          // 30
pilhaArr.imprimir()                          // topo → [20, 10] ← base
console.log("Tamanho:", pilhaArr.tamanho())  // 2

console.log("\n============================================")
console.log("FILA com LinkedList")
console.log("============================================")

const filaLL = new QueueLinkedList()
filaLL.enqueue(10)
filaLL.enqueue(20)
filaLL.enqueue(30)
filaLL.imprimir()                          // frente → 10 → 20 → 30 → null ← fundo
console.log("Peek:", filaLL.peek())        // 10
console.log("Dequeue:", filaLL.dequeue())  // 10
filaLL.imprimir()                          // frente → 20 → 30 → null ← fundo
console.log("Tamanho:", filaLL.tamanho())  // 2

console.log("\n============================================")
console.log("FILA com Array")
console.log("============================================")

const filaArr = new QueueArray()
filaArr.enqueue(10)
filaArr.enqueue(20)
filaArr.enqueue(30)
filaArr.imprimir()                           // frente → [10, 20, 30] ← fundo
console.log("Peek:", filaArr.peek())         // 10
console.log("Dequeue:", filaArr.dequeue())   // 10
filaArr.imprimir()                           // frente → [20, 30] ← fundo
console.log("Tamanho:", filaArr.tamanho())   // 2