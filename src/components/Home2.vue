<template>
<el-container>
    <el-header>
<!-- 头部 -->
      <div>
      <img src="../assets/images/logo.jpg" alt />
        <span>管理员后台系统</span>
      </div>
      <el-button type="primary" @click="logout">退出</el-button>
    </el-header>
    <!-- 主体部分 -->
    <el-container>
        <!-- 侧边栏 -->
      <!--:width="isCollapse ? '64px' : '200px'"-->
        <el-aside :width="isCollapse ? '64px' : '200px'" >
        <div class="toggle-button" @click="togleCollapse">
          |||
        </div>
        <!-- 菜单 -->
        <el-menu

      background-color="#373f41"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-active="$route.path"
      :router="true"
      :collapse="isCollapse">

      <el-submenu index="1">
          <!-- 一级菜单模板 -->
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/user">
            <i class="el-icon-menu"></i>
            <span slot="title">顾客列表</span>
          </el-menu-item>
          <el-menu-item index="/seller">
            <i class="el-icon-menu"></i>
            <span slot="title">商家列表</span>
          </el-menu-item>
          <el-menu-item index="/send">
            <i class="el-icon-menu"></i>
            <span slot="title">发布通知</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-edit-outline"></i>
          <span>评论管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/discuss">
            <i class="el-icon-menu"></i>
            <span slot="title">评论列表</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

    </el-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>

    </el-container>

</el-container>

</template>
<script>
export default {
  data () {
    return {
      menuList: [],
      iconObj:
            {

            },
      // 选择不折叠
      isCollapse: false,
      activePath: ''
    }
  },
  created () {
    this.getMenuList()
    /* this.activePath = window.sessionStorage.getItem('activePath') */
  },
  methods: {
    logout () {
      sessionStorage.clear()
      this.$router.push('/BackendLogin')
      location.reload()
    },
    // 获取菜单
    async getMenuList () {
      /* const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
      // console.log(res) */
    },
    togleCollapse () {
      this.isCollapse = !this.isCollapse
    }// 菜单折叠展开
  }

}
</script>
<style  scoped>
.el-container {
  height: 100%;
}
.el-header{
  background-color: #373f41;
  display: flex;
  justify-content: space-between;
  padding-left:0;
  align-items: center;
  color: #fff;
  font-size:20px;
}
  >div{
    display: flex;
    align-items: center;
  }

  img{
      height: 40px;
  }
  span {
      margin-left: 15px;
      text-emphasis-color: #eee;
    }

.el-aside {
  background-color: #333744;
}

  .el-menu {
    border: none;
  }

.toggle-button{
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color:#fff;
  text-align:center;
  cursor:pointer;

}

</style>
