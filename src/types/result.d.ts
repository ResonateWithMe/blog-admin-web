/**
 * @description Response
 * @author ShiLin
 * @date 2020/5/6 9:23 下午
 */

export interface Result<T> {
  resultCode: number;
  message: string;
  data: T;
}
