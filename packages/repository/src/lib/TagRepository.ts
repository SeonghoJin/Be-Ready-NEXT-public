import { MongoDBConnection } from "./MongoDBConnection";
import { Collection } from "mongodb";
import { Tag } from "@./common";

export class TagRepository {
  public db: Collection<Tag>;

  constructor(private connection: MongoDBConnection) {
    this.db = connection.getDatabase()!.collection("tag");
  }
}
