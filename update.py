import json
import os
import requests
import sys

commit = sys.argv[1]


def 获取npm包最新版本(pkgname):
    return (json.loads(requests.get('https://registry.npmjs.org/' + pkgname + '/latest').text)['version'])


# print('自动修改项目配置ing')
# with open('_config.yun.yml', encoding='utf-8') as f:
#     oriconfig = f.read()
print('开始检测npm仓库最新版本')
latest = 获取npm包最新版本('tnxg-blog')
# data = oriconfig.replace('\'https://assets.tnxg.whitenuo.cn/blog-file\'', '\'https://npm.elemecdn.com/tnxg-blog@' + latest + '\' #[TNXG-Static-CDN]')
print('当前npm库最新版本：' + latest)
# with open('_config.yun.yml', 'w', encoding='utf-8') as f:
#     f.write(data)
print('开始上传github仓库')
os.system('git add .')
os.system('git commit -m "' + commit + '"')
os.system('git push -f')
print('OK')
# print('重置项目配置ing')
# with open('_config.yun.yml', 'w', encoding='utf-8') as f:
#     f.write(oriconfig)
