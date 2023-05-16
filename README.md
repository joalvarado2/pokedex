<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```
npm install
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```
4. Levantar la base de datos
```
docker-compose up -d
```
5. Clonar el archivo __.env.template__ y renombrar la copia a ```
.env```
6. Llenar las variables de entorno definidas en el ```.env```
7. Ejecutar la aplicacion en dev:
```
npm run start:dev
```
8. Recosntruir la base de datos con la data de prueba 'hacer un get a la url'
```
http://localhost:3000/api/v2/seed
```

## Stack usado
* MongoDB
* Nest.js

# Production Build
1. crear el archivo ```.env.prod```
2. Llenar las variables  de entorno de prod
3. Crear la nueva imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```
5. si no quiere servir la aplicacion si no solo compilarla en el contenedor correr
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up -d
```