/**
 * @description index
 * @author ShiLin
 * @date 2020/5/14 17:42
 */
import React, { useEffect } from 'react';
import { connect } from '@@/plugin-dva/exports';
import { Article } from '@/interfaces/Article';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, message } from 'antd';
import { ConnectState } from '@/models/connect';
import { Store } from 'antd/es/form/interface';
import { Dispatch } from 'umi';
import ArticleEditForm from '../components/ArticleForm';

interface CreateProps {
  articleDetail?: Article | undefined;
  dispatch: Dispatch;
  creating?: boolean;
}

const CreatePage: React.FC<CreateProps> = (props) => {
  const { dispatch, creating } = props;

  const onFinish = (values: Store) => {
    try {
      dispatch({
        type: 'article/createArticle',
        payload: {
          ...values,
        },
      });
    } catch (e) {
      message.error('新建失败');
    }
  };

  useEffect(() => {}, []);

  return (
    <PageHeaderWrapper>
      <Card>
        <ArticleEditForm submitting={creating} onFinish={onFinish} submitTitle="新建文章" />
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ loading }: ConnectState) => ({
  creating: loading.effects['article/createArticle'],
}))(CreatePage);
