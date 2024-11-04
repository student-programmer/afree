FROM node:21.5.0-alpine3.19
ARG APP_BASE_URL
ENV NEXT_TELEMETRY_DISABLED=1
ENV APP_BASE_URL=$APP_BASE_URL
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]