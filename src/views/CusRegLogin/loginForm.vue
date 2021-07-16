<template>
  <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="账号" prop="account" required>
      <el-input v-model.number="loginForm.account" ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass" required>
      <el-input type="password" v-model="loginForm.pass" autocomplete="off" show-password></el-input>
    </el-form-item>
    <el-form-item style="text-align: center">
      <el-button style="text-align: center" type="primary"  @click="submitForm('loginForm')" >登录</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
import axios from 'axios'
import {sha256} from "js-sha256";
export default {
  name: "loginForm",
  data() {
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'));
      }
      else{
        callback()
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }
      else{
        callback()
      }
    };

    return {
      loginForm: {
        pass: '',
        account: null
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        account: [
          { validator: checkAccount, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    async getInfo(){
      await axios.post("/PersonalCenter",{
        "id":sessionStorage.getItem('cusId'),
        "usertype":"CUSTOMER"
      }).then(res=>{
        if(res.status===200){
          sessionStorage.setItem("image",res.data.image)
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
         this.handleLogin()
          this.getInfo()
        } else {
          this.$message.error('登录不成功，请重试');
          return false;
        }
      });
    },
    async handleLogin()
    {
     
      const url = '/Login'
      await axios.post(url,{id:this.loginForm.account.toString(),password:sha256(this.loginForm.pass),userType:'CUSTOMER'})
      .then(
        (response) =>
        {
          this.$message.success("登录成功")
          console.log(response.data)
          sessionStorage.setItem('cusId',this.loginForm.account)
          sessionStorage.setItem("token",response.data)
          sessionStorage.setItem('isLogin',true)
          location.reload()
        }
      )
      .catch(
        (err) =>
        {
          this.$message.error("账号或密码错误！")
          console.log(err)
        }
      )
    }
  },
}
</script>

<style scoped>

</style>