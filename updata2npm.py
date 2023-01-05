import datetime

now = datetime.datetime.now()
path = 'public/package.json'
with open(path, 'w', encoding='utf-8') as f:
    data = '{"name":"tnxg-blog","version":"' + now.strftime(
        "%Y.%m.%d-%H.%M.%S") + '","author":"TNXG","license":"TSO-BY"}'
    f.write(data)
    print('updata2npm.py:配置文件生成完成')
