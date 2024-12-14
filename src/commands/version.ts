import { EmbedBuilder } from 'discord.js';
import { Command } from '../types/index.js';
import config from '../config/config.js';

const footer = { text: `${config.name} ${config.version}` };

export const command: Command = {
  data: {
    name: 'version',
    name_localizations: { ja: 'バージョン情報' },
    description: 'Get the Neverland RPG Status',
    description_localizations: { ja: 'Botのバージョン情報を表示します' },
    type: 1,
    contexts: [0, 1, 2],
    integration_types: [0, 1],
  },
  run: async (interaction, client) => {
    const me = client.user!;
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setAuthor({ name: me.username, iconURL: me.displayAvatarURL() })
          .addFields({ name: 'バージョン', value: `${config.version}` })
          .setFooter(footer),
      ],
      ephemeral: true,
    });
  },
};
