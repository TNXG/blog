import json
import os
import sys
import requests
import yaml

commit = sys.argv[1]


def 获取npm包最新版本(pkgname):
    return(json.loads(requests.get('https://registry.npmjs.org/'+pkgname+'/latest').text)['version'])


with open('_config.yun.yml', encoding='utf-8') as f:
    oriconfig = f
    config = yaml.safe_load(f)
    config['cdn']['pre'] = 'https://npm.elemecdn.com/tnxg-blog@' + \
        获取npm包最新版本('tnxg-blog')
with open('_config.yun.yml', 'w', encoding='utf-8') as f:
    yaml.dump(config, f, allow_unicode=True)

os.system('git add .')
os.system('git commit -m "' + commit + '"')
os.system('git push https://github.com/TNXG/blog.git')

with open('_config.yun.yml', 'w', encoding='utf-8') as f:
    f.write(oriconfig)
