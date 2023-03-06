<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="teamName" width="200">
        <template slot-scope="scope">
          {{ scope.row.teamName }}
        </template>
      </el-table-column>
      <el-table-column label="owner" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.owner }}</span>
        </template>
      </el-table-column>
      <el-table-column label="scale" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.scale }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="isPublic" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{scope.row.isPublic  }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createdTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Modify">
        <template slot-scope="scope">
          <el-button @click="handlerChange(scope.row)" type="primary">Modify</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="Team Info" :visible.sync="dialogFormVisible">
      <el-form ref="modifyTeam" :rules="rules" :model="changeTempForm" label-width="120px">
        <el-form-item prop="teamName" label="Team Name">
          <el-input v-model="changeTempForm.teamName" />
        </el-form-item>
        <el-form-item prop="scale" label="Team scale">
          <el-input v-model="changeTempForm.scale" type="text" />
        </el-form-item>
        <el-form-item label="Open to Public">
          <el-switch v-model="changeTempForm.isPublic" />
        </el-form-item>
        <el-form-item prop="description" label="Description">
          <el-input v-model="changeTempForm.description" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { getTeams, modifyTeam } from '@/api/user'
import { isArray } from 'util'
import { mapState } from 'vuex'
export default {

  data () {
    return {
      list: null,
      listLoading: false,
      search: "",
      dialogFormVisible: false,
      changeTempForm: {
        teamName: '',
        scale: '',
        isPublic: false,
        description: ''
      },
      rules: {
        teamName: [{ required: true, trigger: 'blur', message: "Team Name is required" }],
        scale: [{ required: true, trigger: 'blur', message: "Team Size is required" }],
        description: [{ required: true, trigger: 'blur', message: "Team Description is required" }]
      }
    }
  },
  created () {
    this.fetchData()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    handlerChange (row) {
      this.changeTempForm = Object.assign({}, row)
      this.dialogFormVisible = true
    },
    onSubmit () {
      this.$refs.modifyTeam.validate(valid => {
        if (valid) {
          modifyTeam({
            "id": this.changeTempForm.id,
            "teamName": this.changeTempForm.teamName,
            "token": this.user.token,
            "Team Size": this.changeTempForm.scale,
            "isPublic": this.changeTempForm.isPublic,
            "description": this.changeTempForm.description
          })
            .then((res) => {
              this.$message({
                type: "success",
                message: res.msg
              })
              this.fetchData()
            }).catch(() => {
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    fetchData () {
      const formData = new FormData()
      formData.append("token", this.user.token)

      this.listLoading = true

      getTeams(formData).then(response => {
        if (isArray(response) && response.length < 1) {
          // this.$message({ type: 'warning', message: 'Team details bu' })
        }
        this.list = response
        console.log(response);
        this.listLoading = false
      })
    }
  }
}
</script>
