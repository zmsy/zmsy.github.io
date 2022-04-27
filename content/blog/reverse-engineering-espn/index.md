---
title: Reverse Engineering ESPN's Incorrect "Runs Created" Stat
description: "Using some minor sleuthing and publicly available information, I figured out how the calculation used for Runs Created was wrong."
publishDate: 2022-04-27
---

Runs Created is a baseball stat that's largely arbitrary and derived. It [dates back to the 1970s](https://www.baseball-reference.com/bullpen/Runs_created) and has a [variety of derivation formulas](https://captaincalculator.com/sports/baseball/runs-created-calculator/) that can be used.

Why care about it? Like WAR, RC is effectively a way to derive a **useful, positive, absolute number reflective of a player's overall performance**. Since the _actual_ positive numbers in baseball can be misleading (RBI, R, SB, H) in some scenarios, it's a nice way of smoothing over small sample sizes.

We love it in my fantasy baseball league as a primary indicator of your team's offensive performance.

## That Ain't Right

There really aren't that many things I can say are consistent between the different derivations of the stat, but the one obvious quality constraint: Runs Created should never be negative.

So you can imagine my surprise to see my squad member Christian Yelich with `-.2` in his RC column for the past 7 days.
