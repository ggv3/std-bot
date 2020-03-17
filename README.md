# STD Bot

A bot made for specific Discord server

## Table of contents

- [Features](#features)
- [Requirements](#requirements)
- [Environment variables](#environment-variables)
- [Dependencies](#dependencies)
- [Run the bot](#run-the-bot)
  - [Development](#development)
  - [Production](#production)

### Features

- Slapping users with a trout
- Show enormours disappointment with a simple command
- Automatic feedback polling from a separate REST API and printing it to specific channel

### Requirements

### Environment variables

Your `.env` file should look like this. Fill in with actual values

```
TOKEN=""
TUUKKA=""
ENDPOINT_FEEDBACK=""
ENDPOINT_TWITCH=""
FEEDBACK_CHANNEL_ID=""
ROLE_ADMIN=""
ROLE_MODERATOR=""
CLIENT_ID=""
```

### Dependencies

Install dependencies for development environment `npm install`.

### Run the bot

#### Development

In development you can run the bot with `npm start`.

#### Production

Build the production version `npm run build`.
