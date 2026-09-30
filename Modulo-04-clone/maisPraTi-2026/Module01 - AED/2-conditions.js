// ============================================================
//   CONDICIONAIS E OPERADORES
// ============================================================

// Neste módulo você vai aprender como o computador toma DECISÕES.
// Toda lógica de programação gira em torno de perguntas do tipo:
// "isso é verdade? Se sim, faça X. Se não, faça Y."

// Tecnicamente, estruturas condicionais são chamadas de "control flow"
// (fluxo de controle). Elas determinam qual caminho o código vai percorrer
// durante a execução. Sem elas, todo programa rodaria sempre do mesmo jeito,
// linha por linha, sem nenhuma variação — o que tornaria qualquer software inútil.

// ============================================================
// BLOCO 1 — OPERADORES DE COMPARAÇÃO (fazendo perguntas)
// ============================================================
// Comparações sempre retornam true (verdadeiro) ou false (falso).
// Pense como perguntas com resposta de sim ou não.
// O resultado de uma comparação é sempre um valor do tipo boolean.

console.log(10 > 5);    // true  — 10 é maior que 5? SIM
console.log(10 < 5);    // false — 10 é menor que 5? NÃO
console.log(10 >= 10);  // true  — 10 é maior OU igual a 10? SIM (é igual!)
console.log(10 <= 9);   // false — 10 é menor ou igual a 9? NÃO

// ==  vs  ===  (essa é uma das maiores confusões do JS para iniciantes!)
// == compara apenas o VALOR (usa coerção de tipo — converte antes de comparar):
console.log(10 == "10");   // true  — "10" é convertido para número antes de comparar
console.log(0 == false);   // true  — false é convertido para 0
console.log("" == false);  // true  — string vazia e false ambos viram 0
console.log(null == undefined); // true — exceção especial do JS

// === compara VALOR e TIPO (igualdade estrita — sem nenhuma conversão):
console.log(10 === "10");  // false — número ≠ string, tipos diferentes!
console.log(10 === 10);    // true  — mesmo valor E mesmo tipo

// REGRA DE OURO: sempre prefira === no seu código.
// O == pode gerar surpresas desagradáveis. O === é previsível e seguro.

// !=  vs  !==  (a negação das comparações acima):
console.log(10 != "10");   // false — == enxerga como iguais (mesmo com tipos diferentes)
console.log(10 !== "10");  // true  — === enxerga como diferentes (tipos distintos)

// ============================================================
// BLOCO 2 — OPERADORES LÓGICOS (combinando condições)
// ============================================================
// Às vezes uma condição só não basta. Você precisa combinar várias.
// Existem 3 operadores lógicos principais:

// && (E lógico)  — AMBAS as condições precisam ser verdadeiras
// || (OU lógico) — PELO MENOS UMA condição precisa ser verdadeira
// !  (NÃO lógico) — INVERTE o valor booleano da condição

// Exemplo do cotidiano para &&:
// "Para entrar na festa, você precisa ter ingresso E ser maior de 18 anos"
let temIngresso = true;
let maiorDeIdade = false;
console.log(temIngresso && maiorDeIdade);  // false — precisa das DUAS condições

// Exemplo do cotidiano para ||:
// "Você pode pagar com dinheiro OU cartão"
let temDinheiro = false;
let temCartao = true;
console.log(temDinheiro || temCartao);     // true — BASTA UMA ser verdadeira

// Exemplo do cotidiano para !:
// "A loja está fechada? Então não posso entrar."
let lojaAberta = false;
console.log(!lojaAberta);  // true — negou o false, virou true
// "A loja NÃO está aberta" = verdadeiro (de fato está fechada)

// Tabela verdade do && (E lógico):
// true  && true  → true   (os dois concordam que é verdade)
// true  && false → false  (um discorda, resultado é falso)
// false && true  → false
// false && false → false

// Tabela verdade do || (OU lógico):
// true  || true  → true   (pelo menos um é verdadeiro)
// true  || false → true
// false || true  → true
// false || false → false  (nenhum dos dois é verdadeiro)

// Avaliação de curto-circuito (short-circuit evaluation):
// O JS é "preguiçoso": no &&, se o primeiro operando for false, ele para ali.
// No ||, se o primeiro for true, ele para ali. Isso tem implicações práticas:
let usuario = null;
let nomeExibido = usuario && usuario.length;  // evita erro: se usuario for null, para antes
console.log(nomeExibido);  // null — não tentou acessar .length de null

// Combinações mais complexas — avalie de dentro pra fora, como na matemática:
console.log((10 < 5) && (10 > 2));   // false && true  → false
console.log((10 > 5) || (10 < 2));   // true  || false → true
console.log(!(10 > 5) || (10 < 2));  // !true || false → false || false → false
// Dica: use parênteses para deixar a ordem de avaliação explícita e clara.

// ============================================================
// BLOCO 3 — EXEMPLO REAL: AUTENTICAÇÃO
// ============================================================
// Um dos usos mais comuns de && é verificar login e senha juntos.
// O usuário só entra se os DOIS estiverem corretos.
// Este é um exemplo simplificado — em sistemas reais, senhas nunca ficam
// no código e são verificadas no servidor com criptografia.

let nomeUsuario = "Maria";
let senha = "minhasenha123";

let loginCorreto = nomeUsuario === "Maria" && senha === "minhasenha123";
console.log("Login autorizado?", loginCorreto);  // true

// O que acontece se só a senha estiver errada?
let loginErrado = nomeUsuario === "Maria" && senha === "senhaerrada";
console.log("Login autorizado?", loginErrado);   // false — && exige os dois corretos

// Usando ! para verificar se o login FALHOU:
if (!loginErrado) {
    console.log("Acesso negado. Verifique suas credenciais.");
}

// ============================================================
// BLOCO 4 — IF / ELSE (se isso... senão...)
// ============================================================
// O if é a estrutura de decisão mais fundamental da programação.
// Em português: "SE [condição] for verdadeira, faça [bloco A], SENÃO faça [bloco B]."
// Os blocos de código ficam entre chaves {} e podem conter quantas linhas quiser.

const nota = 75;

if (nota >= 60) {
    console.log("APROVADO! 🎉");  // executado se nota for 60 ou mais
} else {
    console.log("REPROVADO. 😢"); // executado se nota for menos que 60
}

// O ELSE é opcional — você pode ter um if sem else:
if (nota === 100) {
    console.log("Nota máxima! Parabéns!");
}
// Se nota não for 100, simplesmente nada acontece aqui.

// IF / ELSE IF / ELSE — para múltiplas condições em sequência:
// O JS testa cada condição de cima pra baixo e executa apenas a primeira verdadeira.
// As demais são ignoradas, mesmo que também sejam verdadeiras.
let temperatura = 28;

if (temperatura < 0) {
    console.log("Está congelando! 🧊");
} else if (temperatura < 15) {
    console.log("Está frio. Pegue um casaco.");
} else if (temperatura < 25) {
    console.log("Temperatura agradável. 🌤️");
} else {
    console.log("Está quente! 🌞");  // ← cai aqui (28 não satisfez nenhuma condição anterior)
}
// Apenas UMA mensagem é exibida. O else final é o "em todos os outros casos".

// Blocos de uma linha — as chaves são opcionais, mas EVITE omiti-las:
// if (nota >= 60) console.log("Aprovado"); ← funciona, mas é considerada má prática.
// Com chaves, o código é mais legível e menos sujeito a bugs acidentais.

// ============================================================
// BLOCO 5 — OPERADOR TERNÁRIO (if/else em uma linha)
// ============================================================
// Quando a decisão é simples (só dois caminhos), o ternário é mais enxuto.
// Sintaxe: condição ? expressãoSeVerdadeiro : expressãoSeFalso
// É o único operador do JS que recebe TRÊS operandos (por isso "ternário").

let saldo = 150;
let mensagemSaldo = saldo >= 0 ? "Saldo positivo ✅" : "Saldo negativo ❌";
console.log(mensagemSaldo);  // "Saldo positivo ✅"

// Verificando par ou ímpar com ternário:
let numero = 17;
// O % retorna o RESTO da divisão. Se dividir por 2 e sobrar 0, é par.
console.log(numero % 2 === 0 ? "PAR" : "ÍMPAR");  // "ÍMPAR" (17 ÷ 2 = 8, sobra 1)

// O ternário é uma expressão, não uma instrução — isso significa que ele
// RETORNA um valor e pode ser usado dentro de template literals, atribuições, etc:
let desconto = 0.1;
console.log(`Você tem ${desconto > 0 ? "desconto" : "preço cheio"} nessa compra.`);

// Atenção: o ternário é ótimo para casos simples.
// Para lógicas complexas, prefira o if/else — é mais legível.

// Comparação lado a lado:
// Com if/else (mais claro para lógicas com múltiplos caminhos):
let hora = new Date().getHours();
let saudacao;
if (hora < 12) {
    saudacao = "Bom dia! ☀️";
} else if (hora < 18) {
    saudacao = "Boa tarde! 🌤️";
} else {
    saudacao = "Boa noite! 🌙";
}
console.log(saudacao);

// Com ternário aninhado (mais compacto, porém menos legível):
let saudacao2 = hora < 12 ? "Bom dia! ☀️" : hora < 18 ? "Boa tarde! 🌤️" : "Boa noite! 🌙";
console.log(saudacao2);
// Aqui o if/else é mais claro. Ternário aninhado dificulta a leitura — use com moderação.


// ============================================================
// BLOCO 6 — SWITCH (quando há muitas opções fixas)
// ============================================================
// O switch é como um cardápio: você escolhe uma opção e ele executa o item correspondente.
// É mais legível que vários else if quando os valores são exatos e fixos.
// Internamente, o switch usa igualdade estrita (===) para comparar os cases.

// Sintaxe:
// switch (expressão) {
//   case valor1: ... break;
//   case valor2: ... break;
//   default: ...  break;   ← executado se nenhum case bater (equivale ao else)
// }

// IMPORTANTE: sem o break, o código "cai" no próximo case automaticamente.
// Esse comportamento se chama "fall-through" e é uma fonte clássica de bugs.

let diaDaSemana = new Date().getDay();  // 0=domingo, 1=segunda, ..., 6=sábado

switch (diaDaSemana) {
    case 0:
        console.log("Domingo: dia de descanso 😴");
        break;
    case 1:
        console.log("Segunda-feira: começo de semana! 💪");
        break;
    case 2:
        console.log("Terça-feira: seguindo em frente.");
        break;
    case 3:
        console.log("Quarta-feira: metade da semana! 🐪");
        break;
    case 4:
        console.log("Quinta-feira: quase lá!");
        break;
    case 5:
        console.log("Sexta-feira: FINALMENTE! 🎉");
        break;
    case 6:
        console.log("Sábado: fim de semana! 🏖️");
        break;
    default:
        console.log("Dia inválido.");
        break;
}

// Fall-through intencional — agrupando cases que fazem a mesma coisa:
// Cases sem break "caem" para o próximo. Isso pode ser usado a favor:
let mes = 4;  // abril
switch (mes) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
        console.log("Mês com 31 dias");
        break;
    case 4:
    case 6:
    case 9:
    case 11:
        console.log("Mês com 30 dias");  // ← cai aqui (mês 4 = abril)
        break;
    case 2:
        console.log("Fevereiro: 28 ou 29 dias");
        break;
    default:
        console.log("Mês inválido");
        break;
}

// Nível de acesso — um uso clássico do switch:
let nivelAcesso = 2;  // 1=admin, 2=editor, 3=visitante

switch (nivelAcesso) {
    case 1:
        console.log("Acesso TOTAL — pode fazer tudo");
        break;
    case 2:
        console.log("Acesso RESTRITO — pode editar conteúdo");
        break;
    case 3:
        console.log("Acesso SOMENTE LEITURA");
        break;
    default:
        console.log("Nível de acesso inválido!");
        break;
}

// switch(true) — para testar FAIXAS de valor (não valores exatos):
// Aqui cada case é uma expressão booleana. O switch compara true === case,
// ou seja, executa o primeiro case cuja expressão retornar true.
let idadePessoa = 25;

switch (true) {
    case (idadePessoa >= 0 && idadePessoa <= 12):
        console.log("Criança 👶");
        break;
    case (idadePessoa >= 13 && idadePessoa <= 17):
        console.log("Adolescente 🧑");
        break;
    case (idadePessoa >= 18 && idadePessoa <= 59):
        console.log("Adulto 🧑‍💼");  // ← cai aqui (25 está entre 18 e 59)
        break;
    case (idadePessoa >= 60):
        console.log("Idoso 👴");
        break;
    default:
        console.log("Idade inválida");
        break;
}


// ============================================================
// BLOCO 7 — NULLISH COALESCING ?? (valor padrão seguro)
// ============================================================
// O operador ?? foi introduzido no ES2020 (ES11).
// Ele retorna o lado direito APENAS se o lado esquerdo for null ou undefined.
// É muito usado para definir valores padrão de forma segura.

let nomeVisitante = null;      // imagine que veio de um banco de dados vazio
let nomeExibido2 = nomeVisitante ?? "Visitante";
console.log(nomeExibido2);     // "Visitante" — pois nomeVisitante era null

let outroNome = "Ana";
let outroExibido = outroNome ?? "Visitante";
console.log(outroExibido);     // "Ana" — não era null/undefined, então usa o original

// Diferença crucial entre ?? e ||:
// || retorna o lado direito se o esquerdo for qualquer valor "falsy"
//    (false, 0, "", NaN, null, undefined)
// ?? retorna o lado direito SOMENTE para null ou undefined

let quantidade = 0;  // zero é um valor válido (ex: quantidade de itens no carrinho)
console.log(quantidade || 10);  // 10 — porque 0 é falsy, || substituiu por 10 (indesejado!)
console.log(quantidade ?? 10);  // 0  — 0 não é null nem undefined, ?? mantém o 0 (correto!)

// Encadeamento opcional com ?. (optional chaining — ES2020):
// Permite acessar propriedades de objetos que podem ser null ou undefined
// sem causar erro. Funciona bem junto com ??.
let perfil = null;
console.log(perfil?.nome);           // undefined — não lança erro
console.log(perfil?.nome ?? "Anônimo"); // "Anônimo" — combina ?. com ??


// ============================================================
// BLOCO 8 — TRUTHY e FALSY (valores que se comportam como boolean)
// ============================================================
// No JS, qualquer valor pode ser usado numa condição, mesmo sem ser true/false.
// Isso acontece porque o JS faz uma coerção implícita para boolean ao avaliar
// a condição de um if. Esse processo se chama "conversão para boolean".

// Você pode ver o valor boolean de qualquer coisa com Boolean() ou !!:
console.log(Boolean(0));          // false
console.log(Boolean(""));         // false
console.log(Boolean(null));       // false
console.log(Boolean(undefined));  // false
console.log(Boolean(NaN));        // false
console.log(Boolean(false));      // false
// ↑ Esses 6 são os únicos valores FALSY do JS. Todo o resto é TRUTHY.

console.log(Boolean(1));          // true
console.log(Boolean("texto"));    // true
console.log(Boolean([]));         // true  ← array vazio é TRUTHY!
console.log(Boolean({}));         // true  ← objeto vazio é TRUTHY!
console.log(Boolean(-1));         // true  ← número negativo é TRUTHY!

// O !! (dupla negação) é um atalho comum para converter para boolean:
console.log(!!0);        // false
console.log(!!"texto");  // true
// É equivalente a Boolean(), mas mais curto de escrever.

// Uso prático — verificar string vazia:
let texto = "";
if (texto) {
    console.log("A string tem conteúdo.");
} else {
    console.log("A string está vazia.");  // ← cai aqui, pois "" é falsy
}

// ARMADILHA clássica — array vazio é truthy:
let lista = [];
if (lista) {
    console.log("O array existe (mesmo vazio, [] é truthy!)");  // ← cai aqui!
}
// Para verificar se um array está realmente vazio, use .length:
if (lista.length === 0) {
    console.log("O array está vazio de verdade.");  // ← agora sim
}

// Uso prático — verificar se o usuário preencheu um campo:
let campoBusca = "JavaScript";
if (campoBusca) {
    console.log("Buscando por:", campoBusca);  // executa porque a string tem conteúdo
} else {
    console.log("Digite algo para buscar.");
}


// ============================================================
// BLOCO 9 — EXEMPLOS PRÁTICOS DO DIA A DIA
// ============================================================

// --- Frete grátis ou não ---
let valorCompra = 180;
if (valorCompra >= 200) {
    console.log("Frete GRÁTIS! 🎁");
} else {
    let faltam = 200 - valorCompra;
    console.log(`Frete: R$ 20,00. Adicione mais R$ ${faltam} para frete grátis!`);
}

// --- Desconto por tipo de cliente ---
let tipoCliente = "premium";  // "vip", "premium" ou "regular"
if (tipoCliente === "vip") {
    console.log("Desconto de 20% 🥇");
} else if (tipoCliente === "premium") {
    console.log("Desconto de 10% 🥈");  // ← cai aqui
} else {
    console.log("Sem desconto.");
}

// --- Verificar disponibilidade de cor ---
// Array.includes() retorna true ou false — perfeito para usar em condicionais.
const coresDisponiveis = ["vermelho", "verde", "azul"];
let corEscolhida = "amarelo";
if (coresDisponiveis.includes(corEscolhida)) {
    console.log(`${corEscolhida} disponível! ✅`);
} else {
    console.log(`${corEscolhida} indisponível. ❌`);
}

// --- Verificar faixa etária para concurso ---
let idadeCandidato = 27;
if (idadeCandidato >= 18 && idadeCandidato <= 32) {
    console.log("Pode se inscrever no concurso! ✅");
} else {
    console.log("Fora da faixa etária para inscrição. ❌");
}

// --- Encontrar o maior entre três números ---
let n1 = 2, n2 = 8, n3 = 5;

if (n1 > n2 && n1 > n3) {
    console.log(`${n1} é o maior!`);
} else if (n2 > n1 && n2 > n3) {
    console.log(`${n2} é o maior!`);  // ← cai aqui (8 > 2 e 8 > 5)
} else if (n3 > n1 && n3 > n2) {
    console.log(`${n3} é o maior!`);
} else {
    console.log("Há empate entre dois ou mais números.");
}

// ============================================================
// BLOCO 10 — CALCULADORA COM ENTRADA DO USUÁRIO
// ============================================================
// prompt-sync permite que o Node.js receba texto digitado no terminal.
// No navegador, você usaria a função global prompt() diretamente,
// que já vem embutida — sem precisar instalar nada.

// Descomente as linhas abaixo para testar (requer: npm install prompt-sync)
/*
const prompt = require('prompt-sync')();

let v1 = Number(prompt("Primeiro número: "));
let v2 = Number(prompt("Segundo número: "));
let op = prompt("Operação (+, -, *, /): ");
let resultado;

switch (op) {
    case '+':
        resultado = v1 + v2;
        break;
    case '-':
        resultado = v1 - v2;
        break;
    case '*':
        resultado = v1 * v2;
        break;
    case '/':
        if (v2 !== 0) {
            resultado = v1 / v2;
        } else {
            console.log("❌ Erro: divisão por zero é matematicamente indefinida!");
            resultado = undefined;
        }
        break;
    default:
        console.log("❌ Operação inválida! Use +, -, * ou /");
        resultado = undefined;
        break;
}

if (resultado !== undefined) {
    console.log(`Resultado: ${v1} ${op} ${v2} = ${resultado}`);
}
*/


// ============================================================
// RESUMO FINAL — O que você aprendeu:
// ============================================================
// Comparações    → > < >= <= == === != !== (prefira sempre ===)
// Lógicos        → && (E), || (OU), ! (NÃO), avaliação de curto-circuito
// if / else      → decisão com dois caminhos
// else if        → decisão com múltiplos caminhos sequenciais
// Ternário       → condição ? valorA : valorB (único operador de 3 operandos)
// switch         → opções fixas com ===; fall-through intencional com cases agrupados
// ?? (nullish)   → valor padrão seguro: só substitui null ou undefined
// ?.             → optional chaining: acesso seguro a propriedades que podem ser null
// Truthy / Falsy → 6 valores falsy; todo o resto é truthy; use !! ou Boolean() para ver