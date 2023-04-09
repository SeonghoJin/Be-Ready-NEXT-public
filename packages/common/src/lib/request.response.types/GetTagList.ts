import { Tag } from '../types';

export type GetTagListResponse = {
  tagList: Tag[];
};

export const getTagAllPath = '/api/v1/tag/all';
