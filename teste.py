import requests

teste = requests.get('https://raw.githubusercontent.com/PaoDaSerra/paodaserra/main/info.json')

print(teste.text)