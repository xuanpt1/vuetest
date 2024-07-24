<template class="pagemain">
  <!--页头-->
  <header-used>
    <template #extra>
      <a-breadcrumb style="height: 0">
        <a-breadcrumb-item>管理端</a-breadcrumb-item>
        <a-breadcrumb-item>主页</a-breadcrumb-item>
        <a-breadcrumb-item>站点管理</a-breadcrumb-item>
        <a-breadcrumb-item>评论管理</a-breadcrumb-item>
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
      :data-source="data.data"
      bordered
      style="opacity: 0.9"
      :class="{'base':true,
                    'wide':!state.collapsed,
                    'wide-left':!state.collapsed,
                    'narrow':state.collapsed,
                    'narrow-left':state.collapsed}">
    <template #bodyCell="{ column, text, record }">
      <template v-if="['comment', 'author', 'time', 'blogTitle', 'like'].includes(column.dataIndex)">
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
          <a-popconfirm title="确认删除吗0.0"
                        ok-text="确定"
                        cancel-text="取消"
                        @confirm="deleteComment(record.key)">
            <a>删除</a>
          </a-popconfirm>
        </div>
      </template>
    </template>
  </a-table>

</template>

<script setup>
import { message } from 'ant-design-vue';
import HeaderUsed from "@/manageComponents/headerUsed.vue";
import {h, reactive, ref, watch} from "vue";
import { cloneDeep } from 'lodash-es';
import {CommentOutlined, ContainerOutlined, ProfileOutlined, FolderOpenOutlined, ToolOutlined, MenuFoldOutlined, MenuUnfoldOutlined,} from "@ant-design/icons-vue";
import router from "@/router";
import {getAllComments, getContentById, removeCommentByCoid, removeMetaById} from "@/utils/manage";

//表格方法
const columns = [
  {
    title: '评论内容',
    dataIndex: 'comment',
    width: '25%',
  },
  {
    title: '评论作者',
    dataIndex: 'author',
    width: '15%',
  },
  {
    title: '评论时间',
    dataIndex: 'time',
    width: '15%',
  },
  {
    title: '评论的文章标题',
    dataIndex: 'blogTitle',
    width: '20%',
  },
  {
    title: '点赞数',
    dataIndex: 'like',
    width: '7%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
];
const data = reactive({
  data: [],
})

//初始化方法
const refreshData = () =>{
  data.data = []
  getAllComments().then((res)=>{
    if(res){
      for(let i=0; i<res.data.data.length; i++){
        getContentById(res.data.data[i].cid).then((res2)=>{
          data.data.push({
            key: res.data.data[i].coid,
            pcoid: res.data.data[i].pcoid,
            comment: res.data.data[i].text,
            author: res.data.data[i].author,
            time: res.data.data[i].createdTime.toString(),
            blogTitle: res2.data.data.title,
            like: res.data.data[i].likeCount.toString(),
          })
          data.data.sort((a,b)=>{
            return a.key-b.key
          })
        })
      }
      console.log(res.data.data)
    }
  })
}
refreshData()

//删除方法
const editableData = reactive({});
const deleteComment = id =>{
  let arr = {
    coid: id,
    // pcoid: data.data.filter(item => item.key === id)[0].pcoid
  }
  console.log(arr)
  console.log(data.data.filter(item => item.pcoid === id).length)
  if(data.data.filter(item => item.pcoid === id).length !== 0){
    message.warn('这个评论还有子评论哟！OwO')
  }
  else {
    removeCommentByCoid(arr).then((res)=>{
      if(res.data.status === 200){
        message.success('删除成功OwO')
        refreshData()
      }
      else {
        message.error('删除失败ToT')
      }
    })
  }
}

//侧边栏方法
const state = reactive({
  mode: 'inline',
  theme: 'light',
  selectedKeys: ['3'],
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
  if(searchValue) {
    // console.log('use value', searchValue);
    // console.log('or use this.value', value.value);
    // console.log(data.data.length.toString());
    for(let i=0; i<data.data.length;i++){
      console.log(data.data[i].comment.indexOf(searchValue));
    }

    //判断获取的数据数组中评论正文或者评论的文章标题中存在搜索内容的部分，存进一个数组中
    const arr = data.data.filter(item => item.comment.indexOf(searchValue) !== -1 || item.blogTitle.indexOf(searchValue) !== -1);
    console.log(arr);

    //用来存原本数据的中介，新数据加以展示
    const memory = data.data;
    data.data = arr;

    //监控输入框，如果输入框为空重置数据
    watch(value,()=>{
      if(!value.value){
        data.data = memory;
      }
    })
  }
  else{
    //控制搜索内容不能为空
    message.warning({
      content: () => '搜索内容不能为空哟 OwO',
    });
  }
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