<template>
  <div class="user-wrapper">
    <div class="user-inner-wapper">
      <div class="user-table-options">
        <el-input v-model="queryContent" @keyup.enter.native="queryByCondition" style="width: 250px;"
                  class="filter-item"
                  placeholder="请输入角色名称" clearable>
        </el-input>
        <el-button type="primary" style="margin-left: 8px;" @click="queryByCondition"><i class="el-icon-search"></i> 搜索
        </el-button>
        <el-button class="filter-item" style="margin-left: 10px;" @click="showRoleAddForm" type="primary"
                   unique-opened route>
          <i class="el-icon-edit"></i> 添加
        </el-button>
      </div>
      <div class="handler-table">
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable"
                  @selection-change="handleSelectionChange">

          <el-table-column type="selection" width="55"></el-table-column>

          <el-table-column prop="displayName" label="角色名">
          </el-table-column>

          <el-table-column prop="created" label="创建时间" sortable>
          </el-table-column>

          <el-table-column prop="modified" label="更新时间" sortable>
          </el-table-column>

          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="small"
                         @click="showRoleEditForm(scope.row)">编辑
              </el-button>
              <el-button size="small" type="danger"
                         @click="handleDelete(scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :page-count="pageCount">
          </el-pagination>
        </div>
      </div>

      <el-dialog
        :title="formTitle"
        :visible.sync="showRoleAdd" :show-close="false">
        <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-addForm">
          <el-form-item label="角色名" prop="username">
            <el-input v-model="addForm.displayName" clearable></el-input>
          </el-form-item>
          <el-form-item label="权限列表" prop="password">

            <el-tree
              :data="basePermissionData"
              show-checkbox
              node-key="id"
              ref="tree"
              :props="defaultProps">
            </el-tree>

          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('addForm')">{{formButtonName}}</el-button>
            <el-button @click="closeForm('addForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {deepClone} from '../../../utils/util.js'
  import roleList from './roleList.vue'

  export default {
    name: 'roleList',
    components: {
      roleList
    },
    data() {
      return {
        basePermissionData: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        queryContent: '',
        tableData: [],
        cur_page: 1,
        multipleSelection: [],
        select_cate: '',
        select_word: '',
        del_list: [],
        is_search: false,
        pageCount: 0,
        showRoleAdd: false,
        formTitle: '添加角色',
        formButtonName: '添加',
        formType: 'add',
        addForm: {
          displayName: ''
        },
        rules: {
          displayName: [
            {required: true, message: '请输入角色名', trigger: 'blur'},
            {min: 3, max: 11, message: '长度在3到11个字符', trigger: 'blur'}
          ]
        }
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
      queryByCondition() {
        this.queryContent = this.queryContent.trim();
        this.getData();
      },
      showRoleAddForm() {
        this.formTitle = '添加角色';
        this.formButtonName = '添加';
        this.formType = 'add';
        this.showRoleAdd = true;
      },
      handleCurrentChange(val) {
        this.cur_page = val;
        this.getData();
      },
      getData() {
        let data = {page: this.cur_page, pageSize: 10};
        if (this.queryContent) {
          data.content = this.queryContent;
        }
        this.$store.dispatch('queryRoleList', data)
          .then(res => {
            this.tableData = res.data.roleList.list;
            this.pageCount = res.data.roleList.totalPage;
          });
        this.$store.dispatch('getCache', {type: 'permission'})
          .then(res => {
            var permissionArr = JSON.parse(res.data.permission);
            this.basePermissionData = permissionArr;
          });
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      showRoleEditForm(row) {
        this.formTitle = '修改角色';
        this.formButtonName = '修改';
        this.formType = 'update';
        this.showRoleAdd = true;
        this.$store.dispatch('queryRoleById', row)
          .then(res => {
            this.addForm = deepClone(res.data.role);
            var permissions = deepClone(res.data.role.permissions);
            var permissionsArray = JSON.parse(permissions);
            this.$refs.tree.setCheckedKeys(permissionsArray);
          });

      },
      // 删除角色
      handleDelete(row) {
        this.$confirm('确定删除该条记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('deleteRole', row).then(() => {
            this.getData();
          })
        }).catch(() => {
        })
      },
      // 添加角色
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.showRoleAdd = false;
            if (this.formType === 'add') {

              let displayName = this.addForm.displayName;
              let permission = JSON.stringify(this.$refs.tree.getCheckedKeys());
              this.$store.dispatch('addRole', {displayName, permission}).then(() => {
                this.getData();
                this.$refs[formName].resetFields();
              })

            } else if (this.formType === 'update') {

              let id = this.addForm.id;
              let displayName = this.addForm.displayName;
              let permission = JSON.stringify(this.$refs.tree.getCheckedKeys());
              this.$store.dispatch('updateRole', {id, displayName, permission}).then(() => {
                this.getData();
                this.$refs[formName].resetFields();
              })

            }
          } else {
            return false;
          }
        });
      },
      closeForm(formName) {
        this.showRoleAdd = false;
        this.$refs[formName].resetFields();
        this.addForm = {displayName: ''}
        this.$refs.tree.setCheckedKeys([]);
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
