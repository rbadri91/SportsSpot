from eventregistry import *
import json
import sys
from websocket import create_connection

def read_input():
    lines = sys.stdin.readlines()
    input_data = json.loads(lines[0])
    
    print("input_data",input_data);

def main():
    
    print("it comes to main")
    # ws = create_connection("ws://localhost:8090/websocket")
    
    # input_data = read_input()
    
    er = EventRegistry(apiKey = "356d961c-b25b-45b0-b52a-6b8e1b8be55e")
    sport = "Hockey Ice Hockey" 
    # [er.getConceptUri("Major League Baseball"),er.getConceptUri("National Basketball Association"),er.getConceptUri("National Hockey League"),er.getConceptUri("National Football League")
    q = QueryArticles(conceptUri= QueryItems.OR([er.getConceptUri("Major League Baseball"),er.getConceptUri("National Basketball Association"),er.getConceptUri("National Hockey League"),er.getConceptUri("National Football League")]), sourceUri =QueryItems.OR([er.getNewsSourceUri("cbssports"),er.getNewsSourceUri("espn.go.com"),er.getNewsSourceUri("foxsports.com")]))
    infoList =list()

    q.setRequestedResult(RequestArticlesInfo(page = 1, count = 50,
    returnInfo = ReturnInfo(articleInfo = ArticleInfoFlags(image = True))))

    res = er.execQuery(q)
    # print("res here:",res);

    # for article in er.execQuery(q):
    #     infoList.append(article)

    with open('public/json/ALLSports.json', 'w') as fp:
        json.dump(res['articles']['results'], fp)
    
    # print("ended")

if __name__ == '__main__':
    main()