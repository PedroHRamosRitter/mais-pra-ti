// ============================================================
//   FUNDAMENTOS DE JAVASCRIPT
// ============================================================

// JavaScript é uma linguagem de programação criada em 1995
// por Brendan Eich enquanto trabalhava na Netscape. A história
// conta que ele a criou em apenas 10 dias. O objetivo inicial era simples:
// adicionar interatividade às páginas web, que na época eram estáticas (só HTML).

// ECMAScript é a especificação que define as regras da linguagem. Pense assim:
// ECMAScript = a receita, o manual de regras
// JavaScript = o prato pronto, a implementação dessa receita

// A confusão existe porque o JavaScript cresceu tão rápido que precisou de um
// órgão oficial para padronizá-lo. Em 1997, a organização ECMA International
// assumiu essa responsabilidade e publicou a primeira versão oficial da
// especificação, chamando-a de ECMAScript. Na prática, os dois nomes se referem
// à mesma coisa. Quando alguém fala "ES6" ou "ES2015", está falando de uma versão
// do ECMAScript — e portanto do JavaScript.

// ============================================================
// BLOCO 1 — EXIBINDO MENSAGENS (console.log)
// ============================================================
// console.log() é como um "falar em voz alta" para o computador.
// Tudo que você colocar dentro dos parênteses aparece no terminal.

// Tecnicamente, console é um objeto global disponível tanto no navegador
// quanto no Node.js, e log() é um de seus métodos. Outros métodos úteis:
// console.warn()  → exibe aviso em amarelo
// console.error() → exibe erro em vermelho
// console.table() → exibe dados em formato de tabela

console.log("Olá, mundo!");        // texto com aspas duplas
console.log('Olá de novo!');       // aspas simples também funcionam
console.log(`E eu uso crases!`);   // crases são chamadas de "template literals"
// Lembrando: se quiser expor aspas dentro de um texto, as internas
// não podem ser iguais às externas. Ex: "Ele disse 'olá'" funciona.

// Você pode exibir mais de uma coisa de uma vez, separando por vírgulas:
console.log("Meu nome é", "Ana", "e tenho", 25, "anos");
// Resultado: Meu nome é Ana e tenho 25 anos

// Por que isso é útil?
// Enquanto você programa, usa console.log para "ver" o que está acontecendo.
// É como acender a luz num quarto escuro para ver o que tem lá dentro.

// ============================================================
// BLOCO 2 — TIPOS DE DADOS (o que o JS entende)
// ============================================================
// Assim como no mundo real temos diferentes tipos de coisas
// (números, palavras, verdade/mentira), no JS também.

// O JavaScript possui dois grupos de tipos de dados:
// → Primitivos: string, number, boolean, null, undefined, symbol, bigint
// → Objetos: arrays, funções, datas, etc. (veremos em módulos futuros)
// Por ora, foque nos primitivos abaixo.

// STRING — texto entre aspas (simples, duplas ou crases)
console.log("Olá");    // aspas duplas
console.log('Mundo');  // aspas simples
console.log(`JS`);     // crases (template literals)
// Internamente, strings são sequências de caracteres Unicode.
// Cada letra, espaço ou símbolo ocupa uma posição (índice), começando em 0.

// NUMBER — números inteiros e decimais (o JS usa ponto, não vírgula!)
console.log(42);     // número inteiro
console.log(3.14);   // número com casas decimais
// Tecnicamente, o JS usa o padrão IEEE 754 de dupla precisão (64 bits)
// para representar todos os números. Por isso, há limites:
console.log(Number.MAX_SAFE_INTEGER);  // 9007199254740991 — maior inteiro seguro
console.log(Number.MIN_SAFE_INTEGER);  // -9007199254740991

// BOOLEAN — verdadeiro ou falso (pense como uma lâmpada: acesa ou apagada)
console.log(true);   // verdadeiro
console.log(false);  // falso

// NULL — ausência intencional de valor (você mesmo definiu que está vazio)
console.log(null);

// UNDEFINED — ausência não intencional (o JS não encontrou nenhum valor)
console.log(undefined);
// Diferença: null é como uma caixa vazia de propósito.
//            undefined é uma caixa que nem foi criada ainda.

// SYMBOL (ES6+) — identificador único e imutável, usado em casos avançados
const id = Symbol("id");
console.log(typeof id);  // "symbol"
// Dois Symbols com a mesma descrição são sempre diferentes entre si:
console.log(Symbol("id") === Symbol("id"));  // false

// BIGINT (ES2020+) — para inteiros maiores que Number.MAX_SAFE_INTEGER
const numeroGigante = 9007199254740992n;  // note o "n" no final
console.log(numeroGigante + 1n);          // 9007199254740993n
// BigInt e Number não podem ser misturados diretamente em operações.

// Como descobrir o tipo de qualquer valor? Use typeof:
console.log(typeof "Olá");      // "string"
console.log(typeof 42);         // "number"
console.log(typeof true);       // "boolean"
console.log(typeof undefined);  // "undefined"
console.log(typeof null);       // "object" ← bug histórico do JS (existe desde 1995!)
console.log(typeof Symbol());   // "symbol"
console.log(typeof 42n);        // "bigint"

// ============================================================
// BLOCO 3 — VARIÁVEIS (guardando valores na memória)
// ============================================================
// Uma variável é como uma caixinha com um nome escrito.
// Você coloca um valor dentro dela e usa o nome para acessar depois.

// LET — escopo de bloco, valor pode mudar (padrão moderno)
let idade = 20;
console.log(idade);  // 20
idade = 21;          // reatribuição permitida
console.log(idade);  // 21

// CONST — escopo de bloco, valor não pode ser reatribuído (padrão moderno)
const NOME = "Carlos";
console.log(NOME);
// NOME = "João";  // ← TypeError: Assignment to constant variable.
// Atenção: const impede a reatribuição da variável, mas não "congela" objetos.
// Ex: um array declarado com const ainda pode ter itens adicionados.

// VAR — escopo de função (forma antiga, evite usar)
// var tem comportamentos confusos como "hoisting" e escopo global acidental.
// "Hoisting" significa que o JS move declarações var para o topo do escopo
// em tempo de execução, o que pode causar bugs difíceis de encontrar.
var cidade = "Porto Alegre";
console.log(cidade);

// Regras para nomear variáveis:
// nomeCompleto    (camelCase — padrão no JS)
// minhaIdade
// VALOR_MAXIMO    (UPPER_SNAKE_CASE — convenção para constantes)
// 1nome           (não pode começar com número)
// meu nome        (não pode ter espaço)
// if / for / let  (palavras reservadas do JS)

let semValor;           // declarada, mas sem valor atribuído
console.log(semValor);  // undefined
semValor = "Agora tem!";
console.log(semValor);  // "Agora tem!"

// ============================================================
// BLOCO 4 — OPERAÇÕES MATEMÁTICAS
// ============================================================
// O JS funciona como uma calculadora. Os operadores aritméticos
// são aplicados sobre valores do tipo number.

let a = 10;
let b = 3;

console.log(a + b);   // 13      — adição
console.log(a - b);   // 7       — subtração
console.log(a * b);   // 30      — multiplicação
console.log(a / b);   // 3.333...— divisão (resultado pode ser decimal)
console.log(a % b);   // 1       — módulo: RESTO da divisão inteira (10 ÷ 3 = 3, sobra 1)
console.log(a ** b);  // 1000    — exponenciação: 10³ = 10 × 10 × 10

// O operador % (módulo) é muito usado para saber se um número é par ou ímpar:
console.log(10 % 2);  // 0 — par!   (resto zero = divisível por 2)
console.log(7 % 2);   // 1 — ímpar! (resto diferente de zero)

// Precedência de operadores (igual à matemática — regra PEMDAS):
// 1° Parênteses ( )
// 2° Potência **
// 3° Multiplicação *, Divisão /, Módulo %
// 4° Adição +, Subtração -
console.log(2 + 3 * 4);    // 14 (3*4=12 primeiro, depois 2+12)
console.log((2 + 3) * 4);  // 20 (parênteses primeiro: 2+3=5, depois 5*4)

// CUIDADO com texto + número (coerção de tipos):
console.log("5" + 3);   // "53" — o JS converte 3 para string e concatena!
console.log(5 + 3);     // 8    — dois numbers, soma normal
// O operador + tem dupla função: soma números E concatena strings.
// Com - * / o JS sempre converte para número:
console.log("10" - 2);  // 8  — JS converte "10" para número automaticamente
console.log("10" * 2);  // 20 — idem

// ============================================================
// BLOCO 5 — INCREMENTO E DECREMENTO (atalhos para somar/subtrair 1)
// ============================================================
// Em programação, é muito comum somar ou subtrair 1 de uma variável.
// Ex: contar passos, tentativas, pontuação num jogo.

let pontos = 0;

pontos = pontos + 1;  // forma explícita
console.log(pontos);  // 1

pontos++;             // pós-incremento: usa o valor atual, depois soma 1
console.log(pontos);  // 2

++pontos;             // pré-incremento: soma 1 primeiro, depois usa o valor
console.log(pontos);  // 3

pontos--;             // pós-decremento
console.log(pontos);  // 2

// Diferença entre pós e pré-incremento dentro de uma expressão:
let x = 5;
console.log(x++);  // imprime 5 (valor atual), depois x vira 6
console.log(x);    // 6

let y = 5;
console.log(++y);  // y vira 6 primeiro, depois imprime 6
console.log(y);    // 6

// Operadores de atribuição composta (atalhos para qualquer valor):
let placar = 10;
placar += 5;   // placar = placar + 5  →  15
placar -= 3;   // placar = placar - 3  →  12
placar *= 2;   // placar = placar * 2  →  24
placar /= 4;   // placar = placar / 4  →  6
placar **= 2;  // placar = placar ** 2 →  36 (ES2016+)
placar %= 10;  // placar = placar % 10 →  6
console.log(placar);  // 6

// ============================================================
// BLOCO 6 — CONVERSÃO DE TIPOS (coerção e casting)
// ============================================================
// O JS faz conversões de tipo de duas formas:
// → Implícita (coerção): o JS converte sozinho, sem você pedir
// → Explícita (casting): você converte manualmente com funções

// TEXTO → NÚMERO (casting explícito)
let textoNumero = "42";
console.log(textoNumero + 8);          // "428" — coerção implícita: concatenou!
console.log(Number(textoNumero) + 8);  // 50    — casting explícito para número
console.log(parseInt("42.9abc"));      // 42    — lê inteiro até onde der
console.log(parseFloat("3.14xyz"));    // 3.14  — lê decimal até onde der
// parseInt e parseFloat são funções globais herdadas do ES1.
// Elas ignoram caracteres não numéricos após o número válido.

// NÚMERO → TEXTO (casting explícito)
let num = 100;
console.log(String(num) + " reais");  // "100 reais"
console.log(num.toString() + " kg");  // "100 kg"
console.log(num.toFixed(2));          // "100.00" — define casas decimais (retorna string)

// Coerção implícita — o JS fazendo por conta própria (cuidado!):
console.log("10" * 2);   // 20    — converte para número (- * / sempre convertem)
console.log("10" - 2);   // 8     — idem
console.log("10" + 2);   // "102" — MAS + prefere concatenar quando há string!

// Verificando se uma conversão falhou:
console.log(Number("abc"));  // NaN — "Not a Number"
console.log(isNaN("abc"));   // true  — isNaN() checa se o valor NÃO é número
console.log(isNaN("42"));    // false — "42" pode ser convertido em número
// NaN é do tipo "number" — mais um detalhe curioso do JS:
console.log(typeof NaN);     // "number"
// E NaN nunca é igual a si mesmo:
console.log(NaN === NaN);    // false — use isNaN() para verificar

// ============================================================
// BLOCO 7 — MATH (funções matemáticas prontas)
// ============================================================
// Math é um objeto nativo do JS com propriedades e métodos matemáticos.
// Não precisa importar nada — já está disponível globalmente.

// Número aleatório entre 0 (inclusive) e 1 (exclusive):
console.log(Math.random());  // ex: 0.7382...

// Número inteiro aleatório entre 0 e 9:
console.log(Math.floor(Math.random() * 10));
// Math.random() → 0.0 a 0.999...
// * 10          → 0.0 a 9.999...
// Math.floor()  → arredonda pra baixo → 0 a 9

// Número aleatório entre 1 e N (fórmula universal):
// Math.floor(Math.random() * N) + 1
let aleatorio = Math.floor(Math.random() * 100) + 1;
console.log("Número de 1 a 100:", aleatorio);

// Arredondamentos:
console.log(Math.round(4.4));   // 4 — arredonda para o mais próximo
console.log(Math.round(4.5));   // 5 — .5 vai para cima
console.log(Math.ceil(4.1));    // 5 — sempre arredonda para CIMA  (teto = ceiling)
console.log(Math.floor(4.9));   // 4 — sempre arredonda para BAIXO (chão = floor)
console.log(Math.trunc(4.9));   // 4 — remove as casas decimais (sem arredondar)
console.log(Math.trunc(-4.9));  // -4 — atenção: trunc ≠ floor para negativos!
// floor(-4.9) seria -5, pois floor vai ao inteiro ABAIXO.

// Máximo e mínimo:
console.log(Math.max(1, 99, 50, 23));  // 99
console.log(Math.min(1, 99, 50, 23));  // 1

// Potência e raiz:
console.log(Math.pow(2, 8));   // 256 — equivalente a 2 ** 8
console.log(Math.sqrt(144));   // 12  — raiz quadrada (√144)
console.log(Math.cbrt(27));    // 3   — raiz cúbica (∛27)
console.log(Math.log2(8));     // 3   — logaritmo base 2 de 8

// Valor absoluto (remove o sinal negativo):
console.log(Math.abs(-50));  // 50
console.log(Math.abs(50));   // 50 — positivo continua positivo

// Constantes matemáticas:
console.log(Math.PI);     // 3.141592653589793
console.log(Math.E);      // 2.718281828459045 — número de Euler (base do logaritmo natural)
console.log(Math.SQRT2);  // 1.4142135623730951 — raiz quadrada de 2


// ============================================================
// BLOCO 8 — DATE (trabalhando com datas e horas)
// ============================================================
// Date é um objeto nativo do JS para lidar com datas e horas.
// Internamente, ele armazena o tempo como um número inteiro:
// a quantidade de milissegundos desde 1° de janeiro de 1970 às 00:00:00 UTC.
// Esse ponto de referência se chama "Unix Epoch" ou "Unix Timestamp".

// Data e hora AGORA:
const agora = new Date();       // captura o momento atual
console.log(agora.toString());  // ex: "Tue May 05 2026 14:32:10 GMT-0300"

// Timestamp atual em milissegundos (forma mais rápida):
console.log(Date.now());  // ex: 1746464930000

// Extraindo partes da data:
console.log("Ano:", agora.getFullYear());           // ex: 2026
console.log("Mês (0=jan):", agora.getMonth());      // 0 a 11 — CUIDADO! Janeiro = 0
console.log("Dia do mês:", agora.getDate());        // 1 a 31
console.log("Dia da semana:", agora.getDay());      // 0=domingo, 1=segunda, ..., 6=sábado
console.log("Hora:", agora.getHours());             // 0 a 23
console.log("Minutos:", agora.getMinutes());        // 0 a 59
console.log("Segundos:", agora.getSeconds());       // 0 a 59
console.log("Milissegundos:", agora.getMilliseconds()); // 0 a 999

// Exibindo de forma localizada (respeita idioma e fuso horário):
console.log("Data formatada:", agora.toLocaleDateString("pt-BR"));  // 05/05/2026
console.log("Hora formatada:", agora.toLocaleTimeString("pt-BR"));  // 14:32:10
console.log("Completo:", agora.toLocaleString("pt-BR"));            // 05/05/2026 14:32:10

// Criando uma data específica:
// new Date(ano, mês, dia, hora, minuto, segundo) — mês começa em 0!
const natal = new Date(2026, 11, 25);  // mês 11 = dezembro
console.log("Natal:", natal.toLocaleDateString("pt-BR"));  // 25/12/2026

// Criando data a partir de string no formato ISO 8601 (padrão internacional):
const reveillon = new Date("2026-12-31T23:59:59");
console.log("Réveillon:", reveillon.toLocaleString("pt-BR"));

// Calculando diferença entre datas:
// Subtrair dois objetos Date retorna a diferença em milissegundos.
const hoje = new Date();
const proximoAno = new Date(2027, 0, 1);  // 1° de janeiro de 2027
const diffMs = proximoAno - hoje;
const diffDias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));  // ms → seg → min → h → dias
console.log(`Faltam ${diffDias} dias para 2027!`);

// Modificando partes de uma data:
let aniversario = new Date(1990, 4, 15);  // 15 de maio de 1990
aniversario.setFullYear(1991);            // altera apenas o ano
aniversario.setMonth(11);                 // altera para dezembro (11)
console.log("Aniversário ajustado:", aniversario.toLocaleDateString("pt-BR"));

// ============================================================
// BLOCO 9 — STRINGS (trabalhando com texto)
// ============================================================
// Strings são textos. Internamente são sequências de caracteres Unicode,
// onde cada posição possui um índice começando em 0.
// São imutáveis: métodos não alteram a string original, retornam uma nova.

const frase = "JavaScript é incrível!";

// COMPRIMENTO — número de caracteres (espaços e símbolos contam)
console.log(frase.length);  // 22

// ACESSO a caracteres por índice:
console.log(frase[0]);       // "J" — primeiro caractere
console.log(frase.at(-1));   // "!" — último (at() aceita índices negativos, ES2022+)

// MAIÚSCULAS e MINÚSCULAS
console.log(frase.toUpperCase());  // "JAVASCRIPT É INCRÍVEL!"
console.log(frase.toLowerCase());  // "javascript é incrível!"

// VERIFICAR conteúdo:
console.log(frase.includes("incrível"));   // true
console.log(frase.startsWith("Java"));     // true
console.log(frase.endsWith("!"));          // true

// ENCONTRAR posição de uma substring (índice começa em 0):
console.log(frase.indexOf("é"));       // 11 — primeira ocorrência
console.log(frase.indexOf("Python"));  // -1 — não encontrou
console.log(frase.lastIndexOf("!"));   // 21 — última ocorrência

// RECORTAR partes da string:
// slice(início, fim) — fim não é incluído; aceita índices negativos
console.log(frase.slice(0, 10));  // "JavaScript"
console.log(frase.slice(11));     // "é incrível!" (do índice 11 ao fim)
console.log(frase.slice(-9));     // "incrível!" (9 últimos caracteres)

// SUBSTITUIR texto:
console.log(frase.replace("incrível", "fantástico"));  // substitui 1ª ocorrência
console.log(frase.replaceAll("a", "@"));               // substitui todas (ES2021+)

// DIVIDIR em partes — retorna um array:
const palavras = frase.split(" ");  // divide onde há espaço
console.log(palavras);              // ["JavaScript", "é", "incrível!"]
console.log(palavras.length);       // 3 — número de palavras

// REPETIR e PREENCHER:
console.log("Ha".repeat(3));        // "HaHaHa"
console.log("5".padStart(3, "0"));  // "005" — preenche à esquerda
console.log("5".padEnd(3, "0"));    // "500" — preenche à direita

// REMOVER espaços das pontas (essencial ao tratar input de usuário):
const comEspacos = "   olá mundo   ";
console.log(comEspacos.trim());       // "olá mundo"
console.log(comEspacos.trimStart());  // "olá mundo   "
console.log(comEspacos.trimEnd());    // "   olá mundo"

// TEMPLATE LITERALS (ES6+) — a forma moderna de montar strings:
const produto = "café";
const preco = 8.5;

// Jeito antigo — concatenação com +:
console.log("O " + produto + " custa R$ " + preco);

// Jeito moderno — template literal com ${expressão}:
console.log(`O ${produto} custa R$ ${preco}`);
// Dentro de ${} cabe qualquer expressão JS válida:
console.log(`O dobro do preço seria R$ ${preco * 2}`);
console.log(`A frase tem ${frase.length} caracteres.`);

// ============================================================
// RESUMO FINAL — O que você aprendeu:
// ============================================================
// console.log()  → exibir mensagens no terminal
// Tipos          → string, number, boolean, null, undefined, symbol, bigint
// Variáveis      → let (mutável), const (imutável), var (evitar)
// Matemática     → + - * / % ** e operadores de atribuição composta
// Incremento     → ++ -- += -= *= /= **= %=
// Coerção        → implícita (automática) e explícita (Number, String, parseInt...)
// Math           → random, floor, ceil, round, trunc, max, min, sqrt, abs, PI, E
// Date           → new Date(), getFullYear(), toLocaleDateString(), Date.now()
// String         → length, at, slice, includes, replace, split, trim, template literals

//Teste do Jaques.