import { MongoDBConnection } from './MongoDBConnection';
import { Collection } from 'mongodb';
import { TimeCollection } from '@./common';

export class TimeDatabase {
  public db: Collection<TimeCollection>;

  constructor(private connection: MongoDBConnection) {
    this.db = connection.getDatabase()!.collection('time');
  }


}
