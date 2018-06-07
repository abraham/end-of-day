import { capitalizeFirstLetter, eodLine, eodMessage, eodText, eodWeekMessage, hasPunctuation, twoDigit } from './string';

import { Message } from './message';

const sampleMessages: Message[] = [
  {
    channel_id: 'blahblah',
    channel_name: 'Blah Blah',
    command: 'message',
    created_at: new Date(),
    date_id: '20180101',
    response_url: 'https://example.com',
    team_domain: 'exapmle.slack.com',
    team_id: '23s3s3fsf3r',
    text: 'Did an awesome thing.',
    token: 'fasefse8fasef;lsufhaslefsefsaeflasejfhais7efh393hff',
    trigger_id: 'fasefasefsfsefafsef',
    user_id: 'fasefasefasef',
    user_name: 'Sam'
  },
  {
    channel_id: 'blahblah',
    channel_name: 'Blah Blah',
    command: 'message',
    created_at: new Date(),
    date_id: '20180101',
    response_url: 'https://example.com',
    team_domain: 'exapmle.slack.com',
    team_id: '23s3s3fsf3r',
    text: 'Thing that is pretty sweet',
    token: 'fasefse8fasef;lsufhaslefsefsaeflasejfhais7efh393hff',
    trigger_id: 'fasefasefsfsefafsef',
    user_id: 'fasefasefasef',
    user_name: 'Jess'
  }
];

test('twoDigit', () => {
  expect(twoDigit(1)).toEqual('01');
  expect(twoDigit(11)).toEqual('11');
  expect(twoDigit(111)).toEqual('11');
});

test('hasPunctuation', () => {
  expect(hasPunctuation('This is a partial thought')).toBeFalsy();
  expect(hasPunctuation('This is a thought.')).toBeTruthy();
  expect(hasPunctuation('This is a question?')).toBeTruthy();
  expect(hasPunctuation('This is important!')).toBeTruthy();
});

test('eodLine', () => {
  expect(eodLine(sampleMessages[0])).toEqual('- Sam: Did an awesome thing.');
});

test('eodText', () => {
  expect(eodText('Did an awesome thing.')).toEqual('Did an awesome thing.');
  expect(eodText('  Did an awesome thing  ')).toEqual('Did an awesome thing.');
});

test('eodMessage', () => {
  expect(eodMessage('20180101', sampleMessages)).toEqual(`
EODs for Jan, 1st:
- Sam: Did an awesome thing.
- Jess: Thing that is pretty sweet.`);
});

test('eodWeekMessage', () => {
  expect(eodWeekMessage({ startDateId: '20180101', endDateId: '20180107' }, sampleMessages)).toEqual(`
Your EODs from Jan, 1st to Jan, 7th:
- Sam: Did an awesome thing.
- Jess: Thing that is pretty sweet.`);
});

test('capitalizeFirstLetter', () => {
  expect(capitalizeFirstLetter('one')).toEqual('One');
  expect(capitalizeFirstLetter('TWO')).toEqual('TWO');
});
