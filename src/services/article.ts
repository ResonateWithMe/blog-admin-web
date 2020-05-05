import request from 'umi-request';
import { TableListParams } from '@/pages/article/list/data';

interface PaginationParams {
  pageSize?: number;
  currentPage?: number;
}

interface Article {
  articleCategoryId: number;
  articleCategoryName: string;
  articleContent: string;
  articleCoverImage: string;
  articleId: number;
  articleStatus: number;
  articleSubUrl: string;
  articleTags: string;
  articleTitle: string;
  articleViews: number;
  createTime: string;
  enableComment: boolean;
  isDeleted: number;
  key: number;
  updateTime: Date;
}

export async function queryArticleList(params?: TableListParams) {
  return request('/api/article/list', {
    params,
  });
}

export async function queryArticle(articleId: number) {
  return request(`/api/article/detail/${articleId}`);
}

export async function getAllCategories(params?: PaginationParams) {
  return request('/api/categories/list', {
    params,
  });
}

export async function updateArticle(params: Article) {
  return request('/api/article/update', {
    method: 'POST',
    data: params,
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
