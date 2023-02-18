<template>
  <div class="page-register">
    <el-form 
    ref="signForm" 
    :model="signForm" 
    :rules="signRules" 
    class="sign-form" 
    auto-complete="on" 
    label-position="left">

      <div class="titlel-container">
        <h3 class="titlel">Sign up</h3>
      </div>

      <el-form-item label="用户名" prop="username">
          <el-input v-model="signForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
          <el-input v-model="signForm.password" type="password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="repeated">
          <el-input v-model="signForm.repeated" type="password" />
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click = "handleSignup">Sign up</el-button>

    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  // name: 'Login',
  data() {
    return {
      step: 2,
      active: 0,
      statusMsg: '',
      error: '',
      ruleForm: {
        username: '',
        password: '',
        repeated: '',
      },
      rules: {
        username: [
          { required: true, type: 'string', message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        repeated: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
        ]
      }, 
    },{
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.signForm.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      },
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
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    signup: function() {
      this.$refs['signForm'].validate((valid) => {
        if (valid) {
          setTimeout(
            this.$router.push('/login'), 2000
          )
        }
      })
    },
    handleSignup() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/signup', this.signForm).then(() => {
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
    }
  }
}
</script>

<style lang="scss">

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .page-register .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.page-register {
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

.page-register {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .sign-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
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
</style>
