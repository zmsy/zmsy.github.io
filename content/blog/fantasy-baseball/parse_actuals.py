import requests
import csv
from bs4 import BeautifulSoup

# static urls
# PITCHERS_URL = "https://www.fangraphs.com/leaders.aspx?pos=all&stats=pit&lg=al&qual=y&type=c,36,37,38,40,-1,120,121,217,-1,24,41,42,43,44,-1,117,118,119,-1,6,45,124,-1,62,122,13&season=2018&month=0&season1=2018&ind=0&team=0&rost=0&age=0&filter=&players=0&page=1_100000"
BATTERS_URL = "https://www.fangraphs.com/leaders.aspx?pos=all&stats=bat&lg=al&qual=y&type=8&season=2018&month=0&season1=2018&ind=0&team=0&rost=0&age=0&filter=&players=0&page=1_10000"

# request the data
# pitchers_html = requests.get(PITCHERS_URL).text
batters_html = requests.get(BATTERS_URL).text


# parse the pitchers data
# pitchers_soup = BeautifulSoup(pitchers_html)


# parse the batters data
batters_soup = BeautifulSoup(batters_html)
batters_table = batters_soup.find("table", {"class": "rgMasterTable"})

# get headers data
batters_headers = []
batters_headers_html = batters_table.find("thead").find_all("th")
for header in batters_headers_html:
    batters_headers.append(header.text)

# get players data
batters_rows = []
batters_rows_html = batters_table.find("tbody").find_all("tr")

for row in batters_rows_html:
    batter_data = []
    for cell in row.find_all("td"):
        print(cell.text)
        # batter_data.append(cell.text)
    # batters_rows.append(batter_data)