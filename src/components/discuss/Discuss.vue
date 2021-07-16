<template>
    <div >
        <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>评论管理</el-breadcrumb-item>
      <el-breadcrumb-item>评论列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
         <el-row>
      </el-row>
      <!-- vfor itms 进行循环 -->
      <el-table :data="commentList"  border stripe >
          <!-- :data="orderList" -->
          <el-table-column type="index" label="#"></el-table-column>
         <el-table-column label="评论编号" prop="commentId"></el-table-column>
         <!-- prop="order_number" -->
         <el-table-column label="评论内容" prop="content" ></el-table-column>
         <!-- prop="order_price" -->
        <el-table-column label="评分" prop="rate"></el-table-column>
        <el-table-column label="评论时间" prop="time"></el-table-column>
        <!-- prop="create_time" -->
        <el-table-column label="操作">
          <template slot-scope="scope">
          <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    circle
                    @click="deleteComment(scope.row.commentId)"

                    ></el-button>
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
         :total="commentList.length">
      </el-pagination>
     </el-card>

    </div>
</template>
<script>
import axios from 'axios'
// import func from 'vue-editor-bridge'
export default {

  data () {
    return {
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        // 每页显示多少数据
        pagesize: 5
      },
      commentList: []
    }
  },
  created: function () {
    this.showAllComments()
    // this.getNoticeList()
  },
  methods:
  {
    handleSizeChange (newsize) {
      this.queryInfo.pagesize = newsize
      this.showAllComments()
    },
    handleCurrentChange (newSize) {
      // console.log(newSize)
      this.queryInfo.pagenum = newSize
      this.showAllComments()
    },
    async showAllComments () {
      const url = '/DeleteComment'
      await axios.get(url)
        .then((res) => {
          this.commentList = res.data.value
          console.log(this.commentList)
          console.log(res)
        })
        .catch((err) => {
          console.error(err)
        })
    },
    async deleteComment (id) {
      console.log(id)
      const url = '/DeleteComment/' + id
      await axios.delete(url)
        .then(res => {
          console.log(id)
          console.log(res)
          this.$message.success('删除评论成功！')
          this.showAllComments()
        })
        .catch(err => {
          console.log(id)
          this.$message.error('删除评论失败！')
          console.error(err)
        })
    }

  }
}

</script>
<style lang="less" scoped>

</style>
