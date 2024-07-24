<template class="pagemain">
  <!--页头-->
  <header-used>
    <template #extra>
      <a-breadcrumb style="height: 0">
        <a-breadcrumb-item>管理端</a-breadcrumb-item>
        <a-breadcrumb-item>主页</a-breadcrumb-item>
        <a-breadcrumb-item>站点管理</a-breadcrumb-item>
        <a-breadcrumb-item>文件管理</a-breadcrumb-item>
      </a-breadcrumb>
    </template>
  </header-used>

  <!--背景-->
  <a-affix :offset-top="top" style="position:absolute;width: 99.9999%;opacity: 0.99">
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

             style="margin-top: 5px; margin-bottom: 5px; z-index: 101; opacity: 0.9;transition-duration: 0.3s"
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
              style="border-radius: 6px; margin-top: -2px; z-index: 101; opacity: 0.9"
              @change="changeTheme" />
  </a-tooltip>

  <!--搜索栏-->
  <a-input-search
      style="position: absolute; right: 0; width: 30%; margin-top: 5px; opacity: 0.9"
      class="search"
      v-model:value="value"
      placeholder="想搜些什么呢(' ∇')?"
      enter-button
      @search="onSearch"
  />

  <!--主体-->
  <a-table
      :columns="columns"
      :data-source="dataSource"
      bordered
      style="opacity: 0.9"
      :class="{'base':true,
                    'wide':!state.collapsed,
                    'wide-left':!state.collapsed,
                    'narrow':state.collapsed,
                    'narrow-left':state.collapsed}">
    <template #bodyCell="{ column, text, record }">
      <template v-if="['name', 'age', 'address'].includes(column.dataIndex)">
        <div>
          <a-input
              v-if="editableData[record.key]"
              v-model:value="editableData[record.key][column.dataIndex]"
              style="margin: -5px 0"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <span v-if="editableData[record.key]">
            <a-typography-link @click="save(record.key)">Save</a-typography-link>
            <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="edit(record.key)">Edit</a>
          </span>
        </div>
      </template>
    </template>
  </a-table>
</template>

<script setup>
import HeaderUsed from "@/manageComponents/headerUsed.vue";
import {h, reactive, ref, watch} from "vue";
import { cloneDeep } from 'lodash-es';
import {CommentOutlined, ContainerOutlined, ProfileOutlined, FolderOpenOutlined, ToolOutlined, MenuFoldOutlined, MenuUnfoldOutlined,} from "@ant-design/icons-vue";
import router from "@/router";

//表格方法
const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    width: '25%',
  },
  {
    title: 'age',
    dataIndex: 'age',
    width: '15%',
  },
  {
    title: 'address',
    dataIndex: 'address',
    width: '40%',
  },
  {
    title: 'operation',
    dataIndex: 'operation',
  },
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
const dataSource = ref(data);
const editableData = reactive({});
const edit = key => {
  editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
};
const save = key => {
  Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
  delete editableData[key];
};
const cancel = key => {
  delete editableData[key];
};

//侧边栏方法
const state = reactive({
  mode: 'inline',
  theme: 'dark',
  selectedKeys: ['4'],
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

//搜索栏方法
const value = ref('');
const onSearch = searchValue => {
  console.log('use value', searchValue);
  console.log('or use this.value', value.value);
};
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