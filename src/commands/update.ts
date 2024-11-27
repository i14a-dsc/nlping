import { execSync } from 'child_process';
import { Command } from '../types/index.js';

export const command: Command = {
  data: {
    name: 'update',
    name_localizations: { ja: '再起動' },
    description: 'Restart the bot',
    description_localizations: { ja: 'Botを再起動します' },
    type: 1,
    integration_types: [0],
  },
  devOnly: true,
  run: async interaction => {
    await interaction.reply({ content: 'Restarting...', ephemeral: true });
    const buffer = execSync('git pull && bun i && bun run build');
    console.log(buffer.toString());
    await interaction.reply({
      content: 'Update and Rebuild completed. You need to restart the bot manually.',
      ephemeral: true,
    });
  },
};
