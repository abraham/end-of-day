import { formatReportId } from './ids';

test('formatReportId', () => {
  expect(formatReportId('team-awesome', '20180101')).toEqual(
    'team-awesome_20180101'
  );
});
