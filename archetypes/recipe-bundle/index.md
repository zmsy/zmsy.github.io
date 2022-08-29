---
type: recipes
title: "Recipe title"
description: "Recipe description"
subtitle: "Recipe subtitle - shows up just beneath the recipe name"
publishDate: {{ .Date }}
# kingdom = highest level categorization on the site
kingdom: drink
category: cocktails
# --- RECIPE JSON-LD ---
# reference: https://schema.org/Recipe
# google required properties:
# https://developers.google.com/search/docs/advanced/structured-data/recipe#structured-data-type-definitions
#
# array of ingredients for the recipe
recipeIngredient:
  - Ingredient 1
# array of specific instructions for making the recipe
recipeInstructions:
  - Instruction 1
recipeYield:
  - 1 Unit
cookTime: PT0M
prepTime: PT0M
totalTime: PT0M
# remember to make this "false" when publishing!
draft: true
---

## Recipe Information

This is a paragraph.
