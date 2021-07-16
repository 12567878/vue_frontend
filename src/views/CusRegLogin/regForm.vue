<template>
  <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="account" required>
      <el-input v-model.number="registerForm.account"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass" required>
      <el-input type="password" v-model="registerForm.pass" autocomplete="off" show-password></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass" required>
      <el-input type="password" v-model="registerForm.checkPass" autocomplete="off" show-password></el-input>
    </el-form-item>
    <el-form-item style="text-align: center">
      <el-button style="text-align:center" type="primary" @click="submitForm('registerForm')">注册</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
  import axios from 'axios'
  import {sha256} from "js-sha256";
  export default {
  data() {
  var checkAccount = (rule, value, callback) => {
  if (!value) {
  return callback(new Error('用户名不能为空'));
}
  else{
    callback()
  }
  };
  var validatePass = (rule, value, callback) => {
  if (value === '') {
  callback(new Error('请输入密码'));
} else {
  if (this.registerForm.checkPass !== '') {
  this.$refs.registerForm.validateField('checkPass');
}
  callback();
}
};
  var validatePass2 = (rule, value, callback) => {
  if (value === '') {
  callback(new Error('请再次输入密码'));
} else if (value !== this.registerForm.pass) {
  callback(new Error('两次输入密码不一致!'));
} else {
  callback();
}
};
  return {
  registerForm: {
  pass: '',
  checkPass: '',
  account: ""
},
  rules: {
  pass: [
{ validator: validatePass, trigger: 'blur' }
  ],
  checkPass: [
{ validator: validatePass2, trigger: 'blur' }
  ],
  account: [
{ validator: checkAccount, trigger: 'blur' }
  ]
}
};
},
  methods: {
  submitForm(formName) {
  this.$refs[formName].validate((valid) => {
  if (valid) {
  this.Register()
} else {
  this.$message.error('注册不成功，请重试');
  return false;
}
});
},
  async Register()
  {
    const url = '/SignUp'
    await axios.post(url,{userName:this.registerForm.account,password:sha256(this.registerForm.pass),userType:'CUSTOMER'})
    .then(
      (response) =>
      {
        this.$message.success("注册成功！"+"您的账号是"+response.data)
        location.reload()
      }
    ).catch(
      (err) =>
      {
        console.log(err)
        this.$message.error("未知错误")
      }
    )
  }
}
}
</script>

<style scoped>

</style>