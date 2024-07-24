import { createRouter, createWebHashHistory } from 'vue-router';
import login from "@/manage/login.vue";
import front from "@/manage/front.vue";
import main from "@/manage/main.vue";
import l2dtest from "@/manageComponents/l2dtest.vue";
import siteset from "@/manage/sitemanage/siteset.vue";
import group from "@/manage/groupmanage/group.vue";
import headerUsed from "@/manageComponents/headerUsed.vue";
import editor from "@/manage/blogedit/editor.vue";
import sort from "@/manage/sitemanage/components/sort.vue";
import blog from "@/manage/sitemanage/components/blog.vue";
import comments from "@/manage/sitemanage/components/comments.vue";
import files from "@/manage/sitemanage/components/files.vue";
import setting from "@/manage/sitemanage/components/setting.vue";
import sideMenu from "@/manageComponents/sideMenu.vue";
import form from "@/manageComponents/form.vue";



const routes = [
  { path: '/',
    name: 'front',
    component: front,
  },
  { path: '/manage',
    name: 'login',
    component: login,
  },
  { path: '/manage/main',
    name: 'main',
    component: main,
  },
  { path: '/test',
    name: 'l2dtest',
    component: l2dtest,
  },
  { path: '/manage/siteset',
    name: 'siteset',
    component: siteset,
    redirect: '/manage/siteset/sort',
    children:[
      { path: '/manage/siteset/sort',
        name: 'sort',
        component: sort,
      },
      { path: '/manage/siteset/blog',
        name: 'blog',
        component: blog,
      },
      { path: '/manage/siteset/comments',
        name: 'comments',
        component: comments,
      },
      { path: '/manage/siteset/files',
        name: 'files',
        component: files,
      },
      { path: '/manage/siteset/setting',
        name: 'setting',
        component: setting,
      },
    ]
  },
  { path: '/manage/group',
    name: 'group',
    component: group,
  },
  { path: '/manage/editor',
    name: 'editor',
    component: editor,
  },
  { path: '/headertest',
    name: 'headertest',
    component: headerUsed,
  },
  { path: '/sideMenuTest',
    name: 'sideMenuTest',
    component: sideMenu,
  },
  { path: '/formTest',
    name: 'formTest',
    component: form,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  base: '/slogmanage',
  routes
});

export default router
