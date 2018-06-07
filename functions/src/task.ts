import { Message } from './message';

export interface Task {
  data: Message;
  command: string;
  completed: boolean;
}

export interface TeamTask extends Task {
  team_id: string;
  date_id: string;
}

export interface ListTask extends Task {
  command: 'list';
}

export interface RefreshTask extends TeamTask {
  command: 'refresh';
}

export interface UpdateTask extends TeamTask {
  command: 'update';
}
