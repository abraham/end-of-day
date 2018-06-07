import { Command, Commands } from './command';

describe('Command', () => {
  test('parses commands', () => {
    const command = new Command('log apple sauce is awesome');
    expect(command.is(Commands.Log)).toBeTruthy();
    expect(command.text).toEqual('apple sauce is awesome');
    expect(command.unknown).toBeFalsy();
  });

  test('removes command from parts', () => {
    const command = new Command('refresh 20180101');
    expect(command.is(Commands.Refresh)).toBeTruthy();
    expect(command.parts).toEqual(['20180101']);
  });

  test('unknown', () => {
    const command = new Command('random stuff');
    expect(command.unknown).toBeTruthy();
  });
});
