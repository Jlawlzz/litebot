# LiteBot

#### NOTE: Documentation for Litebot is forthcoming. If you have any questions about getting up and running feel free to ping me @ jordanalawler@gmail.com!

## What:

- Litebot is a Node.js/Express chatbot framework that currently supports the Facebook Messenger platform. (keep an eye out for expanded platform support in the near future!)
- Litebot favors rapid development in the beginning of the dev cycle, deeper features can be built out via modular scripts as needs arise ([Raheem.ia](http://Raheem.ai) is built on top of the Litebot framework).

## Setup:

Before moving forward I suggest skimming the FB messenger docs that can be found here:
[Messenger Platform Docs](https://developers.facebook.com/docs/messenger-platform/complete-guide)

Whats in ```~/config/default.json``` file:
  - ```appSecret```: FB messenger app secret key.
  - ```pageAccessToken```: FB messenger pageAccessToken.
  - ```validationToken```: FB messenger validationToken.
  - ```flags```: Custom flags which trigger functions found in ```~/src/state/flags``` during conversation state changes.
  - ```scripts```: Custom scripts found in ```~/src/scripts``` that allow for things like API integration, custom behavior etc.  Each script must have a ```digest()``` & ```format()``` function.

I currently use [ngrok](https://ngrok.com/) to test Litebot locally.

Look in ```~/content/index.json``` for a sample conversation.  While the sample conversation adheres to a dialog tree, tools like wit.ai and Watson can be integrated via custom scripts (found in ```~/src/scripts```).

## TODO:
  - Build out docs
  - Expand platform support
  - FB Messenger webview support
