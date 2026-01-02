FROM node:20-alpine
WORKDIR /app
# 依存関係定義をコピー
COPY package*.json ./
# devDependencies も含めて全インストール
RUN npm install
# ソースコードコピー
COPY . .
EXPOSE 3000
# Next.js の dev モードを起動
CMD ["npm", "run", "dev"]