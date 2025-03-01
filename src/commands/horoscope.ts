import { Args, Command } from '@sapphire/framework';
import { Message } from 'discord.js';
import axios from 'axios';

const SIGNS = [
  'aries',
  'taurus',
  'gemini',
  'cancer',
  'leo',
  'virgo',
  'libra',
  'scorpio',
  'sagittarius',
  'capricorn',
  'aquarius',
  'pisces',
];

export default class extends Command {
  public constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, {
      ...options,
      name: 'horoscope',
      description: 'Get your daily horoscope',
      detailedDescription: 'Usage: !horoscope <zodiac sign>',
    });
  }

  public async messageRun(message: Message, args: Args) {
    const sign = await args.pick('string').catch(() => null);

    if (!sign || !SIGNS.includes(sign.toLowerCase())) {
      return message.reply(`Please provide a valid zodiac sign: ${SIGNS.join(', ')}`);
    }

    try {
      const { data } = await axios.get(
        `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}&day=TODAY`
      );

      return message.reply(`**${data.data.date}**\n ${data.data.horoscope_data}`);
    } catch (error) {
      return message.reply('Sorry, I could not fetch the horoscope at this time.');
    }
  }
}
