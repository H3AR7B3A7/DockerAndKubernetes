# Postgres & Docker

## Creating Postgres Server container

> docker run -p 5432:5432 --name myPostgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres:alpine

*The default password = postgres*

## Creating Postgres Server container with Docker volumes

Create a folder, for example: ‘C:/data/pg’  

> docker run -p 5432:5432 --name myPostgres -e POSTGRES_PASSWORD=mysecretpassword -v C:/data/pg:/var/lib/postgresql/data
-d postgres:alpine

## Creating PgAdmin4 Container

> docker run -p 5050:80 --name pgadmin4 -e PGADMIN_DEFAULT_EMAIL=”steven.d.hondt.sdh@gmail.com” -e PGADMIN_DEFAULT_PASSWORD=”pass” dpage/pgadmin4:latest

The application will be running on:

http://localhost:5050

## Using either PgAdmin4 installation or container

PgAdmin4 > Servers > New Server  
Host: PC-NAME  
Port: 5432  
Username: postgres  
Password: mysecretpassword