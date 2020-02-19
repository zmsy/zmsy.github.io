---
title: An Architecture For Personal Data Engineering
description: There's a lot of data that I use in my life that would benefit from some infrastructure work. Here's hoping to create something that makes this easier for me.
publishDate: 2019-03-26
---

Performing in-depth data analyses on things in my own life have always been more difficult than in my working life, primarily because there I've normally had teams of engineers who have helped in setting up and maintaining most of the analytics-focused infrastructure that I've used. Supporting myself with the same sort of infrastructure I was used to was an adventure, [one that started much earlier](/blog/my-very-own-airflow-cluster/) and has since grown from there.

<!-- <img src="/blog/personal-data-engineering/graphs.svg" style="width:20rem; height:10rem" class="no-border" alt="Miscellaneous fake graphs for fun."> -->
{{< image src="graphs.svg" alt="Miscellaneous fake graphs for fun." class="no-border" >}}

## Scope

To most ends, downloading CSVs and plugging them into your spreadsheet software of choice will do most tasks well enough. For my purposes though, I wanted to scale this past what manual analysis was going to get me. There's a few key areas that I wanted this for:

- Personal finances. Most of the data that I create finds it's way into financial systems that are hard to get your information out of. I'm not against the bank having my spending data, but I am frustrated that it's so hard for me to get it too.
- Fantasy sports. I love sports and I love stats.
- House shopping. This data is heaaaavily guarded and it's hard to find anything that isn't breaking some sort of ToS to get.

This doesn't necessarily create a system that requires dedicated data engineering work, but some of the goals that I had for it did. These were:

- **Automated.** I'd like to see how repeatable and reproducible these analyses can be.
- **Modeled.** I'd like to build and train some models related to how I live my life to see if there's any predictive benefit to these things.
- **Interactive.** - For everything that you see here, I'd like to have some sort of interface that I can open, preferably via web browser.

## The Bits n' Pieces

For doing this sort of work, I set up a few infrastructural components. Hardware is a low-spec server with [Proxmox](https://www.proxmox.com/en/) (for VMs) and Docker/[Portainer](https://www.portainer.io/).

<img src="/blog/personal-data-engineering/diagram.svg" style="max-height: 20rem" class="no-border" alt="Diagram of my personal data engineering architecture.">

- **Postgres database** - My primary datastore. This is the hub of all activity that I do, serving as both an application backend / transactional database as well as an analytical database. Each are neatly separated out into different schemas. I use [DBeaver](https://dbeaver.io/) as a SQL client for ad-hoc querying, manipulation, setup, etc. Since a single Postgres instance can scale to vastly larger workloads than I'd ever be able to throw at it, this seemed like a good backbone for everything.
- **Apache Airflow** - In it's simplest form, I'm using this basically as a scheduled job engine. Building on my [earlier post about Airflow]("/blog/my-very-own-airflow-cluster/"), I've expanded my usage of it to a significant variety of different DAGs. This uses the same Postgres database as earlier.
- **Jupyter Notebooks** - Interactive analytical code/markdown files served up in your web browser. Jupyter is the ultimate tool in interactive analytical computing, with RStudio being the only major other option I considered (went with Jupyter, if for nothing else, because I find python more enjoyable to write). There's [great options](https://jupyterhub.readthedocs.io/en/stable/) available if you want to run this on a server, I found that I like just running it locally the best.
- **Apache Superset** - Web-based Dashboards. [Superset](https://superset.incubator.apache.org/installation.html#getting-started), similar to Airflow, is based on Python/Flask and can be run in a single Docker container if you so desire. Since I need some way of sharing some of these results with a significant other (namely finance + house shopping data), I needed to have some sort of dashboarding software in order to have that visible to someone who will access it via web browser.

## My Workflow

Since the pieces have been set in place now, this is my general workflow:

<img src="/blog/personal-data-engineering/process.svg" style="max-height: 12rem" class="no-border" alt="Process workflow from Airflow task to Jupyter notebook and then to Superset dashboard.">

1. Find a new datasource. Generally, this is something scraped from the web or pulled from a service I use.
2. Write an Airflow task to pull that data on a regular schedule (normally nightly).
3. In Postgres, create schema / table in order to store info.
4. Use downstream in:
    1. Superset dashboard. This is normally when I've created a datasource that I'm interested in (i.e. personal spending data) and want to look at from a variety of angles.
    2. Jupyter notebook. Normally, this is to either create a more in-depth analysis (any modelling required) or to investigate one hunch / idea that I've got. In the event that I something useful to replicate, I ship this upstream into an Airflow task.
    3. Exported to some sort of printable / shareable thing. Good example for this is pre-draft research for fantasy sports.

## Tips

This was a fun adventure to go on, but I'm happy that it's stabilized by this point.

- It's fun stuff. It really is. Using data to analyze parts of your own life is something people rarely get to do.
- There's a tradeoff between having a robust, feature-filled system and an easy one. As your needs change, your tools tend to change too. My aims for this outgrew my cron/jupyter/Google Sheets hackjob before trying to take on any of this.
- Getting data is the hardest part. Significantly more time for me is spent writing data fetching tasks than anything else.
