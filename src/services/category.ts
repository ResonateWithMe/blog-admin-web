/**
 * @description category
 * @author ShiLin
 * @date 2020/5/16 5:40 下午
 */
import { Result } from '@/interfaces/Result';
import request from 'umi-request';
import { Category } from '@/interfaces/Category';
import { PaginationParams } from '@/interfaces/PaginationParams';

export async function findCategoryList(params: PaginationParams) {
  return request('/api/category/list', {
    method: 'GET',
    params,
  });
}

export async function findCategoryAll(): Promise<Result<Category[]>> {
  return request('/api/category/all', {
    method: 'GET',
  });
}

export async function add(params: any): Promise<Result<Category[]>> {
  return request('/api/category/add', {
    method: 'PUT',
    data: params,
  });
}

export async function update(params: any): Promise<Result<Category[]>> {
  return request('/api/category/update', {
    method: 'POST',
    data: params,
  });
}

export async function del(params: any): Promise<Result<Category[]>> {
  return request('/api/category/delete', {
    method: 'DELETE',
    params,
  });
}
