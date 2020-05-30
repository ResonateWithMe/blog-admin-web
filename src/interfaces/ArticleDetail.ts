/**
 * @description ArticleDetail
 * @author ShiLin
 * @date 2020/5/30 2:16 下午
 */
import { Tag } from '@/interfaces/Tag';

export interface ArticleDetail {
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
