// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
              routes: [
                {
                  path: '/admin/sub-page',
                  name: 'sub-page',
                  icon: 'smile',
                  component: './Welcome',
                  authority: ['admin'],
                },
              ],
            },
            {
              path: '/article',
              name: 'article',
              icon: 'smile',
              hideChildrenInMenu: true,
              component: '../layouts/BlankLayout',
              routes: [
                {
                  path: '/article',
                  redirect: '/article/list/listsearcharticles',
                },
                {
                  name: 'list',
                  icon: 'smile',
                  path: '/article/list/listsearcharticles',
                  component: './article/list/ListSearchArticles',
                },
                {
                  name: 'list',
                  hideInMenu: true,
                  path: '/article/list',
                  component: './article/list',
                },
                {
                  name: 'edit',
                  path: '/article/edit',
                  hideInMenu: true,
                  component: './article/edit',
                },
                {
                  name: 'create',
                  path: '/article/create',
                  hideInMenu: true,
                  component: './article/create',
                },
                {
                  component: './404',
                },
              ],
            },
            {
              path: '/category',
              name: 'category',
              icon: 'smile',
              component: './category',
            },
            {
              path: '/tag',
              name: 'tag',
              icon: 'smile',
              component: './tag',
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
