// =============================================================
// O QUE É UMA LINKED LIST (LISTA ENCADEADA)?
// =============================================================
//
// Uma linked list é uma estrutura de dados formada por NÓS.
// Cada nó contém dois campos:
//   1. valor   — o dado que ele armazena
//   2. proximo — um ponteiro (referência) para o próximo nó
//
// Os nós NÃO precisam estar em posições consecutivas na memória.
// Cada um "aponta" para o próximo, formando uma corrente:
//
//   [head] ──► [ 40 | ──► ] ──► [ 30 | ──► ] ──► [ 20 | null ]
//
// O último nó aponta para null, sinalizando o fim da lista.
//
// =============================================================
// DIFERENÇA ENTRE LINKED LIST E ARRAY
// =============================================================
//
//  ARRAY:
//  ┌────┬────┬────┬────┐
//  │ 40 │ 30 │ 20 │ 10 │   ← blocos lado a lado na memória
//  └────┴────┴────┴────┘
//    [0]  [1]  [2]  [3]
//
//  • Acesso direto por índice:  lista[2] = 20 em O(1)
//  • Tamanho geralmente fixo (ou caro de redimensionar)
//  • Inserir/remover no início exige deslocar TODOS os elementos
//
//  LINKED LIST:
//  [head]──►[40|►]──►[30|►]──►[20|null]
//            (em qualquer lugar da memória)
//
//  • Acesso por índice exige percorrer do início: O(n)
//  • Tamanho dinâmico: cresce/encolhe sem realocação
//  • Inserir/remover no início é O(1): só troca ponteiros
//
//  RESUMO:
//  ┌─────────────────────────────┬────────┬─────────────┐
//  │ Operação                    │ Array  │ Linked list │
//  ├─────────────────────────────┼────────┼─────────────┤
//  │ Acesso por índice           │ O(1) ✓ │ O(n)        │
//  │ Inserir/remover no início   │ O(n)   │ O(1) ✓      │
//  │ Memória contígua            │ sim    │ não         │
//  │ Tamanho dinâmico            │ caro   │ fácil ✓     │
//  └─────────────────────────────┴────────┴─────────────┘
//
// =============================================================

// Nó único da lista, contendo valor e referência ao próximo nó.
// É o "elo" da corrente: cada nó conhece apenas seu vizinho
// imediato à direita.
class Node {
  constructor(valor) {
    this.valor = valor;   // armazena o dado do nó
    this.proximo = null;  // inicialmente não aponta para nenhum outro nó
  }
}

// Estrutura principal da lista encadeada.
// Ela mantém apenas uma referência: o HEAD (cabeça), que é o
// primeiro nó. Para chegar a qualquer outro nó, é necessário
// "caminhar" a partir do head seguindo os ponteiros `proximo`.
class LinkedList {
  constructor() {
    this.head = null;  // primeiro nó da lista (vazio no início)
    this.length = 0;   // contagem de elementos na lista
  }

  // Insere um novo valor no INÍCIO da lista — O(1).
  // Por que O(1)? Porque não precisamos percorrer nada:
  //   1. Criamos o novo nó
  //   2. Fazemos ele apontar para o atual head
  //   3. Atualizamos head para o novo nó
  // Em um array, isso seria O(n) pois desloca todos os elementos.
  inserirInicio(valor) {
    const novoNo = new Node(valor); // cria um novo nó com o valor
    novoNo.proximo = this.head;     // novo nó aponta para o atual head
    this.head = novoNo;             // head passa a ser o novo nó
    this.length++;
  }

  // Insere um novo valor no FIM da lista — O(n).
  // Precisamos percorrer toda a lista para achar o último nó
  // (aquele cujo `proximo` é null) e só então encadear o novo.
  // Dica: em uma lista duplamente encadeada, mantendo um ponteiro
  // `tail`, esta operação também seria O(1).
  inserirFim(valor) {
    const novoNo = new Node(valor);
    if (!this.head) {
      // lista vazia: o novo nó é o único, então vira o head
      this.head = novoNo;
    } else {
      // percorre até encontrar o último nó (proximo === null)
      let atual = this.head;
      while (atual.proximo) {
        atual = atual.proximo;
      }
      atual.proximo = novoNo; // encadeia o novo nó ao fim
    }
    this.length++;
  }

  // Remove e retorna o valor do PRIMEIRO nó — O(1).
  // Assim como inserirInicio, só troca ponteiros:
  //   1. Salvamos o valor do head atual
  //   2. Movemos head para o próximo nó
  //   3. O nó antigo fica sem referência e é coletado pelo GC
  removerInicio() {
    if (!this.head) return null;     // lista vazia: nada a remover
    const valorRemovido = this.head.valor;
    this.head = this.head.proximo;   // head avança para o próximo nó
    this.length--;
    return valorRemovido;
  }

  // Busca o índice (0-based) de um valor — O(n).
  // Não há atalho: sem índices numéricos, percorremos um a um.
  // Isso é a principal desvantagem da linked list frente ao array.
  buscar(valor) {
    let atual = this.head;
    let indice = 0;
    while (atual) {
      if (atual.valor === valor) return indice;
      atual = atual.proximo;
      indice++;
    }
    return -1; // não encontrado
  }

  // Retorna o número de elementos — O(1) graças ao contador `length`.
  // Se não mantivéssemos o contador, seria O(n) (percorrer tudo).
  tamanho() {
    return this.length;
  }

  // Converte a lista em string para fácil visualização.
  // O símbolo "→" representa o ponteiro `proximo` de cada nó.
  // "null" ao final indica que o último nó não aponta para ninguém.
  imprimir() {
    let atual = this.head;
    let resultado = "";
    while (atual) {
      resultado += `${atual.valor} → `;
      atual = atual.proximo;
    }
    resultado += "null"; // indica fim da lista
    console.log(resultado);
  }
}

// =========================
// EXEMPLO DE USO
// =========================
const lista = new LinkedList();

// inserirInicio empilha ao contrário: o último inserido fica na frente
console.log("Inserindo no início: 10, 20, 30, 40");
lista.inserirInicio(10);
lista.inserirInicio(20);
lista.inserirInicio(30);
lista.inserirInicio(40);
lista.imprimir();              // 40 → 30 → 20 → 10 → null
console.log("Tamanho:", lista.tamanho());

console.log("\nInserindo no fim: 5, 0");
lista.inserirFim(5);
lista.inserirFim(0);
lista.imprimir();              // 40 → 30 → 20 → 10 → 5 → 0 → null
console.log("Tamanho:", lista.tamanho());

console.log("\nBuscando valor 20:", lista.buscar(20)); // 2
console.log("Buscando valor 99:", lista.buscar(99)); // -1

console.log("\nRemovendo do início:", lista.removerInicio()); // 40
lista.imprimir();              // 30 → 20 → 10 → 5 → 0 → null
console.log("Tamanho:", lista.tamanho());

/*
    Por que usar linked list? Quando você precisa inserir e remover muito do início/fim e não precisa de acesso aleatório por índice — filas, pilhas, histórico de desfazer/refazer são casos clássicos.
    
    Por que preferir array? Quando o tamanho é previsível e você precisa acessar elementos por posição frequentemente — listas de items, buffers, tabelas.
*/