import { Command } from '@sapphire/framework';
import { Message } from 'discord.js';

export default class extends Command {
  public constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, {
      ...options,
      name: 'ping',
      aliases: ['pong'],
      description: 'ping pong',
    });
  }

  public async messageRun(message: Message) {
    const msg = await message.reply('Ping?');

    const content = `Pong from Bender ${Math.round(this.container.client.ws.ping)}ms. API Latency ${
      msg.createdTimestamp - message.createdTimestamp
    }ms.`;

    return msg.edit(content);
  }
}
