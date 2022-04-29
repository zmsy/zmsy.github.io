---
title: Reverse Engineering Incorrect Stats in ESPN Fantasy Baseball
description: "Using some minor sleuthing and publicly available information, I figured out how the calculation used for Runs Created was wrong."
publishDate: 2022-04-28
---

"Runs Created" is a baseball stat that's largely arbitrary and derived. It [dates back to the 1970s](https://www.baseball-reference.com/bullpen/Runs_created) and has a [variety of formulas](https://captaincalculator.com/sports/baseball/runs-created-calculator/) that can be used.

Why care about it? Like WAR, RC is effectively a way to derive a **useful absolute number reflective of a batter's overall offensive productivity**. Since the _actual_ positive numbers in baseball can be misleading (RBI, R, SB, H) in some scenarios, it's a nice way of smoothing over small sample sizes.

Here's the concept of it, at it's most basic form:

  - **A** - On base factor - How well did you, as a batter, reach base?
  - **B** - Advancement factor - How well did you advance as a runner, or advanced other runners?
  - **C** - Opportunity factor - The total opportunities given to do well in A or B

Plugging those in, **Runs Created = (A + B) / C**.

We love it in my fantasy baseball league as a primary indicator of your team's offensive performance. If nothing else because [FanGraph's wRC+ stats](https://library.fangraphs.com/offense/wrc/) is our preferred way of judging batters overall value. It's "Weight Runs Created+", meaning that it's a [version of Runs Created weight for external factors like field or year](https://www.mlb.com/glossary/advanced-stats/weighted-runs-created-plus) and changed such that the league mean is 100. Over 100, you're above average. Below, you're lacking.

## That Ain't Right

There really aren't that many things I can say are consistent between the different derivations of the stat, but the one obvious quality constraint: Runs Created should _never_ be negative.

So you can imagine my surprise to see my sure-to-turn-it-around-someday-soon team member Christian Yelich with `-.2` in his RC column for the past 7 days. What the heck? Sure he's having a rough year, but he's certainly not _subtracting_ runs from his team. As far as I know, baseball runs never go below zero.

{{<image src="phonea-negative-rc.png">}}

My feeble attempts tweeting at ESPN's customer service line didn't seem to be escalating in time for this to not affect our season, so I decided to figure out for myself _why_ this was wrong and provide them with the most precise reproduction of how their current RC derivation is off.

I'm taking the assumption here that 1. there is a single RC formula at ESPN and 2. it's used for both single-day and aggregate stats. Given my history of observing it through the several years that I've played fantasy baseball, this seems like a fair set of assumptions.

## Sleuthing, Part 1 - What Info is Available?

Since RC isn't explicitly defined, it's hard for me to supervise this effort: I'm not fully certain what the outcome of the calculation _should_ be. I can tell in some ways what it should _not_ be, but that's it. So I've got a few challenges here:

1. What formula is ESPN _currently_ using to derive RC?
2. Is the derivation wrong, or is the wrong data being passed to it?

#### Corroborating the Result Displayed in ESPN

Ideally, I want to find some statistics from other websites (ESPN's display doesn't show most of the values that it uses as calculation arguments), so I'll use stats on a defined time period: The season so far, as of end-of-day 2022-04-27.

[Fangraphs 2022 Season Stats (Through 4/28)](https://www.fangraphs.com/leaders.aspx?pos=all&stats=bat&lg=all&qual=y&type=0&season=2022&month=1000&season1=2022&ind=0&team=23&rost=0&age=0&filter=&players=0&startdate=2022-03-01&enddate=2022-04-27)

| G | AB | PA | H | 1B | 2B | 3B | HR | R | TB | 
|---|----|----|---|----|----|----|----|---|----|
| 18 | 65 | 76 | 12 | 7 | 4 | 0 | 1 | 8 | 19 |

| RBI | BB | IBB | SO | HBP | SF | SH | GDP | SB | CS |
|-----|----|-----|----|-----|----|----|-----|----|----|
| 8 | 8 | 0 | 19 | 1 | 2 | 0 | 0 | 2 | 0 |

Current RC value shown in ESPN, as of morning of 4/28 (No games played yet today): **5.9 Runs Created**

{{<image src="phoneb-team-page-current-total.png">}}

However, navigating to the player page in ESPN (again, as of morning 4/28), I'm being shown something different: **6.3 Runs Created**

{{<image src="a-yelich_career_rc.png">}}

So this means my original assumptions of a single, universal derivation for RC are incorrect. Which gives me hope! The second one displayed here _may_ be more correct than this first one.

### Calculating Using Existing RC Formulas

There's a handful of different RC formulas available online, so let's plug these numbers in to see what we'll get. These formulas are from [Baseball Reference's acronyms page](https://www.baseball-reference.com/about/bat_glossary.shtml), but I've used the full terms below so things are slightly clearer. If you're confused by any of the terms used, [Baseball Reference has a handy glossary](https://abbreviations.yourdictionary.com/articles/basic-baseball-stats-abbreviations.html).

I've calculated these using the as-of-today stats from Fangraphs above, and truncated each to a precision of 1 decimal point.

#### Basic Version

This is a simple approach, using only a few common metrics.  

```
Formula:
RC = ((Hits + Walks) x Total Bases) ÷ (At Bats + Walks)

Calculation:
((12 + 8) x 19) ÷ (65 + 8) 
```

Output: **5.2 Runs Created**

There's also the "Baseball Reference" flavor of the basic version here, which takes Hit By Pitch & Sacrifice Fly into account:

```
Formula:
RC = ((Hits + Walks + Hit by Pitch) x Total Bases) ÷ (At Bats + Walks + Hit By Pitch + SF)

Calculation:
RC = ((12 + 8 + 1) x 19) ÷ (65 + 8 + 1 + 2) 
```

Output: **5.3 Runs Created**

#### Stolen Bases Method

Another fallback method used where only some data is available.
  
```
Formula:
((Hits + Walks – Caught Stealing) x (Total Bases + (0.55 x Stolen Bases))) ÷ (At Bats + Walks)

Calculation:
RC = (((12 + 8 - 0) x (19 + (0.55 * 2))) ÷ (65 + 8) 
```

Output: **5.5 Runs Created**

#### Baseball Reference Canonical Version (a.k.a. "Technical Method")

This is the Baseball Reference preferred method where data is available. Considering baseball data is available on their site for something on the order of 130 years, this is not always the case. If you look at the arguments being passed here, this is slightly expanded version of the "Stolen Bases" method above.

```
Formula:
Let A = (Hits + Walks – Caught Stealing + Hit by Pitch – Ground into Double Play)
Let B = (0.26 x (Walks – Intentional Walks + Hit by Pitch))
Let C = (0.52 * (Sacrifice Hits + Sacrifice Flies + Stolen Bases))
Let D = (At Bats + Walks + Hit by Pitch + Sacrifice Hits + Sacrifice Flies)
RC = (A x (Total Bases + B + C)) ÷ D

Calculation:
A = (12 + 8 - 0 + 1 - 2) = 19
B = (0.26 * (8 - 0 + 1)) = 2.34
C = (0.52 x (0 + 2 + 2)) = 2.08
D = (65 + 8 + 1 + 0 + 2) = 76
RC = (19 * (19 + 2.34 + 2.08)) / 76
```

Output: **5.8 Runs Created**

#### 2002 Method

This is another flavor of the "Technical" method defined above:

```
Formula:
Let A = Hits + Walks – Caught Stealing + Hit by Pitch – Ground Into Double Play
Let B = (1.125 x Singles) + (1.69 x Doubles) + (3.02 x Triples) + (3.73 x Home Runs)
        + (0.29 x (Walks – Intentional Walks + Hit by Pitch))
        + (0.492 x (Sacrifice Hits + Sacrifice Flies + Stolen Bases))
        – (0.4 x Strikeouts)
Let C = At Bats + Walks + Hit by Pitch + Sacrifice Hits + Sacrifice Flies
Let D = ((2.4 x C) + A) x ((3 x C) + B))
RC = (D ÷ (9 x C)) – (0.9 x C)

Calculation:
Let A = 12 + 8 – 0 + 1 – 0 = 21
Let B = (1.125 x 7) + (1.69 x 4) + (3.02 x 0) + (3.73 x 1)
        + (0.29 x (8 – 0 + 1))
        + (0.492 x (0 + 2 + 2))
        – (0.4 x 19) = 22.183
Let C = 65 + 8 + 1 + 0 + 2 = 76
Let D = ((2.4 x C) + A) x ((3 x C) + B)) = 50,887.2
RC = (49,495.97 ÷ (9 x 76)) – (0.9 x 76)
```

Output: **5.99 Runs Created**

## Sleuthing, Part 2 - React DevTools + API Response Investigations

Since I'm primarily a fullstack web developer these days, felt natural to try next to see if I could just debug this like something I'd debug on one of my own websites. So first thing I did was open Firefox Developer Tools and check to see if the page is using React or some similar framework that I can look into.

Bam, the page is rendered using React.

{{<image src="b-react_devtools.png">}}

Navigating to the individual cell being rendered and...

**There it is.**

{{<image src="c-team_page_devtools.png">}}

They pass the actual derivation formula to the individual table cell as props, and the calculation is run on the client. We've got the actual formula they're using now, so time to see where it's going wrong.

As one other curiosity, can we figure out where that other number, `6.3` on the player page was coming from?

Let me check [Yelich's individual player page in ESPN](https://www.espn.com/mlb/player/stats/_/id/31283/christian-yelich)...

{{<image src="d-yelich_player_page_devtools.png">}}

Bummer. Unfortunately, this one is just passed as a value and there's no derivation on it. Turns out there's a MobX store on this page that's open to investigation, but unfortunately it doesn't contain anything other than values. No derivation formula. I'm guessing that these formulas are calculated server-side for this page.

### Runs Created, ESPN Version

Formula, directly from ESPN's app:

```
((a + b - c - d + 2.4 * (e + b + f)) *
  (g + b * 0.26 + f * 0.53 + h * 0.64 - i * 0.03 + 3 * (e + b + f))) /
  (9 * (e + b + f)) - 0.9 * (e + b + f)
```

Just by looking at the coefficients in use here, it seems this is a variation on the [2002 formulation of RC](https://en.wikipedia.org/wiki/Runs_created#2002_version_of_runs_created).

Formatting this to look more like the official calculation above:

```
A = a + b - c - d
B = g + (b * 0.26) + (f * 0.53) + (h * 0.64) - (i * 0.03)
C = e + b + f
D = ((2.4 * C) + A) x ((3 * C) + B))
RC = (D ÷ (9 x C)) – (0.9 x C)
```

So we've got the formula now.

The remaining issue here in correcting these values is that the arguments are anonymous. I'm not sure, from looking at them, what any of the variables here are used for. Complicating this slightly further? It looks like the argument _values_ are the exact same for every single cell, regardless of the outcome.

{{<image src="f-same-formula-arguments.png">}}

When I look at the arguments here for Yelich, it seems to be the same set of values passed as arguments for every player. So how, with the same inputs, are we getting separate outputs? RC, in all of its derivations, is a deterministic formula.

#### What Are These Arguments?

Let's see if we can find the data actually being used. So first thing, loaded up the network tab and sent another request to the same page to see if that set of data was being transferred over the wire.
  
{{<image src="e-network-responses.png">}}

Nice! This payload looks promising. Inspecting further, it looks like we've got some entries called `rosterForCurrentScoringPeriod` that contains a player array with a `stats` dictionary.
  
{{<image src="g-stats-for-current-period.png">}}
  
Intuitively, this made sense to me. The arguments in the formula above were _keys_ and not _values_. So likely, this is using those sets of keys to find stats from this stats object, keyed by some sort of stat id value. Unfortunately, it doesn't seem like the stat _names_ are available elsewhere in the payload, just more values to corroborate what's in the payload with what's display in the UI.
  
Looking back into the UI, the stat ID value is displayed on all of the stats visible in the table. This should help me map arguments to these pretty well.

{{<image src="h-devtools-stat-id-value.png">}}

Searching through these, it's fairly intuitive to map some of them back to the 2002 formula using their position in the formula, and others it's possible to do by finding examples of that stat in use.

**De-anonymized ESPN RC arguments:**

* `a` - **Hits**. Values line up in calculation, and stat id value matches the UI display in React DevTools.
* `b` - **Walks**. Used positionally in multiple places in the same way as the 2002 calculation, and id value lined up with UI.
* `c` - **Caught Stealing** - `c`/`d` are interchangeable here. Neither are displayed in ESPN UI for determining correctness, but they're only used once in the calculation so it doesn't matter which is which. Swapping these two would net the same result.
* `d` - **Ground into Double Play** - See above.
* `e` - **At Bats** - Remembering that the "C" portion of the calculation quantifies Opportunities, this is the base denominator of the calculation. This id value aligned with UI.
* `f` - **Sacrifice Flies** - Based on what's being calculated, this is either Hit by Pitch, Sacrifice Hits, or Sacrifice Flies. It's used in multiple places, similar to the 2002 version. I found some examples of this aligning with the values shown on the player's full-year stats page on ESPN, so SF seems the most likely.
* `g` - **Total Bases** - This was only obvious after looking at several other pages, since TB is rarely displayed in the UI in ESPN.
* `h` - **Stolen Bases** - Our league doesn't use Stolen Bases as a metric (hint: [because stolen bases aren't a good idea in baseball, and are generally useless as a statistic](https://batflipsandnerds.com/2018/11/03/analytics-and-its-effects-on-the-mlb-the-stolen-base/)), but this one was easy to corroborate across a few different players.
* `i` - **Strikeouts** - Based on how little of an impact Ks have on RC calculations writ large, this seemed like a safe assumption to make. The coefficient is an order of magnitude lower in the ESPN calculation, so this will be even a smaller impact.

## Correcting the Calculation

Let's look at another example of RC being negative and show these arguments in that calculation now. This is `-.6`.

{{<image src="" >}}
  
This is the top currently available batter in our league, Whit Merrifield. He's owned in most leagues because he loves stealing bases. He's not owned in ours because we don't care. His 2022 stats, for the calculation:

| H | BB | CS | GDP | AB | SF | TB | SB | SO |
|---|----|----|-----|----|----|----|----|----|
| 9 | 3  | 0  | 3   | 71 | 1  | 11 | 3  | 11 |
  
Let's plug these into the ESPN RC formula and see if we can identify why this output is negative.
  
```
A = 9 + 3 - 0 - 3 = 9
B = 11 + (3 * 0.26) + (1 * 0.53) + (3 * 0.64) - (11 * 0.03) = 13.9
C = e + b + f = 75
D = ((2.4 * C) + A) x ((3 * C) + B)) = 45,152.1
RC = (D ÷ (9 x C)) – (0.9 x C)
```

Output: **-0.61 Runs Created**

In this scenario, the numerator is just simply not high enough. The denominator is _seemingly more correct_ in this case, because the missing statistics shouldn't actually affect it that much. The offensive value in the A and B portions of the calculation is too low.
  
What does the 2002 calculation say Whit's actual Runs Created should be?
  
```
Let A = Hits + Walks – Caught Stealing + Hit by Pitch – Ground Into Double Play
Let B = (1.125 x Singles) + (1.69 x Doubles) + (3.02 x Triples) + (3.73 x Home Runs)
        + (0.29 x (Walks – Intentional Walks + Hit by Pitch))
        + (0.492 x (Sacrifice Hits + Sacrifice Flies + Stolen Bases))
        – (0.4 x Strikeouts)
Let C = At Bats + Walks + Hit by Pitch + Sacrifice Hits + Sacrifice Flies
Let D = ((2.4 x C) + A) x ((3 x C) + B))
RC = (D ÷ (9 x C)) – (0.9 x C)
```

Output: **1.xx Runs Created**
