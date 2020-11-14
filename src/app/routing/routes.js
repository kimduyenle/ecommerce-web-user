import React from 'react';
import About from 'pages/About'
import withLayout from 'components/hocs/withLayout'

const routes = {
  home: {
    path: '/',
    component: withLayout(React.lazy(() => import('pages/Home'))),
    exact: true
  },
  about: {
    path: '/about',
    component: About,
    exact: true
  },
  login: {
    path: '/login',
    component: withLayout(React.lazy(() => import('pages/Login'))),
    exact: true
  },
  register: {
    path: '/register',
    component: withLayout(React.lazy(() => import('pages/Register'))),
    exact: true
  },
  'product-detail': {
    path: '/product-detail',
    component: withLayout(React.lazy(() => import('pages/ProductDetail'))),
    exact: true
  },
  cart: {
    path: '/cart',
    component: withLayout(React.lazy(() => import('pages/Cart'))),
    exact: true
  },
  checkout: {
    path: '/checkout',
    component: withLayout(React.lazy(() => import('pages/Checkout'))),
    exact: true
  },
  shop: {
    path: '/shop',
    component: withLayout(React.lazy(() => import('pages/Shop'))),
    exact: true
  }
}

export default routes
