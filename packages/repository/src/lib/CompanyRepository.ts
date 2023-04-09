import { MongoDBConnection } from "./MongoDBConnection";
import { Collection } from "mongodb";
import { Company } from "@./common";

export class CompanyRepository {
  public db: Collection<Company>;

  constructor(private connection: MongoDBConnection) {
    this.db = this.connection.getDatabase()!.collection("company");
  }


}
