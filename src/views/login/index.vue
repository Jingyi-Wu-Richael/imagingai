<template>
  <div class="login">
    <div class="header">
      <h3 class="title">Medical Brain Imaging AI</h3>
      <div class="logo">
        <img src="@/assets/login/u4.jpg" alt="">
      </div>
    </div>
    <div class="login-container">

      <div class="form-box">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

          <div class="title-container">
            <h3>User Login</h3>
          </div>

          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input ref="username" v-model="loginForm.username" placeholder="Account" name="username" type="text" tabindex="1" auto-complete="on" />
          </el-form-item>

          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="Password" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>

          <!-- login button -->
          <div>
            <el-button :loading="loading" size="medium" type="primary" class="btn-form" style=" margin-bottom:1rem;" @click.native.prevent="handleLogin">Login</el-button>
          </div>
          <div>
            <el-button :loading="loading" size="medium" type="primary" class="btn-form" @click="handleSignup">Sign up</el-button>
          </div>

        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
export default {
  name: 'Login',
  data () {
    const validateUsername = (rule, value, callback) => {
      // if (!validUsername(value)) {
      //   callback(new Error('Please enter the correct user name'))
      // } else {
      //   callback()
      // }
      callback()
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleSignup () {
      console.log('register');
      this.$router.push({ path: '/signup' })

      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     this.loading = true
      //     this.$store.dispatch('user/signup', this.signForm).then(() => {
      //       this.$router.push({ path: this.redirect || '/' })
      //       this.loading = false
      //     }).catch(() => {
      //       this.loading = false
      //     })
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #fff;
$light_gray: #333;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  // 文本框
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      appearance: none;
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
  //文本框边框
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #fff;
$dark_gray: #889aa4;
$light_gray: #333;

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 0 auto;
}
.logo {
  img {
    width: 203px;
    height: 70px;
  }
}
.login {
  height: 100vh;
  overflow: hidden;
}
// 登录页面全体
.login-container {
  width: 100%;
  height: 100%;
  background-color: $bg;
  overflow: hidden;
  background: url(../../assets/login/u0_state0.jpg) no-repeat center
    center/cover;
  .form-box {
    display: flex;
    justify-content: flex-end;
    width: 80%;
    margin: 0 auto;
    padding: 4rem 0;
  }
  .login-form {
    position: relative;
    width: 30%;
    overflow: hidden;
    background: #fff;
    padding: 2rem;
    box-shadow: 0 0 0 0.2rem rgba(229, 227, 227, 0.5);
  }

  //登录按钮下面那行话
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

    //文字
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.login >>> .el-button + .el-button {
  margin: 0;
}
.btn-form {
  display: block;
  width: 100%;
  line-height: 2;
  background: rgba(215, 215, 215, 1);
  border: none;
  &:hover {
    background: rgb(87, 87, 87);
  }
}
</style>
