import { MongoDBConnection } from './MongoDBConnection';
import { Collection } from 'mongodb';
import { User } from '@./common';

export class UserRepository {
    public db: Collection<User>;

    constructor(private connection: MongoDBConnection) {
        this.db = connection.getDatabase()!.collection('user');
    }
}