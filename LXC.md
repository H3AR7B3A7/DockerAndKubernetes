# Linux Containers (LXC)

### Installation

> sudo apt install lxc

> sudo snap install lxd

### Guided Setup

> lxd init

*The defaults will be fine for personal use, and we can name our pool whatever we like.*

### List Containers

> lxc list

> lxc list -c n,s,4,image.description:image

### Create Container

> lxc launch ubuntu:20.04 FirstContainer

> lxc launch images:alpine/edge/default AlpineContainer

### List Available Images

> lxc image alias list ubuntu:

> lxc image alias list images: 'alpine'

### Information

> lxc info FirstContainer

### Enter Container

> lxc exec FirstContainer bash

> lxc exec AlpineContainer sh

### Other Commands

> lxc exec FirstContainer hostname








