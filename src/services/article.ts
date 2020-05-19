import request from 'umi-request';
import { Result } from '@/interfaces/result';
import { Article } from '@/interfaces/article';
import { PaginationParams } from '@/interfaces/pagination_params';

export async function queryArticleList(params?: PaginationParams) {
  return request('/api/article/list', {
    params,
  });
}

export async function queryArticleDetail(articleId: string): Promise<Result<Article>> {
  return request(`/api/article/detail/${articleId}`);
}

export async function updateArticle(params: Article): Promise<Result<null>> {
  return request('/api/article/update', {
    method: 'POST',
    data: params,
  });
}

export async function createArticle(params: Article): Promise<Result<null>> {
  return request('/api/article/create', {
    method: 'POST',
    data: params,
  });
}

export async function deleteArticle(params: number[]): Promise<null> {
  return request('/api/article/delete', {
    method: 'DELETE',
    data: params,
  });
}
