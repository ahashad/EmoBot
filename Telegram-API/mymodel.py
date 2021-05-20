import requests
import json

def text_reply(input_text):

    url = '{URL}'
    myobj = {'message': input_text}

    x = requests.post(url, json= myobj)

    y = json.loads(x.text)

    return(y["answer"])
    
