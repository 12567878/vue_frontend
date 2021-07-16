<template>

<div class="BackendLogin" clearfix>

    <el-container>
  <el-header>
    小麦网后台管理系统
  </el-header>

  <div class="mainForm">
    <el-card>
      <el-form ref="BackendLogin" :model="user" label-width="80px">
        <h3>后台登录</h3>
        <el-form-item prop="id" label="账号">
          <el-input v-model="user.id" placeholder="请输入账号"></el-input>
        </el-form-item>

        <el-form-item id="password" prop="password" label="密码">
           <el-input v-model="user.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>

        <el-form-item>
          <router-link to="/SellerRegister">商家注册</router-link>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-right" @click="sellerLogin()">商家登录</el-button>
          <el-button type="primary" icon="el-icon-right" @click="adminLogin()">管理员登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
  <el-footer>
    小麦网 Copyright 2021 DB Principle Project
  </el-footer>

</el-container>

</div>

</template>

<script>
import axios from 'axios'
import {sha256} from "js-sha256";
export default {
  name:"SellerLogin",
  data()
  {
    return{
      user:{
        id:"",
        password:""
      }
    }
  },
  methods:
  {
    sellerLogin()
    {
      if(!this.user.id)
      {
        this.$message.error("请输入账号")
      }
      else if(!this.user.password)
      {
        this.$message.error("请输入密码")
      }
      else
      {
       this.handleSellerLogin()
      }
    },
    adminLogin()
    {
      if(!this.user.id)
      {
        this.$message.error("请输入账号")
      }
      else if(!this.user.password)
      {
        this.$message.error("请输入密码")
      }
      else
      {
        this.handleAdminLogin()
      }
    },
    async handleSellerLogin()
    {
      const url ='/Login'
      await axios.post(url,{"id":this.user.id,"password":sha256(this.user.password),"userType":'SELLER'})
      .then(
        (response) =>
        {
          this.$message.success('登录成功！')
          this.$router.push("/outline/"+this.user.id.toString())
          sessionStorage.setItem('selId',this.user.id.toString())
          sessionStorage.setItem(this.user.id.toString(),response.data)
          sessionStorage.setItem('tokenValue',response.data)
          sessionStorage.setItem('isLogin',true)
          sessionStorage.setItem('userType','S')
        }
      ).catch(
        (err) =>{
          this.$message.error('账号或密码错误！')
          console.log(err)
        }
      )
      
    },
    async handleAdminLogin()
    {
      const url ='/Login'
      await axios.post(url,{"id":this.user.id,"password":this.user.password,"userType":'ADMIN'})
      .then(
        (response) =>
        {
          this.$message.success('登录成功！')
          sessionStorage.setItem('admId',this.user.id.toString())
          sessionStorage.setItem(this.user.id.toString(),response.data)
          sessionStorage.setItem('isLogin',true)
          sessionStorage.setItem('userType','A')
          this.$router.push("/home")
        }
      ).catch(
        (err) =>{
          this.$message.error('账号或密码错误！')
          console.log(err)
        }
      )
      
    },

    
  }

}
</script>

<style>


.el-card{
  background-color: rgba(255, 255, 255, 0.705);
 
}

.BackendLogin {
  background-image:url("https://i.loli.net/2021/07/14/e5qfCkh2gPQmGIu.jpg");
  width: 100%;
  height: 740px;
  overflow: hidden;
}
.mainForm{
  width: 400px;
  height: 400px;
  margin: 100px auto;
  overflow: hidden;
  padding-top: 10px;
  line-height: 40px;
}
 .el-header{
    background-color: #263e57;
    color: #ffffff;
    text-align: center;
    line-height: 60px;
  }
  .el-footer{
    background-color: #24405c;
    color: #ffffff;
    text-align: center;
    line-height: 60px;
    font-size: 7px;
  }
  .el-input{
    width: 250px;
  }
  h3 {
  color: #409eff;
  font-size: 24px;
}

#password {
  margin-bottom: 5px;
}



</style>