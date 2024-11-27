import { Client, Collection, Interaction } from 'discord.js';
import config from './config/config.js';

export async function interaction(
  interaction: Interaction,
  client: Client,
  commands: Collection<string, any>
) {
  if (!interaction.isChatInputCommand()) return;

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
    if (
      command.devOnly &&
      (!config.developers.includes(interaction.user.id) ||
        !config.developers.includes(interaction.user.id))
    ) {
      await interaction.reply({
        content:
          "I'm sorry, but you do not have permission to perform this command. Please contact the server administrators if you believe that is in error.",
        ephemeral: true,
      });
      return;
    }
    console.log(interaction.commandName, command);
    await command.run(interaction, client);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
}
