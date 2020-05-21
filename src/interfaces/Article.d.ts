/**
 * @description Article
 * @author ShiLin
 * @date 2020/5/6 9:47 下午
 */
import { Tag } from '@/interfaces/Tag';

export interface Article {
  articleCategoryId: number | string;
  articleCategoryName?: string;
  articleContent: string;
  articleCoverImage: string;
  articleId: number | string;
  articleStatus: number;
  articleSubUrl?: string;
  articleTags: Tag[];
  articleTitle: string;
  articleViews?: number;
  createTime?: string;
  enableComment: number;
  isDeleted?: number;
  key?: number;
  updateTime?: Date;
}
