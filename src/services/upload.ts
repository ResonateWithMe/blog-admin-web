/**
 * @description upload
 * @author ShiLin
 * @date 2020/5/8 12:44 上午
 */
import request from '@/utils/request';

export async function upload(formData: FormData) {
  return request('/api//upload/file', {
    method: 'post',
    data: formData,
  });
}
