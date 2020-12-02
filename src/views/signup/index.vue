<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">用户注册</h3>
      </div>

      <el-form-item prop="loginName">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="loginName"
          v-model="loginForm.loginName"
          placeholder="请填写用户名"
          name="loginName"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="passwd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="passwd"
          v-model="loginForm.passwd"
          :type="passwordType"
          placeholder="请填写密码"
          name="passwd"
          tabindex="2"
          auto-complete="off"
        />
      </el-form-item>

      <el-form-item prop="repeatPasswd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="repeatPasswd"
          v-model="loginForm.repeatPasswd"
          :type="passwordType"
          placeholder="请重复密码"
          name="repeatPasswd"
          tabindex="2"
          auto-complete="off"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">注册</el-button>

      <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div> -->

    </el-form>
  </div>
</template>

<script>
import { validLoginName } from '@/utils/validate'
import { signup } from '@/api/sys/user';

export default {
  name: 'Singup',
  data() {
    const validateLoginName = (rule, value, callback) => {
      const regex = /[0-9A-HJ-NPQRTUWXY]{8}-[0-9A-HJ-NPQRTUWXY]/gm
      if(regex.exec(value)===null) callback(new Error("请输入正确的社会信用代码"))
      validLoginName(value).then((res)=>{
        if(res=="true"){
          callback()
        }else{
          callback(new Error('该账户经注册'))
        }
      })
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    const validateRepeatPassword = (rule, value, callback) => {
      if (this.loginForm.passwd==value) {
        callback()
      } else {
        callback(new Error('两次输入的密码不一致'))
      }
    }
    return {
      loginForm: {
        loginName: '',
        passwd: '',
        repeatPasswd:''
      },
      loginRules: {
        loginName: [{ required: true, trigger: 'blur', validator: validateLoginName }],
        passwd: [{ required: true, trigger: 'blur', validator: validatePassword }],
        repeatPasswd: [{required: true, trigger: 'blur', validator: validateRepeatPassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          console.log("开始注册");
          signup(this.loginForm).then((response)=>{
            let username=this.loginForm.loginName
            let password=this.loginForm.passwd
            this.$store.dispatch('user/login', {username:username,password:password}).then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            }).catch((error) => {
              console.log(error|| '登录出错~')
              this.loading = false
            })
          })
        } else {
          console.log('valid failed!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

}
</style>
