<template>
  <header-used>
    <template #extra>
      <a-breadcrumb style="height: 0">
        <a-breadcrumb-item>管理端</a-breadcrumb-item>
        <a-breadcrumb-item>主页</a-breadcrumb-item>
        <a-breadcrumb-item>写博客</a-breadcrumb-item>
      </a-breadcrumb>
    </template>
  </header-used>

  <a-affix :offset-top="1" style="position:absolute;width: 99.9999%;margin-top:0;opacity: 0.9">
    <a-card>
      <template #cover>
        <img alt="example" src="@/assets/images/background/kyk3.png" />
      </template>
    </a-card>
  </a-affix>

  <a-card style="opacity: 0.85; width: 88%; left: 6%">

    <a-input v-model:value="value1"
             addon-before="文章标题"
             placeholder="想取什么标题呢(' ∇')?"/>
    <br><br>
    <a-textarea v-model:value="value2"
                placeholder="输入简介，介绍一下文章吧(' ∇')/"
                show-count :maxlength="200" />
    <br>
    <a-select
        v-model:value="value3"
        mode="multiple"
        style="width: 100%"
        placeholder="点击选择文章类型吧(' ∇')/"
        :options=options.options
        @change="handleChange"
    ></a-select>
    <br><br>
    <mavon-editor v-model="value"
                  ref="md"
                  @save="save"
                  @imgAdd="$imgAdd"
                  placeholder="想写些什么呢(' ∇')?"
                  style="margin-top: 1px;z-index: 1;height: 100%;opacity: 0.75">
    </mavon-editor>
    <br>
    <a-button type="primary"
              @click="judge"
              style="left: 80%">发表博客</a-button>
  </a-card>


</template>

<script>
import HeaderUsed from "@/manageComponents/headerUsed.vue";
import axios from "axios";
import {getAllContents, getAllMetas, getContentById, saveContent, updateContent} from "@/utils/manage";
import {message} from "ant-design-vue";
import {reactive, ref} from "vue";
import {useRoute} from 'vue-router';

export default {
  name: "mavonEditorDemo",
  components: {
    HeaderUsed
  },
  data () {
    return {
      //标题内容
      value1: ref(''),
      //简介内容
      value2: ref(''),
      //选择标签
      value3: ref([]),
      //存传过来的blogId
      blogId: '',
      //标签选择项
      options: reactive({
        options: [],
      }),
      //存分类的数组
      arr: [],
      //编辑器默认显示内容
      value: "# Markdown Demo  \n" +
          "\n" +
          "- - -\n" +
          "\n" +
          "## 一、标题\n" +
          "\n" +
          "### 1. 使用 `#` 表示标题，其中 `#` 号必须在行首，例如：  \n" +
          "\n" +
          "# 一号标题\n" +
          "## 二号标题\n" +
          "### 三号标题\n" +
          "#### 四号标题\n" +
          "##### 五号标题\n" +
          "###### 六号标题\n" +
          "\n" +
          "### 2. 使用 `===` 或者 `---` 表示，例如：  \n" +
          "\n" +
          "一级标题\n" +
          "===\n" +
          "\n" +
          "二级标题\n" +
          "---\n" +
          "\n" +
          "#### **扩展：如何换行？**\n" +
          "一般使用 **两个空格** 加 **回车** 换行，不过一些 IDE 也可以直接使用回车换行。  \n" +
          "\n" +
          "\n" +
          "## 二、分割线\n" +
          "\n" +
          "使用三个或以上的 `-` 或者 `*`  表示，且这一行只有符号，**注意不要被识别为二级标题即可**，例如中间或者前面可以加空格\n" +
          "\n" +
          "- - -\n" +
          "\n" +
          "* * *\n" +
          "\n" +
          "\n" +
          "## 三、斜体和粗体\n" +
          "\n" +
          "使用 `*` 和 `**` 分别表示斜体和粗体，例如  \n" +
          "\n" +
          "*斜体* \n" +
          "**粗体** \n" +
          "***又斜又粗***\n" +
          "\n" +
          "#### **扩展：**删除线使用两个 `~` 表示，例如  \n" +
          "\n" +
          "~~我是要删掉的文字~~\n" +
          "\n" +
          "- - -\n" +
          "\n" +
          "\n" +
          "## 四、超链接和图片\n" +
          "\n" +
          "超链接和图片的写法类似，图片仅在超链接前多了一个 `!` ，一般是 [文字描述] (链接)  \n" +
          "两种写法，分别是： [第一种写法](https://www.baidu.com/) 和 [第二种写法][1]  \n" +
          "图片的话就比如这样： ![Image][2]  \n" +
          "\n" +
          "[1]: https://www.baidu.com/  \n" +
          "[2]: https://www.zybuluo.com/static/img/logo.png  \n" +
          "\n" +
          "- - -\n" +
          "\n" +
          "\n" +
          "## 五、无序列表\n" +
          "\n" +
          "使用 `-`、`+` 和 `*` 表示无序列表，前后留一行空白，可嵌套，例如\n" +
          "\n" +
          "+ 一层\n" +
          "    - 二层\n" +
          "    - 二层\n" +
          "        * 三层\n" +
          "            + 四层\n" +
          "+ 一层\n" +
          "\n" +
          "- - -\n" +
          "\n" +
          "\n" +
          "## 六、有序列表\n" +
          "\n" +
          "使用 `1. ` （点号后面有个空格）表示有序列表，可嵌套，例如\n" +
          "\n" +
          "1. 一层\n" +
          "    1. 二层\n" +
          "    2. 二层\n" +
          "2. 一层\n" +
          "\n" +
          "- - -\n" +
          "\n" +
          "\n" +
          "## 七、文字引用\n" +
          "\n" +
          "使用 `>` 表示，可以有多个 `>`，表示层级更深，例如\n" +
          "\n" +
          "> 第一层\n" +
          ">>第二层\n" +
          ">这样是跳不出去的\n" +
          ">>> 还可以更深\n" +
          "\n" +
          "> 这样就跳出去了  \n" +
          "\n" +
          "- - -\n" +
          "\n" +
          "\n" +
          "## 八、行内代码块\n" +
          "\n" +
          "其实上面已经用过很多次了，即使用 \\` 表示，例如\n" +
          "\n" +
          "`行内代码块`\n" +
          "\n" +
          "### 扩展：很多字符是需要转义，使用反斜杠 `\\` 进行转义\n" +
          "\n" +
          "- - -\n" +
          "\n" +
          "\n" +
          "## 九、代码块\n" +
          "\n" +
          "使用四个空格缩进表示代码块，例如\n" +
          "\n" +
          "    public class HelloWorld\n" +
          "    {\n" +
          "        public static void main(String[] args)\n" +
          "        { \n" +
          "            System.out.println( \"Hello, World!\" );\n" +
          "        }\n" +
          "    }\n" +
          "\n" +
          "一些 IDE 支持行数提示和着色，一般使用三个 \\` 表示，例如\n" +
          "\n" +
          "```\n" +
          "public class HelloWorld\n" +
          "{\n" +
          "    public static void main(String[] args)\n" +
          "    { \n" +
          "        System.out.println( \"Hello, World!\" );\n" +
          "    }\n" +
          "}\n" +
          "```\n" +
          "\n" +
          "- - -\n" +
          "\n" +
          "\n" +
          "## 十、表格\n" +
          "\n" +
          "直接看例子吧，第二行的 `---:` 表示了对齐方式，默认**左对齐**，还有**右对齐**和**居中**  \n" +
          "\n" +
          "|商品|数量|单价|\n" +
          "|---|---:|:---:|\n" +
          "|苹果苹果苹果|10|\\$1|\n" +
          "|电脑|1|\\$1999|\n" +
          "\n" +
          "- - -\n" +
          "\n" +
          "\n" +
          "## 十一、数学公式\n" +
          "\n" +
          "使用 `$` 表示，其中一个 \\$ 表示在行内，两个 \\$ 表示独占一行。\n" +
          "例如质量守恒公式：$$E=mc^2$$\n" +
          "支持 **LaTeX** 编辑显示支持，例如：$\\sum_{i=1}^n a_i=0$， 访问 [MathJax][2] 参考更多使用方法。\n" +
          "\n" +
          "推荐一个常用的数学公式在线编译网站： [https://www.codecogs.com/latex/eqneditor.php][3]  \n" +
          "\n" +
          "[2]: http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference  \n" +
          "\n" +
          "[3]: https://www.codecogs.com/latex/eqneditor.php  \n" +
          "\n" +
          "- - -\n" +
          "\n" +
          "\n" +
          "## 十二、支持HTML标签\n" +
          "\n" +
          "### 1. 例如想要段落的缩进，可以如下：\n" +
          "\n" +
          "&nbsp;&nbsp;不断行的空白格&nbsp;或&#160;  \n" +
          "&ensp;&ensp;半方大的空白&ensp;或&#8194;  \n" +
          "&emsp;&emsp;全方大的空白&emsp;或&#8195;  \n" +
          "\n" +
          "\n" +
          "- - -\n" +
          "\n" +
          "## 十三、其它\n" +
          "1. markdown 各个 IDE 的使用可能存在大同小异，一般可以参考各个 IDE 的介绍文档\n" +
          "2. 本文档介绍的内容基本适用于大部分的 IDE\n" +
          "3. 其它一些类似 **流程图** 之类的功能，需要看 IDE 是否支持。"
    }
  },

  mounted: function (){
    this.getMeta();
    this.getmodifyBlog()
  },

  methods:{
    handleChange(){
      if(this.value3.length !== 0) {
        console.log('value3: '+this.value3)
        for (let i = 0; i < this.value3.length; i++) {
          this.arr.push(this.options.options.filter(item => item.value.indexOf(this.value3[i]) !== -1)[0])
        }
        console.log(this.arr)
        // 数组内去重
        // let uniqueArr = [...new Set(this.arr)];
      }
      else {
        this.arr = [];
        console.log(this.arr)
        message.warn('分类不能为空哟 OwO')
      }
    },
    //编辑文本保存方法
    save(){
      console.log("this is render");
      console.log("this is value"+this.$refs.md.d_value);
    },

    //官方文档的原始提交方法
    submit(){
      /*通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
      this.$refs.md为原型方法*/
      // this.$set(this.page_article, "html_content", this.$refs.md.d_render); // html
      // this.$set(this.page_article, "md_content", this.$refs.md.d_value); //md

      console.log(this.$refs.md.d_render);
      console.log(this.$refs.md.d_value);
    },

    //图片上传方法
    // 绑定@imgAdd event
    $imgAdd(pos, $file){
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append('image', $file);
      axios({
        url: 'http://120.55.67.212:8888',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoieHVhbnB0MiIsImV4cCI6MTcyMTk3ODEzNCwiaWF0IjoxNzIxMzczMzM0LCJqdGkiOiIzOWIyZDBlNy0xOTdjLTQ1ZmQtYmMzYS1kODMxN2EwNjFhOWIiLCJhdXRob3JpdGllcyI6W119.FVOoCqgnurKlYR4KryfUXEPv6xo7LtvygpULqPvaEag'},
      }).then((url) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        $vm.$img2Url(pos, url);
      })
    },

    //获取分类数据方法
    getMeta(){
      getAllMetas().then((res)=>{
        for (let i = 0; i < res.data.data.length; i++){
          this.options.options.push({
            value: res.data.data[i].name.toString(),
            description: res.data.data[i].description.toString(),
            id: res.data.data[i].mid,
          })
        }
      })
      // this.options.options = [...Array(25)].map((_, i) => ({ value: (i + 10).toString(36) + (i + 1) }))
      // console.log(this.options.options)
    },


    //blog管理-->文章修改办法
    getmodifyBlog(){
      const route = useRoute()
      this.blogId = route.query.pass
      console.log('接收数据：'+this.blogId)
      if(this.blogId){
        console.log('有参数')
        getContentById(this.blogId).then((res)=>{
            if(res){
              this.value1 = res.data.data.title;
              this.value2 = res.data.data.description;
              if(res.data.data.tagList.length !== 0){
                let getvalue = reactive({
                  getvalue: []
                })
                for(let i=0; i<res.data.data.tagList.length; i++){
                  getvalue.getvalue.push(res.data.data.tagList[i].name)
                  console.log('分类'+getvalue.getvalue)
                  this.value3 = getvalue.getvalue;
                }
              }
              this.$refs.md.d_value = res.data.data.text;
            }
        })
      }
      else{
        this.blogId = '';
        console.log('没参数')
      }
    },

    //判定修改还是发布
    judge(){
      if(this.blogId){
        this.modifyBlog()
      }
      else{
        this.postBlog()
      }
    },

    //修改方法
    modifyBlog(){
      let getTime = new Date().getTime(); //获取到当前时间戳
      let time = new Date(getTime); //创建一个日期对象
      function nowDate(time) {
        let year = time.getFullYear(); // 年
        let month = (time.getMonth() + 1).toString().padStart(2, '0'); // 月
        let date = time.getDate().toString().padStart(2, '0'); // 日
        let hour = time.getHours().toString().padStart(2, '0'); // 时
        let minute = time.getMinutes().toString().padStart(2, '0'); // 分
        let second = time.getSeconds().toString().padStart(2, '0'); // 秒
        return (
            year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second
        )
      }
      getAllContents().then((res0)=>{
        //分类数组去重
        let uniqueArr = this.arr.filter((item, index, array) => {
          return array.indexOf(item) === index;
        });
        console.log(this.arr)
        console.log('这是分类： '+uniqueArr)
        getContentById(this.blogId).then((res1)=>{
          let blogInfo = {
            cid: this.blogId,
            title: this.value1,
            slug: 'Default',
            createdTime: res1.data.data.createdTime,
            modifiedTime: nowDate(time).toString(),
            touchTime: res1.data.data.touchTime,
            text: this.$refs.md.d_value,
            authorId: 1,
            status: 'public',
            commentsNum: 0,
            allowComment: 1,
            description: this.value2,
            clicks: 0,
            tagList: uniqueArr,
          }

          //标题、简介、分类不能为空
          if(this.value1.length !== 0){
            if(this.value2.length !== 0){
              if(this.value3.length !== 0){
                updateContent(blogInfo).then((res)=>{
                  if(res.data.status === 200){
                    message.success({
                      content: () => '修改成功OvO',
                    });
                  }
                  else{
                    message.error({
                      content: () => '修改失败ToT',
                    });
                    console.log(res.data)
                  }
                }) .catch(error=>{
                  console.log(error)
                })
              }
              else {
                message.warn('分类不能为空哟 OwO');
                window.scrollTo({left: 0, top: 0, behavior:'smooth'})
              }
            }
            else {
              message.warn('简介不能为空哟 OwO');
              window.scrollTo({left: 0, top: 0, behavior:'smooth'})
            }
          }
          else {
            message.warn('标题不能为空哟 OwO');
            window.scrollTo({left: 0, top: 0, behavior:'smooth'})
          }
        })
      })
    },

    //发布方法
    postBlog(){
      let getTime = new Date().getTime(); //获取到当前时间戳
      let time = new Date(getTime); //创建一个日期对象
      function nowDate(time) {
        let year = time.getFullYear(); // 年
        let month = (time.getMonth() + 1).toString().padStart(2, '0'); // 月
        let date = time.getDate().toString().padStart(2, '0'); // 日
        let hour = time.getHours().toString().padStart(2, '0'); // 时
        let minute = time.getMinutes().toString().padStart(2, '0'); // 分
        let second = time.getSeconds().toString().padStart(2, '0'); // 秒
        return (
            year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second
        )
      }
      getAllContents().then((res0)=>{
        //分类数组去重
        let uniqueArr = this.arr.filter((item, index, array) => {
          return array.indexOf(item) === index;
        });
        console.log(uniqueArr)
        let blogInfo = {
          cid: res0.data.data.length + 1,
          title: this.value1,
          slug: 'Default',
          createdTime: nowDate(time).toString(),
          modifiedTime: nowDate(time).toString(),
          touchTime: nowDate(time).toString(),
          text: this.$refs.md.d_value,
          authorId: 1,
          status: 'public',
          commentsNum: 0,
          allowComment: 1,
          description: this.value2,
          clicks: 0,
          tagList: uniqueArr,
        }

        //标题、简介、分类不能为空
        if(this.value1.length !== 0){
          if(this.value2.length !== 0){
            if(this.value3.length !== 0){
              saveContent(blogInfo).then((res)=>{
                if(res.data.status === 200){
                  message.success({
                    content: () => '发送成功OvO',
                  });
                }
                else{
                  message.error({
                    content: () => '发送失败ToT',
                  });
                  console.log(res.data)
                }
              }) .catch(error=>{
                console.log(error)
              })
            }
            else {
              message.warn('分类不能为空哟 OwO');
              window.scrollTo({left: 0, top: 0, behavior:'smooth'})
            }
          }
          else {
            message.warn('简介不能为空哟 OwO');
            window.scrollTo({left: 0, top: 0, behavior:'smooth'})
          }
        }
        else {
          message.warn('标题不能为空哟 OwO');
          window.scrollTo({left: 0, top: 0, behavior:'smooth'})
        }
      })
    }
  },
}
</script>

<style>
</style>