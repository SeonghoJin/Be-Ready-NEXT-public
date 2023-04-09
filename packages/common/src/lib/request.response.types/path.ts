import {
  getCompanyAllPath,
  getCompanyArticlePath,
  getTagAllPath,
} from '@./common';

const apiPath = {
  getCompanyAllPath,
  getTagAllPath,
  getCompanyArticlePath,
} as const;

export type API_URL = (typeof apiPath)[keyof typeof apiPath];
