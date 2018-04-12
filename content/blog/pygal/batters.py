import pygal
import csv
import pandas as pd
from numpy.random import randint
from random import shuffle

with open("batters.csv", "r") as b_file:
    reader = csv.reader(b_file)
    lines = [x for x in reader]

# pygal config
config = pygal.Config()
config.include_x_axis = False
config.show_legend = False
config.show_x_labels = False
config.show_minor_x_labels = False
config.show_y_labels = False
config.show_minor_y_labels = False
config.js = []
config.print_values = False
config.height = 150
config.stroke = False

style = pygal.style.Style(
    plot_background='transparent',
    background='transparent',
    foreground='transparent',
    colors=['#FFF']
)

df = pd.read_csv("batters.csv")
df['RC'] = (df['PA'] - df['BB']) * df['OBP'] * df['SLG']
df['X'] = randint(0, 501, size=len(df))
df = df[df['RC'] > 0] # only players with projections

# create distribution line
box = pygal.XY(config, style=style)
rows = [(x.X, round(x.RC, 4)) for x in df.itertuples()]
box.add('blank', rows)

svg = box.render(is_unicode=True)
with open("batters.svg", "w") as svg_file:
    svg_file.write(svg)

"""
# create box and whisker plot
box = pygal.Box()
svg = box.render(is_unicode=True)
with open("batters.svg", "w") as svg_file:
    svg_file.write(svg)
"""

