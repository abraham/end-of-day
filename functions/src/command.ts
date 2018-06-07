import { capitalizeFirstLetter } from './string'

export enum Commands {
  Log = 'Log',
  List = 'List',
  Refresh = 'Refresh',
}

export class Command {
  public parts: string[];
  public command: string;
  public text: string;

  constructor(text: string) {
    this.parts = this.parse(text);
    this.command = capitalizeFirstLetter(this.parts.splice(0, 1)[0].toLowerCase());
    this.text = text.slice(this.command.length).trim();
  }

  public get unknown(): boolean {
    return !Object.keys(Commands).some(command => command === this.command);
  }

  public is(command: string): boolean {
    return this.command === command;
  }

  private parse(text: string): any {
    return text.split(' ');
  }
}
