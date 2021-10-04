# MySQL & Docker

## Creating MySQL Server container

>docker run --name MySQL -e MYSQL_ROOT_PASSWORD=pass -p 3306:3306 -d mysql:latest

## Creating PgAdmin4 Container

> docker run --name phpMyAdmin -d -e PMA_HOST=MySQL --link MySQL -p 8081:80 phpmyadmin:latest

The application will be running on:

http://localhost:8081