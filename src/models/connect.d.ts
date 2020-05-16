import { MenuDataItem } from '@ant-design/pro-layout';
import { ArticleStateType } from '@/models/article';
import { CategoryStateType } from '@/models/category';
import { TagStateType } from '@/models/tag';
import { GlobalModelState } from './global';
import { DefaultSettings as SettingModelState } from '../../config/defaultSettings';
import { UserModelState } from './user';
import { LoginModelState } from './login';

export { GlobalModelState, SettingModelState, UserModelState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
  settings: SettingModelState;
  user: UserModelState;
  login: LoginModelState;
  article: ArticleStateType;
  tag: TagStateType;
  category: CategoryStateType;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}
