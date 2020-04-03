import { Command, Commands } from './command';

describe('command', () => {
  it('parses commands', () => {
    const command = new Command('log apple sauce is awesome');
    expect(command.is(Commands.Log)).toStrictEqual(true);
    expect(command.text).toStrictEqual('apple sauce is awesome');
    expect(command.unknown).toStrictEqual(false);
  });

  it('removes command from parts', () => {
    const command = new Command('refresh 20180101');
    expect(command.is(Commands.Refresh)).toStrictEqual(true);
    expect(command.parts).toStrictEqual(['20180101']);
  });

  it('unknown', () => {
    const command = new Command('random stuff');
    expect(command.unknown).toStrictEqual(true);
  });
});
