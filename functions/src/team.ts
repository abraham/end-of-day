type TeamID = import('./ids').TeamID;

export interface Team {
  channel_id: string;
  token: string;
  id: string;
}

export class Collection {
  constructor(private store: FirebaseFirestore.Firestore) {}

  public async get(id: TeamID): Promise<Team> {
    const snapshot = await this.store.doc(`teams/${id}`).get();
    return snapshot.data() as Team;
  }
}
