import { User } from 'discord.js';
import 'dotenv/config';

const version = '5.1';
const isDev = version.includes('dev');

export default {
  version,
  isDev,
  name: isDev ? 'nl-ping-dev' : 'Neverland RPG Ping Bot',
  prefix: isDev ? 'nl.' : 'nl!',
  token: isDev ? process.env.DEV_TOKEN : process.env.TOKEN,
  emoji: {
    barrier: isDev ? 'barrier' : '<:barrier:1317470653862903833>',
    enderEye: isDev ? 'ender_eye' : '<:ender_eye:1317471011142369370>',
  },
  developers: ['i14a', 'i14a.dsc', 'sakayanagialice', 'ss_ririchiyo'],
  ignored: ['070ry'],
  checkIgnored({ username, id }: User) {
    if (id) return this.ignored.includes(id) || this.ignored.includes(username);
    return this.ignored.includes(username);
  },
};
