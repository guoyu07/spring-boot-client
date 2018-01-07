<template>
    <div class="header">
        <div class="top-line"></div>
        <div class="logo">
          <img class="logo-home" src="../../../../static/img/logo-home.png"/>
        </div>
        <div class="user-info">
          <el-dropdown trigger="click" @command="handleCommand" placement="bottom">
            <div>
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../../static/img/img.jpg">
                </span>
                <span>
                  {{username}}
                </span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        username: this.$store.state.session.username || ""
      }
    },
    computed: {
    },
    methods: {
      handleCommand(command) {
        if (command == 'logout') {
          this.$store.dispatch('logout', {sessionId: this.$store.state.session.id}).then((data) => {
            if (data.success) {
              this.$router.push('/login');
            }
          });
        }
      }
    }
  }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 67px;
        background-color: #fff;
        color: #fff;
        box-shadow: 0 1px 4px 0 rgba(0,0,0,.12);
    }
    .header .logo{
        float: left;
        width:150px;
        height: 67px;
        text-align: center;
    }
    .top-line{
        height: 3px;
        background-color: #409EFF;
    }
    .user-info {
        float: right;
        width:150px;
        line-height: 60px;
        color: #fff;
        text-align: center;
        vertical-align: middle;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        vertical-align: middle;
        width:37px;
        height:37px;
        border-radius: 50%;
    }
    .logo-home{
      width: 25%;
      vertical-align:middle;
    }
</style>
