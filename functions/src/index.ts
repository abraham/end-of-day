import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Command } from './command';
import { Db } from './db';
import { DateID, formatReportId } from './ids';
import { Message } from './message';
import {
  createSlackResponse,
  postSlackMessage,
  updateSlackMessage,
  WebhookPayload,
} from './slack';
import { ListTask, RefreshTask, Task, TeamTask } from './task';
import { Team } from './team';
import { currentDateId, weekRange } from './time';
import { Report } from './report';

admin.initializeApp();
const store = admin.firestore();
const db = new Db(store);

function listTaskData(message: Message): Task {
  return {
    data: message,
    command: 'list',
    completed: false,
  };
}

function refreshTaskData(message: Message): TeamTask {
  const command = new Command(message.text);
  return {
    command: 'refresh',
    completed: false,
    data: message,
    date_id: command.parts[0] || message.date_id,
    team_id: message.team_id,
  };
}

async function handleMessage(data: WebhookPayload): Promise<string> {
  const message: Message = {
    ...data,
    date_id: currentDateId(5),
    created_at: new Date(),
  };
  const command = new Command(message.text);
  if (command.is('refresh')) {
    await store.collection('tasks').add(refreshTaskData(message));
    return 'Refreshing EOD text...';
  } else if (command.is('list')) {
    await store.collection('tasks').add(listTaskData(message));
    return 'Finding your EODs...';
  } else {
    await store
      .collection('messages')
      .doc(`${message.team_id}_${message.user_id}_${message.date_id}`)
      .set(message);
    return 'Logging your EOD...';
  }
}

async function createReport(team: Team, dateId: string): Promise<Report> {
  const reportId = formatReportId(team.id, dateId);
  const response = await postSlackMessage(team, dateId);
  await store
    .collection('reports')
    .doc(`${team.id}_${dateId}`)
    .set(response.message);
  return db.reports.get(reportId);
}

async function updateReport(
  teamId: string,
  dateId: DateID
): Promise<Chat.Update.Response> {
  const work = await Promise.all([
    db.teams.get(teamId),
    db.reports.get(formatReportId(teamId, dateId)),
    db.messages.listByTeamByDay(teamId, dateId),
  ]);
  const [team, , messages] = work;
  let [, report] = work;

  if (!report) {
    report = await createReport(team, dateId);
  }
  return updateSlackMessage(team, dateId, messages, report);
}

async function createWeekReport(message: Message): Promise<string> {
  const [team, messages] = await Promise.all([
    db.teams.get(message.team_id),
    db.messages.listByUserByWeek(message.team_id, message.user_id, weekRange()),
  ]);
  return createSlackResponse(message, team, weekRange(), messages);
}

exports.log = functions.https.onRequest(
  async ({ body }: { body: WebhookPayload }, response) => {
    const text = await handleMessage(body);
    response.send(text);
  }
);

exports.onMessageUpdate = functions.firestore
  .document('messages/{messageId}')
  .onWrite(async ({ after }, _context) => {
    const message: Message = after.data() as Message;
    await updateReport(message.team_id, message.date_id);
  });

exports.onTaskCreate = functions.firestore
  .document('tasks/{taskId}')
  .onCreate(async (snap, _context) => {
    const task = snap.data() as RefreshTask | ListTask;
    if (task.command === 'refresh') {
      await updateReport(task.team_id, task.date_id);
      return snap.ref.set({ completed: true }, { merge: true });
    } else if (task.command === 'list') {
      await createWeekReport(task.data);
      return snap.ref.set({ completed: true }, { merge: true });
    } else {
      return Promise.resolve();
    }
  });
