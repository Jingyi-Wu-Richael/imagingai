<template>
  <div class="app-container">
    <h3>Search</h3>
    <div class="inp" style="width: 20%;margin: 20px 0;">
      <el-input placeholder="input team name" v-model="search" class="input-with-select">
        <el-button @click="handlerSearch" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>

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
      <el-table-column align="center" prop="created_at" label="Display_time">
        <template slot-scope="scope">
          <el-button @click="handlerChange(scope.row.teamName)" type="primary">Join Team</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { teamSearch, joinTeams } from '@/api/user'
import { isArray } from 'util'
import { mapState } from 'vuex'
export default {

  data () {
    return {
      list: null,
      listLoading: false,
      search: ""
    }
  },
  created () {
    // this.fetchData()
  },
  methods: {
    async handlerChange (teamName) {
      const res = await joinTeams({ teamName, token: this.user.token })
      this.$message({
        type:'success',
        message: res.msg
      })
      console.log(res);
    },
    handlerSearch () {
      if (this.search == '') return this.$message({ type: 'warning', message: 'team name not empty' })
      this.fetchData()
    },
    fetchData () {
      this.listLoading = true
      // teamSearch({teamName:this.search,token:this.user.token}).then(response => {
        teamSearch(this.search).then(response => {
          console.log(response);
        if (isArray(response) && response.length < 1) {
          // this.$message({ type: 'warning', message: 'Team details bu' })
        }
        this.list = [response]
        this.listLoading = false
      })
      .catch(err=>{
        this.listLoading = false

      })
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>
