import { humanDate, nth } from './time';

describe('time', () => {
  it('humanDate', () => {
    expect(humanDate('20180101')).toStrictEqual('Jan, 1st');
    expect(humanDate('20180504')).toStrictEqual('May, 4th');
  });

  it('nth', () => {
    expect(nth(1)).toStrictEqual('st');
    expect(nth(2)).toStrictEqual('nd');
    expect(nth(3)).toStrictEqual('rd');
    expect(nth(4)).toStrictEqual('th');
  });
});
