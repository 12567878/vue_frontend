<template>
<div>
  <el-container class="home-container" height="100%">
    <el-aside class="aside-box" width="260px" height="100%">
      <div class="logo">
        <img src="../assets/images/logo.jpg" alt="" />
      </div>

      <el-menu class="menu-box">
        <!--侧边导航栏-->
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-s-data"></i>首页</template>
            <el-menu-item index="1-1"  @click.native="turnTo('outline')">概要信息</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>已发布</template>

            <el-menu-item index="2-1" @click.native="turnTo('slotList')">演出列表</el-menu-item>

            <el-menu-item index="2-2"  @click.native="turnTo('goodsList')">周边列表</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template class="first" slot="title"
            ><i class="el-icon-upload2"  ></i>我要发布</template
          >

            <el-menu-item index="3-1"  @click.native="turnTo('releaseShow')">发布演出</el-menu-item>
            <el-menu-item index="3-2"  @click.native="turnTo('releaseSlot')">发布场次</el-menu-item>
            <el-menu-item index="3-3" @click.native="turnTo('releaseGoods')">发布周边</el-menu-item>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title"
            ><i class="el-icon-message-solid"></i>历史通知</template
          >
            <el-menu-item index="4-1"  @click.native="turnTo('notification')">通知列表</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title"
            ><i class="el-icon-setting"></i>编辑资料</template
          >

            <el-menu-item index="5-1"  @click.native="turnTo('editInfo')">填写资料</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header type="flex" class="row-bg" justify="space-between">
        <el-col :span="5"
          ><div style="min-width:300px">
            <span id="ID">商家管理系统</span>
          </div></el-col
        >
        <el-col :span="26"
          ><div>
            <div id="user-name">欢迎您：{{Info.SellerName}}  (ID:{{Info.ID}})</div>
          </div></el-col
        >

        <el-col :span="1">
          <img id="user-avatar" src="../assets/images/avatar.png" alt="" />
        </el-col>


        <el-col :span="1">
          <el-button type="danger" @click="logout">退出</el-button>
        </el-col>


      </el-header>
      <el-container class="main">
        <div class="router">
          <router-view> </router-view>
        </div>
        <el-footer>
          <div style="min-width:1200px">
          <span id="p1" 
            >小麦网 Copyright 2021 DB Principle Project   小麦网简体中文版提供的内容仅用于课程设计作业</span
          >
          <a
            href="https://github.com/SchweitzerGAO/XiaoMai-FrontEnd"
            class="github"
            >我们的github地址</a
          >
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</div>
</template>

<script>
import axios from "axios";
//import { defineComponent } from '@vue/composition-api'
export default {

  data(){
    return{
      Info: {
        ID: "",
        SellerName: "",
        Address: "",
        RegDate: "",
        Image: "",
        Income: "",
        PhoneNumber: 0,
      },
  }
},
  
  created: function () {
    this.GetInfo();
  },
  methods:{
    logout () {
      sessionStorage.clear()
      this.$router.push('/')
    },
    async GetInfo() {
      const url = "/PersonalCenter";
      await axios
        .post(url, {
          id: this.$route.params.sellerId,
          userType: "SELLER",
        })
        .then((response) => {
          this.$message.success("查找信息成功！");
          this.Info = response.data;
        })
        .catch((err) => {
          this.$message.error("查找失败！");
          console.log(err);
        });
    },
    turnTo(routeName){
      this.$router.push("/"+routeName+"/"+sessionStorage.getItem('selId'))
    },
  }
};
</script>


<style Lang='less' scoped>
.home-container {
  height: 100%;
}

.el-header {
  height: 25px;
  background-color: #1d597c;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
img {
  width: 260px;
  height: 60px;
}
#ID {
  color: rgb(255, 255, 255);
  font-weight: bold;
  font-size: 23px;
  margin-left: 20px;
}
#user-avatar {
  width: 45px;
  height: 45px;
  border-radius: 30px;
}
#user-name {
  color: rgb(255, 255, 255);
  font-weight: 2;
  font-size: 20px;
}

.aside-box {
  background-color: #ffffff;
  height: 910px;
  margin-left: 0;
  background-image: url("https://img2.baidu.com/it/u=1587569962,37563508&fm=26&fmt=auto&gp=0.jpg");
}
.menu-box {
  background-color: #fdfdfd94;
}
.el-menu-item {
  font-size: 15px;
  border-bottom: none !important;
}

.el-menu-item.is-active {
  background-color: #1d597c8f !important;
  color: #fff;
  border-bottom: none;
}

.main {
  /* background-image: url("https://i.loli.net/2021/07/14/4RjwXAthoWMLJcE.jpg"); */
  background-color: #fcfcfc;
 position: relative;
  width: 100%;
  padding-bottom: 20px;
  /* box-sizing: border-box; */
  /* background-image: url("https://i.loli.net/2021/07/14/e5qfCkh2gPQmGIu.jpg"); */
}

.el-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: #1d597ca2;
}
.router {
  margin-bottom: 50px;
}
#p1 {
  margin-top: 20px;
  color: #fff;
  font-size: 16px;
  margin-left: 25%;
}
.github {
  margin-top: 15px;
  color: rgb(31, 70, 94);
  font-size: 15px;
  margin-left: 35%;
}
</style>