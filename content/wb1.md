# Creating This Site 1: Back-End Language and Framework


I've been sitting on this domain for about 2 years and finally decided to put it to use with my own website. I make a lot of creative output in a variety of channels, and figured having my own page is probably the best area to showcase all of it. I had decided that I was going to build the website myself, as opposed to using a pre-made set of software like Wordpress or something along those lines.

Requirements for the site:
* **Modern Toolkit**: I didn't expect to go in and use a LAMP stack like in the old times of web development. I've got a decent handle on HTML/CSS/JS, so I want to be using the latest-and-greatest to the extent that I can learn it. For me, this basically means that I'm going to use a 
* **Markdown-based Writing**: I enjoy writing in markdown, so I wanted to find something that would allow me to publish markdown files and have the newest ones
* **Python Back-End**: I am most comfortable in Python. Virtually all professional development that I've done in my life was in Python, so I'd like to stick with it.
* **Easy-to-Use Web Framework**: I'm not planning on writing my own HTML/CS/JS pages for everything that goes on the site, so I'm going to use a web framework that will help me plan it all out.
* **Templating Engine**: Part of that web framework needs to be a templating engine. If I'm going to have a number of pages that are effectively blog posts or something similar, I'd like to be able to retrieve that data from the database and immediately format it correctly using templates.
* **AWS Hosted**: In a very self-serving manner (why would I make a personal website except for that reason?), I want to get more experience with the common AWS services so that I can put it on my resume.
* **Containerized**: I want this to run in a Docker container or something similar so I can instantly deploy it and have it up and running.
* **CI/CD Tooling**: For the first bit, I plan on making a LOT of changes to the page, so I want to make sure that the deployment toolkit is as solid as is possible. I plan on basically wiping out the page a whole bunch of times for at least the first few months. I'm not a web developer, so a lot of things will likely go wrong with it.



What I chose:
* `python` - Pretty straightforward. I like python, I want to do my back-end coding in it.
* `flask` - This was the most useful web framework for my needs. If I were doing some more MVC-like heavy lifting, then I would've gone with Django, but Flask seemed like it capture my use case better and has a growing user base as of recent.
* `bulma` - This CSS framework is exactly what I had wanted. It gives me a number of useful classes and covers a lot of my needs as far as layout/styling goes, and does not include any extra JS files on top of what I'm going to be including with my stuff. That means I might need to add my own basic event listeners for some obvious stuff like nav menus, but that's preferable to including a lot of unnecessary JS that I'm never going to use.