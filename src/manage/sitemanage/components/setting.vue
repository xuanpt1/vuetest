<template class="pagemain">
  <!--页头-->
  <header-used>
    <template #extra>
      <a-breadcrumb style="height: 0">
        <a-breadcrumb-item>管理端</a-breadcrumb-item>
        <a-breadcrumb-item>主页</a-breadcrumb-item>
        <a-breadcrumb-item>站点管理</a-breadcrumb-item>
        <a-breadcrumb-item>站点配置</a-breadcrumb-item>
      </a-breadcrumb>
    </template>
  </header-used>

  <!--背景-->
  <a-affix :offset-top="1" style="position:absolute;width: 99.9999%;opacity: 0.99">
    <a-card>
      <template #cover>
        <img alt="example" src="@/assets/images/background/kyk.jpg" />
      </template>
    </a-card>
  </a-affix>

  <!--侧边栏-->
  <div style="position: absolute;width: 15%;z-index: 100;opacity: 0.9">
    <a-affix :offset-top="top">
      <!--侧边栏主体-->
      <a-menu
          v-model:openKeys="state.openKeys"
          v-model:selectedKeys="state.selectedKeys"
          mode="inline"
          :items="items"
          :theme="state.theme"
          :inline-collapsed="state.collapsed"
      ></a-menu>
    </a-affix>
  </div>

  <!--数据列表-->
  <!--工具-->
    <!--折叠-->
    <a-button  :class="{'wide-left':!state.collapsed, 'narrow-left':state.collapsed}"
               type="default"
               size="middle"
               style="margin-top: 5px;margin-bottom: 5px;z-index: 101;opacity:0.9;transition-duration: 0.3s"
               @click="toggleCollapsed">
      <MenuUnfoldOutlined v-if="state.collapsed" />
      <MenuFoldOutlined v-else />
    </a-button>

    <!--主题切换-->
    <a-tooltip placement="right">
      <template #title>
        <span>切换主题</span>
      </template>
      <a-switch :class="{'wide-left':!state.collapsed, 'narrow-left':state.collapsed}"
                :checked="state.theme === 'dark'"
                checked-children="暗"
                un-checked-children="明"
                style="border-radius: 6px; margin-top: -2px;z-index: 101;opacity: 0.9"
                @change="changeTheme" />
    </a-tooltip>

    <!--站点备份-->
    <a-button type="primary"
              style="position: absolute; right: 10%; margin-top: 5px; opacity: 0.9"
              @click="showModal">
      备份站点
    </a-button>
      <!--备份的信息确认对话框-->
    <a-modal v-model:open="open" title="确认站点信息" :confirm-loading="confirmLoading" @ok="handleOk">
       <p>{{ modalText }}</p>
    </a-modal>


  <!--主体-->
  <a-card style="opacity: 0.9"
          :class="{'base':true,
                    'wide':!state.collapsed,
                    'wide-left':!state.collapsed,
                    'narrow':state.collapsed,
                    'narrow-left':state.collapsed}">

    <h3><b>配置站点信息</b></h3>
    <a-form :layout="formState.layout" :model="formState" v-bind="formItemLayout">
      <a-form-item label="Form Layout">
        <a-radio-group v-model:value="formState.layout">
          <a-radio-button value="horizontal">Horizontal</a-radio-button>
          <a-radio-button value="vertical">Vertical</a-radio-button>
          <a-radio-button value="inline">Inline</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="Field A">
        <a-input v-model:value="formState.fieldA" placeholder="input placeholder" />
      </a-form-item>
      <a-form-item label="Field B">
        <a-input v-model:value="formState.fieldB" placeholder="input placeholder" />
      </a-form-item>
      <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
        <a-button type="primary">Submit</a-button>
      </a-form-item>
    </a-form>

    <h3><b>配置永久链接</b></h3>
    <a-form :layout="formState.layout" :model="formState" v-bind="formItemLayout">
      <a-form-item label="Form Layout">
        <a-radio-group v-model:value="formState.layout">
          <a-radio-button value="horizontal">Horizontal</a-radio-button>
          <a-radio-button value="vertical">Vertical</a-radio-button>
          <a-radio-button value="inline">Inline</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="Field A">
        <a-input v-model:value="formState.fieldA" placeholder="input placeholder" />
      </a-form-item>
      <a-form-item label="Field B">
        <a-input v-model:value="formState.fieldB" placeholder="input placeholder" />
      </a-form-item>
      <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
        <a-button type="primary">Submit</a-button>
      </a-form-item>
    </a-form>

    <h3><b>设置评论数限制</b></h3>
    <a-form :layout="formState.layout" :model="formState" v-bind="formItemLayout">
      <a-form-item label="Form Layout">
        <a-radio-group v-model:value="formState.layout">
          <a-radio-button value="horizontal">Horizontal</a-radio-button>
          <a-radio-button value="vertical">Vertical</a-radio-button>
          <a-radio-button value="inline">Inline</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="Field A">
        <a-input v-model:value="formState.fieldA" placeholder="input placeholder" />
      </a-form-item>
      <a-form-item label="Field B">
        <a-input v-model:value="formState.fieldB" placeholder="input placeholder" />
      </a-form-item>
      <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
        <a-button type="primary">Submit</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script setup>
import HeaderUsed from "@/manageComponents/headerUsed.vue";
import {computed, h, reactive, ref, watch} from "vue";
import {CommentOutlined, ContainerOutlined, ProfileOutlined, FolderOpenOutlined, ToolOutlined, MenuFoldOutlined, MenuUnfoldOutlined,} from "@ant-design/icons-vue";
import router from "@/router";

//侧边栏方法
const state = reactive({
  mode: 'inline',
  theme: 'light',
  selectedKeys: ['5'],
  collapsed: false,
});
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
//侧边栏跳转
const goSort = () =>{
  router.push("/manage/siteset/sort")
  window.scrollTo({left: 0, top: 0, behavior:'smooth'})
}
const goBlog = () =>{
  router.push("/manage/siteset/blog")
  window.scrollTo({left: 0, top: 0, behavior:'smooth'})
}
const goComments = () =>{
  router.push("/manage/siteset/comments")
  window.scrollTo({left: 0, top: 0, behavior:'smooth'})
}
const goFiles = () =>{
  router.push("/manage/siteset/files")
  window.scrollTo({left: 0, top: 0, behavior:'smooth'})
}
const goSetting = () =>{
  router.push("/manage/siteset/setting")
  window.scrollTo({left: 0, top: 0, behavior:'smooth'})
}

//侧边栏信息
const items = reactive([
  getItem(h(
          'span',
          {
            onClick(){
              goSort();
            }
          },
          '分类管理'),
      '1', h(ProfileOutlined)),
  getItem(h(
          'span',
          {
            onClick(){
              goBlog();
            }
          },
          '博文管理'),
      '2', h(ContainerOutlined)),
  getItem(h(
          'span',
          {
            onClick(){
              goComments();
            }
          },
          '评论管理'),
      '3', h(CommentOutlined)),
  getItem(h(
          'span',
          {
            onClick(){
              goFiles();
            }
          },
          '文件管理'),
      '4', h(FolderOpenOutlined)),
  getItem(h(
          'span',
          {
            onClick(){
              goSetting();
            }
          },
          '站点配置'),
      '5', h(ToolOutlined)),
]);

//主题切换
const changeTheme = checked => {
  state.theme = checked ? 'dark' : 'light';
};

//侧边栏折叠方法
const toggleCollapsed = () => {
  state.collapsed = !state.collapsed;
};

//对话框方法
const modalText = ref('当前网站信息展示');
const open = ref(false);
const confirmLoading = ref(false);
const showModal = () => {
  open.value = true;
};
const handleOk = () => {
  modalText.value = '异步关闭对话框，设置2s';
  confirmLoading.value = true;
  setTimeout(() => {
    open.value = false;
    confirmLoading.value = false;
  }, 2000);
};

//表单方法
const formState = reactive({
  layout: 'horizontal',
  fieldA: '',
  fieldB: '',
});
const formItemLayout = computed(() => {
  const { layout } = formState;
  return layout === 'horizontal'
      ? {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 14,
        },
      }
      : {};
});
const buttonItemLayout = computed(() => {
  const { layout } = formState;
  return layout === 'horizontal'
      ? {
        wrapperCol: {
          span: 14,
          offset: 4,
        },
      }
      : {};
});
</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
.base{
  position: absolute;
}
.narrow{
  width: 93.6%;
  transition-duration: 0.5s;
}
.narrow-left{
  left: 6.4%;
  transition-duration: 0.5s;
}
.wide{
  width: 85%;
  transition-duration: 0.5s;
}
.wide-left{
  left: 15%;
  transition-duration: 0.5s;
}
</style>