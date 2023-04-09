import { ApiPathType, CompanyDto } from "../types";

export type GetCompanyAllResponse = {
  companyList: CompanyDto[];
};

export const getCompanyAllPath: ApiPathType = "/api/v1/company/all";
