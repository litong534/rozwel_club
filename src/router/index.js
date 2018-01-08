import Vue from 'vue';
import Router from 'vue-router';
const Home = (r) => {
  import('@/components/home/home').then(h => {
    r(h);
  });
};
const LoginORregister = (r) => {
  import('@/components/loginorregister/loginorregister').then(h => {
    r(h);
  });
};
const LoginPanel = (r) => {
  import('@/components/base/logregpwdpanel/loginpanel/loginpanel').then(h => {
    r(h);
  });
};
const RegisterPanel = (r) => {
  import('@/components/base/logregpwdpanel/registerpanel/registerpanel').then(h => {
    r(h);
  });
};
const SendEmailPanel = (r) => {
  import('@/components/base/logregpwdpanel/sendemailpanel/sendemailpanel').then(h => {
    r(h);
  });
};
const SendVCodePanel = (r) => {
  import('@/components/base/logregpwdpanel/sendvcodepanel/sendvcodepanel').then(h => {
    r(h);
  });
};
const NewPwdPanel = (r) => {
  import('@/components/base/logregpwdpanel/newpwdpanel/newpwdpanel').then(h => {
    r(h);
  });
};
const Recommends = (r) => {
  import('@/components/base/recommends/recommends').then(h => {
    r(h);
  });
};
const Article = (r) => {
  import('@/components/article/article').then(h => {
    r(h);
  });
};
const User = (r) => {
  import('@/components/user/user').then(h => {
    r(h);
  });
};
const Profile = (r) => {
  import('@/components/profile/profile').then(h => {
    r(h);
  });
};
const ChangeImg = (r) => {
  import('@/components/changeuserimg/changeuserimg').then(h => {
    r(h);
  });
};
// import Home from '@/components/home/home';
// import LoginORregister from '@/components/loginorregister/loginorregister';
// import LoginPanel from '@/components/base/logregpwdpanel/loginpanel/loginpanel';
// import RegisterPanel from '@/components/base/logregpwdpanel/registerpanel/registerpanel';
// import SendEmailPanel from '@/components/base/logregpwdpanel/sendemailpanel/sendemailpanel';
// import SendVCodePanel from '@/components/base/logregpwdpanel/sendvcodepanel/sendvcodepanel';
// import NewPwdPanel from '@/components/base/logregpwdpanel/newpwdpanel/newpwdpanel';
// import Recommends from '@/components/base/recommends/recommends';
// import Article from '@/components/article/article';
// import User from '@/components/user/user';
// import Profile from '@/components/profile/profile';
// import ChangeImg from '@/components/changeuserimg/changeuserimg';
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
