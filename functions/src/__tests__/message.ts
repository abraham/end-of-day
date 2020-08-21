import { Factory } from 'fishery';
import moment from 'moment';
import { Message } from '../message';

export const MessageFactory = Factory.define<Message>(() => {
  return {
    channel_id: 'blahblah',
    channel_name: 'Blah Blah',
    command: 'message',
    created_at: new Date(),
    date_id: moment().format('YYYYMMDD'),
    response_url: 'https://example.com',
    team_domain: 'example.slack.com',
    team_id: '0003s3fsf3r',
    text: 'Did an awesome thing.',
    token: 'fasefse8fasef;lsufhaslefsefsaeflasejfhais7efh393hff',
    trigger_id: 'fasefasefsfsefafsef',
    user_id: 'fasefasefasef',
    user_name: 'Sam',
  };
});
