import { Article } from '@/interfaces/article';
import { Category } from '@/interfaces/category';

/**
 * @description ArticleDetail
 * @author ShiLin
 * @date 2020/5/6 10:01 下午
 */
export interface ArticleDetail {
  article: Article;
  allCategories: Category[];
}
