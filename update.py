import json
import os
import sys
import requests

commit = sys.argv[1]

def 获取npm包最新版本(pkgname):
    return(json.loads(requests.get('https://registry.npmjs.org/'+pkgname+'/latest').text)['version'])


with open('_config.yun.yml', encoding='utf-8') as f:
    oriconfig = f.read()
oriconfig = oriconfig.replace('[TNXG-Static-CDN]', 'https://npm.elemecdn.com/tnxg-blog@' + 获取npm包最新版本('tnxg-blog') + ' #[TNXG-Static-CDN]')
with open('_config.yun.yml', 'w', encoding='utf-8') as f:
    f.write(oriconfig)

os.system('git add .')
os.system('git commit -m "' + commit + '"')
os.system('git push https://github.com/TNXG/blog.git')