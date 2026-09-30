// =============================================================
// O QUE SÃO CLASSES EM JAVASCRIPT?
// =============================================================
//
// Uma classe é um MOLDE para criar objetos. Ela define quais
// propriedades (dados) e métodos (comportamentos) os objetos
// criados a partir dela terão.
//
// Antes das classes (ES6/2015), JS usava funções construtoras:
//
//   // Jeito antigo (função construtora)
//   function Animal(nome, som) {
//       this.nome = nome;
//       this.som  = som;
//   }
//   Animal.prototype.falar = function() {
//       console.log(`${this.nome} faz ${this.som}`);
//   }
//
//   // Jeito moderno (classe) — mesmo resultado, sintaxe clara
//   class Animal {
//       constructor(nome, som) {
//           this.nome = nome;
//           this.som  = som;
//       }
//       falar() {
//           console.log(`${this.nome} faz ${this.som}`);
//       }
//   }
//
// IMPORTANTE: classes em JS são "açúcar sintático" — por baixo
// continuam sendo funções e protótipos. A diferença é só na
// legibilidade.
//
// =============================================================
// CONCEITOS QUE ESTE ARQUIVO COBRE
// =============================================================
//
//  1. Classe base e constructor
//  2. Métodos de instância
//  3. Métodos e propriedades estáticos (static)
//  4. Getters e setters
//  5. Herança com extends e super
//  6. Sobrescrita de métodos (override)
//  7. Encapsulamento com campos privados (#)
//
// =============================================================



// =============================================================
// 1. CLASSE BASE — Animal
// =============================================================
//
// O `constructor` é chamado automaticamente quando fazemos
// `new Animal(...)`. Ele inicializa as propriedades do objeto.
// `this` refere-se à instância que está sendo criada.

class Animal {

    // ---------------------------------------------------------
    // 7. CAMPO PRIVADO
    // ---------------------------------------------------------
    // Declarado com # antes do nome. Só pode ser lido ou
    // alterado por métodos DENTRO desta própria classe.
    // Tentar acessar `animal.#energia` fora da classe gera erro.
    #energia;

    constructor(nome, som) {
        this.nome = nome; // propriedade pública: acessível de fora
        this.som  = som;  // propriedade pública: acessível de fora
        this.#energia = 100; // campo privado: invisível externamente
    }

    // ---------------------------------------------------------
    // 2. MÉTODO DE INSTÂNCIA
    // ---------------------------------------------------------
    // Existe em cada objeto criado pela classe. Cada instância
    // tem acesso ao seu próprio `this`, com seus próprios dados.
    falar() {
        console.log(`${this.nome} faz "${this.som}"`);
    }

    // Outro método de instância: consome o campo privado #energia
    mover(distancia) {
        this.#energia -= distancia; // altera o campo privado internamente
        console.log(`${this.nome} se moveu ${distancia}m. Energia: ${this.#energia}`);
    }

    // ---------------------------------------------------------
    // 4. GETTER
    // ---------------------------------------------------------
    // Parece uma propriedade para quem usa, mas executa lógica.
    // Acesso: animal.status  (sem parênteses, como se fosse prop)
    get status() {
        if (this.#energia > 60) return `${this.nome} está com energia alta`;
        if (this.#energia > 30) return `${this.nome} está cansado`;
        return `${this.nome} está exausto`;
    }

    // ---------------------------------------------------------
    // 4. SETTER
    // ---------------------------------------------------------
    // Intercepta uma atribuição e permite validar antes de salvar.
    // Uso: animal.energia = 80  (sem parênteses, como uma prop)
    set energia(valor) {
        if (valor < 0 || valor > 100) {
            throw new RangeError('Energia deve estar entre 0 e 100');
        }
        this.#energia = valor; // só chega aqui se passar na validação
    }

    // ---------------------------------------------------------
    // 3. MÉTODO ESTÁTICO
    // ---------------------------------------------------------
    // Pertence à CLASSE, não às instâncias. Chamado como:
    //   Animal.comparar(a, b)  ← correto
    //   meuAnimal.comparar()   ← erro: não existe na instância
    //
    // Use para utilitários que fazem sentido no contexto da
    // classe mas não dependem de um objeto específico.
    static comparar(a, b) {
        console.log(`Comparando ${a.nome} e ${b.nome}:`);
        console.log(` ${a.nome} faz "${a.som}" | ${b.nome} faz "${b.som}"`);
    }

    // ---------------------------------------------------------
    // 3. PROPRIEDADE ESTÁTICA
    // ---------------------------------------------------------
    // Valor compartilhado por TODOS, pertence à classe inteira.
    // Acesso: Animal.reino
    static reino = 'Animalia';
}



// =============================================================
// 5. HERANÇA COM extends
// =============================================================
//
// `extends` faz Cachorro herdar TUDO de Animal: propriedades,
// métodos, getter, setter. Cachorro é uma especialização de
// Animal — tem tudo que Animal tem, mais o que definir aqui.
//
// Regra obrigatória: se uma classe filha tem constructor, ela
// DEVE chamar super() antes de usar `this`. O super() executa
// o constructor da classe pai, garantindo que as propriedades
// herdadas sejam inicializadas corretamente.

class Cachorro extends Animal {

    constructor(nome, raca) {
        // super() chama o constructor de Animal com os argumentos
        // necessários. Sem este super(), `this.nome` não existiria.
        super(nome, 'Au au'); // Animal.constructor(nome, 'Au au')

        // Só após o super() podemos usar `this` para adicionar
        // propriedades exclusivas de Cachorro
        this.raca = raca;
    }

    // ---------------------------------------------------------
    // 6. SOBRESCRITA DE MÉTODO (override)
    // ---------------------------------------------------------
    // Cachorro tem seu próprio `falar`, que substitui o de Animal.
    // Quando chamamos cachorro.falar(), JS executa ESTE método,
    // não o da classe pai.
    falar() {
        console.log(`${this.nome} (${this.raca}) late: "Au au au!"`);
    }

    // Método exclusivo de Cachorro — Animal não tem isso
    buscarBola() {
        console.log(`${this.nome} correu atrás da bola!`);
        this.mover(20); // chama método HERDADO de Animal
    }
}



// =============================================================
// 5 + 6. SEGUNDA FILHA: Gato
// =============================================================
//
// Outra especialização de Animal, completamente independente
// de Cachorro. Demonstra que a mesma classe pai pode gerar
// filhos com comportamentos completamente diferentes.

class Gato extends Animal {

    constructor(nome, ehDomestico) {
        super(nome, 'Miau');        // inicializa a parte Animal
        this.ehDomestico = ehDomestico;
    }

    // 6. Override: Gato sobrescreve falar com comportamento próprio
    falar() {
        const tipo = this.ehDomestico ? 'doméstico' : 'selvagem';
        console.log(`${this.nome} (${tipo}) mia suavemente: "Miau..."`);
    }

    // Método exclusivo de Gato
    ronronar() {
        console.log(`${this.nome} está ronronando... Purrr`);
        // super.falar() chamaria o falar() original de Animal —
        // útil quando você quer ESTENDER o comportamento do pai,
        // não substituí-lo completamente.
        // Exemplo: super.falar(); // "Rex faz Miau"
    }
}



// =============================================================
// EXEMPLO DE USO
// =============================================================

console.log('=== Propriedade estática ===');
// Pertence à classe, não às instâncias
console.log('Reino:', Animal.reino); // Animalia


console.log('\n=== Instâncias e métodos ===');
const cachorro = new Cachorro('Rex', 'Labrador');
const gato     = new Gato('Mimi', true);

cachorro.falar();  // override de Cachorro
gato.falar();      // override de Gato


console.log('\n=== Método herdado ===');
// mover() não foi definido em Cachorro nem Gato — vem de Animal
cachorro.mover(15);
gato.mover(5);


console.log('\n=== Getter ===');
// Parece acesso a propriedade, executa lógica internamente
console.log(cachorro.status);
console.log(gato.status);


console.log('\n=== Setter com validação ===');
cachorro.energia = 40; // passa pelo setter, válido
console.log(cachorro.status);

try {
    cachorro.energia = 150; // setter rejeita: fora do range
} catch (e) {
    console.log('Erro capturado:', e.message);
}


console.log('\n=== Método estático ===');
// Chamado na classe, não na instância
Animal.comparar(cachorro, gato);


console.log('\n=== Método exclusivo da subclasse ===');
cachorro.buscarBola(); // próprio de Cachorro, chama mover() herdado
gato.ronronar();       // próprio de Gato


console.log('\n=== instanceof: verificando hierarquia ===');
// instanceof verifica se um objeto pertence a uma classe,
// incluindo toda a cadeia de herança
console.log(cachorro instanceof Cachorro); // true — é um Cachorro
console.log(cachorro instanceof Animal);   // true — também é um Animal
console.log(gato instanceof Cachorro);     // false — não é um Cachorro