import { EmbedBuilder } from 'discord.js';
import { Command } from '../types/index.js';
import { pingJava } from '@minescope/mineping';
import config from '../config/config.js';

const footer = { text: `${config.name} ${config.version}` };

export const command: Command = {
  data: {
    name: 'stats',
    name_localizations: { ja: 'ステータスを取得' },
    description: 'Get the Neverland RPG Status',
    description_localizations: { ja: 'Neverland RPGのステータスを取得します' },
    type: 1,
    integration_types: [0, 1],
    options: [
      {
        name: 'ephemeral',
        description: 'Make the message ephemeral',
        type: 5,
      },
    ],
  },
  run: async (interaction, client) => {
    const ephemeral = interaction.options.getBoolean('ephemeral') ?? false;
    const me = client.user!;
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setAuthor({ name: me.username, iconURL: me.displayAvatarURL() })
          .addFields({ name: 'ステータスを取得しています...', value: ' ' })
          .setFooter(footer),
      ],
      ephemeral,
    });
    const status = await pingJava('nl-rpg.mcpe.me', {
      protocolVersion: 754,
      port: 25565,
      timeout: 5000,
    });
    const players = status.players;
    await interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setAuthor({ name: me.username, iconURL: me.displayAvatarURL() })
          .addFields({
            name: 'ステータス',
            value: `**${players.online}** / **${players.max}** 人のプレイヤーが接続しています`,
          })
          .setFooter(footer),
      ],
    });
  },
};
