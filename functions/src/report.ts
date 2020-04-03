import { ReportID } from './ids';

export interface Report {
  bot_id: string;
  icons: { image_48: string };
  subtype: 'bot_message';
  text: string;
  ts: string;
  type: 'message';
  username: string;
}

export class Collection {
  constructor(private store: FirebaseFirestore.Firestore) {}

  public async get(id: ReportID): Promise<Report> {
    const snapshot = await this.store.doc(`reports/${id}`).get();
    return snapshot.data() as Report;
  }
}
