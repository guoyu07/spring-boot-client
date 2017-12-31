<template>
  <div class="workbench">
    <div class="workbench-top">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-01">
            <i class="el-icon-upload2"></i>
            用户新增：4,027
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-02">
            <i class="el-icon-view"></i>
            用户指数：565
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-03">
            <i class="el-icon-star-on"></i>
            累计收藏：232,671
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-04">
            <i class="el-icon-share"></i>
            累计分享：132,672
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="workbench-content">
      <el-tabs v-model="activeName">

        <el-tab-pane label="公告" name="first">
          公告内容
        </el-tab-pane>

        <el-tab-pane label="学院" name="second">
          学院内容
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        activeName: 'first'
      }
    }
  }
</script>

<style scoped>
  .el-tabs__header {
    padding: 0;
    position: relative;
  }

  .workbench {
    height: 100%;
    background-color: #F4F5F6;
  }

  .workbench-content {
    height: 100%;
    background-color: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .12);
  }

  .workbench-top {
    width: 100%;
    margin-bottom: 20px;
    background-color: #F4F5F6;
  }

  .workbench-top el-col {
    margin: 10px;
  }

  .workbench-top .grid-content {
    text-align: center;
    line-height: 130px;
    min-height: 130px;
    background-color: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .12);
  }

  .grid-content:hover {
    background-color: #409EFF;
    color: #Fff;
  }
</style>
