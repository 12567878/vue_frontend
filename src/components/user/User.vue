<template>
<div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-row :gutter="20">

         <el-col :span="4">
          <!-- @click="addDialogVisible = true" -->
        </el-col>
        </el-row>
        <!-- 用户列表 -->
        <el-table :data="userlist" border stripe>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column  label="顾客姓名" prop="userName"></el-table-column>
            <el-table-column  label="顾客电话" prop="phoneNumber"></el-table-column>
            <el-table-column  label="顾客id" prop="id"></el-table-column>
            <el-table-column  label="注册日期" prop="regDate"> </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    circle
                    @click="setDisableCustomerAccount(scope.row.id)"
                    ></el-button>
                    <!--  @click="removeUserById(scope.row.id)" -->
                </template>

            </el-table-column>

        </el-table>
        <!-- 分页 -->
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="queryInfo.pagesize"
         background
         layout="total, sizes, prev, pager, next, jumper"
         :page-sizes="[2, 5, 10, 15]"
         :total="userlist.length">
      </el-pagination>

    </el-card>



    <!-- 修改用户的对话框 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="editDialogVisible"
      width="50%"

    >
    <!-- @close="editDialogClosed" -->
    <el-form
           label-width="100px"
        >
        <el-form-item label="用户名" >
          <el-input disabled></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" >
          <el-input ></el-input>
        </el-form-item>
        <el-form-item label="电话号" >
          <el-input ></el-input>
        </el-form-item>
        </el-form>

    </el-dialog>

</div>

</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      // 用户列表
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        // 每页显示多少数据
        pagesize: 5
      },
      addDialogVisible: false,
      // 修改用户
      editDialogVisible: false,
      userlist: [],
      sellerList: []

    }
  },
  created: function () {
    this.getUserlist()
  },

  methods:
  {
    handleSizeChange (newsize) {
      this.queryInfo.pagesize = newsize
      this.getUserlist()
    },
    handleCurrentChange (newSize) {
      // console.log(newSize)
      this.queryInfo.pagenum = newSize
      this.getUserlist()
    },
    // 获取用户列表
    async getUserlist () {
      const url = '/DisableCustomerAccount'
      await axios.get(url)
        .then((res) => {
          this.userlist = res.data.value
          console.log(res)
          console.log(this.userlist)
        })
        .catch((err) => {
          console.error(err)
        })
    },
    async setDisableCustomerAccount (id) {
      const url = '/DisableCustomerAccount/' + id
      await axios.put(url)
        .then(res => {
          console.log(res)
          console.log(id)
          this.$message.success('封禁顾客账号成功！')
          window.location.reload()
        })
        .catch(err => {
          console.error(err)
          this.$message.error('封禁顾客账号失败！')
        })
    }

    /* async deleteUser (id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消删除')// 取消删除用户操作
      }
      const { data: res } = await this.$http.delete('users/' + id)
      if (res.meta.status !== 200) return this.$message.error('删除用户失败！')
      this.$message.success('删除用户成功！')// 完成删除用户操作
    } */

  }

}
</script>
<style lang="less" scoped>

</style>
