import { parseCommand } from '../../../src/utils/index';

describe('utils/index.js', () => {
  it('should parse command correctly', () => {
    const mockMessage = { content: '!slap foo faa' };
    const mockModules = ['twitch'];
    const mockResult = {
      commandName: 'slap',
      module: 'general',
      msg: {
        content: '!slap foo faa',
      },
      parameters: ['foo', 'faa'],
      prefix: '!',
    };
    expect(parseCommand(mockMessage, mockModules)).toStrictEqual(mockResult);
  });
});
