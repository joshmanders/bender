import { Command } from '@sapphire/framework';
import { Message } from 'discord.js';

export default class extends Command {
  public constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, {
      ...options,
      name: 'about',
      description: 'Display information about the bot',
      detailedDescription: 'Usage: !about',
    });
  }

  public async messageRun(message: Message) {
    const aboutMessage = [
      '🤖 **Bender Bot**',
      'Your friendly neighborhood Discord bot!',
      '',
      '**Commands**',
      '`!weather <location>` - Get weather information',
      '`!horoscope <sign>` - Get horoscope information',
      "`!ping` - Check the bot's latency",
      '`!about` - Display information about the bot',
      '',
      '**Links**',
      '📦 [GitHub Repository](https://github.com/joshmanders/bender)',
      '🐛 [Report Issues](https://github.com/joshmanders/bender/issues)',
    ].join('\n');

    return message.reply(aboutMessage);
  }
}
