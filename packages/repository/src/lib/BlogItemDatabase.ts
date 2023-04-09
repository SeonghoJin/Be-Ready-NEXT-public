import { MongoDBConnection } from "./MongoDBConnection";
import { Collection } from "mongodb";
import { CompanyArticle } from "@./common";

export class BlogItemDatabase {
  public db: Collection<CompanyArticle>;

  constructor(private connection: MongoDBConnection) {
    this.db = connection.getDatabase()!.collection("blog_item");
  }
}
