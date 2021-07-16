<template>
 <div class="SellerRegister">
  <el-container>
        <el-header>
        小麦网后台管理系统
        </el-header>
    <el-card >
        <h3>商家注册</h3>
            <el-form ref="SellerRegister" :model="SellerRegister" status-icon label-width="80px" :rules="rules">
              

              <el-form-item label="商家名称" prop="sellerName" label-width="80px">
                <el-input v-model="SellerRegister.sellerName" maxlength="50"></el-input>
              </el-form-item>
              
              <el-form-item label="设置密码" prop="password" label-width="80px">
                <el-input v-model="SellerRegister.password" maxlength="25"  show-password></el-input>
              </el-form-item>

              <el-form-item label="确认密码" prop="password_2" label-width="80px">
                <el-input v-model="SellerRegister.password_2" show-password></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('SellerRegister')" icon="el-icon-check">注册</el-button>
              </el-form-item>
            </el-form>
    </el-card>
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
  name:'SellerRegister',
  data(){
   
   var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.SellerRegister.password_2 !== '') {
            this.$refs.SellerRegister.validateField('password_2');
          }
          callback();
        }
      };
  var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.SellerRegister.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
  }
  return{
      SellerRegister:{
        sellerName:'',
        password:'',
        password_2:'',
      user:{
        id:"",
        password:""
      
    },

      },
      rules:
      {
         sellerName:[{required:true,trigger:'blur',message:'请输入商家名称'}],
         password:[{required:true,validator:validatePass,trigger:'blur'}],
         password_2:[{required:true,validator:validatePass2,trigger:'blur'}],
      }
    }
  },
  methods:
  {
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           this.Register()
          } else {
            console.log('注册失败！');
            return false;
          }
        });
      },
      resetForm(formName)
      {
        this.$refs[formName].resetFields();
      },
      async Register()
      {
        const url = '/SignUp'
        await axios.post(url,{userName:this.SellerRegister.sellerName,password:sha256(this.SellerRegister.password),userType:'SELLER'})
        .then(
           (response) =>
          {
            this.$message.success("注册成功！您的账号是"+response.data)
            this.$router.push('/BackendLogin/'+this.user.id.toString())
          }
        ).catch(
          (err) =>
          {
            this.$message.error("未知错误！")
            console.log(err)
          }
        )
        
        
      }
  }
  }
</script>

<style>

.SellerRegister{
  background-image:url("https://i.loli.net/2021/07/14/e5qfCkh2gPQmGIu.jpg");
}
.el-card{
  background-color: rgba(255, 255, 255, 0.705);
  margin-left: 35%;
  margin-right: 30%;
  margin-top: 5%;
  margin-bottom: 5%;
}
.el-header{
    background-color: #2b4f74;
    color: #ffffff;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
  }
  .el-footer{
    background-color: #213c57;
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
.el-form{
  margin: 75px auto;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>