# Docker

We will be using nginx as example image, but using other images is very similar.
Be sure to check their docs to learn more about them:
[Documentation for nginx](https://hub.docker.com/_/nginx)  
[FreeCodeCamp Course Video](https://www.youtube.com/watch?v=Wf2eSG3owoA)

## Installing Docker

Download and install docker desktop [here](https://www.docker.com/get-started).

### Version Check

> docker --version  
> Docker version 19.03.13, build 4484c46d9d

## Docker images

- Template to create env
- Snapshot
- Contains everything to run:
    - OS
    - required software
    - app

### Run existing image in container

Download image
> docker pull nginx

See all images
> docker images

Run image
> docker run nginx:latest

Check running images
> docker container ls | docker ps

Stop image
> docker stop containerID | docker stop containerNAME

Restart image
> docker start containerID | docker start containerNAME

Run in detached mode
> docker run -d nginx:latest

Run and map port 8080 to port 80
> docker run -d -p 8080:80 nginx:latest

Multiple ports
> docker run -d -p 8080:80 -p 3000:80 nginx:latest

## Delete containers

See exited containers
> docker ps -a

Delete container
> docker rm containerID | docker rm containerNAME

Delete all (only works when none are running)
> docker rm $(docker ps -aq)

Force delete all
> docker rm -f $(docker ps -aq)

## Name & Format containers

Name containers
> docker run --name containerNAME -d -p 8080:80 nginx:latest

Format ps output
> docker ps --format '{{ .ID }}\t{{.Image}}\t{{ .Names }}'  
> docker ps --format '
>
ID\t{{.ID}}\nName\t{{.Names}}\nIMAGE\t{{.Image}}\nPORTS\t{{.Ports}}\nCOMMAND\t{{.Command}}\nCREATED\t{{.CreatedAt}}\nSTATUS\t{{.Status}}\n'

Save format (windows)
> $env:SHORT='{{ .ID }}\t{{.Image}}\t{{ .Names }}'  
> $env:
>
FORMAT='ID\t{{.ID}}\nName\t{{.Names}}\nIMAGE\t{{.Image}}\nPORTS\t{{.Ports}}\nCOMMAND\t{{.Command}}\nCREATED\t{{.CreatedAt}}\nSTATUS\t{{.Status}}\n'

Save format (macOS)
> export SHORT='{{ .ID }}\t{{.Image}}\t{{ .Names }}'  
> export
>
FORMAT='ID\t{{.ID}}\nName\t{{.Names}}\nIMAGE\t{{.Image}}\nPORTS\t{{.Ports}}\nCOMMAND\t{{.Command}}\nCREATED\t{{.CreatedAt}}\nSTATUS\t{{.Status}}\n'

Use saved format (windows)
> docker ps --format=$env:SHORT  
> docker ps --format=$env:FORMAT

Use saved format (macOS)
> docker ps --format=$SHORT  
> docker ps --format=$FORMAT

## Sharing of data in a Volume

Lets make a directory and add a website to it:
> mkdir website  
> cd website

Download or create simple website and copy/past to the directory we created.

Run read-only image with volume(windows)
> docker run --name containerNAME -v ${pwd}:/usr/share/nginx/html:ro -d -p 8080:80 nginx

Run read-only image with volume(macOS)
> docker run --name containerNAME -v $(pwd):/usr/share/nginx/html:ro -d -p 8080:80 nginx:latest

Run image with volume(windows)
> docker run --name containerNAME -v ${pwd}:/usr/share/nginx/html -d -p 8080:80 nginx

Run image with volume(macOS)
> docker run --name containerNAME -v $(pwd):/usr/share/nginx/html -d -p 8080:80 nginx:latest

Interactive Terminal
> docker exec -it containerNAME bash

	>ls -al		|	ls -Recurse
	>cd usr/share/nginx/html
	>ls -al

> docker run --name copy --volumes-from containerNAME -d -p 8081:80 nginx

## Remove images

Delete an image
> docker rmi imageNAME | docker rmi imageID

Delete all images
> docker rmi $(docker images -aq)

## Build images

### Simple example with modified nginx

Create a 'Dockerfile' containing:

	FROM nginx:latest
	ADD . /usr/share/nginx/html

Build
> docker build --tag containerNAME:latest . | docker build -t website:latest .  
> docker run -d -p 8080:80 containerNAME:latest

### With node.js example service

> mkdir nodejsapp  
> cd nodejsapp  
> install npm  
> Create index.js containing:

	const express = require('express')
	const app = express()
	const port = 3000

	app.get('/', (req, res) => res.json([
		{
		name: 'Steven',
		email: 'steven.d.hondt.sdh@gmail.com'
		},
		{
			name: 'Testies',
			email: 'testies@gmail.com'
		}
	]))

	app.listen(port, () => {
	  console.log(`Example app listening at http://localhost:${port}`)
	})

#### Or in container

Create Dockerfile containing:

	FROM node:latest
	WORKDIR /app
	ADD . .
	RUN npm install
	CMD node index.js

Create image:
> docker build -t nodejsapp:latest .

Run image in container:
> docker run --name nodeservice -d -p 8081:3000 nodejsapp:latest

#### Excluding with .dockerignore

Create .dockerignore containing:

	Dockerfile
	node_modules
	.git

Create image:
> docker build -t nodejsapp:latest .

Run image in container:
> docker run --name nodeservice -d -p 8081:3000 nodejsapp:latest

## Layers & Cashing

To prevent re-installing unchanged layers we can cache them.
Improved Dockerfile:

	FROM node:latest
	WORKDIR /app
	ADD package*.json ./
	RUN npm install
	ADD . .
	CMD node index.js

## Reducing image sizes

Alpine Linux is a Linux distribution based on musl and BusyBox, designed for security, simplicity, and resource
efficiency.
All docker images have an alpine version with much lower image sizes.

Dockerfiles for alpine:

	FROM nginx:alpine
	ADD . /usr/share/nginx/html

And:

	FROM node:alpine
	WORKDIR /app
	ADD package*.json ./
	RUN npm install
	ADD . .
	CMD node index.js

In the folder where we keep the website we want to serve with nginx
> docker build -t website:latest .  
> In the folder where we keep the index.js we want to serve with node  
> docker build -t nodeservice:latest .

nginx containersize:  
134MB -> 23.6MB

node containersize:  
971MB -> 145MB

Running these container will have exact same result:
> docker run --name website -d -p 8080:80 website:latest  
> docker run --name nodeservice -d -p 8081:3000 nodeservice:latest

## Versioning

Why?

- Control image version
- Avoid breaking changes
- Safety

Versioned Dockerfiles:

	FROM nginx:1.18.0-alpine
	ADD . /usr/share/nginx/html

And:

	FROM node:14.15.1-alpine3.12
	WORKDIR /app
	ADD package*.json ./
	RUN npm install
	ADD . .
	CMD node index.js

## Tagging

Why?

- Retain previous builds
- Latest stays ':latest' build

For website
> docker tag website:latest website:1

For nodeservice
> docker tag nodeservice:latest nodeservice:1

> docker image ls

## Docker Registries

Highly scalable server side application that stores and lets you distribute Docker images.

- Used in CD/CI pipeline
- Used to run instances of application

Some providers:

- Docker HUB
- Quay.io
- Amazon ECR
- ...

Push to private or public registry

- Log in to Docker HUB
- Under repositories - Create repository *'website'*
- Make sure to use tagging standards & Push

Tag:
> docker tag website:1 accountNAME/website:1  
> docker tag website:2 accountNAME/website:2  
> docker tag website:latest accountNAME/website:latest

Push:
> docker push accountNAME/website:1  
> docker push accountNAME/website:2  
> docker push accountNAME/website:latest

Similarly we create a repo for the nodeservice.

Tag:
> docker tag nodeservice:1 accountNAME/nodeservice:1  
> docker tag nodeservice:2 accountNAME/nodeservice:2  
> docker tag nodeservice:latest accountNAME/nodeservice:latest

Push:
> docker push accountNAME/nodeservice:1  
> docker push accountNAME/nodeservice:2  
> docker push accountNAME/nodeservice:latest

## To pull from own repo

For nginx image:
> docker pull accountNAME/website:latest  
> docker run --name website -d -p 8080:80 accountNAME/website:latest

For node image:
> docker pull accountNAME/nodeservice:latest  
> docker run --name nodeservice -d -p 8081:3000 accountNAME/nodeservice:latest

## Docker Inspect

To get information about container
> docker inspect website

## Docker Logs

To get log
> docker log website  
> docker log nodeservice

For live logs
> docker log -f website  
> docker log -f nodeservice

## Interactive Terminal

For website
> docker exec -it website sh  
> cd /usr/share/nginx/html

For nodeservice
> docker exec -it nodeservice /bin/sh