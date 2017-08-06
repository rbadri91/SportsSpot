from eventregistry import *
import json
import sys

def read_input():
    lines =[]

    for sport in sys.argv[1:]:
            createSportsJSON(sport)


def createSportsJSON(sportsName):
    er = EventRegistry(apiKey = "356d961c-b25b-45b0-b52a-6b8e1b8be55e")
    fileName ='';
    if sportsName == 'ALL':
        print("it comes inside");
        fileName ='ALLSports.json'
        q = QueryArticles(conceptUri= QueryItems.OR([er.getConceptUri("Major League Baseball"),er.getConceptUri("National Basketball Association"),er.getConceptUri("National Hockey League"),er.getConceptUri("National Football League")]), sourceUri =QueryItems.OR([er.getNewsSourceUri("cbssports"),er.getNewsSourceUri("espn.go.com"),er.getNewsSourceUri("foxsports.com")]))
    elif sportsName == 'mlb':
        fileName ='MLB.json'
        q = QueryArticles(conceptUri= QueryItems.OR([er.getConceptUri("Major League Baseball")]), sourceUri =QueryItems.OR([er.getNewsSourceUri("cbssports"),er.getNewsSourceUri("espn.go.com"),er.getNewsSourceUri("foxsports.com")]))
    elif sportsName == 'nba':
         fileName ='NBA.json'
         q = QueryArticles(conceptUri= QueryItems.OR([er.getConceptUri("National Basketball Association")]), sourceUri =QueryItems.OR([er.getNewsSourceUri("cbssports"),er.getNewsSourceUri("espn.go.com"),er.getNewsSourceUri("foxsports.com")]))
    elif sportsName == 'nfl':
         fileName ='NFL.json'
         q = QueryArticles(conceptUri= QueryItems.OR([er.getConceptUri("National Football League")]), sourceUri =QueryItems.OR([er.getNewsSourceUri("cbssports"),er.getNewsSourceUri("espn.go.com"),er.getNewsSourceUri("foxsports.com")]))
    elif sportsName == 'nhl':
        fileName ='NHL.json'
        q = QueryArticles(conceptUri= QueryItems.OR([er.getConceptUri("National Hockey League")]), sourceUri =QueryItems.OR([er.getNewsSourceUri("cbssports"),er.getNewsSourceUri("espn.go.com"),er.getNewsSourceUri("foxsports.com")]))
    
    q.setRequestedResult(RequestArticlesInfo(page = 1, count = 50,
    returnInfo = ReturnInfo(articleInfo = ArticleInfoFlags(image = True))))

    res = er.execQuery(q)
    with open('public/json/'+fileName, 'w') as fp:
        json.dump(res['articles']['results'], fp)


def main():
    read_input()

if __name__ == '__main__':
    main()