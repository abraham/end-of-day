import { DateID, TeamID } from './ids';
import { WeekRange } from './time';

export interface Message {
  channel_id: string;
  channel_name: string;
  command: string;
  created_at: Date;
  date_id: DateID;
  response_url: string;
  team_domain: string;
  team_id: string;
  text: string;
  token: string;
  trigger_id: string;
  user_id: string;
  user_name: string;
}

export class Collection {
  constructor(private store: FirebaseFirestore.Firestore) {}

  public async get(id: string): Promise<Message> {
    const snapshot = await this.store.doc(`messages/${id}`).get();
    return snapshot.data() as Message;
  }

  public async listByUserByWeek(
    teamId: TeamID,
    userId: string,
    weekRange: WeekRange
  ): Promise<Message[]> {
    const query = await this.collection
      .where('team_id', '==', teamId)
      .where('user_id', '==', userId)
      .where('date_id', '>=', weekRange.startDateId)
      .where('date_id', '<=', weekRange.endDateId)
      .get();
    return this.sort(this.data(query));
  }

  public async listByTeamByDay(
    teamId: TeamID,
    dateId: DateID
  ): Promise<Message[]> {
    const query = await this.collection
      .where('team_id', '==', teamId)
      .where('date_id', '==', dateId)
      .get();
    return this.sort(this.data(query));
  }

  private get collection(): FirebaseFirestore.CollectionReference {
    return this.store.collection('messages');
  }

  private data(query: FirebaseFirestore.QuerySnapshot): Message[] {
    return query.docs.map((ref) => ref.data() as Message);
  }
  private sort(messages: Message[]): Message[] {
    return messages.sort(
      (a, b) => a.created_at.getTime() - b.created_at.getTime()
    );
  }
}
