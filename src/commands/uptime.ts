import { Command } from '../types/index.js';
import { format } from '../utils/utils.js';

export const command: Command = {
  data: {
    name: 'uptime',
    description: 'Get the uptime of the bot',
    type: 1,
    integration_types: [0, 1],
  },
  run: async (interaction, client) => {
    if (!client.readyTimestamp) return;
    await interaction.reply({
      embeds: [
        {
          author: {
            name: client.user?.username ?? 'NLPing',
            icon_url: client.user?.displayAvatarURL(),
          },
          title: '現在のUptime',
          description: format(process.uptime()),
          fields: [
            {
              name: '起動した日時',
              value: `<t:${Math.floor(client.readyTimestamp / 1000)}:F>`,
            },
          ],
          footer: {
            text: `From: ${interaction.user.username}`,
            icon_url: interaction.user.displayAvatarURL(),
          },
        },
      ],
      ephemeral: true,
    });
    return;
  },
};
