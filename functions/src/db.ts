import { Collection as Teams } from './team';
import { Collection as Reports } from './report';
import { Collection as Messages } from './message';

export class Db {
  constructor(private store: FirebaseFirestore.Firestore) {}

  public get messages(): Messages {
    return new Messages(this.store);
  }

  public get reports(): Reports {
    return new Reports(this.store);
  }

  public get teams(): Teams {
    return new Teams(this.store);
  }
}
