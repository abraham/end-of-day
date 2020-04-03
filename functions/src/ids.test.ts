import { formatReportId } from './ids';

describe('ids', () => {
  it('formatReportId', () => {
    expect(formatReportId('team-awesome', '20180101')).toStrictEqual(
      'team-awesome_20180101'
    );
  });
});
