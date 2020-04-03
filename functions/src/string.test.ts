import {
  capitalizeFirstLetter,
  eodLine,
  eodMessage,
  eodText,
  eodWeekMessage,
  hasPunctuation,
  twoDigit,
} from './string';

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
    user_name: 'Sam',
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
    user_name: 'Jess',
  },
];

describe('string', () => {
  it('twoDigit', () => {
    expect(twoDigit(1)).toStrictEqual('01');
    expect(twoDigit(11)).toStrictEqual('11');
    expect(twoDigit(111)).toStrictEqual('11');
  });

  it('hasPunctuation', () => {
    expect(hasPunctuation('This is a partial thought')).toStrictEqual(false);
    expect(hasPunctuation('This is a thought.')).toStrictEqual(true);
    expect(hasPunctuation('This is a question?')).toStrictEqual(true);
    expect(hasPunctuation('This is important!')).toStrictEqual(true);
  });

  it('eodLine', () => {
    expect(eodLine(sampleMessages[0])).toStrictEqual(
      '- Sam: Did an awesome thing.'
    );
  });

  it('eodText', () => {
    expect(eodText('Did an awesome thing.')).toStrictEqual(
      'Did an awesome thing.'
    );
    expect(eodText('  Did an awesome thing  ')).toStrictEqual(
      'Did an awesome thing.'
    );
  });

  it('eodMessage', () => {
    expect(eodMessage('20180101', sampleMessages)).toStrictEqual(`
EODs for Jan, 1st:
- Sam: Did an awesome thing.
- Jess: Thing that is pretty sweet.`);
  });

  it('eodWeekMessage', () => {
    expect(
      eodWeekMessage(
        { startDateId: '20180101', endDateId: '20180107' },
        sampleMessages
      )
    ).toStrictEqual(`
Your EODs from Jan, 1st to Jan, 7th:
- Sam: Did an awesome thing.
- Jess: Thing that is pretty sweet.`);
  });

  it('capitalizeFirstLetter', () => {
    expect(capitalizeFirstLetter('one')).toStrictEqual('One');
    expect(capitalizeFirstLetter('TWO')).toStrictEqual('TWO');
  });
});
