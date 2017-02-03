# Messenger Bot

[Messenger Platform Docs](https://developers.facebook.com/docs/messenger-platform/complete-guide)

Verify Token
```
this_is_a_verify_token
```

Setup Greeting Text
```
curl -X POST -H "Content-Type: application/json" -d '{"setting_type":"greeting","greeting":{"text":"Hi, I am FWBot, and I am trying to build a better me. Click get started to play with me!"}}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=PAGE_ACCESS_TOKEN"
```

Setup Get Started Button

```
curl -X POST -H "Content-Type: application/json" -d '{"setting_type":"call_to_actions","thread_state":"new_thread","call_to_actions":[{"payload":"STEP:1_GET_STARTED_PAYLOAD"}]}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=PAGE_ACCESS_TOKEN"
```

Persistent Menu

```
curl -X POST -H "Content-Type: application/json" -d '{"setting_type":"call_to_actions","thread_state":"existing_thread","call_to_actions":[{"type":"postback","title":"Start A New Report","payload":"restart"}]}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=PAGE_ACCESS_TOKEN"
```

Currently using [ngrok](https://ngrok.com/) for local development & quick testing but it's means changing the webhook in the fb app back before pushing changes.

If you want to learn how to setup a bot from the beginning here is the tutorial I used: [Messenger Bot Setup Tutorial](https://github.com/jw84/messenger-bot-tutorial)
