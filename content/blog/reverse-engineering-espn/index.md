---
title: Reverse Engineering ESPN's Incorrect "Runs Created" Stat
description: "Using some minor sleuthing and publicly available information, I figured out how the calculation used for Runs Created was wrong."
publishDate: 2022-04-28
---

Runs Created is a baseball stat that's largely arbitrary and derived. It [dates back to the 1970s](https://www.baseball-reference.com/bullpen/Runs_created) and has a [variety of formulas](https://captaincalculator.com/sports/baseball/runs-created-calculator/) that can be used.

Why care about it? Like WAR, RC is effectively a way to derive a **useful absolute number reflective of a batter's overall offensive productivity**. Since the _actual_ positive numbers in baseball can be misleading (RBI, R, SB, H) in some scenarios, it's a nice way of smoothing over small sample sizes.

We love it in my fantasy baseball league as a primary indicator of your team's offensive performance. If nothing else because [FanGraph's wRC+ stats](https://library.fangraphs.com/offense/wrc/) is our preferred way of judging batters overall value. It's "Weight Runs Created+", meaning that it's a [version of Runs Created weight for external factors like field or year](https://www.mlb.com/glossary/advanced-stats/weighted-runs-created-plus) and changed such that the league mean is 100. Over 100, you're above average. Below, you're lacking.

## That Ain't Right

There really aren't that many things I can say are consistent between the different derivations of the stat, but the one obvious quality constraint: Runs Created should _never_ be negative.

So you can imagine my surprise to see my sure-to-turn-it-around-someday-soon team member Christian Yelich with `-.2` in his RC column for the past 7 days.

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

| Player | G | AB | PA | H | 1B | 2B | 3B | HR | R | TB | RBI | BB | IBB | SO | HBP | SF | SH | GDP | SB | CS |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Christian Yelich | 18 | 65 | 76 | 12 | 7 | 4 | 0 | 1 | 8 | 19 | 8 | 8 | 0 | 19 | 1 | 2 | 0 | 0 | 2 | 0 |

Current RC value shown in ESPN, as of morning of 4/28 (No games played yet today): **5.9 Runs Created**

{{<image src="phoneb-team-page-current-total.png">}}

However, navigating to the player page in ESPN (again, as of morning 4/28), I'm being shown something different: **6.3 Runs Created**

{{<image src="a-yelich_career_rc.png">}}

So this means my original assumptions of a single, universal derivation for RC are incorrect. Which gives me hope! The second one displayed here _may_ be more correct than this first one.

### Calculating Using Existing RC Formulas

There's a handful of different RC formulas available online, so let's plug these numbers in to see what we'll get. These formulas are from [Baseball Reference's acronyms page](https://www.baseball-reference.com/about/bat_glossary.shtml), but I've used the full terms below so things are slightly clearer. If you're confused by any of the terms used, [Baseball Reference has a handy glossary](https://abbreviations.yourdictionary.com/articles/basic-baseball-stats-abbreviations.html).

#### Baseball Reference Canonical Version

Formula:

```
(H + BB - CS + HBP - GIDP) * (TB + (.26 * (BB - IBB + HBP)) + (.52 * (SH + SF + SB))))(AB+BB+HBP+SH+SF)
(Hits + Walks - Caught Stealing + Hit By Pitch - Ground Into Double Play) * (Total Bases + (.26 * (Walks - Intentional Walks + Hit By Pitch)) + (.52 * (Sacrifice Hits + Sacrifice Flies + Stolen Bases)) * (At Bats + Walks + Hit By Pitch + Sacrifice Hits + Sacrifice Flies)
```

Output: 

#### Stolen Bases Method

```
Runs Created (Stolen Base Method) = ((Hits + Walks – Caught Stealing) x (Total Bases + (0.55 x Stolen Bases))) ÷ (At Bats + Walks)

Runs Created (Technical Method) = ((Hits + Walks – Caught Stealing + Hit by Pitch – Ground into Double Play) x (Total Bases x (0.26 x (Walks – Intentional Walks + Hit by Pitch)) + (0.52 x (Sacrifice Hits + Sacrifice Flies + Stolen Bases)))) ÷ (At Bats + Walks + Hit by Pitch + Sacrifice Hits + Sacrifice Flies)

Runs Created (2002 version):
A = Hits + Walks – Caught Stealing + Hit by Pitch – Ground Into Double Play
B = (1.125 x Singles) + (1.69 x Doubles) + (3.02 x Triples) + (3.73 x Home Runs) + (0.29 x (Walks – Intentional Walks + Hit by Pitch)) + (0.492 x (Sacrifice Hits + Sacrifice Flies + Stolen Bases)) – (0.4 x Strikeouts)
C = At Bats + Walks + Hit by Pitch + Sacrifice Hits + Sacrifice Flies
D = ((2.4 x C) + A) x ((3 x C) + B))
Runs Created (2002) = (D ÷ (9 x C)) – (0.9 x C)
```

## Sleuthing, Part 2 - React DevTools + API Response Investigations

Since I'm primarily a fullstack web developer these days, felt natural to try next to see if I could just debug this like something I'd debug on one of my own websites. So first thing I did was open Firefox Developer Tools and check to see if the page is using React or some similar framework that I can look into.

Bam, the page is rendered using React.

{{<image src="b-react_devtools.png">}}

Navigating to the individual cell being rendered and BAM! They keep the derivation in memory, passed to the cell via props.

{{<image src="c-team_page_devtools.png">}}

Since we had _two_ different values on different pages for the Runs Created metric, let me check [Yelich's individual player page in ESPN](https://www.espn.com/mlb/player/stats/_/id/31283/christian-yelich)...

{{<image src="d-yelich_player_page_devtools.png">}}

Unfortunately, this one is just passed as a value and there's no derivation on it. Turns out there's a MobX store on this page that's open to investigation, but unfortunately it doesn't contain anything other than values. No derivation formula. I'm guessing that these formulas are calculated server-side for this page.

### Runs Created, ESPN Version

Formula:

```
"((a + b - c - d + (2.4 * (e + b + f))) * ((g + (b * 0.26) + (f * 0.53) + (h * 0.64) - (i * 0.03)) + (3 * (e + b + f))) / (9 * (e + b + f))) - (0.9 * (e + b + f))"
```

This...doesn't look like any of the formulas I've seen thus far. Just by looking at the coefficients in use here, it seems closest to the [2002 formulation of RC defined on Captain Calculator](https://captaincalculator.com/sports/baseball/runs-created-calculator/), which has some heavy overlap with this.

Another issue here is that the arguments are anonymous. I'm not sure, from looking at them, what any of the variables here are used for. Complicating this slightly further? It looks like the argument _values_ are the exact same for every single cell, regardless of the outcome.

{{<image src="f-same-formula-arguments.png">}}

When I look at the arguments here for Yelich, it seems to be the same set of values passed as arguments for every player. So how, with the same inputs, are we getting separate outputs? RC, in all of its derivations, is a deterministic formula.

#### What Are These Arguments?

Let's see if we can find the data actually being used. So first thing, loaded up the network tab and sent another request to the same page to see if that set of data was being transferred over the wire.
  
{{<image src="e-network-responses.png">}}

Nice! This payload looks promising. Inspecting further, it looks like we've got some entries called `rosterForCurrentScoringPeriod` that contains a player array with a `stats` dictionary.
  
{{<image src="g-stats-for-current-period.png">}}
  
## The Correct Calculation
