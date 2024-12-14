import { Client, EmbedBuilder, Message } from 'discord.js';
import config from './config/config.js';
import { pingJava } from '@minescope/mineping';

const botInfo = `${config.name} ${config.version}`;

export async function messageCreate(client: Client, message: Message) {
  if (message.author.bot || config.checkIgnored(message.author)) return;
  const content = message.content;
  const me = client.user!;
  if (!content.startsWith(config.prefix)) return;
  switch (content.slice(config.prefix.length)) {
    case 'help':
      message.reply({
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
      break;
    case 'stats':
      const reply = await message.reply({
        embeds: [
          new EmbedBuilder()
            .setAuthor({ name: me.username, iconURL: me.displayAvatarURL() })
            .addFields({ name: 'ステータスを取得しています...', value: ' ' })
            .setFooter({ text: botInfo }),
        ],
      });
      const status = await pingJava('nl-rpg.mcpe.me', {
        protocolVersion: 754,
        port: 25565,
        timeout: 5000,
      });
      const players = status.players;
      reply.edit({
        embeds: [
          new EmbedBuilder()
            .setAuthor({ name: me.username, iconURL: me.displayAvatarURL() })
            .addFields({
              name: 'ステータス',
              value: `**${players.online}** / **${players.max}** 人のプレイヤーが接続しています`,
            })
            .setFooter({ text: botInfo }),
        ],
      });
      break;
    case 'version':
      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setAuthor({ name: me.username, iconURL: me.displayAvatarURL() })
            .addFields({ name: 'バージョン', value: `${config.version}` })
            .setFooter({ text: botInfo }),
        ],
      });
      break;
  }
}
