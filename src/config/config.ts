import 'dotenv/config';

const version = '5.0';
export default {
  name: 'Neverland RPG Ping Bot',
  version,
  isDev: version.includes('dev'),
  prefix: 'nl!',
  token: process.env.TOKEN,
  developers: ['i14a', 'i14a.dsc', 'sakayanagialice', 'ss_ririchiyo'],
};
