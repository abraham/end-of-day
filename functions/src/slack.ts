import fetch from 'node-fetch';
import * as slack from 'slack';
import { Message } from './message';
import { Report } from './report';
import { eodMessage, eodWeekMessage } from './string';
import { Team } from './team';
import { WeekRange } from './time';

export interface WebhookPayload {
  token: string; // '5v1FuO8D354535Lkk7'
  team_id: string; // 'T04432H2G'
  team_domain: string; // 'example'
  channel_id: string; // 'C048USFJ'
  channel_name: string; // 'general'
  user_id: string; // 'U0FJIS98S'
  user_name: string; // 'abraham'
  command: string; // '/eod'
  text: string; // 'log Awesome thing I did.'
  response_url: string; // 'https://hooks.slack.com/commands/T04432H2G/3873543046/2hyh1huYfhk7shef8FKOsT432m'
  trigger_id: string; // '3389234234257.4094565084.83e5b64e5ff0987f9s8e7f19d4a0da56228'
}

interface PostParams {
  text: string;
}

interface UpdateParams extends PostParams {
  channel: string;
  ts: string;
}
function baseMessage(team: Team, data: PostParams): Chat.PostMessage.Params;
function baseMessage(team: Team, data: UpdateParams): Chat.Update.Params;
function baseMessage(
  team: Team,
  data: PostParams | UpdateParams
): Chat.PostMessage.Params | Chat.Update.Params {
  return {
    as_user: false,
    channel: team.channel_id,
    icon_url: 'https://end-of-day.firebaseapp.com/sunset.png', // TODO: Stop hardcoding this
    token: team.token,
    ...data,
  };
}

export function postSlackMessage(
  team: Team,
  dateId: string
): Promise<Chat.PostMessage.Response> {
  const message = baseMessage(team, { text: eodMessage(dateId, []) });
  return slack.chat.postMessage(message);
}

export async function createSlackResponse(
  data: Message,
  weekRange: WeekRange,
  messages: Message[]
): Promise<string> {
  const body = {
    response_type: 'ephemeral',
    text: eodWeekMessage(weekRange, messages),
  };
  const response = await fetch(data.response_url, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  const text = await response.text();
  return text;
}

export function updateSlackMessage(
  team: Team,
  dateId: string,
  messages: Message[],
  report: Report
): Promise<Chat.Update.Response> {
  const message = baseMessage(team, {
    channel: team.channel_id,
    text: eodMessage(dateId, messages),
    ts: report.ts,
  });
  return slack.chat.update(message);
}
