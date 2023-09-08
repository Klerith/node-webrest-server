




# Dev

1. Clonar el .env.template y crear el .env
2. Ejecutar el comando ```docker compose up -d```
3. Reconstruir el prisma client ```npm run prisma:migrate:prod```
   
   ```
    "prisma:migrate:prod": "prisma migrate deploy",
   ```
