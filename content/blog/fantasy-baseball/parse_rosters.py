import requests
import csv
from bs4 import BeautifulSoup

LEAGUE_URL = "http://games.espn.com/flb/leaguerosters?leagueId=15594"

# translate ESPN names to Fangraphs names
TRANSLATIONS = {
    'Nicky Delmonico': 'Nick Delmonico',
    'Yuli Gurriel': 'Yulieski Gurriel'
}


def main():
    """
    Request information from rosters site and parse it.
    """

    html = requests.get(LEAGUE_URL).text
    soup = BeautifulSoup(html)

    rosters = soup.find_all("table", {'class': 'playerTableTable'})

    players = []
    for roster in rosters:
        team_name = roster.find("a").text
        players_html = roster.find_all("td", {'class': 'playertablePlayerName'})
        for player in players_html:
            # parse player info
            player_name = player.text.split(",")[0]
            player_name = player_name.replace("*", "")

            # translate player name if necessary
            translation = TRANSLATIONS.get(player_name)
            if translation:
                player_name = translation

            # add to output list
            players.append([player_name, team_name])

    with open("rosters.csv", "w", newline='') as out_file:
        writer = csv.writer(out_file)
        writer.writerow(("player", "team"))
        writer.writerows(players)

if __name__ == '__main__':
    main()
