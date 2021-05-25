The github pages doesn't work with ruby 3.0, make sure you stay at 2.7.x.

Example to downgrade pacman: 

```sh
sudo ipacman -U https://archive.archlinux.org/packages/r/ruby/ruby-2.7.2-1-x86_64.pkg.tar.zst
```

And add to `/etc/pacman.conf`

```
IgnorePkg   = ruby
```
