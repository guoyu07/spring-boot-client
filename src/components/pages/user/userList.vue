<template>
  <div class="user-wrapper">
    <div class="user-inner-wapper">
    <div class="user-table-options">
      <el-input v-model="queryContent" @keyup.enter.native="queryByCondition" style="width: 250px;" class="filter-item"
                placeholder="请输入用户名、姓名、手机号" clearable>
      </el-input>
      <el-button type="primary" style="margin-left: 8px;" @click="queryByCondition"><i class="el-icon-search"></i> 搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="showUserAddForm" type="primary"
                 unique-opened route>
        <i class="el-icon-edit"></i> 添加
      </el-button>
    </div>
    <div class="handler-table" >
      <el-table :data="tableData" border style="width: 100%" ref="multipleTable"
                @selection-change="handleSelectionChange">

        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column prop="username" label="用户名">
        </el-table-column>

        <el-table-column prop="realname" label="姓名">
        </el-table-column>

        <el-table-column prop="phone" label="手机号">
        </el-table-column>

        <el-table-column prop="created" label="创建时间" sortable>
        </el-table-column>

        <el-table-column prop="modified" label="更新时间" sortable>
        </el-table-column>

        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="small"
                       @click="showUserEditForm(scope.row)">编辑
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
      :visible.sync="showUserAdd" :show-close="false">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-addForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addForm.password" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="realname">
          <el-input v-model="addForm.realname" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addForm.phone" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roles">
          <el-transfer v-model="addForm.roles" :data="transferData" :titles="['可选角色','已选角色']"></el-transfer>
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
  import userList from './userList.vue'
  import _ from 'underscore'

  export default {
    name: 'userList',
    components: {
      userList
    },
    data() {
      return {
        queryContent: '',
        tableData: [],
        transferData:[],
        cur_page: 1,
        multipleSelection: [],
        select_cate: '',
        select_word: '',
        del_list: [],
        is_search: false,
        pageCount: 0,
        showUserAdd: false,
        formTitle: '添加用户',
        formButtonName: '添加',
        formType: 'add',
        addForm: {
          username: '',
          password: '',
          avatar: '',
          phone: '',
          realname: '',
          roles: [],
        },
        rules: {
          username: [
            {required: true, message: '请输入登录用户名', trigger: 'blur'},
            {min: 3, max: 11, message: '长度在3到11个字符', trigger: 'blur'}
          ],
          realname: [
            {required: true, message: '请输入真实姓名', trigger: 'blur'},
            {min: 2, max: 4, message: '长度在2到4个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 3, max: 11, message: '长度在3到11个字符', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {min: 11, max: 11, message: '请输入正确手机号', trigger: 'blur'}
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
      showUserAddForm() {

        this.formTitle = '添加用户';
        this.formButtonName = '添加';
        this.formType = 'add';
        this.showUserAdd = true;
        this.$store.dispatch('queryRoleList')
          .then(res => {
            var tempTransferData = [];
            res.data.roleList.list.forEach((role) => {
              tempTransferData.push({key: role.id, label: role.displayName});
            });
            this.transferData = tempTransferData;
          });
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
        this.$store.dispatch('queryUserList', data)
          .then(res => {
            this.tableData = res.data.userList.list;
            this.pageCount = res.data.userList.totalPage;
          });
        this.$store.dispatch('queryRoleList')
          .then(res => {
            var tempTransferData = [];
            res.data.roleList.list.forEach((role) => {
              tempTransferData.push({key: role.id, label: role.displayName});
            });
            this.transferData = tempTransferData;
          });
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      showUserEditForm(row) {
        this.formTitle = '修改用户';
        this.formButtonName = '修改';
        this.formType = 'update';
        this.showUserAdd = true;
        let roleArray = [];
        let tempForm = deepClone(row);
        let roleStr = tempForm.roles;
        if (roleStr.indexOf("[") != -1 && roleStr.indexOf("]") != -1) {
          roleStr = roleStr.substring(1, roleStr.indexOf("]"))
          roleArray = roleStr.split(',');
          let arr = []
          for (let i = 0; i < roleArray.length; i++) {
            arr.push(parseInt(roleArray[i]))
          }
          tempForm.roles = arr;
        }
        this.addForm = tempForm;
      },
      // 删除用户
      handleDelete(row) {
        this.$confirm('确定删除该条记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('deleteUser', row).then(() => {
            this.getData();
          })
        }).catch(() => {
        })
      },
      // 添加用户
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.showUserAdd = false;
            let tempForm = deepClone(this.addForm);
            let tempRoles = _.filter(tempForm.roles, function (item) {
              return !isNaN(item);
            });
            tempForm.roles = JSON.stringify(tempRoles);
            if (this.formType === 'add') {
              this.$store.dispatch('addUser', tempForm).then(() => {
                this.getData();
                this.$refs[formName].resetFields();
              })
            } else if (this.formType === 'update') {
              this.$store.dispatch('updateUser', tempForm).then(() => {
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
        this.showUserAdd = false;
        this.$refs[formName].resetFields();
        this.addForm = {username: '', password: '', avatar: '', phone: '', realname: '', roles: []}
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
