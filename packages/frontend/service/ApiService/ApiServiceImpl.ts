import { ApiService } from "./ApiService";
import { GetCompanyAllResponse, GetTagListResponse, TimeCollection } from "@./common";
import { HTTPClient } from "@./fetcher";

export class ApiServiceImpl implements ApiService {

  constructor(private httpService: HTTPClient) {

  }

  getTime: (name: "batch") => Promise<TimeCollection> = async (name) => {
    const data = (await this.httpService.get<TimeCollection>(`/api/v1/common/${name}`)).data;
    return data;
  };


  async getCompanyAll(): Promise<GetCompanyAllResponse> {
    return (await this.httpService.get<GetCompanyAllResponse>("/api/v1/common/company/all")).data;
  }

  async getTagAll(): Promise<GetTagListResponse> {
    return (await this.httpService.get<GetTagListResponse>("/api/v1/common/tag/all")).data;
  }
}
