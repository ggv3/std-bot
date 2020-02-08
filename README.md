# STD Bota

A bot made for specific Discord server

## Table of contents

- [Features](#features)
- [Requirements](#requirements)
- [Config.js](#config.js)
- [Dependencies](#dependencies)
- [Run the bot](#run-the-bot)
  - [Development](#development)
  - [Production](#production)

### Features

- Slapping users with a trout
- Show enormours disappointment with a simple command
- Automatic feedback polling from a separate REST API and printing it to specific channel

### Requirements

### Config.js

Your `config.js` file should look like this. Replace curly brace variables with actual values.

```javascript
export default {
  token: '{token}',
  tuukka: '{correct emote id}',
  endpoint: '{feedbackService endpoint}',
  feedbackChannelId: '{channelId for feedbacks}',
  roles: {
    admin: '{admin role Id}',
    moderator: '{moderator role Id}',
  },
};
```

### Dependencies

Install dependencies for development environment `npm install`.

### Run the bot

#### Development

In development you can run the bot with `npm start`.

#### Production

Build the production version `npm run build`.
