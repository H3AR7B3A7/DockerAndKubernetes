# Postgres & Docker

## Creating Postgres Server container
docker run -p 5432:5432 --name myPostgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres:alpine
(default password = postgres)

## Creating Postgres Server container with Docker volumes
Create a folder, for example: ‘C:/data/pg’  
docker run -p 5432:5432 --name myPostgres -e POSTGRES_PASSWORD=mysecretpassword -v C:/data/pg:/var/lib/postgresql/data -d postgres:alpine

## Creating PgAdmin4 Container
docker run -p 80:80 --name pgadmin -e PGADMIN_DEFAULT_EMAIL=”name” -e PGADMIN_DEFAULT_PASSWORD=”password” dpage/pgadmin4
Application running on -> localhost:80

## Using either PgAdmin4 installation or container
PgAdmin4 > Servers > New Server  
Host: PC-NAME  
Port: 5432  
Username: postgres  
Password: mysecretpassword
