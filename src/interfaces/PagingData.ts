/**
 * @description PagingData
 * @author ShiLin
 * @date 2020/5/26 12:45
 */

export interface PagingData<T> {
  pageSize: number;
  currentPage: number;
  totalCount: number;
  totalPage: number;
  data: T;
}
