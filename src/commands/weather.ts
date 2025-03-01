import { Args, Command } from '@sapphire/framework';
import { Message } from 'discord.js';
import axios from 'axios';

interface WeatherResponse {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_mph: number;
    wind_kph: number;
    wind_dir: string;
    humidity: number;
    feelslike_c: number;
    feelslike_f: number;
  };
  infoLink: string;
}

export default class extends Command {
  public constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, {
      ...options,
      name: 'weather',
      description: 'Get weather information for a location',
      detailedDescription: 'Usage: !weather <location>',
    });
  }

  public async messageRun(message: Message, args: Args) {
    const location = await args.rest('string').catch(() => null);

    if (!location) {
      return message.reply('Please provide a location. Usage: !weather <location>');
    }

    try {
      const { data } = await axios.get<WeatherResponse>(
        `https://weathergpt.vercel.app/api/weather?location=${encodeURIComponent(location)}`
      );

      const weather = [
        `🌍 **${data.location.name}, ${data.location.region}, ${data.location.country}**`,
        `🌡️ Temperature: ${data.current.temp_f}°F (${data.current.temp_c}°C)`,
        `🌤️ Condition: ${data.current.condition.text}`,
        `🌡️ Feels like: ${data.current.feelslike_f}°F (${data.current.feelslike_c}°C)`,
        `💨 Wind: ${data.current.wind_mph} mph ${data.current.wind_dir} (${data.current.wind_kph} km/h)`,
        `💧 Humidity: ${data.current.humidity}%`,
      ].join('\n');

      return message.reply(weather);
    } catch (error) {
      return message.reply('Sorry, I could not fetch the weather information at this time.');
    }
  }
}
