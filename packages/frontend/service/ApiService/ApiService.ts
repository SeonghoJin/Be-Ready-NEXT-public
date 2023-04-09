import { GetCompanyAllResponse, GetTagListResponse, TimeCollection } from '@./common';

export type ApiService = {
  getCompanyAll: () => Promise<GetCompanyAllResponse>;
  getTagAll: () => Promise<GetTagListResponse>;
  getTime: (name: TimeCollection['name']) => Promise<TimeCollection>
};
