<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> 用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="handle-box">
      <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
      <el-input v-model="select_word" placeholder="用户名" class="handle-input mr10"></el-input>
      <el-button type="primary" icon="search" @click="search">搜索</el-button>
    </div>

    <el-table :data="tableData" border style="width: 100%" ref="multipleTable"
              @selection-change="handleSelectionChange">

      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column prop="name" label="姓名">
      </el-table-column>

      <el-table-column prop="createTime" label="创建时间" sortable>
      </el-table-column>

      <el-table-column label="操作" width="180">
        <template scope="scope">
          <el-button size="small"
                     @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button size="small" type="danger"
                     @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        cur_page: 1,
        multipleSelection: [],
        select_cate: '',
        select_word: '',
        del_list: [],
        is_search: false
      }
    },
    created() {
      this.getData();
    },
    methods: {
      handleCurrentChange(val) {
        this.cur_page = val;
        this.getData();
      },
      getData() {
        this.$store.dispatch('queryUserList', data).then((res) => {
          if (res.success) {
            this.fromUrlList = res.fromUrlList
            this.serverData = deepClone(res.data)
            this.headOptions = optionTimeTypeCheck(deepClone(res.tableHeader) || this.headOptions)
          }
        });
      },
    }
  }
</script>

<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }
</style>
