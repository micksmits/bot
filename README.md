## Environment

To configure the bot a `.env` file is necessary:
```
DISCORD_TOKEN=
DISCORD_CLIENT_ID=
TMDB_TOKEN=
DATABASE_URL="postgresql://tib:example@localhost:5432/tib?schema=public"
```

Using docker compose you can set up a local database:
```
npm run db:start
```

Finally run the bot:
```
npm run bot:start
```