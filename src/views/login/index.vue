<template>
  <div class="forms">
    <div class="relative min-h-screen flex">
      <div class="
                    flex flex-col
                    sm:flex-row
                    items-center
                    md:items-start
                    sm:justify-center
                    md:justify-start
                    flex-auto
                    min-w-0
                    bg-white
                ">
        <div class="
                        sm:w-1/2
                        xl:w-3/5
                        h-full
                        hidden
                        md:flex
                        flex-auto
                        items-center
                        justify-center
                        p-10
                        overflow-hidden
                        bg-purple-900
                        text-white
                        bg-no-repeat bg-cover
                        relative
                        loginBg
                    " >
          <div class="
                            shadow
                            absolute
                            bg-gradient-to-b
                            from-indigo-600
                            to-blue-500
                            opacity-75
                            inset-0
                            z-0
                        "></div>
          <div class="w-full max-w-md z-10" style="min-height: 340px;">
            <div class="sm:text-2xl xl:text-3xl font-bold leading-tight mb-6">{{ title }}</div>
            <div class="sm:text-sm xl:text-md text-gray-200 font-normal">
            </div>
            <div class="welcome"></div>

          </div>
          <ul class="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div class="
                        md:flex md:items-center md:justify-center
                        w-full
                        sm:w-auto
                        md:h-full
                        w-2/5
                        xl:w-2/5
                        p-8
                        md:p-10
                        lg:p-14
                        sm:rounded-lg
                        md:rounded-none
                        bg-white
                    ">
          <div class="max-w-md w-full mx-auto space-y-8">
            <div class="text-center">
              <h2 class="mt-6 text-3xl font-bold text-gray-900">
                <img src="@/assets/login/u4.jpg" alt="">
              </h2>
              <p class="mt-2 text-sm text-gray-500"></p>
            </div>
            <div class="flex items-center justify-center space-x-2">
              <span class="h-px w-16 bg-gray-200"></span>
              <span class="text-gray-300 font-normal">Log in using your account</span>
              <span class="h-px w-16 bg-gray-200"></span>
            </div>
            <section class="mt-8 space-y-6">
              <input type="hidden" name="remember" value="true" />
              <div class="relative">
                <label class="ml-3 text-sm font-bold text-gray-700 tracking-wide">Account</label>
                <input v-model="loginForm.username" class="
                                        w-full
                                        text-base
                                        px-4
                                        py-2
                                        border-b border-gray-300
                                        focus:outline-none
                                        rounded-2xl
                                        focus:border-indigo-500
                                    " type="" placeholder="Enter your username" />
              </div>
              <div class="mt-8 content-center">
                <label class="ml-3 text-sm font-bold text-gray-700 tracking-wide">Password</label>
                <input v-model="loginForm.password" class="
                                        w-full
                                        content-center
                                        text-base
                                        px-4
                                        py-2
                                        border-b
                                        rounded-2xl
                                        border-gray-300
                                        focus:outline-none focus:border-indigo-500
                                    " type="password" placeholder="Enter your password" />
              </div>

              <div>
                <button @click="handleLogin" type="submit" class="
                                        w-full
                                        flex
                                        justify-center
                                        bg-gradient-to-r
                                        from-gray-600
                                        to-gray-500
                                        hover:bg-gradient-to-l
                                        hover:from-gray-600
                                        hover:to-gray-500
                                        text-gray-100
                                        p-4
                                        rounded-full
                                        tracking-wide
                                        font-semibold
                                        shadow-lg
                                        cursor-pointer
                                        transition
                                        ease-in
                                        duration-500
                                    ">Login</button>
              </div>
              <p class="
                                    items-center
                                    justify-center
                                    mt-10
                                    text-center text-md text-gray-500
                                ">
                <span>Don't have an account yet? </span>
                <span @click="handleSignup" class="
                                        text-indigo-400
                                        hover:text-blue-500
                                        no-underline
                                        hover:underline
                                        cursor-pointer
                                        transition
                                        ease-in
                                        duration-300
                                    ">Register Now</span>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Typed from 'typed.js';
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      title: "Automatic Brain Tumour Segmentation deploying Gibbs ResUnet",
      //title_sub: "bullet point",
      strings: [
        "<div>·manage your own project</div> <div>·work as a team</div> <div>·real time training your own model</div> <div>·real time testing using your chosen model</div> <div>·3d virtualise your MRI images</div>",
      ]
    }
  },
  mounted () {
    const options = {
      strings: this.strings,
      smartBackspace: true,
      typeSpeed: 50, // 打印速度
      startDelay: 300, // 开始之前的延迟300毫秒
      loop: false, // 是否循环
    };

    const typed = new Typed('.welcome', options);
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
    handleLogin () {
      const { username, password } = this.loginForm
      if (username == "") {
        this.$notify({
          title: 'warning',
          message: 'Account name is required',
          type: 'warning'
        });
        return
      }

      if (password == "") {
        this.$notify({
          title: 'warning',
          message: 'Password is required',
          type: 'warning'
        });
        return
      }
      this.loading = true
      this.$store.dispatch('user/login', this.loginForm)
        .then(() => {
          this.$router.push({ path: this.redirect || '/' })
          this.loading = false
        }).catch((res) => {
          this.$message({
            type: 'error',
            message: res
          })
          this.loading = false
        })
    },
    handleSignup () {
      console.log('register');
      this.$router.push({ path: '/signup' })
    }
  }
}
</script>
<style src="../../assets/css/tailwind.min.css" scoped></style>
<style src="../../assets/css/style.css" scoped></style>
<style lang="scss" scoped>
.welcome {
  // 字体大小
  font-size: 20px;
  // 行高
  line-height: 2;
}
.loginBg {
  // 背景图片
  background-image: url(../../assets/login/3.jpeg);
}
.shadow{
  // 渐变修改
  background: linear-gradient(to left,rgb(34, 46, 80),rgb(49, 43, 83));
  
}
</style>

