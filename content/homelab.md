


# My Ever Changing Home Lab

I've wanted to have a few basic servers set up at home for a variety of things. About two years back, I bought a Dell T20 small business server on sale, and managed to get it for _super_ cheap.

## The T20 a.k.a. Terminator X

This Dell T20 was pretty impressive for how much I got it for. It was no slouch at $170 shipped. Named it after the DJ in Public Enemy so that I would always remember the node name when trying to ssh into it (although admittedly I had no idea what SSH was at that time).
* Pentium G3220 - One of many of the hitting-above-their-weight Pentium G-line processors that have come out in the past few years.
* 4GB ECC RAM - Came with it. Thought it would be good to have ECC RAM, as it is a server ya know.
* Motherboard, fans and PSU came preinstalled.
* No boot drive, no OS, nothing else.

### Making It Work

For the first iteration of this server I had the following setup.
1. I installed Ubuntu 14.04 (as was current at the time) and installed some packages I use frequently.
2. Somehow managed to swing a whole shopping bag (?!?!) full of 320GB and 500GB hard drives from a friend who had recently swapped out all of the drives in his work's machines for SSDs. This gave me some extra storage to work with. I found two 500GB WD Blues in the mix, and installed those.
3. I manually configured Samba to work with my network - which was a terrible, terrible experience. I think I got literally everything wrong on the first time around.

From this start, I actually managed to do quite a lot with the server. I had installed my own git server, had set up Plex for home streaming, and had managed to _somewhat_ effectively use that 1TB of space in the file server. It was surprisingly capable for a machine that, all things considered, cost me less than half of what most people will pay for a fancy GPU these days.

### Needs Upgrades

I began to hit some scaling issues with the current setup. Mostly 4GB of ram was just _not_ cutting it anymore. This was right around the time that DDR3 was falling out of fashion for the newer and faster DDR4, so there was RAM available for pretty cheap. I got 16GB for about $80 which seems like an absolute dream compared to todays prices (you're lucky to find 8gb for that amount right now).

So now that I had the memory for it, here's what was running:
* MySQL / PhpMyAdmin - For some random database work that I was doing. I had a class that focused primarily on MySQL and it was nice to have a local install.
* Plex - Still running strong.
* Terraria server for playing with friends.
* Git server for local developing without having to publish my stuff to the world on Github.
* Ubuntu being used as a samba file share - This one was useful, but _definitely_ not configured correctly still. I had gotten samba to work so that I could access it on my Windows PC and my Mac laptop, but past that I was just still running into issues left and right. It had something to do with the way that I had configured the storage for the VM. It still wasn't great.

This setup lasted me about a year with very minimal changes.

### The Container-izationing

I had been hearing Docker was getting to be pretty big right around then so I started looking into LXC templates on the server. I unlocked all of the Turnkey Linux options on my server so that I could run them more easily than the VMs I had setup before.



## What's Next ?