# Docker & Kubernetes

Full video on: [FreeCodeCamp](https://www.youtube.com/watch?v=Wf2eSG3owoA)
/ [Amigoscode](https://www.youtube.com/watch?v=bhBSlnQcq2k&t=23s)

## Docker

Docker is a set of platform as a service (PaaS) products that use OS-level virtualization to deliver software in
packages called containers. Containers are isolated from one another and bundle their own software, libraries and
configuration files; they can communicate with each other through well-defined channels. Because all the containers
share the services of a single operating system kernel, they use fewer resources than virtual machines.

### Cheatsheet

- [Docker Cheatsheet](Docker.md)

### Extra

- [Containerize Your Spring Application With Docker](Spring.md)
- [Running Postgres And PgAdmin4 In Containers](Postgres.md)
- [Run MySQL And phpMyAdmin In Containers](MySQL.md)

## Kubernetes

Kubernetes, commonly stylized as K8s, is an open-source container-orchestration system for automating
computer-application deployment, scaling, and management. It was originally designed by Google and is now maintained by
the Cloud Native Computing Foundation. It aims to provide a "platform for automating deployment, scaling, and operations
of application containers across clusters of hosts". It works with a range of container tools and runs containers in a
cluster, often with images built using Docker. Kubernetes originally interfaced with the Docker runtime through a "
Dockershim"; however, the shim has since been deprecated in favor of directly interfacing with the container through
containerd, or replacing Docker with a runtime that is compliant with the Container Runtime Interface (CRI) introduced
by Kubernetes in 2016.

### Cheatsheet

- [Kubernetes Cheatsheet](Kubernetes.md)

## Linux Containers (LXC)

LXC (Linux Containers) is an operating-system-level virtualization method for running multiple isolated Linux systems
(containers) on a control host using a single Linux kernel.

The Linux kernel provides the cgroups functionality that allows limitation and prioritization of resources
(CPU, memory, block I/O, network, etc.) without the need for starting any virtual machines. It also provides
namespace-isolation that allows complete isolation of an application's view of the operating environment, including
process trees, networking, user IDs and mounted file systems.

**LXD** is a system container-manager, basically an alternative to LXC's tools. In fact, it is building on top of LXC to
provide a new, better user experience.

- [Linux Containers Cheatsheet](LXC.md)