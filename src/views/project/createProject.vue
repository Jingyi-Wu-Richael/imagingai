<template>
  <div class="app-container">
    <el-form ref="createTeam" :rules="rules" :model="form" label-width="120px" v-loading="loading">
      <el-form-item prop="projectName" label="Project Name">
        <el-input v-model="form.projectName" />
      </el-form-item>
      <el-form-item prop="teamName" label="Team Name">
        <el-input v-model="form.teamName" />
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
import { projectCreate } from '@/api/user'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      loading: false,
      form: {
        projectName: '',
        teamName: '',
        size: '',
        isPublic: false,
        description: ''
      },
      rules: {
        projectName: [{ required: true, trigger: 'blur', message: "Project Name is required" }],
        teamName: [{ required: true, trigger: 'blur', message: "Team Name is required" }],
        description: [{ required: true, trigger: 'blur', message: "Team Description is required" }]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.createTeam.validate(valid => {
        if (valid) {
          this.loading = true
          projectCreate({
            "projectName": this.form.projectName,
            "teamName": this.form.teamName,
            "token": this.user.token,
            "isPublic": this.form.isPublic,
            "description": this.form.description
          })
            .then((res) => {
              console.log(res);
              this.$message({
                type: "success",
                message: res.msg
              })
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

