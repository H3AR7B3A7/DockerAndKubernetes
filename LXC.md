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

### Stop Container

> lxc stop FirstContainer

### Delete Container

> lxc delete FirstContainer

### Clone Container

> lxc copy AlpineContainer AlpineContainer2

### (Re-)Start Container

> lxc start AlpineContainer2

### SSH to Container

- In container:
> nano /etc/ssh/sshd_config

```
PasswordAuthentication yes

LoginGraceTime 120
PermitRootLogin yes
StrictModes yes
```

> systemctl restart ssh

*If password is not 'ubuntu', use passwd root to change the password.*


- On host:
> ssh-keygen -b 2048 -t rsa -C steven.d.hondt.sdh@gmail.com
> ssh-copy-id -i .ssh/id_rsa.pub root@10.8.18.147

> nano .ssh/config

```
Host first
HostName        10.8.18.147
user            root
IdentityFile    ~/.ssh.id_rsa
```

ssh first

### Push Files to container

> lxc push files











