# Mineflayer CTF API Plugin

This plugin integrates a Mineflayer bot with a Capture the Flag (CTF) server via a WebSocket API. It allows your bot to interact with the CTF server, access information such as game state and team information, and perform actions based on the API.

## Features

- Connect to the CTF server via WebSocket
- Send requests to the server and receive responses
- Use API methods to interact with the server and perform actions

## Requirements

- Node.js and npm installed
- Mineflayer installed (`npm install mineflayer`)

## Installation

1. Install the plugin from npm:

    ```shell
    npm install your-plugin-name
    ```

2. Once installed, you can require the plugin in your bot script:

    ```javascript
    const mineflayer = require("mineflayer");
    const { loader } = require("your-plugin-name");

    const bot = mineflayer.createBot({
        host: "server_ip",
        port: 25565,
        username: "bot_username",
        password: "bot_password" // Remove this line if you don't need a password
    });

    bot.loadPlugin(loader);
    ```

3. Once the bot connects to the Minecraft server, it will automatically initialize the `CTFApiClient` and attach it to the bot instance as `bot.ctfApi`.

4. You can use the `bot.ctfApi` property to interact with the CTF server and make API calls. For example:

    ```javascript
    bot.on("login", async () => {
        console.log("Bot has logged in!");

        // Check if the game is running
        const isGameRunning = await bot.ctfApi.isGameRunning();
        console.log("Is game running:", isGameRunning);

        // Get a list of teams
        const teams = await bot.ctfApi.getTeams();
        console.log("Teams:", teams);
    });
    ```

## API Methods

- `bot.ctfApi.getTeams()`: Returns a promise that resolves with an array of team names.
- `bot.ctfApi.isGameRunning()`: Returns a promise that resolves with a boolean indicating whether the game is running.
