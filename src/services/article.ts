import request from 'umi-request';
import { TableListParams } from '@/pages/article/list/data';
import { Result } from '@/interface/result';
import { Article } from '@/interface/article';
import { ArticleRelevant } from '@/interface/article_relevant';
import { PaginationParams } from '@/interface/pagination_params';

export async function queryArticleList(params?: TableListParams) {
  return request('/api/article/list', {
    params,
  });
}

export async function queryArticle(articleId: number): Promise<Result<ArticleRelevant>> {
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
