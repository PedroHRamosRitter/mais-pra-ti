# Dockerfile de REFERÊNCIA — API Clarim (Spring Boot 4 / Java 21 / Maven)
# Explicação de cada decisão: DOCKER-GUIA.md
#
#   docker build -t clarim-api:dev .
#   docker run --rm -p 8080:8080 clarim-api:dev


# ========== ETAPA 1: compilar ==========

# Imagem base. JDK porque compilar exige compilador. "AS builder" nomeia a etapa.
# Nunca use a tag "latest": amanhã ela aponta para outra versão e o build quebra.
FROM eclipse-temurin:21-jdk-alpine AS builder

# Pasta de trabalho dentro da imagem (é criada se não existir).
WORKDIR /build

# Primeiro só os arquivos de dependência. Eles mudam pouco, então ficam em cache.
COPY pom.xml mvnw ./
COPY .mvn .mvn

# Baixa as dependências e para (não compila). O chmod garante o mvnw executável.
RUN chmod +x mvnw && ./mvnw -B --no-transfer-progress dependency:go-offline

# Só agora o código, que muda toda hora. Alterá-lo não refaz o download acima.
COPY src ./src

# Gera o .jar em /build/target. RUN acontece AGORA, durante o build.
RUN ./mvnw -B --no-transfer-progress -DskipTests package


# ========== ETAPA 2: executar (esta é a imagem final) ==========

# Novo FROM = etapa nova, do zero. A Etapa 1 inteira é descartada.
# JRE em vez de JDK: só executa. Imagem menor e com menos ferramenta sobrando.
FROM eclipse-temurin:21-jre-alpine

# Usuário sem privilégios (sintaxe Alpine; no Debian seria useradd).
# Rodar como root dentro do container é risco desnecessário.
RUN addgroup -S spring && adduser -S spring -G spring

WORKDIR /app

# --from=builder copia da Etapa 1, não do seu PC.
# Renomear para app.jar evita mexer no ENTRYPOINT quando a versão do projeto subir.
COPY --from=builder --chown=spring:spring /build/target/*.jar app.jar

# Daqui para baixo, nada roda como root.
# Confira com: docker run --rm --entrypoint id clarim-api:dev
USER spring

# EXPOSE só DOCUMENTA a porta. Quem abre o caminho é o -p do docker run.
EXPOSE 8080

# Roda quando o container sobe (não durante o build).
# Use sempre a forma de lista: assim o SIGTERM do "docker stop" chega na JVM.
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]


# NÃO coloque senha, URL de banco ou chave de API aqui — qualquer um lê com
# "docker history". Isso vai por variável de ambiente, no docker-compose.yml,
# junto do container do Postgres.