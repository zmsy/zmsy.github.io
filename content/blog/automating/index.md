---
title: The Uncomfortable Practice of Talking With Business Folk About Automation
description: There's a lot of latent assumptions baked into conversations about building back-office systems. Where does that disconnect come from and why?
publishDate: 2018-03-01
---

## So...Why Should We Automate This?

One of the major stopping points in conversations with business users I've noticed is talking about automation. For a lot of people I work with, automation is a confusing black box. The **type of automation I'm referencing is specific to scenarios wherein there exists no readily available commodity software that can solve the problem** (e.g. no "Version control? Git! Spreadsheet? Excel!").

Typical motivation:

- Current system is resulting in too many issues/errors.
- Not scalable.
- Reducing time that could be spent doing more productive things.
- Little or no documentation. This may be coupled with never-ending trails of _"Well maybe this person knows"_.

Conversations about it often form two sides:

- For engineers and other technical users, the benefits of automation are palpable and usually obvious.
- For non-technical folk, the benefits usually come down to some variation on three specifics:
  - Unlocking new capabilities.
  - Making things easier.
  - Delivering faster.

Since I work on a Data Science and Analytics team, a large portion of our audience is non-technical business users. I notice that, for people who've never been involved in the process of automating a task or process, these are not motivating factors. In fact, many people who would benefit from the system actually push back against it being implemented.

Having this conversation is _never_ simple or without controversy.

### Reasons End Users Dislike The Process of Automating Things

The hardest part about automating business processes, by orders of magnitude, is figuring out _what_ to automate. The realm of manual processes is rife with inconsistencies, moving requirements, and baked-in assumptions.

The top reasons I've noticed:

- **Loss of Control** - This is normally the first and most important aspect of the conversation. A lot of people have grown accustomed to being able to handle something on their own, and they know intuitively when things are right and wrong. They have the ability to adjust outputs if they don't look right, or provide feedback where they think inputs are wrong.
- **No Common Understanding** - This is the most obvious point here, as everyone expects. There are a lot of fundamental concepts about automation that business users don't understand. Since most users are normally locked into a GUI with an interactive workflow, designing something to be run on a headless system that doesn't respond to user input is a very foreign model of computing. Users are usually concerned with how _they_ interact with it.
- **Fear of Upfront Costs** - For the short term, there's normally a higher upfront time investment required for automating something.
- **New Tool & Skill Requirements** - Outside of technical disciplines, adding new skills to your toolkit is not always directly rewarded. Adding technical complexity is usually not something that factors into their decision calculus.

The first two are usually scary enough to end users that they don't want to field questions about automating things.

## The Culture Divide

Bridging the culture gap between my group and others is always a major source of frustration. Business users such as those in finance or sales operate in a different type of incentive system; one that rewards personal triumph as an outcome of executing a small set of goals well. This becomes frustrating when trying to sell them on an engineer's mindset: if some part of the process is faulty or is non-scalable, it's a fault of the process itself rather than the person(s) running it. 

In the process of selling that approach, it's hard to avoid coming across as minimizing the problem. Framing the problem as one in need of automating can risk demeaning the importance of the outcomes that process, or the capabilities of the person currently owning it. As a result, I've noticed users can become more entrenched in their ways because they don't feel like this will actually benefit them. They justifiably believe their work is valuable, and the engineer's approach of _let's-abstract-this-away-permanently_ makes it seem like it's not fully grasping the importance of those current manual outputs.

It's something I've come to respect and I've gotten frustrated with the '_end users amirite guys_' attitude I regularly catch myself thinking. I will rarely have the depth of knowledge about the problem space compared to those I'm working with. Combine that with a [definitely-not-unique-to-me tendency to underestimate how long delivering an automated solution will take](https://chrismm.com/blog/project-delays-why-software-estimates/), I realize that I sometimes deliver the effective one-two punch of both acting condescending and not delivering on what I promise.

## The Unknown Benefits of Automation

On the flipside, there's a lot that end users might not see or understand, but are normally provable benefits of automating something.

- Fixes Upstream Issues - A lot of the time, end users will fix problems that they see and not document them. When you automate a process, you need reasonable assumptions that you can make, and a lot of the time this forces upstream issues to be fixed.
- Code is Documentation - Code is excellent for determining and making evident a specific task's requirements. There's not much that can beat 'codified logic to accomplish this task' for organizational understanding on how to accomplish a task.
- Less Error-prone - A lot of the time manual reporting or processes are done on a regular basis it usually follows some sort of prescribed process or script. People don't know how often they mess this stuff up, whereas with an automated system you can write tests to verify that all of your pre-conditions are met. One of the biggest wins for my stakeholders is often how much less time they spend triaging issues that arise.

## My Approach

Fixing this problem, or at least improving it for myself, is something I'm working on getting better at. Here's my takeaways from it all:

- Be empathetic. This may seem like an obvious platitude, but _caring_ about their position in this situation is required for a solution that genuinely helps users out.
- Deliver. Seems obvious, but give 'em the goods regularly and as soon as you can.
- Provide an interface for talking about the system that will accomplish these tasks going forward. Talk about pieces of the work as functions, with an input and an output. Users want to know how _they_ interact with it, so let them know.

There's likely not going to be much that changes in my environment to make this conversation easier, so I think starting with this approach might be good enough.
