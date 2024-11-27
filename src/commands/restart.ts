import { Command } from '../types/index.js';

export const command: Command = {
  data: {
    name: 'restart',
    name_localizations: { ja: '再起動' },
    description: 'Restart the bot',
    description_localizations: { ja: 'Botを再起動します' },
    type: 1,
    integration_types: [0, 1],
  },
  devOnly: true,
  run: async (interaction, client) => {
    await interaction.reply({ content: 'Restarting...', ephemeral: true });
    console.info('Restarting bot...');
    await client.destroy();
    process.exit(0);
  },
};
