import Home from 'pages/Home'
import About from 'pages/About'
import Login from 'pages/Login'
import Register from 'pages/Register'
import withLayout from 'components/hocs/withLayout'

const routes = {
  home: {
    path: '/',
    component: withLayout(Home),
    exact: true
  },
  about: {
    path: '/about',
    component: About,
    exact: true
  },
  login: {
    path: '/login',
    component: Login,
    exact: true
  },
  register: {
    path: '/register',
    component: withLayout(Register),
    exact: true
  }
}

export default routes
