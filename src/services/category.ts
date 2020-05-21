/**
 * @description category
 * @author ShiLin
 * @date 2020/5/16 5:40 下午
 */
import { Result } from '@/interfaces/Result';
import request from 'umi-request';
import { Category } from '@/interfaces/Category';

export async function findCategoryList(): Promise<Result<Category[]>> {
  return request('/api/category/list', {
    method: 'GET',
  });
}
