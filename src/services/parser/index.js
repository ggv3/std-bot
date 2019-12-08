import { PARAMETER_PREFIX } from '../../utils/constants';

const command = {
  action: '',
  arguments: [],
  stringArray: [],
};

export default function parse(message) {
  const commands = message.split(' ');
  // eslint-disable-next-line prefer-destructuring
  command.action = commands[0];
  message = message.replace(`${commands[0]} `, '');
  const parameters = commands.slice(1);
  parameters.forEach(p => {
    if (p.startsWith(PARAMETER_PREFIX)) {
      command.arguments.push(p);
      message = message.replace(`${p} `, '');
    }
  });
  command.stringArray = message.split(' ');
  return command;
}
