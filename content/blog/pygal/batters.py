import pygal
import csv
import pandas as pd

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

style = pygal.style.Style(
    background='transparent',
    foreground='transparent'
)



df = pd.read_csv("batters.csv")
df = df.dropna(how='any')  # drop players without teams
df = df[df['PA'] >= 400]   # limit to players with over 400 projected plate appearances
df['RC'] = (df['PA'] - df['BB']) * df['OBP'] * df['SLG']
df_teams = df['Team'].unique()

# create distribution line
dot = pygal.XY(config, style=style)
for index, team in enumerate(list(df_teams)):
    dot.add(team, [(index + 1, x) for x in list(df[df['Team'] == team]['RC'])])

svg = dot.render(is_unicode=True)
with open("batters_dotplot.svg", "w") as svg_file:
    svg_file.write(svg)

"""
# create box and whisker plot
box = pygal.Box()
box.title = 'RC by Team'
for team in df_teams:
    print(team + " - " + ','.join(df[df['Team'] == team]['Name']))
    print("\n")
    box.add(team, list(df[df['Team'] == team]['RC']))

svg = box.render(is_unicode=True)
with open("batters.svg", "w") as svg_file:
    svg_file.write(svg)
"""

