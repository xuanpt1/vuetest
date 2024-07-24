<template>
  <div class="header" style="border: 1px solid rgb(235, 237, 240)">
    <a-page-header title="SLOG博客系统" sub-title="管理端 Ciallo～(∠・ω< )⌒★" @back="() => $router.go(-1)" style="height: 3%">
      <template #extra>
        <a-menu mode="horizontal" :items="items"/>
      </template>
      <slot name="extra"></slot>
    </a-page-header>
  </div>
</template>

<script setup>
import {h, ref} from 'vue';
import {
  HomeOutlined,
  FormOutlined,
  TeamOutlined,
  SettingOutlined,
  ProfileOutlined,
  ContainerOutlined,
  CommentOutlined,
  FolderOpenOutlined,
  ToolOutlined
} from '@ant-design/icons-vue';
import router from "@/router";

const goHome = () => {
  router.push("/manage/main");
}
const goEdit = () => {
  router.push("/manage/editor");
}
const goGroup = () => {
  router.push("/manage/group");
}
const goSort = () => {
  router.push("/manage/siteset/sort");
}
const goBlog = () => {
  router.push("/manage/siteset/blog");
}
const goComment = () => {
  router.push("/manage/siteset/comments");
}
const goFile = () => {
  router.push("/manage/siteset/files");
}
const goSetting = () => {
  router.push("/manage/siteset/setting");
}

const items = ref([
  {
    key: '/manage/main',
    icon: () => h(HomeOutlined),
    label: h(
        'span',
        {
          onClick(){
            goHome();
          }
        },
        '主页',
    ),
    title: '主页',
  },
  {
    key: '/manage/editor',
    icon: () => h(FormOutlined),
    label: h(
        'span',
        {
          onClick(){
            goEdit();
          }
        },
        '写博客',
    ),
    title: '写博客',
  },
  {
    key: '/manage/group',
    icon: () => h(TeamOutlined),
    label: h(
        'span',
        {
          onClick(){
            goGroup();
          }
        },
        '群组管理',
    ),
    title: '群组管理',
  },
  {
    key: '/manage/siteset',
    icon: () => h(SettingOutlined),
    label: '站点管理',
    title: '站点管理',
    children: [
      {
        type: 'group',
        children: [
          {
            label: h(
                'span',
                {
                  onClick(){
                    goSort();
                  }
                },
                '分类管理',
            ),
            key: '/manage/siteset/sort',
            icon: () => h(ProfileOutlined),
          },
          {
            label:  h(
                'span',
                {
                  onClick(){
                    goBlog();
                  }
                },
                '博文管理',
            ),
            key: '/manage/siteset/blog',
            icon: () => h(ContainerOutlined),
          },
          {
            label:  h(
                'span',
                {
                  onClick(){
                    goComment();
                  }
                },
                '评论管理',
            ),
            key: '/manage/siteset/comments',
            icon: () => h(CommentOutlined),
          },
          {
            label: h(
                'span',
                {
                  onClick(){
                    goFile();
                  }
                },
                '文件管理',
            ),
            key: '/manage/siteset/files',
            icon: () => h(FolderOpenOutlined),
          },
          {
            label: h(
                'span',
                {
                  onClick(){
                    goSetting();
                  }
                },
                '站点配置',
            ),
            key: '/manage/siteset/setting',
            icon: () => h(ToolOutlined),
          },
        ],
      },
    ],
  },
]);
</script>

<style scoped>

.header {
  padding-bottom: 20px;
}
.header tr:last-child td {
  padding-bottom: 0;
}
</style>