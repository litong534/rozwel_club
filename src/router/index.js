import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/home/home';
import LoginORregister from '@/components/loginorregister/loginorregister';
import LoginPanel from '@/components/base/logregpwdpanel/loginpanel/loginpanel';
import RegisterPanel from '@/components/base/logregpwdpanel/registerpanel/registerpanel';
import SendEmailPanel from '@/components/base/logregpwdpanel/sendemailpanel/sendemailpanel';
import SendVCodePanel from '@/components/base/logregpwdpanel/sendvcodepanel/sendvcodepanel';
import NewPwdPanel from '@/components/base/logregpwdpanel/newpwdpanel/newpwdpanel';
import Recommends from '@/components/base/recommends/recommends';
import Article from '@/components/article/article';
import User from '@/components/user/user';
import Profile from '@/components/profile/profile';
import ChangeImg from '@/components/changeuserimg/changeuserimg';
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/homepage',
      children: [
        {
          path: 'homepage',
          component: Recommends
        },
        {
          path: 'article/:id',
          name: 'Article',
          component: Article
        },
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: { requiresAuth: true },
      redirect: '/user/profile',
      children: [
        { path: 'profile', name: 'profilepanel', component: Profile, meta: { requiresAuth: true } },
        { path: 'changeimg', name: 'changeimg', component: ChangeImg, meta: { requiresAuth: true } }
      ]
    },
    {
      path: '/loginORregister',
      component: LoginORregister,
      name: 'LoginORregister',
      redirect: '/loginORregister/login',
      children: [
        { path: 'login', name: 'loginpanel', component: LoginPanel },
        { path: 'register', name: 'registerpanel', component: RegisterPanel },
        { path: 'sendemail', name: 'sendemailpanel', component: SendEmailPanel },
        { path: 'sendvcode', name: 'sendvcodepanel', component: SendVCodePanel },
        { path: 'newpwd', name: 'newpwdpanel', component: NewPwdPanel },
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
