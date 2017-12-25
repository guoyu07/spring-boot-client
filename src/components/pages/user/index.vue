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
      <el-button type="primary" icon="search" @click="getData">搜索</el-button>
    </div>

    <el-table :data="tableData" border style="width: 100%" ref="multipleTable"
              @selection-change="handleSelectionChange">

      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column prop="name" label="姓名">
      </el-table-column>

      <el-table-column prop="createTime" label="创建时间" sortable>
      </el-table-column>

      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
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
    computed: {
      data() {
        const self = this;
        return self.tableData.filter(function (d) {
          let is_del = false;
          for (let i = 0; i < self.del_list.length; i++) {
            if (d.name === self.del_list[i].name) {
              is_del = true;
              break;
            }
          }
          if (!is_del) {
            if (d.address.indexOf(self.select_cate) > -1 &&
              (d.name.indexOf(self.select_word) > -1 ||
                d.address.indexOf(self.select_word) > -1)
            ) {
              return d;
            }
          }
        })
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.cur_page = val;
        this.getData();
      },
      getData() {
        this.$store.dispatch('queryUserList', {page: this.cur_page, pageSize: 2})
          .then(response => {
            console.log(response);
            if (response.data.success) {
              console.log(response.data.data.userList.list);
              this.tableData = response.data.data.userList.list;
            }
          });
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      handleEdit(index, row) {
        this.$message('编辑第' + (index + 1) + '行');
      },
      handleDelete(index, row) {
        this.$message.error('删除第' + (index + 1) + '行');
      },
      delAll() {
        const self = this,
          length = self.multipleSelection.length;
        let str = '';
        self.del_list = self.del_list.concat(self.multipleSelection);
        for (let i = 0; i < length; i++) {
          str += self.multipleSelection[i].name + ' ';
        }
        self.$message.error('删除了' + str);
        self.multipleSelection = [];
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
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
