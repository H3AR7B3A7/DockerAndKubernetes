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

In container:
> cat /etc/os-release

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

> ssh first

If the container doesn't have ssh, like the alpine container:

> apk add openssh

> rc-update add sshd

> /etc/init.d/sshd start

Then go through the previous steps...

### Push Files to Container

> lxc file push /path/to/file FirstContainer/path/to/destination/for/file

### Pull Files to Host

> lxc file pull FirstContainer/path/to/file /path/to/destination/for/file

### Edit File in Container

> lxc file edit FirstContainer/path/to/file

### Create Snapshot

> lxc snapshot FirstContainer

### Restore Container to Snapshot

> lxc restore FirstContainer snap0

### Delete Snapshot

> lxc delete FirstContainer/snap0


## Exposing Containers

### Create Bridge

> cd /etc/netplan

> ls

> nano name-of-netplan.yaml

```
network:
    version: 2
    rederer: networkd
    
    ethernets:
        eth0:
            dhcp4: false
            dhcp6: false
    bridges:
        br0:
            interfaces: [eth0]
            dhcp4: true
```

### Configure Container

> lxc config device add FirstContainer eth0 nic nictype=bridged parent=br0 name=eth0

### Restart Container

> lxc restart FirstContainer





