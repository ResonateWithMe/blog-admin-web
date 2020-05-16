/**
 * @description tag
 * @author ShiLin
 * @date 2020/5/16 5:40 下午
 */
import { Result } from '@/interfaces/result';
import request from 'umi-request';
import { PaginationParams } from '@/interfaces/pagination_params';

export async function findTagList(params: PaginationParams): Promise<Result<any>> {
  return request('/api/tag/list', {
    method: 'GET',
    params,
  });
}
