import { Client, Collection, Interaction } from 'discord.js';
import config from './config/config.js';

export async function interaction(
  interaction: Interaction,
  client: Client,
  commands: Collection<string, any>
) {
  if (!interaction.isChatInputCommand()) return;
  if (config.checkIgnored(interaction.user)) {
    interaction.reply({
      content: config.emoji.barrier + ' You are not allowed to use this command.',
      ephemeral: true,
    });
    return;
  }

  const command = commands.get(interaction.commandName);
  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    await interaction.reply({
      content: 'Command not found.',
      ephemeral: true,
    });
    return;
  }

  try {
    if (command.devOnly && !config.developers.includes(interaction.user.username)) {
      await interaction.reply({
        content: [
          'This command is require privileged access.',
          'Please contact the server administrators if you believe that is in error.',
        ].join('\n'),
        ephemeral: true,
      });
      return;
    }
    console.log(interaction.commandName, command);
    await command.run(interaction, client);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command. Please try again later.',
      ephemeral: true,
    });
  }
}
