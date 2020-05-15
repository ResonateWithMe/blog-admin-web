import { Avatar, Typography } from 'antd';
import React from 'react';
import moment from 'moment';
import { Article } from '@/interfaces/article';
import styles from './index.less';

const { Paragraph } = Typography;

interface ArticleListContentProps {
  data: Article;
}

const ArticleListContent: React.FC<ArticleListContentProps> = ({
  data: { articleContent, createTime, articleCoverImage, articleStatus, articleSubUrl },
}) => (
  <div className={styles.listContent}>
    <div className={styles.description}>
      <Paragraph ellipsis={{ rows: 3, expandable: true }}>{articleContent}</Paragraph>
    </div>
    <div className={styles.extra}>
      <Avatar src={articleCoverImage} size="small" />
      <a href={articleSubUrl}>{articleStatus}</a> 发布在 <a href={articleSubUrl}>{articleSubUrl}</a>
      <em>{moment(createTime).format('YYYY-MM-DD HH:mm')}</em>
    </div>
  </div>
);

export default ArticleListContent;
