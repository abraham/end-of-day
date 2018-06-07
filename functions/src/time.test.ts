import { nth, humanDate } from './time';

test('humanDate', () => {
  expect(humanDate('20180101')).toEqual('Jan, 1st');
  expect(humanDate('20180504')).toEqual('May, 4th');
});

test('nth', () => {
  expect(nth(1)).toEqual('st');
  expect(nth(2)).toEqual('nd');
  expect(nth(3)).toEqual('rd');
  expect(nth(4)).toEqual('th');
});
