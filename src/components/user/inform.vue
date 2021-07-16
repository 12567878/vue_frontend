<template>
    <div>
        <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>发布通知</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 主体内容 -->
    <el-card>
        <el-row :gutter="20">
            <el-col :span="1">
          <el-button type="primary" @click="sendDialogVisible = true" >发布通知</el-button>
          <!-- @click="addDialogVisible = true" -->
        </el-col>
        </el-row>
        <el-table :data="noticelist" border stripe>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column  label="编号" prop="id"></el-table-column>
            <el-table-column  label="标题" prop="title"></el-table-column>
            <el-table-column  label="内容" prop="content"></el-table-column>
            <el-table-column  label="对象" prop="type">
                <el-tag type="danger" size="mini">商家</el-tag>
              <el-tag type="success" size="mini" >用户</el-tag>
            </el-table-column>
            <el-table-column  label="操作">
              <template slot-scope="scope">
                <!-- find it -->
                    <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    circle
                    @click="deleteNotice(scope.row.id)"
                    ></el-button>
                    <!--  @click="removeUserById(scope.row.id)" -->
                </template>

            </el-table-column>
        </el-table>
         <el-pagination
          @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
        :page-size="queryInfo.pagesize"
         background
         layout="total, sizes, prev, pager, next, jumper"
         :page-sizes="[2, 5, 10, 15]"
         :total="1000">
      </el-pagination>
    </el-card>
    <el-dialog title="发布通知" width="360px" :visible.sync="sendDialogVisible"
    >
    <el-form
    label-width="125px"
    >
<!--        <el-form-item label="编号" v-model="sendnotice">-->
<!--          <el-input v-model="sendnotice.id" ></el-input>-->
<!--        </el-form-item>-->
       <el-form-item label="标题" v-model="sendnotice">
          <el-input v-model="sendnotice.title" ></el-input>
        </el-form-item>
       <el-form-item label="通知内容" >
          <el-input
          type="textarea"
           autosize
          placeholder="请输入内容"
          v-model="sendnotice.content"
          ></el-input>
        </el-form-item>
        <el-form-item label="发布对象">
            <el-cascader
            :options="userstatus"
            :v-model="sendnotice.type"
            ></el-cascader>
        </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="sendDialogVisible = false">取 消</el-button>
            <el-button type="primary"  @click="boardcastNotice">确 定</el-button>
            <!-- @click="addUser" -->
        </span>

    </el-dialog>

    </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      noticelist: [],
      sendDialogVisible: false,
      sendnotice: {
        title: '',
        content: '',
        type: 0,
        id: 0
      },
      totle: 0,
      deleteID: 0,
      userstatus: [
        // eslint-disable-next-line no-undef

        {
          value: '2',
          label: '商家'
        },
        {
          value: '1',
          label: '用户'
        },
        {
          value: '0',
          label: '所有'
        }

      ],
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      }
    }
  },
  created: function () {
    this.showAllNotices()
  },
  methods:
  {
    handleSizeChange (newsize) {
      console.log(newsize)
      this.queryInfo.pagesize = newsize
      this.showAllNotices()
    },
    handleCurrentChange (newSize) {
      console.log(newSize)
      this.queryInfo.pagenum = newSize
      this.showAllNotices()
    },
    async boardcastNotice () {
      const url = '/BroadcastNotice'
      await axios.post(url, {id: this.sendnotice.id, title: this.sendnotice.title, content: this.sendnotice.content, type: this.sendnotice.type})
        .then(
          () => {
            this.$message.success('发布通知成功！')
            this.sendDialogVisible = false
            this.showAllNotices()
          }
        ).catch(
          (err) => {
            this.$message.error('发布通知失败！')
            console.log(err)
          })
    },
    async showAllNotices () {
      const url = '/AdminGetAllNotice'
      await axios.get(url)
        .then(res => {
          this.noticelist = res.data.value
          console.log(res)
        })
        .catch(err => {
          console.error(err)
        })
    },
    async deleteNotice (id) {
      const url = '/AdminDeleteNotice/' + id
      await axios.delete(url)
        .then(res => {
          console.log(id)
          this.$message.success('删除通知成功！')
          console.log(res)
          window.location.reload()
        })
        .catch(err => {
          this.$message.error('删除通知失败！')
          console.log(id)
          console.error(err)
        })
    }
  }
}
</script>
 <styles scoped>
.el-dialog{
  width: 200px;
}
 .el-card{
  margin-left:30px;
margin-right:30px;
margin-top:30px;
margin-bottom:30px;
 }
 </styles>
