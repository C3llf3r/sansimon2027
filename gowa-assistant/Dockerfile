FROM node:20-alpine

WORKDIR /app

# Instalar dependencias de producción
COPY package*.json ./
RUN npm install --omit=dev

# Copiar el código del asistente
COPY . .

# Crear archivo de persistencia si no existe
RUN touch postulantes.json

EXPOSE 4000

CMD ["node", "server.js"]
