<template>
  <div class="app-container">
    <h3>Search</h3>
    <div class="inp" style="width: 20%;margin: 20px 0;">
      <el-input placeholder="input project name" v-model="search" class="input-with-select">
        <el-button @click="handlerSearch" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="teamName" label="Team Name" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.teamName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Datafile ID" width="200">
        <template slot-scope="scope">
          {{ scope.row.dataFileID }}
        </template>
      </el-table-column>
      <el-table-column label="Project Name" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.projectID }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="ifProcessed" width="" align="center">
        <template slot-scope="scope">
          <el-tag>{{scope.row.ifProcessed  }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { showDatabase, joinTeams } from '@/api/user'
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
    handlerSearch () {
      if (this.search == '') return this.$message({ type: 'warning', message: 'team name not empty' })
      this.fetchData()
    },
    fetchData () {
      this.listLoading = true
      // showDatabase({teamName:this.search,token:this.user.token}).then(response => {
      showDatabase({ projectName: this.search, token: this.user.token }).then(response => {
        console.log(response);
        if (isArray(response) && response.length < 1) {
          // this.$message({ type: 'warning', message: '' })
        }
        this.list = [...response]
        this.listLoading = false
      })
        .catch(err => {
          this.listLoading = false

        })
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>
