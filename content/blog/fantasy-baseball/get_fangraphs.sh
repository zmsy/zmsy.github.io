# get batters projections html
curl 'https://www.fangraphs.com/projections.aspx?pos=all&stats=bat&type=fangraphsdc' \
    -H 'Accept-Encoding: gzip, deflate, br' \
    -H 'Accept-Language: en-US,en;q=0.9' \
    -H 'Upgrade-Insecure-Requests: 1' \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8' \
    -d @batters_form_data.txt --compressed \
    > batters_projections.html

# get pitching projections
curl 'https://www.fangraphs.com/projections.aspx?pos=all&stats=pit&type=fangraphsdc' \
    -H 'Accept-Encoding: gzip, deflate, br' \
    -H 'Accept-Language: en-US,en;q=0.9' \
    -H 'Upgrade-Insecure-Requests: 1' \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8' \
    -d @pitchers_form_data.txt --compressed \
    > pitchers_projections.html

