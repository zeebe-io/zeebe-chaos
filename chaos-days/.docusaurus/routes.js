
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/',
    component: ComponentCreator('/','fa6'),
    exact: true
  },
  {
    path: '/2021/09/23/Old-Clients',
    component: ComponentCreator('/2021/09/23/Old-Clients','698'),
    exact: true
  },
  {
    path: '/archive',
    component: ComponentCreator('/archive','72e'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page','be1'),
    exact: true
  },
  {
    path: '/tags',
    component: ComponentCreator('/tags','c13'),
    exact: true
  },
  {
    path: '/tags/availability',
    component: ComponentCreator('/tags/availability','ff2'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
