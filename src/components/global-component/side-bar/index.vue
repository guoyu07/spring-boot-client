<template>
  <div class="sidebar">
    <el-menu :default-active="onRoutes" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index">
            <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index">
            <template><i :class="item.icon"></i> {{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          {
            icon: 'el-icon-menu',
            index: 'workbench',
            title: '主页'
          },
          {
            icon: 'el-icon-message',
            index: 'user',
            title: '用户管理'
          },
          {
            icon: 'el-icon-message',
            index: 'role',
            title: '角色管理'
          }
        ]
      }
    },
    computed: {
      onRoutes() {
        return this.$route.path.replace('/', '');
      }
    }
  }
</script>

<style scoped>
  .sidebar {
    display: block;
    position: absolute;
    margin: 20px 10px 50px 10px;
    width: 140px;
    left: 0;
    top: 70px;
    bottom: 0;
    height: 750px;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,.12);
  }

  .sidebar > ul {
    height: 100%;
  }
  .el-menu{
    background-color: #FFF;
  }
  .el-menu-item:hover {
    background-color: #409EFF;
    color: #fff;
  }
</style>
