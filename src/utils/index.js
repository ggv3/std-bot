export const parseCommand = (msg, modules) => {
  const prefix = msg.content[0];
  const splitMessage = msg.content.slice(1).split(' ');

  const module = modules.find(m => m === splitMessage[0]) || 'general';
  const commandName = module === 'general' ? splitMessage[0] : splitMessage[1];
  const parameters = module === 'general' ? splitMessage.slice(1) : splitMessage.slice(2);

  return { prefix, module, commandName, parameters, msg };
};
