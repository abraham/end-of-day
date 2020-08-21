import * as firebase from '@firebase/testing';
import * as admin from 'firebase-admin';
import * as api from '.';
import { formatMessageId } from './ids';
import { MessageFactory } from './__tests__/message';
import { Timestamp } from '@google-cloud/firestore';

type Request = import('firebase-functions').https.Request;
type Response = import('firebase-functions').Response;

const store = admin.firestore();

describe('index', () => {
  beforeAll(async () => {
    if (!process.env.GCLOUD_PROJECT) {
      throw new Error('env variable `GCLOUD_PROJECT` must be set');
    }
    if (!process.env.FIRESTORE_EMULATOR_HOST) {
      throw new Error('env variable `FIRESTORE_EMULATOR_HOST` must be set');
    }
    await firebase.clearFirestoreData({
      projectId: process.env.GCLOUD_PROJECT,
    });
  });

  describe('log', () => {
    it('saves a message', async () => {
      expect.assertions(4);
      const body = MessageFactory.build();
      const docId = formatMessageId(body);
      const ref = store.collection('messages').doc(docId);
      const request = { body } as Request;
      const response = {
        send: (text: string): void => {
          expect(text).toStrictEqual('Logging your EOD...');
        },
      } as Response;

      expect((await ref.get()).exists).toStrictEqual(false);
      await api.log(request, response);
      const doc = await ref.get();
      expect(doc.exists).toStrictEqual(true);
      expect(doc.data()).toStrictEqual({
        ...body,
        created_at: expect.any(Timestamp),
      });
    });
  });
});
