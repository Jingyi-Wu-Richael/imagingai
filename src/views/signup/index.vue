<template>
  <div class="page-register">
    <el-form ref="signForm" :model="signForm" :rules="rules" class="sign-form" auto-complete="on" label-position="left">

      <div class="logo">
        <img src="@/assets/login/u4.jpg" alt="">
      </div>
      <div class="titlel-container">
        <h3 class="titlel" style="text-align: center;">Welcome</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="signForm.username" placeholder="account" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input v-model="signForm.password" type="password" placeholder="password" />
      </el-form-item>

      <el-form-item prop="repeated">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input v-model="signForm.repeated" type="password" placeholder="Repeat the password" />
      </el-form-item>

      <el-button :loading="loading" type="primary" class="btn-form" @click="handleSignup">Activate the new account</el-button>
      <div class="goHome">
        <router-link to="/">Home</router-link>
      </div>
    </el-form>

  </div>
</template>

<script>

export default {
  data () {

    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input a password'));
      } else {
        if (this.signForm.password !== '') {
          this.$refs.signForm.validateField('repeated');
        }
        callback();
      }
    };
    var validateChePwd = (rule, value, callback) => {
      console.log(value);
      if (value === '') {
        callback(new Error('Please enter the password again'));
      } else if (value !== this.signForm.password) {
        callback(new Error('The two passwords are inconsistent!'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      signForm: {
        username: '',
        password: '',
        repeated: '',
      },
      rules: {
        username: [{ required: true, type: 'string', trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        repeated: [{ required: true, trigger: 'blur', validator: validateChePwd }]
      },
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
    handleSignup () {
      this.$refs.signForm.validate(valid => {
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
$bg: #fff;
$light_gray: #333;
$cursor: #333;

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
$bg: #fff;
$dark_gray: #889aa4;
$light_gray: #eee;

.page-register {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  position: relative;
  .logo {
    text-align: center;
    img {
      width: 50%;
    }
  }
  .sign-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 520px;
    max-width: 100%;
    padding: 1rem 1.5rem;
    margin: 0 auto;
    box-shadow: 0px 0px 10px rgb(0 0 0 / 35%);
    border-radius: 10px;
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
.goHome {
  position: absolute;
  top: 0;
  right: -30%;
  color: #000;
  background: #07f1ed3e;
  padding: 0.5rem 1rem;
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
