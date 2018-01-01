<template>
  <div class="user-list">
    <el-tabs v-model="activeName">
      <el-tab-pane label="角色列表" name="first">
        <div class="user-table-options">
          <el-input @keyup.enter.native="" style="width: 200px;" class="filter-item"
                    placeholder="请输入用户名">
          </el-input>
          <el-button type="primary"><i class="el-icon-search"></i> 搜索</el-button>
          <el-button class="filter-item" style="margin-left: 10px;" @click="" type="primary"><i class="el-icon-edit"></i> 添加
          </el-button>
        </div>
        <div class="handler-table">
          <el-table :data="tableData" border style="width: 100%" ref="multipleTable"
                    @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="55"></el-table-column>

            <el-table-column prop="realname" label="登录名">
            </el-table-column>

            <el-table-column prop="username" label="用户名">
            </el-table-column>

            <el-table-column prop="created" label="创建时间" sortable>
            </el-table-column>

            <el-table-column prop="modified" label="更新时间" sortable>
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
              :total="totalCount">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        inputDate: '',
        inputName: '',
        activeName: 'first',
        tableData: [],
        cur_page: 1,
        multipleSelection: [],
        select_cate: '',
        select_word: '',
        del_list: [],
        is_search: false,
        totalCount:0,
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
        this.$store.dispatch('queryUserList', {page: this.cur_page, pageSize: 5})
          .then(data => {
            this.tableData = data.userList.list;
            this.totalCount = data.userList.totalCount;
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
        this.dialogVisible = true;
        //this.$message.error('删除第' + (index + 1) + '行');
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
  .handler-table {
    margin: 10px;
  }

  .user-table-options {
    margin: 0px 10px 0px 10px;
  }
</style>
