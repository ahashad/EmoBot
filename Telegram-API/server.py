from bot import telegram_chatbot
import mymodel

bot = telegram_chatbot("config.cfg")


def make_reply(msg):
    reply = None
    if msg is not None:
        reply = mymodel.text_reply(msg)
    return reply

update_id = None
while True:
    updates = bot.get_updates(offset=update_id)
    updates = updates["result"]
    print("Line17")
    print(updates)
    if updates:
        for item in updates:
            update_id = item["update_id"]
            try:
                message = str(item["message"]["text"])
                print("line23:")
                print(message)
            except:
                message = None
            from_ = item["message"]["from"]["id"]
            reply = make_reply(message)
            print("Line30:")
            print(reply)
            bot.send_message(reply, from_)
