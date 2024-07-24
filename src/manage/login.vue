<template>
  <div class="body">
    <div class="main-box">

      <div :class="['container', 'container-register', { 'is-txl': isLogin }]">
        <form>
          <h2 :class="['title', {'animate__animated animate__bounce animate__delay-1s': !isLogin}]">返回访客端</h2>
<!--          <div class="form__icons">-->
<!--            <img class="form__icon" src="../assets/images/login/wechat.png" alt="微信登录">-->
<!--            <img class="form__icon" src="../assets/images/login/alipay.png" alt="支付宝登录">-->
<!--            <img class="form__icon" src="../assets/images/login/QQ.png" alt="QQ登录">-->
<!--          </div>-->
<!--          <span class="text">或使用邮箱进行注册</span>-->
<!--          <input class="form__input" type="text" placeholder="请输入用户名"/>-->
<!--          <input class="form__input" type="text" placeholder="请输入邮箱"/>-->
<!--          <input class="form__input" type="password" placeholder="请输入密码"/>-->
<!--          <input class="form__input" type="password" placeholder="请确认密码"/>-->
<!--          <div class="form__button" @click="gotoFunk()">撤!</div>-->
          <AButton class="form__button" type="link" :href="homeUrl">撤!</AButton>
        </form>
      </div>

      <div :class="['container', 'container-login', { 'is-txl is-z200': isLogin }]">
        <form>
          <h2 :class="['title', {'animate__animated animate__bounce animate__delay-1s': isLogin}]">登录</h2>

          <span class="text">使用用户名登录吧！</span>
          <input class="form__input" type="text" ref="username" placeholder="用户名"/>
          <input class="form__input" type="password" ref="password" placeholder="请输入密码"/>
          <div class="form__button" @click="userLogin">立即登录</div>
        </form>
      </div>

      <div :class="['switch', { 'login': isLogin }]">
        <div class="switch__circle"></div>
        <div class="switch__circle switch__circle_top"></div>
        <div class="switch__container">
          <h2>{{ isLogin ? '您好 !' : '欢迎回来 !' }}</h2>
          <p>
            {{
              isLogin
                  ? '如果您不想登录，返回访客页吧! OwO'
                  : '如果您是管理员，请点击下方按钮进行登录'
            }}
          </p>
          <div class="form__button" @click="isLogin = !isLogin">
            {{ isLogin ? '访客端' : '立即登录' }}
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import router from "@/router";
import {login} from "@/utils/manage";
import {message} from "ant-design-vue";

export default {
  name: 'Login',
  data() {
    return {
      isLogin: true,
      loginForm: {
        email: '',
        password: '',
      },
      registerForm: {
        name: '',
        email: '',
        password: '',
      },
      homeUrl: "http://" + window.location.host,
    }
  },
  methods: {
    userLogin() {
      console.log(this.$refs.username.value)
      console.log(this.$refs.password.value)
      // router.push({path: '/manage/main'})
      if(this.$refs.username.value){
        if(this.$refs.password.value){
          login(this.$refs.username.value,this.$refs.password.value).then((res)=>{
            if(res.data.status === 200){
              let name = this.$refs.username.value;
              router.push({path: '/manage/main',query: {name}})
              message.success('登陆成功OwO')
            }
            else{
              message.error('用户名或密码错误ToT')
            }
          })
        }
        else{
          message.warn('还没有填密码哟OwO')
        }
      }
      else{
        message.warn('还没有填用户名哟OwO')
      }
    },
  },
}
</script>

<style scoped >

.body {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  background: url("@/assets/images/background/plana.png") center;
  background-size: cover;
  color: #a0a5a8;
}

.main-box {
  opacity: 0.9;
  display: flex;
  position: relative;
  width: 55%;
  min-width: 800px;
  min-height: 200px;
  height: 80%;
  padding: 25px;
  background-color: #ecf0f3;
  box-shadow: 10px 10px 10px #d1d9e6;
  border-radius: 12px;
  overflow: hidden;
}
.main-box .container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  width: 60%;
  height: 100%;
  padding: 25px;
  background-color: #ecf0f3;
  transition: all 1.25s;
}
.main-box .container form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: #a0a5a8;
}
.main-box .container form .form__icon {
  object-fit: contain;
  width: 30px;
  margin: 0 5px;
  opacity: 0.5;
  transition: 0.15s;
}
.main-box .container form .form__icon:hover {
  opacity: 1;
  transition: 0.15s;
  cursor: pointer;
}
.main-box .container form .title {
  font-size: 34px;
  font-weight: 700;
  line-height: 3;
  color: #181818;
}
.main-box .container form .text {
  margin-top: 30px;
  margin-bottom: 12px;
}
.main-box .container form .form__input {
  width: 350px;
  height: 40px;
  margin: 4px 0;
  padding-left: 25px;
  font-size: 13px;
  letter-spacing: 0.15px;
  border: none;
  outline: none;
  background-color: #ecf0f3;
  transition: 0.25s ease;
  border-radius: 8px;
  box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
}
.main-box .container form .form__input::placeholder {
  color: #a0a5a8;
}
.main-box .container-register {
  z-index: 100;
  left: 40%;
}
.main-box .container-login {
  left: calc(100% - 600px);
  z-index: 0;
}
.main-box .is-txl {
  left: 0;
  transition: 1.25s;
  transform-origin: right;
}
.main-box .is-z200 {
  z-index: 200;
  transition: 1.25s;
}
.main-box .switch {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 40%;
  padding: 50px;
  z-index: 200;
  transition: 1.25s;
  background-color: #ecf0f3;
  overflow: hidden;
  box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #f9f9f9;
  color: #a0a5a8;
}
.main-box .switch .switch__circle {
  position: absolute;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background-color: #ecf0f3;
  box-shadow: inset 8px 8px 12px #d1d9e6, inset -8px -8px 12px #f9f9f9;
  bottom: -40%;
  left: -20%;
  transition: 1.25s;
}
.main-box .switch .switch__circle_top {
  top: -30%;
  left: 60%;
  width: 250px;
  height: 250px;
}
.main-box .switch .switch__container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  width: 300px;
  padding: 50px 55px;
  transition: 1.25s;
}
.main-box .switch .switch__container h2 {
  font-size: 34px;
  font-weight: 700;
  line-height: 3;
  color: #181818;
}
.main-box .switch .switch__container p {
  font-size: 14px;
  letter-spacing: 0.25px;
  text-align: center;
  line-height: 1.6;
}
.main-box .login {
  left: 60%;
}
.main-box .login .switch__circle {
  left: 0;
}
.main-box .form__button {
  width: 180px;
  height: 50px;
  border-radius: 25px;
  margin-top: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 14px;
  letter-spacing: 2px;
  background-color: #4b70e2;
  color: #f9f9f9;
  cursor: pointer;
  box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
}
.main-box .form__button:hover {
  box-shadow: 2px 2px 3px 0 rgba(255, 255, 255, 0.5), -2px -2px 3px 0 rgba(116, 125, 136, 0.5), inset -2px -2px 3px 0 rgba(255, 255, 255, 0.2), inset 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
}
* {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
</style>
