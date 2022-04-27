---
title: Reverse Engineering ESPN's Incorrect "Runs Created" Stat
description: "Using some minor sleuthing and publicly available information, I figured out how the calculation used for Runs Created was wrong."
publishDate: 2022-04-27
---

Runs Created is a baseball stat that's largely arbitrary and derived. It [dates back to the 1970s](https://www.baseball-reference.com/bullpen/Runs_created) and has a [variety of derivation formulas](https://captaincalculator.com/sports/baseball/runs-created-calculator/) that can be used.

Why care about it? Like WAR, RC is effectively a way to derive a **useful absolute number reflective of a batter's overall productivity**. Since the _actual_ positive numbers in baseball can be misleading (RBI, R, SB, H) in some scenarios, it's a nice way of smoothing over small sample sizes.

We love it in my fantasy baseball league as a primary indicator of your team's offensive performance. If nothing else because [FanGraph's wRC+ stats](https://www.fangraphs.com/leaders.aspx?pos=all&stats=bat&lg=all&qual=y&type=8&season=2022&month=0&season1=2022&ind=0) is our preferred way of judging batters overall value. It's "Weight Runs Created+", meaning that it's a [version of Runs Created weight for external factors like field or year](https://www.mlb.com/glossary/advanced-stats/weighted-runs-created-plus) and changed such that the league mean is 100. Over 100, you're above average. Below, you're lacking.

## That Ain't Right

There really aren't that many things I can say are consistent between the different derivations of the stat, but the one obvious quality constraint: Runs Created should never be negative.

So you can imagine my surprise to see my squad member Christian Yelich with `-.2` in his RC column for the past 7 days.
