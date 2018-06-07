import * as slack from 'slack';

import { eodMessage, eodWeekMessage } from './string';

import { Message } from './message';
import { Report } from './report';
import { Team } from './team';
import { WeekRange } from './time';
import fetch from 'node-fetch';

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

function baseMessage(team: Team) {
  return {
    as_user: false,
    channel: team.channel_id,
    token: team.token,
    icon_url: 'https://end-of-day.firebaseapp.com/sunset.png'
  }
}

export function postSlackMessage(team: Team, dateId: string) {
  const message = {
    ...baseMessage(team),
    text: eodMessage(dateId, [])
  }
  return slack.chat.postMessage(message);
}

export async function createSlackResponse(data: Message, team: Team, weekRange: WeekRange, messages: Message[]) {
  const body = {
    response_type: 'ephemeral',
    text: eodWeekMessage(weekRange, messages),
  };
  const response = await fetch(data.response_url, { method: 'POST', body: JSON.stringify(body) });
  const text = await response.text();
  return text;
}

export function updateSlackMessage(team: Team, dateId: string, messages: Message[], report: Report) {
  const message = {
    ...baseMessage(team),
    text: eodMessage(dateId, messages),
    ts: report.ts,
    channel: team.channel_id
  };
  return slack.chat.update(message);
}
