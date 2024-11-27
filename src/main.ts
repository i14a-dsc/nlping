import { Client, Collection, Events, GatewayIntentBits, REST, Routes } from 'discord.js';
import fs from 'fs';

import config from './config/config.js';
import { messageCreate } from './messageCreate.js';
import { Command } from './types/index.js';
import { interaction } from './interaction.js';

(async () => {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  const commands = new Collection<string, Command>();

  const files = fs.readdirSync('./dist/commands');
  for (const file of files) {
    const command = (await import(`./commands/${file}`)).command;
    commands.set(command.data.name, command);
  }

  if (!config.token) throw new Error('No token provided');

  await client.login(config.token);

  new REST({ version: '10' })
    .setToken(config.token)
    .put(Routes.applicationCommands('1106094223587037214'), {
      body: commands.map(command => command.data),
    })
    .catch(console.error);

  client.on(Events.ClientReady, () => console.info(`Logged in as ${client.user?.username}!`));

  client.on(Events.MessageCreate, m => messageCreate(client, m));
  client.on(Events.InteractionCreate, i => interaction(i, client, commands));
})();
