import { Article } from '@/types/article';
import { Category } from '@/types/category';

/**
 * @description articleRelevant
 * @author ShiLin
 * @date 2020/5/6 10:01 下午
 */
export interface ArticleRelevant {
  article: Article;
  categories: Category[];
}
