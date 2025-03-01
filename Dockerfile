# Estágio de construção
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .

# Estágio de produção
FROM node:18-alpine
WORKDIR /app

# Copia apenas os arquivos necessários
COPY --from=builder /app/node_modules ./node_modules
COPY src ./src

# Cria um usuário não-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Configurações de ambiente
ENV NODE_ENV=production
EXPOSE 3000

# Comando de inicialização
CMD ["node", "src/index.js"]