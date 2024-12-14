import { EmbedBuilder } from 'discord.js';
import { Command } from '../types/index.js';
import config from '../config/config.js';

export const command: Command = {
  data: {
    name: 'restart',
    name_localizations: { ja: '再起動' },
    description: 'Restart the bot',
    description_localizations: { ja: 'Botを再起動します' },
    type: 1,
    integration_types: [0, 1],
  },
  run: async (interaction, client) => {
    const me = client.user!;
    const botInfo = `${config.name} ${config.version}`;
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setAuthor({ name: me.username, iconURL: me.displayAvatarURL() })
          .addFields(
            { name: 'コマンド一覧', value: ' ' },
            {
              name: 'ping',
              value: 'Bot の Ping を取得します',
            },
            {
              name: 'stats',
              value: 'サーバーのステータスを取得します',
            },
            {
              name: 'stop',
              value: 'Bot を終了します (requie privilege)',
            },
            {
              name: 'uptime',
              value: 'Botの起動時間を取得します',
            },
            {
              name: 'help',
              value: 'コマンド一覧を表示します',
            },
            {
              name: 'version',
              value: 'Botのバージョンを表示します',
            }
          )
          .setFooter({ text: botInfo }),
      ],
    });
  },
};
