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
              name: 'article.create',
              icon: 'smile',
              path: '/article/create',
              component: './article/create',
            },
            {
              name: 'article',
              path: '/article',
              icon: 'smile',
              hideChildrenInMenu: true,
              component: '../layouts/BlankLayout',
              routes: [
                {
                  path: '/article',
                  redirect: '/article/list',
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
                  component: './404',
                },
              ],
            },
            {
              name: 'category',
              path: '/category',
              icon: 'smile',
              component: './category',
            },
            {
              name: 'tag',
              path: '/tag',
              icon: 'smile',
              component: './tag',
            },
            {
              name: 'comment',
              path: '/comment',
              icon: 'smile',
              component: './comment',
            },
            {
              name: 'links',
              path: '/links',
              icon: 'smile',
              component: './links',
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
