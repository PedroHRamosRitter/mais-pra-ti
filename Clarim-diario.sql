--
-- PostgreSQL database dump
--

\restrict 23T8K0Upak1SGvaBiYsTlflD8EWG1ObYd58v0wDJJTprIdS7zTJSf9goPPWphLk

-- Dumped from database version 17.11
-- Dumped by pg_dump version 17.11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: assinatura; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assinatura (
    id bigint NOT NULL,
    usuario_id bigint NOT NULL,
    plano_id bigint NOT NULL,
    stripe_subscription_id character varying(60) NOT NULL,
    status character varying(20) NOT NULL,
    periodo_fim timestamp with time zone,
    cancelar_ao_fim boolean DEFAULT false NOT NULL,
    criado_em timestamp with time zone DEFAULT now() NOT NULL,
    atualizado_em timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT ck_assinatura_status CHECK (((status)::text = ANY ((ARRAY['ACTIVE'::character varying, 'TRIALING'::character varying, 'PAST_DUE'::character varying, 'CANCELED'::character varying, 'INCOMPLETE'::character varying])::text[])))
);


ALTER TABLE public.assinatura OWNER TO postgres;

--
-- Name: assinatura_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.assinatura_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.assinatura_id_seq OWNER TO postgres;

--
-- Name: assinatura_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.assinatura_id_seq OWNED BY public.assinatura.id;


--
-- Name: categoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categoria (
    id bigint NOT NULL,
    nome character varying(80) NOT NULL,
    slug character varying(80) NOT NULL,
    descricao character varying(200)
);


ALTER TABLE public.categoria OWNER TO postgres;

--
-- Name: categoria_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categoria_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categoria_id_seq OWNER TO postgres;

--
-- Name: categoria_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categoria_id_seq OWNED BY public.categoria.id;


--
-- Name: endereco; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.endereco (
    id bigint NOT NULL,
    usuario_id bigint NOT NULL,
    cep character varying(9) NOT NULL,
    logradouro character varying(200),
    numero character varying(20),
    complemento character varying(100),
    bairro character varying(120),
    cidade character varying(120),
    uf character(2)
);


ALTER TABLE public.endereco OWNER TO postgres;

--
-- Name: endereco_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.endereco_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.endereco_id_seq OWNER TO postgres;

--
-- Name: endereco_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.endereco_id_seq OWNED BY public.endereco.id;


--
-- Name: noticia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.noticia (
    id bigint NOT NULL,
    categoria_id bigint NOT NULL,
    autor_id bigint NOT NULL,
    titulo character varying(200) NOT NULL,
    slug character varying(220) NOT NULL,
    resumo character varying(400),
    texto text NOT NULL,
    imagem_url text,
    premium boolean DEFAULT false NOT NULL,
    publicada_em timestamp with time zone,
    criado_em timestamp with time zone DEFAULT now() NOT NULL,
    criada_em timestamp with time zone DEFAULT now() NOT NULL,
    publicado_em timestamp with time zone
);


ALTER TABLE public.noticia OWNER TO postgres;

--
-- Name: noticia_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.noticia_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.noticia_id_seq OWNER TO postgres;

--
-- Name: noticia_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.noticia_id_seq OWNED BY public.noticia.id;


--
-- Name: noticia_tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.noticia_tag (
    noticia_id bigint NOT NULL,
    tag_id bigint NOT NULL
);


ALTER TABLE public.noticia_tag OWNER TO postgres;

--
-- Name: plano; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plano (
    id bigint NOT NULL,
    nome character varying(60) NOT NULL,
    preco_centavos integer NOT NULL,
    intervalo character varying(10) NOT NULL,
    stripe_price_id character varying(60) NOT NULL,
    ativo boolean DEFAULT true NOT NULL,
    CONSTRAINT ck_plano_intervalo CHECK (((intervalo)::text = ANY ((ARRAY['MONTH'::character varying, 'YEAR'::character varying])::text[]))),
    CONSTRAINT ck_plano_preco CHECK ((preco_centavos > 0))
);


ALTER TABLE public.plano OWNER TO postgres;

--
-- Name: plano_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.plano_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.plano_id_seq OWNER TO postgres;

--
-- Name: plano_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.plano_id_seq OWNED BY public.plano.id;


--
-- Name: tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tag (
    id bigint NOT NULL,
    nome character varying(60) NOT NULL,
    slug character varying(60) NOT NULL
);


ALTER TABLE public.tag OWNER TO postgres;

--
-- Name: tag_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tag_id_seq OWNER TO postgres;

--
-- Name: tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tag_id_seq OWNED BY public.tag.id;


--
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    id bigint NOT NULL,
    nome character varying(120) NOT NULL,
    email character varying(180) NOT NULL,
    senha_hash character varying(72),
    papel character varying(20) DEFAULT 'LEITOR'::character varying NOT NULL,
    provider character varying(20) DEFAULT 'LOCAL'::character varying NOT NULL,
    provider_id character varying(120),
    avatar_url text,
    stripe_customer_id character varying(60),
    criado_em timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT ck_usuario_papel CHECK (((papel)::text = ANY ((ARRAY['LEITOR'::character varying, 'EDITOR'::character varying, 'ADMIN'::character varying])::text[]))),
    CONSTRAINT ck_usuario_provider CHECK (((provider)::text = ANY ((ARRAY['LOCAL'::character varying, 'GOOGLE'::character varying])::text[])))
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- Name: usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuario_id_seq OWNER TO postgres;

--
-- Name: usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;


--
-- Name: assinatura id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assinatura ALTER COLUMN id SET DEFAULT nextval('public.assinatura_id_seq'::regclass);


--
-- Name: categoria id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria ALTER COLUMN id SET DEFAULT nextval('public.categoria_id_seq'::regclass);


--
-- Name: endereco id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.endereco ALTER COLUMN id SET DEFAULT nextval('public.endereco_id_seq'::regclass);


--
-- Name: noticia id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.noticia ALTER COLUMN id SET DEFAULT nextval('public.noticia_id_seq'::regclass);


--
-- Name: plano id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plano ALTER COLUMN id SET DEFAULT nextval('public.plano_id_seq'::regclass);


--
-- Name: tag id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag ALTER COLUMN id SET DEFAULT nextval('public.tag_id_seq'::regclass);


--
-- Name: usuario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);


--
-- Data for Name: assinatura; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.assinatura (id, usuario_id, plano_id, stripe_subscription_id, status, periodo_fim, cancelar_ao_fim, criado_em, atualizado_em) FROM stdin;
1	5	1	sub_teste_marcos_antiga	CANCELED	2026-02-10 00:00:00-03	f	2026-08-26 19:43:32.119533-03	2026-08-26 19:43:32.119533-03
2	5	1	sub_teste_marcos_atual	ACTIVE	2026-09-15 00:00:00-03	f	2026-08-26 19:43:32.119533-03	2026-08-26 19:43:32.119533-03
3	6	2	sub_teste_sofia	ACTIVE	2027-01-20 00:00:00-03	t	2026-08-26 19:43:32.119533-03	2026-08-26 19:43:32.119533-03
4	7	1	sub_teste_rafael	PAST_DUE	2026-08-05 00:00:00-03	f	2026-08-26 19:43:32.119533-03	2026-08-26 19:43:32.119533-03
5	8	1	sub_teste_beatriz_antiga	CANCELED	2026-05-30 00:00:00-03	f	2026-08-26 19:43:32.119533-03	2026-08-26 19:43:32.119533-03
6	8	2	sub_teste_beatriz_atual	ACTIVE	2027-06-10 00:00:00-03	f	2026-08-26 19:43:32.119533-03	2026-08-26 19:43:32.119533-03
7	9	1	sub_teste_daniel	TRIALING	2026-09-02 00:00:00-03	f	2026-08-26 19:43:32.119533-03	2026-08-26 19:43:32.119533-03
\.


--
-- Data for Name: categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categoria (id, nome, slug, descricao) FROM stdin;
1	Cidade	cidade	O dia a dia da metrópole
2	Ameaças Urbanas	ameacas-urbanas	Vigilantes, mascarados e o que eles deixam para trás
3	Opinião do Editor	opiniao-do-editor	A palavra final desta casa
4	Esportes	esportes	Quadras, campos e arquibancadas
5	Economia	economia	Mercado, contas e o bolso do leitor
6	Cultura	cultura	Cinema, exposições e agenda
7	Tecnologia	tecnologia	Inovação e seus efeitos colaterais
\.


--
-- Data for Name: endereco; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.endereco (id, usuario_id, cep, logradouro, numero, complemento, bairro, cidade, uf) FROM stdin;
1	1	90010-150	Rua dos Andradas	1234	Sala 302	Centro Histórico	Porto Alegre	RS
2	2	90020-004	Avenida Borges de Medeiros	55	\N	Centro Histórico	Porto Alegre	RS
3	5	96200-020	Rua General Neto	410	Apto 501	Centro	Rio Grande	RS
4	6	01310-100	Avenida Paulista	1578	\N	Bela Vista	São Paulo	SP
5	7	20040-020	Avenida Rio Branco	156	Cobertura	Centro	Rio de Janeiro	RJ
6	9	88010-400	Rua Felipe Schmidt	390	\N	Centro	Florianópolis	SC
\.


--
-- Data for Name: noticia; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.noticia (id, categoria_id, autor_id, titulo, slug, resumo, texto, imagem_url, premium, publicada_em, criado_em, criada_em, publicado_em) FROM stdin;
1	2	2	Viaduto da Sétima cede após "resgate" do vigilante mascarado	viaduto-setima-cede-apos-resgate	Estrutura de trinta anos cedeu minutos depois da passagem do mascarado. Prejuízo ainda é calculado.	Moradores da região relatam ter ouvido um estalo seco por volta das seis da manhã. A prefeitura isolou o trecho e promete um laudo em quinze dias. Procurado por esta redação, o vigilante não se manifestou.	\N	f	2026-03-02 07:40:00-03	2026-08-26 19:43:32.119533-03	2026-09-10 20:41:06.896242-03	\N
2	2	2	Teias obstruem sinal de trânsito e prefeitura cobra explicações	teias-obstruem-sinal-de-transito	Cruzamento ficou quatro horas sem sinalização enquanto equipes tentavam remover o material.	O material só se dissolve sozinho depois de algumas horas, segundo funcionários da manutenção urbana. Enquanto isso, o trânsito no cruzamento ficou entregue à boa vontade dos motoristas.	\N	f	2026-03-09 11:15:00-03	2026-08-26 19:43:32.119533-03	2026-09-10 20:41:06.896242-03	\N
3	2	3	Comerciantes relatam prejuízo após perseguição no centro	comerciantes-relatam-prejuizo-perseguicao	Sete vitrines quebradas e nenhuma resposta sobre quem paga a conta.	A associação comercial já reuniu orçamentos e estuda entrar com uma ação. "Ninguém pediu para ser salvo desse jeito", resumiu um dos lojistas ouvidos por esta reportagem.	\N	t	2026-03-15 09:00:00-03	2026-08-26 19:43:32.119533-03	2026-09-10 20:41:06.896242-03	\N
4	2	2	Câmeras de segurança registram terceira aparição na semana	cameras-registram-terceira-aparicao	Imagens de baixa qualidade alimentam mais perguntas do que respostas.	As gravações foram entregues à polícia. Especialistas consultados afirmam que a resolução não permite qualquer identificação confiável.	\N	f	2026-03-21 18:30:00-03	2026-08-26 19:43:32.119533-03	2026-09-10 20:41:06.896242-03	\N
5	2	1	Dossiê: o rastro de destruição em doze meses	dossie-rastro-de-destruicao-doze-meses	Levantamento exclusivo reúne 43 ocorrências e soma os prejuízos.	Esta redação cruzou boletins de ocorrência, laudos da defesa civil e registros da prefeitura. O resultado está nas próximas páginas, e ele não é bonito.	\N	t	2026-04-02 06:00:00-03	2026-08-26 19:43:32.119533-03	2026-09-10 20:41:06.896242-03	\N
6	2	4	Bombeiros negam ter pedido ajuda ao mascarado	bombeiros-negam-ter-pedido-ajuda	Corporação afirma que a operação seguia o protocolo quando houve a interferência.	Em nota, a corporação foi direta: nenhum apoio externo havia sido solicitado. A interferência, segundo o texto, atrasou a retirada das vítimas em cerca de doze minutos.	\N	f	2026-04-11 14:20:00-03	2026-08-26 19:43:32.119533-03	2026-09-10 20:41:06.896242-03	\N
7	2	1	Investigação sobre identidade do vigilante avança	investigacao-identidade-vigilante-avanca	Rascunho: aguardando confirmação de duas fontes.	Texto em apuração. Não publicar antes do retorno da assessoria.	\N	t	\N	2026-08-26 19:43:32.119533-03	2026-09-10 20:41:06.896242-03	\N
8	1	4	Metrô da linha F terá horário estendido no verão	metro-linha-f-horario-estendido	Medida atende pedido antigo de quem trabalha no turno da noite.	A ampliação começa em dezembro e deve beneficiar cerca de duzentos mil passageiros por dia. A operação vai até a uma da manhã nos fins de semana.	\N	f	2026-02-18 08:00:00-03	2026-08-26 19:43:32.119533-03	2026-09-10 20:41:06.896242-03	\N
9	1	4	Obras da avenida central atrasam pela terceira vez	obras-avenida-central-atrasam	Nova previsão de entrega passa para o segundo semestre.	A empresa responsável alega chuvas acima da média. A fiscalização municipal aponta atraso na chegada de materiais.	\N	f	2026-02-25 10:10:00-03	2026-08-26 19:43:32.119533-03	2026-09-10 20:41:06.896242-03	\N
10	1	3	Novo parque será inaugurado no bairro do porto	novo-parque-bairro-do-porto	Área de doze mil metros quadrados terá ciclovia e quadra.	O projeto foi aprovado há dois anos e ficou parado por falta de recursos. A inauguração está marcada para o próximo mês.	\N	f	2026-03-07 09:30:00-03	2026-08-26 19:43:32.119533-03	2026-09-10 20:41:06.896242-03	\N
11	1	4	Coleta seletiva chega a mais doze bairros	coleta-seletiva-mais-doze-bairros	Ampliação cobre agora 60% da cidade.	A prefeitura promete atingir a totalidade dos bairros até o fim do próximo ano, com dois novos caminhões por trimestre.	\N	f	2026-03-28 07:45:00-03	2026-08-26 19:43:32.119533-03	2026-09-10 20:41:06.896242-03	\N
12	1	3	Prefeitura anuncia mutirão de reparos em calçadas	mutirao-reparos-calcadas	Trabalho começa pelas regiões com mais registros de queda.	A ação foi anunciada após um levantamento apontar mais de novecentas reclamações abertas no canal de atendimento.	\N	f	2026-04-14 12:00:00-03	2026-08-26 19:43:32.119533-03	2026-09-10 20:41:06.896242-03	\N
13	3	1	Máscaras escondem rostos e também intenções	mascaras-escondem-rostos-e-intencoes	Nunca vi um bombeiro anônimo. Por que aceitaríamos um vigilante que não assina o que faz?	Quem age em nome do bem não teme a luz. Esta casa continuará perguntando, todos os dias, quem está por trás da máscara e a quem ele responde.	\N	f	2026-03-05 06:00:00-03	2026-08-26 19:43:32.119533-03	2026-09-10 20:41:06.896242-03	\N
14	3	1	Quem paga a conta do heroísmo?	quem-paga-a-conta-do-heroismo	Cada resgate espetacular deixa uma fatura que ninguém assume.	Somados, os prejuízos do último ano equivalem ao orçamento anual de duas escolas municipais. Alguém precisa responder por isso.	\N	t	2026-03-19 06:00:00-03	2026-08-26 19:43:32.119533-03	2026-09-10 20:41:06.896242-03	\N
15	3	1	A imprensa não pede licença para perguntar	a-imprensa-nao-pede-licenca-para-perguntar	Sobre as tentativas de constranger esta redação.	Recebemos, nas últimas semanas, três pedidos informais para "moderar o tom". A resposta foi a mesma nas três vezes.	\N	f	2026-04-06 06:00:00-03	2026-08-26 19:43:32.119533-03	2026-09-10 20:41:06.896242-03	\N
16	3	1	Silêncio oficial não é resposta	silencio-oficial-nao-e-resposta	Rascunho: segurar até o fechamento de sexta.	Texto em edição.	\N	f	\N	2026-08-26 19:43:32.119533-03	2026-09-10 20:41:06.896242-03	\N
17	4	3	Time da casa vence clássico no estouro do cronômetro	time-da-casa-vence-classico	Cesta a 0,8 segundo do fim garantiu a vaga nos playoffs.	O ginásio veio abaixo. O técnico, contido, preferiu falar do próximo jogo antes mesmo de comemorar este.	\N	f	2026-02-21 22:50:00-03	2026-08-26 19:43:32.119533-03	2026-09-10 20:41:06.896242-03	\N
18	4	3	Reforço chega para a temporada e diz estar pronto	reforco-chega-para-a-temporada	Ala-armador assinou por duas temporadas.	Apresentado na manhã desta quarta, o jogador afirmou que a adaptação será rápida e evitou comentar a saída conturbada do clube anterior.	\N	f	2026-03-11 13:00:00-03	2026-08-26 19:43:32.119533-03	2026-09-10 20:41:06.896242-03	\N
19	4	3	Ginásio municipal receberá torneio juvenil	ginasio-municipal-torneio-juvenil	Competição reúne dezesseis equipes de toda a região.	As inscrições seguem abertas até o fim do mês e a entrada será gratuita em todos os jogos da fase classificatória.	\N	f	2026-03-30 16:00:00-03	2026-08-26 19:43:32.119533-03	2026-09-10 20:41:06.896242-03	\N
20	4	3	Análise tática: por que a defesa melhorou	analise-tatica-por-que-a-defesa-melhorou	Os números por trás da virada defensiva das últimas dez partidas.	A mudança na marcação alta explica boa parte da queda no aproveitamento adversário. Os gráficos completos estão a seguir.	\N	t	2026-04-09 19:00:00-03	2026-08-26 19:43:32.119533-03	2026-09-10 20:41:06.896242-03	\N
21	5	2	Dólar recua e bolsa fecha em alta pela quarta sessão	dolar-recua-bolsa-fecha-em-alta	Mercado reage a dados de inflação abaixo do esperado.	Analistas ouvidos por esta redação avaliam que o movimento tende a se sustentar caso os próximos indicadores confirmem a tendência.	\N	f	2026-02-27 18:05:00-03	2026-08-26 19:43:32.119533-03	2026-09-10 20:41:06.896242-03	\N
22	5	2	Inflação desacelera e alivia o bolso do consumidor	inflacao-desacelera-alivia-o-bolso	Índice do mês foi o menor dos últimos catorze meses.	Alimentos e transporte puxaram a queda. Já o grupo habitação seguiu pressionado pelas tarifas de energia.	\N	f	2026-03-24 10:30:00-03	2026-08-26 19:43:32.119533-03	2026-09-10 20:41:06.896242-03	\N
23	5	2	Pequenos negócios relatam queda no movimento do centro	pequenos-negocios-queda-movimento-centro	Levantamento com 120 lojistas mostra retração de 18%.	A pesquisa completa, com o recorte por rua e por ramo de atividade, está disponível para assinantes.	\N	t	2026-04-16 08:00:00-03	2026-08-26 19:43:32.119533-03	2026-09-10 20:41:06.896242-03	\N
24	6	4	Festival de cinema anuncia programação com 80 filmes	festival-de-cinema-anuncia-programacao	Mostra ocupa cinco salas durante duas semanas.	A abertura ficará por conta de um documentário nacional. Os ingressos começam a ser vendidos na próxima segunda.	\N	f	2026-03-13 15:00:00-03	2026-08-26 19:43:32.119533-03	2026-09-10 20:41:06.896242-03	\N
25	6	4	Exposição fotográfica retrata a cidade em preto e branco	exposicao-fotografica-cidade-preto-e-branco	Acervo reúne imagens feitas ao longo de quarenta anos.	A curadoria escolheu 96 fotografias entre mais de oito mil negativos. A visitação é gratuita de terça a domingo.	\N	f	2026-04-03 11:00:00-03	2026-08-26 19:43:32.119533-03	2026-09-10 20:41:06.896242-03	\N
\.


--
-- Data for Name: noticia_tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.noticia_tag (noticia_id, tag_id) FROM stdin;
1	1
1	2
1	3
2	1
2	2
2	4
3	1
3	9
3	11
4	1
4	9
4	5
5	1
5	5
5	11
6	1
6	9
7	1
7	5
7	11
8	7
8	3
9	3
9	2
10	3
11	3
12	3
12	2
13	1
13	12
14	1
14	12
14	8
15	12
16	12
16	3
17	6
18	6
19	6
19	3
20	6
20	11
21	8
22	8
23	8
23	11
\.


--
-- Data for Name: plano; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plano (id, nome, preco_centavos, intervalo, stripe_price_id, ativo) FROM stdin;
1	Mensal	1990	MONTH	price_1ULVFPPQbcsjLOubTpUa7pZb	t
2	Anual	19900	YEAR	price_1ULVG1PQbcsjLOubDTJQ0cuz	t
\.


--
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tag (id, nome, slug) FROM stdin;
1	vigilante	vigilante
2	trânsito	transito
3	prefeitura	prefeitura
4	teias	teias
5	investigação	investigacao
6	basquete	basquete
7	metrô	metro
8	orçamento	orcamento
9	segurança	seguranca
10	entrevista	entrevista
11	exclusivo	exclusivo
12	opinião	opiniao
\.


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario (id, nome, email, senha_hash, papel, provider, provider_id, avatar_url, stripe_customer_id, criado_em) FROM stdin;
1	Jonas Meireles	jonas@clarim.com	$2a$10$FICTICIO000000000000000000000000000000000000000000001	ADMIN	LOCAL	\N	\N	\N	2026-08-26 19:43:32.119533-03
2	Clara Bittencourt	clara@clarim.com	$2a$10$FICTICIO000000000000000000000000000000000000000000002	EDITOR	LOCAL	\N	\N	\N	2026-08-26 19:43:32.119533-03
3	Otávio Nunes	otavio@clarim.com	$2a$10$FICTICIO000000000000000000000000000000000000000000003	EDITOR	LOCAL	\N	\N	\N	2026-08-26 19:43:32.119533-03
4	Helena Prado	helena@clarim.com	$2a$10$FICTICIO000000000000000000000000000000000000000000004	EDITOR	LOCAL	\N	\N	\N	2026-08-26 19:43:32.119533-03
5	Marcos Vieira	marcos@email.com	$2a$10$FICTICIO000000000000000000000000000000000000000000005	LEITOR	LOCAL	\N	\N	cus_teste_marcos	2026-08-26 19:43:32.119533-03
6	Sofia Andrade	sofia@gmail.com	\N	LEITOR	GOOGLE	108374625109384	https://exemplo.com/avatar/sofia.png	cus_teste_sofia	2026-08-26 19:43:32.119533-03
7	Rafael Lima	rafael@email.com	$2a$10$FICTICIO000000000000000000000000000000000000000000007	LEITOR	LOCAL	\N	\N	cus_teste_rafael	2026-08-26 19:43:32.119533-03
8	Beatriz Rocha	beatriz@gmail.com	\N	LEITOR	GOOGLE	117492038475610	https://exemplo.com/avatar/beatriz.png	cus_teste_beatriz	2026-08-26 19:43:32.119533-03
9	Daniel Moura	daniel@email.com	$2a$10$FICTICIO000000000000000000000000000000000000000000009	LEITOR	LOCAL	\N	\N	cus_teste_daniel	2026-08-26 19:43:32.119533-03
10	Camila Freitas	camila@email.com	$2a$10$FICTICIO000000000000000000000000000000000000000000010	LEITOR	LOCAL	\N	\N	\N	2026-08-26 19:43:32.119533-03
\.


--
-- Name: assinatura_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.assinatura_id_seq', 7, true);


--
-- Name: categoria_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categoria_id_seq', 7, true);


--
-- Name: endereco_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.endereco_id_seq', 6, true);


--
-- Name: noticia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.noticia_id_seq', 25, true);


--
-- Name: plano_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.plano_id_seq', 2, true);


--
-- Name: tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tag_id_seq', 12, true);


--
-- Name: usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_id_seq', 10, true);


--
-- Name: assinatura assinatura_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assinatura
    ADD CONSTRAINT assinatura_pkey PRIMARY KEY (id);


--
-- Name: assinatura assinatura_stripe_subscription_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assinatura
    ADD CONSTRAINT assinatura_stripe_subscription_id_key UNIQUE (stripe_subscription_id);


--
-- Name: categoria categoria_nome_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_nome_key UNIQUE (nome);


--
-- Name: categoria categoria_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (id);


--
-- Name: categoria categoria_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_slug_key UNIQUE (slug);


--
-- Name: endereco endereco_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.endereco
    ADD CONSTRAINT endereco_pkey PRIMARY KEY (id);


--
-- Name: endereco endereco_usuario_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.endereco
    ADD CONSTRAINT endereco_usuario_id_key UNIQUE (usuario_id);


--
-- Name: noticia noticia_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.noticia
    ADD CONSTRAINT noticia_pkey PRIMARY KEY (id);


--
-- Name: noticia noticia_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.noticia
    ADD CONSTRAINT noticia_slug_key UNIQUE (slug);


--
-- Name: noticia_tag pk_noticia_tag; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.noticia_tag
    ADD CONSTRAINT pk_noticia_tag PRIMARY KEY (noticia_id, tag_id);


--
-- Name: plano plano_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plano
    ADD CONSTRAINT plano_pkey PRIMARY KEY (id);


--
-- Name: plano plano_stripe_price_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plano
    ADD CONSTRAINT plano_stripe_price_id_key UNIQUE (stripe_price_id);


--
-- Name: tag tag_nome_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_nome_key UNIQUE (nome);


--
-- Name: tag tag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY (id);


--
-- Name: tag tag_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_slug_key UNIQUE (slug);


--
-- Name: usuario usuario_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_key UNIQUE (email);


--
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);


--
-- Name: usuario usuario_stripe_customer_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_stripe_customer_id_key UNIQUE (stripe_customer_id);


--
-- Name: idx_assinatura_usuario; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_assinatura_usuario ON public.assinatura USING btree (usuario_id);


--
-- Name: idx_noticia_autor; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_noticia_autor ON public.noticia USING btree (autor_id);


--
-- Name: idx_noticia_categoria; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_noticia_categoria ON public.noticia USING btree (categoria_id);


--
-- Name: idx_noticia_publicada_em; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_noticia_publicada_em ON public.noticia USING btree (publicada_em DESC);


--
-- Name: idx_noticia_tag_tag; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_noticia_tag_tag ON public.noticia_tag USING btree (tag_id);


--
-- Name: assinatura fk_assinatura_plano; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assinatura
    ADD CONSTRAINT fk_assinatura_plano FOREIGN KEY (plano_id) REFERENCES public.plano(id) ON DELETE RESTRICT;


--
-- Name: assinatura fk_assinatura_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assinatura
    ADD CONSTRAINT fk_assinatura_usuario FOREIGN KEY (usuario_id) REFERENCES public.usuario(id) ON DELETE CASCADE;


--
-- Name: endereco fk_endereco_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.endereco
    ADD CONSTRAINT fk_endereco_usuario FOREIGN KEY (usuario_id) REFERENCES public.usuario(id) ON DELETE CASCADE;


--
-- Name: noticia fk_noticia_autor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.noticia
    ADD CONSTRAINT fk_noticia_autor FOREIGN KEY (autor_id) REFERENCES public.usuario(id) ON DELETE RESTRICT;


--
-- Name: noticia fk_noticia_categoria; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.noticia
    ADD CONSTRAINT fk_noticia_categoria FOREIGN KEY (categoria_id) REFERENCES public.categoria(id) ON DELETE RESTRICT;


--
-- Name: noticia_tag fk_nt_noticia; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.noticia_tag
    ADD CONSTRAINT fk_nt_noticia FOREIGN KEY (noticia_id) REFERENCES public.noticia(id) ON DELETE CASCADE;


--
-- Name: noticia_tag fk_nt_tag; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.noticia_tag
    ADD CONSTRAINT fk_nt_tag FOREIGN KEY (tag_id) REFERENCES public.tag(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict 23T8K0Upak1SGvaBiYsTlflD8EWG1ObYd58v0wDJJTprIdS7zTJSf9goPPWphLk

