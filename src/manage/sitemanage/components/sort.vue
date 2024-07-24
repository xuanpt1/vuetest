<template>
  <!--页头-->
  <header-used>
    <template #extra>
      <a-breadcrumb style="height: 0">
        <a-breadcrumb-item>管理端</a-breadcrumb-item>
        <a-breadcrumb-item>主页</a-breadcrumb-item>
        <a-breadcrumb-item>站点管理</a-breadcrumb-item>
        <a-breadcrumb-item>分类管理</a-breadcrumb-item>
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

  <!--添加分类-->
  <a-tooltip placement="top">
    <template #title>
      <span>添加分类</span>
    </template>
  <a-button :icon="h(PlusOutlined)"
            style="position:absolute; margin-top: 5px; opacity: 0.9; right: 31%"
            @click="addMeta"/>
  </a-tooltip>
      <!--添加分类的对话框-->
  <a-modal v-model:open="openDialog"
           title="添加分类"
           @ok="handleOk">
    <template #footer>
      <a-button key="back" @click="handleCancel">取消</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">确认</a-button>
    </template>
    <a-form :model="form" :rules="rules" layout="vertical">
      <a-col>
        <a-form-item label="分类名称" name="name">
          <a-input v-model:value="form.name" placeholder="想取什么名字呢(' ∇')?" />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item label="简介" name="description">
          <a-input v-model:value="form.description" placeholder="介绍一下分类吧(' ∇')/" />
        </a-form-item>
      </a-col>
    </a-form>
  </a-modal>

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
      <template v-if="['name', 'description', 'count'].includes(column.dataIndex)">
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

      <!--操作栏-->
      <template v-else-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
            <a-popconfirm title="确认删除吗0.0"
                          ok-text="确定"
                          cancel-text="取消"
                          @confirm="deleteMeta(record.key)">
              <a>删除</a>
            </a-popconfirm>
        </div>
      </template>

    </template>
  </a-table>
</template>

<script setup>
import HeaderUsed from "@/manageComponents/headerUsed.vue";
import {h, reactive, ref, watch} from "vue";
import {
  CommentOutlined,
  ContainerOutlined,
  ProfileOutlined,
  FolderOpenOutlined,
  ToolOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import router from "@/router";
import {getAllMetas, removeMetaById, saveMeta} from "@/utils/manage";
import {message} from "ant-design-vue";

//添加分类-对话框方法
const openDialog = ref(false);
const loading = ref(false);
const addMeta = () => {
  openDialog.value = true;
};
const handleOk = () => {
  loading.value = true;
  if(form.name.length !== 0){
    if(form.description.length !== 0){
      getAllMetas().then((res)=>{
        let save = {
          mid: res.data.data.length + 1,
          name: form.name,
          description: form.description,
          pmid: 0,
          count: 0
        }
        saveMeta(save).then((res)=>{
          if(res.data.status === 200){
            setTimeout(() => {
              loading.value = false;
              openDialog.value = false;
              message.success('添加成功OwO')
              form.name = '';
              form.description = '';
            }, 500);
            refreshData();
          }
          else{
            setTimeout(() => {
              loading.value = false;
              message.error('添加失败ToT')
              form.name = '';
              form.description = '';
            }, 500);
          }
        })
      })
    }
    else {
      message.warn("还没有填简介哟 OwO")
      loading.value = false;
    }
  }
  else {
    message.warn("还没有填类名哟 OwO")
    loading.value = false;
  }
};
const handleCancel = () => {
  openDialog.value = false;
};
//提交的表单数据
const form = reactive({
  name: '',
  description: ''
});
const rules = {
  name: [
    {
      required: true,
      message: '还没有起名字 OwO',
    },
  ],
  description: [
    {
      required: true,
      message: '还没有写简介 OwO',
    },
  ],
};


//表格方法
const columns = [
  {
    title: '分类名称',
    dataIndex: 'name',
    width: '25%',
  },
  {
    title: '描述',
    dataIndex: 'description',
    width: '15%',
  },
  {
    title: '分类文章总数',
    dataIndex: 'count',
    width: '40%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
];
const data = reactive({
  data: []
});

const refreshData = () =>{
  data.data = [];
  //表格方法中的后端数据
  getAllMetas().then((res)=>{
    if(res){
      for (let i = 0; i < res.data.data.length; i++) {
        data.data.push({
          key: res.data.data[i].mid,
          name: res.data.data[i].name.toString(),
          description: res.data.data[i].description.toString(),
          count: res.data.data[i].count.toString(),
        })
      }
    }
  }) .catch(error => {
    console.log(error)
  })
}
refreshData()

//表格编辑方法
const editableData = reactive({});
const deleteMeta = (id) =>{
  console.log(id)
  let arr = {
    mid: id
  }
  removeMetaById(arr).then((res)=>{
    if(res.data.status === 200){
      message.success('删除成功OwO')
      refreshData()
    }
    else {
      message.error('删除失败ToT')
    }
  })
}

//侧边栏方法
const state = reactive({
  mode: 'inline',
  theme: 'light',
  selectedKeys: ['1'],
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
    //判断获取的数据数组分类名称中存在搜索内容的部分，存进一个数组中
    const arr = data.data.filter(item => item.name.indexOf(searchValue) !== -1);
    console.log(arr);
    console.log(data.data.filter(item => item.name.indexOf(searchValue) !== -1)[0])

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