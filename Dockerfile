FROM node:24.11.1-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 3000

ENV NODE_ENV=development
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0", "--port", "3000"]
