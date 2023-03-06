<template>
  <div class="app-container">
    <el-form ref="createTeam" :rules="rules" :model="form" label-width="120px" v-loading="loading">
      <el-form-item prop="projectName" label="Project Name">
        <el-input v-model="form.projectName" />
      </el-form-item>
      <el-form-item prop="epoch" label="Epoch">
        <el-input v-model.number="form.epoch" />
      </el-form-item>
      <el-form-item prop="alpha" label="Alpha">
        <el-input v-model="form.alpha"  @keyup.native="form.alpha = oninput(form.alpha,2)">
          <template slot="append">alpha is the intensity of the applied Gibbs noise layer</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button disabled type="primary" @click="onSubmit">start training</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
    <div v-show="tensorboardURL" class="res">
      <el-divider></el-divider>
      <div>click here to get the tensorboard link of your model (to see your training loss)</div>
      <el-link type="primary" :href="tensorboardURL">{{ tensorboardURL }}</el-link>
    </div>
  </div>
</template>

<script>
import { trainModel } from '@/api/user'
import { mapState } from 'vuex'
export default {
  data () {
    var checkNum = (rule, value, callback) => {
      if (!Number.isInteger(value)) {
        callback(new Error('Please enter a numeric value'));
      }
      callback();
    };

    return {
      loading: false,
      tensorboardURL:'',
      form: {
        projectName: '',
        epoch: '',
        alpha: '',
      },
      rules: {
        projectName: [{ required: true, trigger: 'blur', message: "Project Name is required" }],
        epoch: [
          { required: true, trigger: 'blur', message: "Epoch is required" },
          { validator: checkNum, trigger: 'blur' }
        ],
        alpha: [
          { required: true, trigger: 'blur', message: "Alpha is required" },
        ]
      }
    }
  },
  methods: {
    oninput (num, limit) {
      var str = num
      var len1 = str.substr(0, 1)
      var len2 = str.substr(1, 1)
      //如果第一位是0，第二位不是点，就用数字把点替换掉
      if (str.length > 1 && len1 == 0 && len2 != ".") {
        str = str.substr(1, 1)
      }
      //第一位不能是.
      if (len1 == ".") {
        str = ""
      }
      //限制只能输入一个小数点
      if (str.indexOf(".") != -1) {
        var str_ = str.substr(str.indexOf(".") + 1)
        if (str_.indexOf(".") != -1) {
          str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1)
        }
      }
      //正则替换
      str = str.replace(/[^\d^\.]+/g, '') // 保留数字和小数点
      if (limit / 1 === 1) {
        str = str.replace(/^\D*([0-9]\d*\.?\d{0,1})?.*$/, '$1') // 小数点后只能输 1 位
      } else {
        str = str.replace(/^\D*([0-9]\d*\.?\d{0,2})?.*$/, '$1') // 小数点后只能输 2 位
      }
      return str
    },
    onSubmit () {
      this.$refs.createTeam.validate(valid => {
        if (valid) {
          this.loading = true
          trainModel({
            "projectName": this.form.projectName,
            "alpha": this.form.alpha,
            "token": this.user.token,
            "epoch": this.form.epoch,
          })
            .then((res) => {
              console.log(res);
              this.$message({
                type: "success",
                message: res.msg
              })
              this.loading = false
              this.tensorboardURL = res.tensorboardURL
            }).catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onCancel () {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

