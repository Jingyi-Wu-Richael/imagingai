<template>
  <div class="app-container">
    <el-form ref="createTeam" :rules="rules" :model="form" label-width="120px" v-loading="loading">
      <el-form-item prop="name" label="Team Name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item prop="size" label="Team Size">
        <el-input v-model="form.size" type="text" />
      </el-form-item>
      <el-form-item label="Open to Public">
        <el-switch v-model="form.isPublic" />
      </el-form-item>
      <el-form-item prop="description" label="Description">
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { teamCreate } from '@/api/user'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      loading: false,
      form: {
        name: '',
        size: '',
        isPublic: false,
        description: ''
      },
      rules: {
        name: [{ required: true, trigger: 'blur', message: "Team Name is required" }],
        size: [{ required: true, trigger: 'blur', message: "Team Size is required" }],
        description: [{ required: true, trigger: 'blur', message: "Team Description is required" }]
      }
    }
  },
  methods: { 
    onSubmit () {
      this.$refs.createTeam.validate(valid => {
        if (valid) {
          this.loading = true
          teamCreate({
            "teamName": this.form.name,
            "token": this.user.token,
            "Team Size": this.form.size,
            "isPublic": this.form.isPublic,
            "description": this.form.description
          })
            .then((res) => {
              if(res.msg = 'create team success!'){
                this.$message({
                  type: "success",
                  message: res.msg
                })
              }
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
    onCancel () {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  },
  computed:{
    ...mapState(['user'])
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

