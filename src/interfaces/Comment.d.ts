/**
 * @description Comment.d
 * @author ShiLin
 * @date 2020/5/22 10:02
 */
export interface Comment {
  articleId: number;
  commentId: number;
  commentator: string;
  email: string;
  websiteUrl: string;
  commentBody: string;
  commentCreateTime: string;
  commentatorIp: string;
  replyBody: string;
  replyCreateTime: string;
  commentStatus: number;
}
