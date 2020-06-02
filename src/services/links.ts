/**
 * @description links
 * @author ShiLin
 * @date 2020/5/22 10:35
 */
import request from '@/utils/request';
import { PaginationParams } from '@/interfaces/PaginationParams';

export async function findLinksList(params: PaginationParams) {
  return request('/api/links/list', {
    method: 'GET',
    params,
  });
}
