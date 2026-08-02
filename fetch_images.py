import urllib.request, re, urllib.parse

def fetch_images(query):
    url = f'https://html.duckduckgo.com/html/?q={urllib.parse.quote(query)}'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        urls = re.findall(r'src="//external-content\.duckduckgo\.com/iu/\?u=([^&]+)', html)
        return [urllib.parse.unquote(u) for u in urls[:3]]
    except Exception as e:
        return str(e)

print("ServiceNow Architecture:", fetch_images("ServiceNow Architecture diagram"))
print("ServiceNow UI16:", fetch_images("ServiceNow UI16 banner frame"))
print("ServiceNow PDI:", fetch_images("ServiceNow Personal Developer Instance"))
