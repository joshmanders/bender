import { SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';

const client = new SapphireClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  loadMessageCommandListeners: true,
  defaultPrefix: '!',
  caseInsensitiveCommands: true,
});

client.login(process.env.DISCORD_TOKEN);
