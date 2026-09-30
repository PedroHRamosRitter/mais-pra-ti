// =============================================================
// O QUE É UMA LISTA DUPLAMENTE ENCADEADA?
// =============================================================
//
// Na lista simplesmente encadeada cada nó conhecia apenas o
// PRÓXIMO. Aqui cada nó conhece os DOIS vizinhos:
//
//   null ⇄ [ 30 | ⇄ ] ⇄ [ 20 | ⇄ ] ⇄ [ 10 | ⇄ ] ⇄ null
//             ↑                                 ↑
//            head                              tail
//
// A lista também passa a guardar dois ponteiros externos:
//   • head → primeiro nó
//   • tail → último nó
//
// =============================================================
// O QUE MUDA EM RELAÇÃO À LISTA SIMPLES?
// =============================================================
//
//  LISTA SIMPLES:
//  • Cada nó tem: valor + proximo
//  • Só consegue andar para FRENTE
//  • inserirFim é O(n) — precisa chegar até o final
//  • Não consegue "voltar" de um nó para o anterior
//
//  LISTA DUPLA:
//  • Cada nó tem: valor + anterior + proximo
//  • Consegue andar para FRENTE e para TRÁS
//  • inserirFim é O(1) — tail aponta direto para o fim
//  • removerFim é O(1) — idem (na lista simples seria O(n))
//  • Custo: ocupa mais memória (um ponteiro extra por nó)
//
//  RESUMO DE COMPLEXIDADE:
//  ┌──────────────────────────┬──────────────┬─────────────┐
//  │ Operação                 │ Lista simples│ Lista dupla │
//  ├──────────────────────────┼──────────────┼─────────────┤
//  │ Inserir no início        │ O(1)         │ O(1)        │
//  │ Inserir no fim           │ O(n)         │ O(1) ✓      │
//  │ Remover no início        │ O(1)         │ O(1)        │
//  │ Remover no fim           │ O(n)         │ O(1) ✓      │
//  │ Inserir/remover no meio  │ O(n)         │ O(n)        │
//  │ Percorrer ao contrário   │ impossível   │ O(n) ✓      │
//  └──────────────────────────┴──────────────┴─────────────┘
//
//  QUANDO USAR LISTA DUPLA?
//  • Quando você precisa navegar nos dois sentidos
//  • Quando remove muito do FIM (ex: pilha, deque)
//  • Exemplos reais: histórico do browser (←/→),
//    playlist de música, cache LRU
//
// =============================================================

// Nó duplamente encadeado: guarda valor e ponteiros para os dois vizinhos.
// Diferente do nó simples, ele "conhece" quem está antes e depois de si.
class Node {
    constructor(valor) {
        this.valor    = valor; // armazena o valor contido no nó
        this.anterior = null;  // referência ao nó anterior (esquerda)
        this.proximo  = null;  // referência ao próximo nó  (direita)
    }
}

// Estrutura principal. O diferencial aqui é o ponteiro `tail`:
// ele elimina a necessidade de percorrer toda a lista para
// operar no fim, tornando inserirFim e removerFim O(1).
class DoublyLinkedList {
    constructor() {
        this.head   = null; // ponteiro para o primeiro nó
        this.tail   = null; // ponteiro para o último nó
        this.length = 0;    // contador de nós
    }

    // ====================================================
    // Insere valor no INÍCIO — O(1)
    // ====================================================
    // Passos com a lista [ C ⇄ B ⇄ A ] ao inserir "D":
    //   antes:  head → C
    //   depois: head → D ⇄ C ⇄ B ⇄ A
    inserirInicio(valor) {
        const novoNo = new Node(valor);

        if (!this.head) {
            // Lista vazia: novo nó é o único elemento
            this.head = novoNo;
            this.tail = novoNo;
        } else {
            // Encadeia o novo nó antes do head atual
            novoNo.proximo    = this.head; // novo aponta para o antigo head
            this.head.anterior = novoNo;   // antigo head aponta de volta
            this.head          = novoNo;   // head passa a ser o novo nó
        }

        this.length++;
    }

    // ====================================================
    // Insere valor no FIM — O(1) graças ao ponteiro tail
    // ====================================================
    // Na lista simples isso era O(n) porque sem o tail era
    // preciso percorrer tudo. Aqui chegamos direto ao fim.
    // Passos com [ C ⇄ B ⇄ A ] ao inserir "Z":
    //   antes:  tail → A
    //   depois: C ⇄ B ⇄ A ⇄ Z ← tail
    inserirFim(valor) {
        const novoNo = new Node(valor);

        if (!this.tail) {
            // Lista vazia: mesmo comportamento do inserirInicio
            this.head = novoNo;
            this.tail = novoNo;
        } else {
            // Encadeia o novo nó depois do tail atual
            this.tail.proximo = novoNo;  // tail atual aponta para o novo
            novoNo.anterior   = this.tail; // novo aponta de volta para o tail
            this.tail         = novoNo;    // tail passa a ser o novo nó
        }

        this.length++;
    }

    // ====================================================
    // Insere valor em posição específica (índice 0-based) — O(n)
    // ====================================================
    // Nos extremos reutiliza inserirInicio/inserirFim (O(1)).
    // No meio, percorre até o índice e reencadeia os ponteiros
    // dos dois lados — por isso continua O(n).
    inserirEm(indice, valor) {
        if (indice < 0 || indice > this.length) {
            throw new RangeError('Índice fora dos limites');
        }
        if (indice === 0)            return this.inserirInicio(valor);
        if (indice === this.length)  return this.inserirFim(valor);

        // Percorre até o nó que está ATUALMENTE no índice alvo
        let atual = this.head;
        for (let i = 0; i < indice; i++) {
            atual = atual.proximo;
        }

        // Encaixa o novo nó entre `anterior` e `atual`:
        //   antes:  anterior ⇄ atual
        //   depois: anterior ⇄ novoNo ⇄ atual
        const novoNo   = new Node(valor);
        const anterior = atual.anterior;

        anterior.proximo  = novoNo;  // anterior → novoNo
        novoNo.anterior   = anterior; // novoNo  → anterior
        novoNo.proximo    = atual;    // novoNo  → atual
        atual.anterior    = novoNo;   // atual   → novoNo

        this.length++;
    }

    // ====================================================
    // Remove e retorna valor do nó em posição específica — O(n)
    // ====================================================
    // Casos especiais (único nó, head, tail) são O(1).
    // Remoção no meio exige percorrer até o índice: O(n).
    // A vantagem sobre a lista simples aparece na remoção
    // do tail: O(1) aqui, O(n) na lista simples.
    removerEm(indice) {
        if (indice < 0 || indice >= this.length) {
            throw new RangeError('Índice fora dos limites');
        }

        let remover;

        if (this.length === 1) {
            // Único nó: esvazia a lista completamente
            remover    = this.head;
            this.head  = null;
            this.tail  = null;
        }
        else if (indice === 0) {
            // Remove o head — O(1)
            remover           = this.head;
            this.head         = this.head.proximo;
            this.head.anterior = null; // novo head não tem anterior
        }
        else if (indice === this.length - 1) {
            // Remove o tail — O(1), vantagem sobre lista simples
            remover           = this.tail;
            this.tail         = this.tail.anterior;
            this.tail.proximo = null; // novo tail não tem próximo
        }
        else {
            // Remove no meio — O(n): percorre até o índice
            let atual = this.head;
            for (let i = 0; i < indice; i++) {
                atual = atual.proximo;
            }
            remover = atual;

            // Ponte entre os vizinhos, pulando o nó removido:
            //   antes:  anterior ⇄ atual ⇄ proximo
            //   depois: anterior ⇄ proximo
            const anterior = atual.anterior;
            const proximo  = atual.proximo;
            anterior.proximo = proximo;
            proximo.anterior  = anterior;
        }

        this.length--;
        return remover.valor;
    }

    // ====================================================
    // Imprime do head ao tail — percurso natural (→)
    // ====================================================
    imprimirFrente() {
        let atual = this.head;
        let str = '';
        while (atual) {
            str  += `${atual.valor} ⇄ `;
            atual = atual.proximo;
        }
        console.log(str + 'null');
    }

    // ====================================================
    // Imprime do tail ao head — percurso reverso (←)
    // ====================================================
    // Isso é IMPOSSÍVEL em uma lista simples sem percorrer
    // tudo novamente. Aqui é direto graças ao ponteiro `anterior`.
    imprimirAtras() {
        let atual = this.tail;
        let str = '';
        while (atual) {
            str  += `${atual.valor} ⇄ `;
            atual = atual.anterior;
        }
        console.log(str + 'null');
    }

    // Retorna o número de nós — O(1) graças ao contador `length`
    tamanho() {
        return this.length;
    }
}

// =========================
// EXEMPLO DE USO
// =========================
const listaDupla = new DoublyLinkedList();

console.log('--- Inserindo no início: A, B, C ---');
listaDupla.inserirInicio('A');
listaDupla.inserirInicio('B');
listaDupla.inserirInicio('C');
listaDupla.imprimirFrente(); // C ⇄ B ⇄ A ⇄ null
listaDupla.imprimirAtras();  // A ⇄ B ⇄ C ⇄ null

console.log('\n--- Inserindo no fim: D, E ---');
listaDupla.inserirFim('D');
listaDupla.inserirFim('E');
listaDupla.imprimirFrente(); // C ⇄ B ⇄ A ⇄ D ⇄ E ⇄ null

console.log('\n--- Inserindo no índice 2: X ---');
listaDupla.inserirEm(2, 'X');
listaDupla.imprimirFrente(); // C ⇄ B ⇄ X ⇄ A ⇄ D ⇄ E ⇄ null

console.log('\n--- Removendo índice 3 ---');
console.log('Removido:', listaDupla.removerEm(3));
listaDupla.imprimirFrente(); // C ⇄ B ⇄ X ⇄ D ⇄ E ⇄ null

console.log('\nTamanho da lista:', listaDupla.tamanho());