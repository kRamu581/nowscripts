import urllib.request, json, urllib.parse

def search_wikimedia(query):
    url = f'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(query)}&gsrnamespace=6&prop=imageinfo&iiprop=url&format=json'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        data = json.loads(urllib.request.urlopen(req).read().decode('utf-8'))
        pages = data.get('query', {}).get('pages', {})
        return [page['imageinfo'][0]['url'] for page in pages.values() if 'imageinfo' in page]
    except Exception as e:
        return []

print("ServiceNow:", search_wikimedia("ServiceNow"))
print("ITSM:", search_wikimedia("IT Service Management"))
print("Dashboard:", search_wikimedia("Software dashboard"))
