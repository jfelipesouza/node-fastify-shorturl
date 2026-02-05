FROM node:22-alpine AS builder

WORKDIR /app

# Copia apenas arquivos essenciais primeiro para aproveitar cache de dependências
COPY package.json yarn.lock ./

# Instala todas as dependências (incluindo dev) para conseguir rodar o build
RUN yarn install --frozen-lockfile

# Copia o restante do código fonte
COPY . .

RUN npx prisma generate

# Build da aplicação TypeScript para a pasta dist/
RUN yarn build

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copia manifestos para instalar apenas as deps de produção
COPY package.json yarn.lock ./

# Instala apenas dependências de produção
RUN yarn install --frozen-lockfile --production

# Copia artefatos de build da stage anterior
COPY --from=builder /app/dist ./dist

# (Opcional) Copia diretório prisma caso você use migrações em runtime
COPY prisma ./prisma

COPY --from=builder /app/src/generated ./src/generated

# Porta padrão usada no src/index.ts (pode ser sobrescrita por variável de ambiente PORT)
EXPOSE 3000

# Comando de inicialização
CMD ["node", "dist/index.cjs"]

