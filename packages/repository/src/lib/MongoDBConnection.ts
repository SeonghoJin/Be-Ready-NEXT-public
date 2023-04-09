import { MongoClient } from 'mongodb';

export class MongoDBConnection {
  private client: null | MongoClient = null;

  constructor(private uri: string) { }

  connect = async () => {
    try {
      this.client = new MongoClient(this.uri);
      console.log('CONNECT DB CLIENT');
      await this.client.connect();
      console.log('CONNECT DB CLIENT SUCCESS');
    } catch (e) {
      console.error(`[CONNECT DB ERROR] CONNECT_URI=${this.uri}`);
      console.error(e)
    }
    return this;
  };

  getDatabase(databaseName = 'be_ready') {
    return this.client?.db(databaseName);
  }
}
