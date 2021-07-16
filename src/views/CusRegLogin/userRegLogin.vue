<template>
  <div>
    <el-button type="text" @click="centerDialogVisible = true">登录/注册</el-button>

    <el-dialog
        :visible.sync="centerDialogVisible"
        width="30%"
        center
      title="登录/注册">
      <el-divider><i class="el-icon-arrow-right"></i><span style="color:#909399">小麦网，比大麦网小</span><i class="el-icon-arrow-left"></i></el-divider>
      <div style="margin-right: 70px">
        <login-form v-if="isLogin" style="text-align: left"></login-form>
        <reg-form v-else style="text-align: left"></reg-form>
      </div>
      <el-divider></el-divider>
      <span slot="footer">
        <div v-if="isLogin">没有账号？<el-button type="text" @click="change">点击注册</el-button></div>
        <div v-else>已有账号？<el-button type="text" @click="change">点击登录</el-button></div>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import LoginForm from "@/views/CusRegLogin/loginForm";
import RegForm from "@/views/CusRegLogin/regForm";
export default {
  name: "userRegLogin",
  components: {RegForm, LoginForm},
  data(){
    return{
      centerDialogVisible:false,
      isLogin:true
    }
  },
  methods:{
    change:function (){
      this.isLogin=!this.isLogin
    },
  },
}



</script>

<style scoped>

</style>