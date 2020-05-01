import { formatReportId, formatMessageId } from './ids';

describe('ids', () => {
  it('formatReportId', () => {
    expect(formatReportId('team-awesome', '20180101')).toStrictEqual(
      'team-awesome_20180101'
    );
  });

  it('formatMessageId', () => {
    expect(
      formatMessageId({
        team_id: 'team-awesome',
        date_id: '20180101',
        user_id: 'awsome-user',
      })
    ).toStrictEqual('team-awesome_awsome-user_20180101');
  });
});
