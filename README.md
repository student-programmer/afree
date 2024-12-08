# Деплой проекта Telegram Bot и Mini App

Этот проект состоит из двух частей: 
1. **Telegram Bot**, написанный на Node.js с использованием библиотеки Telegraf.
2. **Telegram Mini App**, написанный на Next.js.

Обе части объединены с использованием Docker Compose для удобного развертывания.

## Предварительные требования

Перед началом убедитесь, что у вас установлены:
- **Docker** и **Docker Compose**
- Сервер с доступом по SSH
- Домен, доступный через HTTPS

## Шаги по деплою

### 1. Настройка окружения

1. **Заполните `.env.example` в каждой из папок проекта** (Telegram Bot и Mini App). Пример `.env.example` файла для каждой части можно найти в их соответствующих директориях.
   
   Для заполнения `.env` файлов:
   - Перенесите переменные из `.env.example` в `.env`.
   - Убедитесь, что значения переменных совпадают с настройками вашего сервера и окружения.

2. **Настройте переменные в `docker-compose.yml`**:
   В файле `docker-compose.yml` определены следующие переменные:
   ```yaml
   DATABASE_URL: 'postgres://postgres:password@postgres-afree-db:5432/afree'
   DB_NAME: afree
   DB_USER: postgres
   DB_PASSWORD: password
   DB_HOST: postgres-afree-db
   BOT_TOKEN: 'ваш токен бота'
   HOOKPORT: 3000
   PORT: 3000
   DOMAIN: 'https://ваш-домен' # Укажите ваш домен
   WEB_APP: 'https://ваш-домен' # Укажите ваш веб-домен
   ```
   Замените значения на свои.

### 2. Настройка HTTPS с помощью Let’s Encrypt и Nginx

1. **Установите Nginx**:
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. **Настройте SSL-сертификат через Let’s Encrypt**:
   Установите Certbot и настройте SSL:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d ваш-домен
   ```

3. **Настройте прокси на Nginx**:
   Создайте файл конфигурации для вашего проекта, например, `/etc/nginx/sites-available/tgminiapp`:
   ```nginx
   server {
       listen 80;
       server_name ваш-домен;
       return 301 https://$host$request_uri;
   }

   server {
       listen 443 ssl;
       server_name ваш-домен;

       ssl_certificate /etc/letsencrypt/live/ваш-домен/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/ваш-домен/privkey.pem;

       location / {
           proxy_pass http://127.0.0.1:3000; # Укажите порт приложения
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

   Активируйте конфигурацию:
   ```bash
   sudo ln -s /etc/nginx/sites-available/tgminiapp /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### 3. Запуск проекта

1. **Скопируйте проект на сервер**:
   ```bash
   scp -r ваш-проект user@server:/path/to/project
   ```

2. **Перейдите в директорию проекта**:
   ```bash
   cd /path/to/project
   ```

3. **Запустите контейнеры с помощью Docker Compose**:
   ```bash
   docker-compose up -d
   ```

4. **Проверьте статус контейнеров**:
   ```bash
   docker-compose ps
   ```

### 4. Проверка работы

- Убедитесь, что бот работает, проверив его функциональность в Telegram.
- Откройте Telegram Mini App в браузере по адресу `https://ваш-домен`.

---

## Часто встречающиеся проблемы

1. **Контейнеры не запускаются**:
   - Проверьте правильность заполнения `.env` файлов.
   - Убедитесь, что порты (например, `3000`) не заняты другими приложениями.

2. **HTTPS не работает**:
   - Проверьте статус Nginx:
     ```bash
     sudo systemctl status nginx
     ```
   - Убедитесь, что сертификаты Let’s Encrypt корректно установлены:
     ```bash
     sudo certbot renew --dry-run
     ```

3. **Бот не отвечает**:
   - Проверьте лог контейнера бота:
     ```bash
     docker logs имя_контейнера_бота
     ```
