/**
 * @description tag
 * @author ShiLin
 * @date 2020/5/16 5:40 下午
 */
import { Result } from '@/interfaces/Result';
import request from '@/utils/request';
import { PaginationParams } from '@/interfaces/PaginationParams';

export async function findTagList(params: PaginationParams): Promise<Result<any>> {
  return request('/api/tag/list', {
    method: 'GET',
    params,
  });
}

export async function findAllTag(): Promise<Result<any>> {
  return request('/api/tag/all', {
    method: 'GET',
  });
}

export async function add(params: any): Promise<any> {
  return request('/api/tag/add', {
    method: 'PUT',
    data: params,
  });
}

export async function update(params: any): Promise<any> {
  return request('/api/tag/update', {
    method: 'POST',
    data: params,
  });
}

export async function del(params: number[]): Promise<any> {
  return request('/api/tag/delete', {
    method: 'DELETE',
    data: params,
  });
}
