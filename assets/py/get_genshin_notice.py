import json
import requests

all = requests.get(
    'https://content-static.mihoyo.com/content/ysCn/getContentList?pageSize=20&pageNum=1&channelId=10',verify=False).text
rejson = json.loads(all)
datalist = rejson['data']['list']
data = '<h1>原神官方通报</h1>'
for i in datalist:
    if 'url' in i['ext'][1]['value']:
      data += '<a href="https://ys.mihoyo.com/main/news/detail/' + str(i['contentId']) + '"><h1>' + i['title'] + '</h1><br><img src="' + i['ext'][1]['value'][0]['url'] + '"/><hr><br>'
    else:
      data += '<a href="https://ys.mihoyo.com/main/news/detail/' + str(i['contentId']) + '"><h1>' + i['title'] + '</h1><hr><br>'
    print(data)
