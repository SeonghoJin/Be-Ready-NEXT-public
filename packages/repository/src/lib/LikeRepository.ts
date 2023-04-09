import { MongoDBConnection } from './MongoDBConnection';
import { Collection } from 'mongodb';
import { Like } from '@./common';

export class LikeRepository {
    public db: Collection<Like>;

    constructor(private connection: MongoDBConnection) {
        this.db = connection.getDatabase()!.collection('like');
    }
}