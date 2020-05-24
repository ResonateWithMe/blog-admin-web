/**
 * @description tag
 * @author ShiLin
 * @date 2020/5/16 5:40 下午
 */
import { Result } from '@/interfaces/Result';
import request from 'umi-request';
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
