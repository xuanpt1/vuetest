<template>
  <!--页头-->
  <header-used>
    <template #extra>
      <a-breadcrumb style="height: 0">
        <a-breadcrumb-item>管理端</a-breadcrumb-item>
        <a-breadcrumb-item>主页</a-breadcrumb-item>
        <a-breadcrumb-item>群组管理</a-breadcrumb-item>
      </a-breadcrumb>
    </template>
  </header-used>

  <!--背景-->
  <a-affix :offset-top="top" style="position:absolute;width: 99.9999%;opacity: 0.99">
    <a-card>
      <template #cover>
        <img alt="example" src="@/assets/images/background/dessert.jpg" />
      </template>
    </a-card>
  </a-affix>

  <!--主体-->
  <!--群组总览列表-->
  <a-card :class="{'card1-top':top1,'card1-bottom':!top1}">
    <div @click="toTop">
    <h3><b>群组总览</b></h3>
    </div>

    <!--群组列表-->
    <!--大框-->
    <a-list v-if="!top2"
            item-layout="horizontal"
            :data-source="listData.listData">
      <template #renderItem="{ item }">
        <a-list-item>
          <template #actions>
            <a key="list-loadmore-edit" @click="showDrawer(item.groupId)">查看详情</a>
          </template>
          <a-list-item-meta
              :description = "'组内人数：' + item.count"
          >
            <template #title>
              <a @click="showDrawer(item.groupId)">{{ item.groupTitle }}</a>
            </template>
            <template #avatar>
              <a-avatar src="https://joeschmoe.io/api/v1/random" />
            </template>
          </a-list-item-meta>
        </a-list-item>

        <!--群组信息抽屉-->
        <a-drawer
            v-model:open="openDrawer"
            class="custom-class"
            root-class-name="root-class-name"
            title="群组信息"
            width="640"
            placement="right"
        >
          <p>群组名：{{drawerArr.drawerArr[0].groupTitle}}</p>
          <p>组内成员数：{{drawerArr.drawerArr[0].count}}</p>
          <p>群组feeds：</p>
          <a-list item-layout="horizontal" :data-source="drawerArr.drawerArr">
            <template #renderItem="{ item }">
              <a-list-item>
                <a-list-item-meta>
                  <template #title >
                    <div v-for="urls in item.feeds">
                    <a :href="urls" target="_blank">{{ urls }}</a>
                    </div>
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
          <p>群组URL：{{drawerArr.drawerArr[0].groupUrl}}</p>
          <template #extra>
            <a-space>
              <a-button @click="deleteGroup(drawerArr.drawerArr[0].groupId)" danger>删除群组</a-button>
              <a-button type="primary" @click="addRss(drawerArr.drawerArr[0].groupId)">添加rss订阅</a-button>
            </a-space>
          </template>
        </a-drawer>
      </template>
    </a-list>

    <!--小框-->
    <a-list v-if="top2"
            item-layout="horizontal"
            :data-source="listData.listData">
      <template #renderItem="{ item }">
        <a-list-item>
          <template #actions>
            <a key="list-loadmore-edit" @click="showDrawer(item.groupId)">查看详情</a>
          </template>
          <a-list-item-meta
              :description = "'组内人数：' + item.count"
          >
            <template #title>
              <a @click="showDrawer(item.groupId)">{{ item.groupTitle }}</a>
            </template>
            <template #avatar>
              <a-avatar src="https://joeschmoe.io/api/v1/random" />
            </template>
          </a-list-item-meta>
        </a-list-item>
        <!--群组信息抽屉-->
        <a-drawer
            v-model:open="openDrawer"
            class="custom-class"
            root-class-name="root-class-name"
            title="群组信息"
            width="640"
            placement="right"
        >
          <p>群组名：{{drawerArr.drawerArr[0].groupTitle}}</p>
          <p>组内成员数：{{drawerArr.drawerArr[0].count}}</p>
          <p>群组feeds：</p>
          <a-list item-layout="horizontal" :data-source="drawerArr.drawerArr">
            <template #renderItem="{ item }">
              <a-list-item>
                <a-list-item-meta>
                  <template #title >
                    <div v-for="urls in item.feeds">
                      <a :href="urls" target="_blank">{{ urls }}</a>
                    </div>
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
          <p>群组URL：{{drawerArr.drawerArr[0].groupUrl}}</p>
          <template #extra>
            <a-space>
              <a-button @click="deleteGroup(drawerArr.drawerArr[0].groupId)" danger>删除群组</a-button>
              <a-button type="primary" @click="addRss(drawerArr.drawerArr[0].groupId)">添加rss订阅</a-button>
            </a-space>
          </template>
        </a-drawer>
      </template>
    </a-list>
  </a-card>


  <!--搜索群组列表-->
  <a-card :class="{'card2-top':top2,'card2-bottom':!top2}">
    <div @click="toTop">
      <h3><b>群组搜索！</b></h3>
    </div>

    <!--搜索-->
    <a-input-search
        style="left: 25%; top: 7%; width: 78%; opacity: 0.9"
        class="search"
        v-model:value="value"
        placeholder="想搜哪个群呢(' ∇')?"
        enter-button
        @search="onSearch"
    />

    <!--群组创建-->
    <a-tooltip placement="top">
      <template #title>
        <span>创建新群组</span>
      </template>
      <a-button
          style="left: 5%"
          @click="createGroup">
        <UsergroupAddOutlined />
      </a-button>
    </a-tooltip>
    <!--群组创建的对话框-->
    <a-modal v-model:open="openDialog"
             title="创建新群组"
             @ok="handleOk">
      <template #footer>
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">确认</a-button>
      </template>
      <a-form :model="form" :rules="rules" layout="vertical">
        <a-col>
          <a-form-item label="只需要输入群组名字就可以哟 (' ∇')！" name="name">
            <a-input v-model:value="form.name" placeholder="想取什么名字呢(' ∇')?" />
          </a-form-item>
        </a-col>
      </a-form>
    </a-modal>
    <!--为群组添加rss的对话框-->
    <a-modal v-model:open="openDialog2"
             title="添加feed"
             @ok="handleOk2">
      <template #footer>
        <a-button key="back" @click="handleCancel2">取消</a-button>
        <a-button key="submit" type="primary" :loading="loading2" @click="handleOk2">确认</a-button>
      </template>
      <a-form :model="form2" layout="vertical">
        <a-col>
          <a-form-item label="输入想要添加的rss链接吧 (' ∇')！" name="name">
            <a-input v-model:value="form2.url" placeholder="想添加什么订阅呢(' ∇')?" />
          </a-form-item>
        </a-col>
      </a-form>
    </a-modal>

    <!--检索到的群组列表-->
    <a-list
            item-layout="horizontal"
            :data-source="listData2.listData2">
      <template #renderItem="{ item }">
        <a-list-item>
          <template #actions>
            <a key="list-loadmore-edit" @click="showDrawer(item.groupId)">查看详情</a>
          </template>
          <a-list-item-meta
              :description = "'组内人数：' + item.count"
          >
            <template #title>
              <a @click="showDrawer(item.groupId)">{{ item.groupTitle }}</a>
            </template>
            <template #avatar>
              <a-avatar src="https://joeschmoe.io/api/v1/random" />
            </template>
          </a-list-item-meta>
        </a-list-item>

        <!--群组信息抽屉-->
        <a-drawer
            v-model:open="openDrawer"
            class="custom-class"
            root-class-name="root-class-name"
            title="群组信息"
            width="640"
            placement="right"
        >
          <p>群组名：{{drawerArr.drawerArr[0].groupTitle}}</p>
          <p>组内成员数：{{drawerArr.drawerArr[0].count}}</p>
          <p>群组feeds：</p>
          <a-list item-layout="horizontal" :data-source="drawerArr.drawerArr">
            <template #renderItem="{ item }">
              <a-list-item>
                <a-list-item-meta>
                  <template #title >
                    <div v-for="urls in item.feeds">
                      <a :href="urls" target="_blank">{{ urls }}</a>
                    </div>
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
          <p>群组URL：{{drawerArr.drawerArr[0].groupUrl}}</p>
          <template #extra>
            <a-space>
              <a-button @click="deleteGroup(drawerArr.drawerArr[0].groupId)" danger>删除群组</a-button>
              <a-button type="primary" @click="addRss(drawerArr.drawerArr[0].groupId)">添加rss订阅</a-button>
            </a-space>
          </template>
        </a-drawer>
      </template>
    </a-list>

  </a-card>



</template>

<script setup>

import HeaderUsed from "@/manageComponents/headerUsed.vue";
import {UsergroupAddOutlined} from "@ant-design/icons-vue";
import {reactive, ref, watch} from "vue";
import {getAllGroups, putRssSubByRurl, removeGroupById, saveGroups} from "@/utils/manage";
import {message} from "ant-design-vue";

//处理两个信息切换显示
const top1 = ref(true);
const top2 = ref(false);
const toTop = () =>{
  top1.value = !top1.value;
  top2.value = !top2.value;
}


//主体数据
const listData = reactive({
  listData: [],
});
const listData2 = reactive({
  listData2: [],
})
const refreshData = () =>{
  getAllGroups().then((res)=>{
    listData.listData = [];
    if(res){
      for (let i = 0; i < res.data.data.length; i++){
        listData.listData.push(res.data.data[i])
      }
    }
    console.log(listData.listData)
  })
}
refreshData();

//搜索栏方法
const value = ref('');
const onSearch = searchValue => {
  if(searchValue) {
    console.log(searchValue);
    console.log(listData.listData)
    //判断获取的数据数组群组名称中存在搜索内容的部分，存进一个数组中
    const arr = listData.listData.filter(item => item.groupTitle.indexOf(searchValue) !== -1);
    console.log(arr);

    //用来存原本数据的中介，新数据加以展示
    const memory = listData2.listData2;
    listData2.listData2 = arr;

    //监控输入框，如果输入框为空重置数据
    watch(value,()=>{
      if(!value.value){
        listData2.listData2 = memory;
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


//创建群组-对话框方法
const openDialog = ref(false);
const loading = ref(false);
const createGroup = () => {
  openDialog.value = true;
};
const handleOk = () => {
  loading.value = true;
  if(form.name.length !== 0){
    let save = {
      title: form.name
    }
    saveGroups(save).then((res)=>{
      if(res.data.status === 200){
        setTimeout(() => {
          loading.value = false;
          openDialog.value = false;
          message.success('创建成功OwO')
          form.name = '';
        }, 500);
        refreshData();
      }
      else{
        setTimeout(() => {
          loading.value = false;
          message.error('创建失败ToT')
          form.name = '';
        }, 500);
      }
    })
  }
  else {
    message.warn("还没有填群名哟 OwO")
    loading.value = false;
  }
};
const handleCancel = () => {
  openDialog.value = false;
};
  //提交的表单数据
const form = reactive({
  name: '',
});
const rules = {
  name: [
    {
      required: true,
      message: '还没有起名字 OwO',
    },
  ],
};

//为群组添加feed-对话框2方法
const openDialog2 = ref(false);
const loading2 = ref(false);
let templateId = ref();
const addRss = (id) => {
  openDrawer.value = false;
  openDialog2.value = true;
  templateId = id;
};
const handleOk2 = () => {
  loading2.value = true;
  console.log('测试id: '+templateId)
  if(form2.url.length !== 0){
    let save = {
      rurl: form2.url,
      groupId: templateId,
    }
    console.log(save);
    templateId = ref();
    putRssSubByRurl(save).then((res)=>{
      if(res.data.status === 200){
        setTimeout(() => {
          loading2.value = false;
          openDialog2.value = false;
          message.success('添加成功OwO')
          form2.url = '';
        }, 500);
        refreshData();
      }
      else{
        setTimeout(() => {
          loading2.value = false;
          message.error('添加失败ToT')
          form2.url = '';
        }, 500);
      }
    })
  }
  else {
    message.warn("还没有填链接哟 OwO")
    loading2.value = false;
  }
};
const handleCancel2 = () => {
  templateId = ref();
  openDialog2.value = false;
};
//提交的表单数据
const form2 = reactive({
  url: '',
});

//抽屉方法
const openDrawer = ref(false);
const drawerArr = reactive({
  drawerArr: []
})
const pStyle = {
  fontSize: '16px',
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '24px',
  display: 'block',
  marginBottom: '16px',
};
const pStyle2 = {
  marginBottom: '24px',
};
//打开抽屉
const showDrawer = (key) => {
  console.log(key);
  drawerArr.drawerArr = listData.listData.filter(item => item.groupId === key);
  console.log(drawerArr.drawerArr);
  openDrawer.value = true;
};
//关闭抽屉
const onClose = () => {
  openDrawer.value = false;
};
//抽屉内删除群组
const deleteGroup = (key) => {
  let remove = {
    groupId: key
  }
  removeGroupById(remove).then((res)=>{
    if(res.data.status === 200){
      console.log(res.data)
      message.success("删除成功OvO")
      refreshData();
    }
    else {
      message.error("删除失败ToT")
    }
  })
  onClose();
}
</script>

<style scoped>
.card1-top{
  position:absolute;
  width: 60%;
  left: 5%;
  opacity: 0.9;
  transition-duration: 1s;
}
.card1-bottom{
  position:absolute;
  width: 28%;
  left: 5%;
  top: 30%;
  opacity: 0.9;
  transition-duration: 1s;
}
.card2-top{
  position:absolute;
  width: 60%;
  right: 5%;
  opacity: 0.9;
  transition-duration: 1s;
}
.card2-bottom{
  position:absolute;
  width: 28%;
  right: 5%;
  top: 30%;
  opacity: 0.9;
  transition-duration: 1s;
}
</style>