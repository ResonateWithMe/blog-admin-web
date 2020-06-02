/**
 * @description comment
 * @author ShiLin
 * @date 2020/5/22 9:59
 */
import request from '@/utils/request';
import { PaginationParams } from '@/interfaces/PaginationParams';

export async function findCommentList(params: PaginationParams) {
  return request('/api/comments/list', {
    method: 'GET',
    params,
  });
}
