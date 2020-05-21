/**
 * @description Response Result
 * @author ShiLin
 * @date 2020/5/6 9:23 下午
 */

export interface Result<T> {
  code: number;
  message: string;
  data: T;
}
