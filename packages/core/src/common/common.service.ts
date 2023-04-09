import { GetCompanyAllResponse } from "@./common";
import { CompanyRepository, TagRepository, TimeDatabase } from "@./repository";

export class CommonService {
  constructor(private timeRepository: TimeDatabase,
    private companyRepository: CompanyRepository,
    private tagRepository: TagRepository
  ) {
  }

  getTime = (name: string) => {
    return this.timeRepository.db.findOne({
      name: name as unknown
    });
  };

  getCompanyAll = async (): Promise<GetCompanyAllResponse["companyList"]> => {
    const companyList = await this.companyRepository.db.find({ active: true }).toArray();
    const average = await this.companyRepository.db.aggregate([{
      $match: {
        active: true
      }
    }, {
      $group: {
        _id: "avg",
        avg: {
          $avg: "$count"
        }
      }
    }, {
      $unwind: "$avg"
    }]).toArray();
    const averageCount = average[0].avg;

    return companyList.map((company) => ({ ...company, averageCount: averageCount }))
  };

  getTagAll = () => {
    return this.tagRepository.db.find().toArray();
  };

}
