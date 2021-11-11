# Kubernetes
Kubernetes (commonly stylized as k8s) is an open-source container-orchestration system for automating application deployment, scaling, and management.  
  
Why?
- High availability or no downtime
- Scalability or high performance
- Disaster recovery (backup and restore)

## Architecture
<img src="https://github.com/H3AR7B3A7/DockerAndKubernetes/blob/master/kubernetes_architecture.png?raw=true" alt="kubernetes_architecture">

### Some definitions
Inside Worker Nodes:
**Service**: Ensures permanent IP even when pods die  
**Ingress**: For external services with secure protocol and domain name  
**ConfigMap**: Contains configurations to prevent having to rebuild pods on changes  
**Secret**: Configmap with base64 encoding  
**Volumes**: Ensures data persistence through attaching physical storage (local or remote)  
**Deployment**: Abstraction of pods that ensures uptime through replication of nodes  
**StatefulSet**: Sort of advanced deployment that can handle state for databases  

## Installation (windows)
[Hyper-V](https://minikube.sigs.k8s.io/docs/drivers/hyperv/)  
>Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All

[MiniKube](https://minikube.sigs.k8s.io/docs/start/)  
>choco install minikube

[Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)  
>choco install kubernetes-cli

## Start Virtual Minikube Cluster
>minikube start --driver=hyperv  
>minikube status  

>kubectl get nodes  
>kubectl version  
>kubectl get services  

## Create pods
Create a pod
>kubectl create deployment deploymentNAME --image=mongo  
>kubectl get deployment  
>kubectl get pod  
>kubectl describe pod podNAME  
>kubectl logs podNAME  

Creating a Configured Deployment
>kubectl apply -f fileNAME.yaml

## Interactive Terminal
>kubectl exec -it podID bin/bash

## Delete pods
Delete a pod
>kubectl delete pod podNAME

Delete all pods
>kubectl delete --all pods

Delete a deployment
>kubectl delete deployment deploymentNAME

Delete all deployments
>kubectl delete --all deployments

## Simple example
Create nginx-deployment.yaml containing:

    apiVersion: apps/v1
    kind: Deployment
    metadata:
        name: nginx-deployment
        labels:
            app: nginx
    spec:
        replicas: 2 
        selector:
            matchLabels:
                app: nginx
        template:
            metadata:
                labels:
                    app: nginx
            spec:
                containers:
                - name: nginx
                  image: nginx:1.16
                  ports:
                  - containerPort: 80  

>kubectl apply -f nginx-deployment.yaml  
 ~ created  
>kubectl get deployment  
>kubectl get pod  

Edit nginx-deployment.yaml ...

>kubectl apply -f nginx-deployment.yaml  
 ~ configured

## Example Mongo Application
### Create Deployment
Create mongo.yaml containing:

    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: mongodb-deployment
      labels:
        app: mongodb
    spec:
      replicas: 1
      selector:
        matchLabels:
          app: mongodb
      template:
        metadata:
          labels:
            app: mongodb
        spec:
          containers:
            - name: mongodb
              image: mongo
              ports:
                - containerPort: 27017
              env:
                - name: MONGO_INITDB_ROOT_USERNAME
                  valueFrom:
                    secretKeyRef:
                      name: mongodb-secret
                      key: mongo-root-username
                - name: MONGO_INITDB_ROOT_PASSWORD
                  valueFrom: 
                    secretKeyRef:
                      name: mongodb-secret
                      key: mongo-root-password

### Create Secret
Create mongo-secret.yaml containing:

    apiVersion: v1
    kind: Secret
    metadata:
        name: mongodb-secret
    type: Opaque
    data:
        mongo-root-username: dXNlcm5hbWU=
        mongo-root-password: cGFzc3dvcmQ=

Encode:
```bash
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes('username'))
```

Decode:
```bash
[System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String('cGFzc3dvcmQ='))
```

Applying secret:
>kubectl apply -f mongo-secret.yaml  
>kubectl apply -f mongo.yaml  
>kubectl get pod --watch  
>kubectl describe pod podNAME

### Create Internal Service
Append to mongo.yaml:

    ---
    apiVersion: v1
    kind: Service
    metadata:
      name: mongodb-service
    spec:
      selector:
        app: mongodb
      ports:
        - protocol: TCP
          port: 27017
          targetPort: 27017

>kubectl apply -f mongo.yaml  
>kubectl get service  
>kubectl descibe service serviceNAME  
>kubectl get pod -o wide

To see all components about mongodb
>kubectl get all | grep mongodb

### Create Mongo Express Deployment
Create mongo-express.yaml containing:

    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: mongo-express
      labels:
        app: mongo-express
    spec:
      replicas: 1
      selector:
        matchLabels:
          app: mongo-express
      template:
        metadata:
          labels:
            app: mongo-express
        spec:
          containers:
          - name: mongo-express
            image: mongo-express
            ports:
            - containerPort: 8081
            env:
            - name: ME_CONFIG_MONGODB_ADMINUSERNAME
              valueFrom:
                secretKeyRef:
                  name: mongodb-secret
                  key: mongo-root-username
            - name: ME_CONFIG_MONGODB_ADMINPASSWORD
              valueFrom:
                secretKeyRef:
                  name: mongodb-secret
                  key: mongo-root-password
            - name: ME_CONFIG_MONGODB_SERVER
              valueFrom:
                configMapKeyRef:
                  name: mongodb-configmap
                  key: database_url

### Create ConfigMap
Create mongo-configmap.yaml containing:

    apiVersion: v1
    kind: ConfigMap
    metadata:
        name: mongodb-configmap
    data:
        database_url: mongodb-service

>kubectl apply -f mongo-configmap.yaml  
>kubectl apply -f mongo-express.yaml

### Create External Service
Append to mongo-express.yaml:

    ---
    apiVersion: v1
    kind: Service
    metadata:
      name: mongo-express-service
    spec:
      selector:
        app: mongo-express
      type: LoadBalancer
      ports:
        - protocol: TCP
          port: 8081
          targetPort: 8081
          nodePort: 30000

>kubectl apply -f mongo-express.yaml  
>kubectl get service  
>kubectl describe service mongodb-service  
>kubectl get pod -o wide  
>kubectl describe pod podID  
>kubectl logs podID  

Serve Mongo Express
>minikube service mongo-express-service