import { Collection as Teams } from './team';
import { Collection as Reports } from './report';
import { Collection as Messages } from './message';

export class Db {
  constructor(private store: FirebaseFirestore.Firestore) {}

  public get messages() {
    return new Messages(this.store);
  }

  public get reports() {
    return new Reports(this.store);
  }

  // public get users() {
  //   return undefined;
  // }

  public get teams() {
    return new Teams(this.store);
  }
}
