<template>
    <div>
        <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
     <el-card>
         <el-row>
        <el-col :span="6">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goodDialogVisible = true" >添加商品</el-button>
          <!-- @click="addDialogVisible = true" -->
        </el-col>
      </el-row>
      <el-table  border stripe >
          <!-- :data="orderList" -->
          <el-table-column type="index" label="#"></el-table-column>
         <el-table-column label="编号" ></el-table-column>
         <!-- prop="order_number" -->
         <el-table-column label="名称" ></el-table-column>
         <!-- prop="order_price" -->
        <el-table-column label="地址" ></el-table-column>
        <el-table-column label="价格" ></el-table-column>

            <!-- prop="is_send" -->
        <el-table-column label="时间" ></el-table-column>
        <!-- prop="create_time" -->
        <el-table-column label="操作">
            <template slot>
                <el-button type="primary" size="mini" icon="el-icon-edit" ></el-button>
                <!-- @click="showEditDialog" -->
                <el-button
              type="success"
              size="mini"
              icon="el-icon-location"

            ></el-button>
            <!-- @click="showProgressDialog" -->
            </template>
        </el-table-column>
      </el-table>
       <el-pagination
         background
         layout="total, sizes, prev, pager, next, jumper"
         :page-sizes="[2, 5, 10, 15]"
         :total="1000">
      </el-pagination>
     </el-card>
     <el-dialog
     title="订单地址修改"
     :visible.sync="goodDialogVisible"
     width="50%"
     >
     <el-form
     label-width="100px"
     >
     <el-form-item label="省市区/县">
        <el-cascader
        :options="cityData"
        ></el-cascader>

     </el-form-item>
     <el-form-item label="详细地址">
          <el-input ></el-input>
        </el-form-item>
        <!--  prop="address2" -->
        <!-- v-model="addressForm.address2" -->
        <el-form-item label="名称">
          <el-input ></el-input>
        </el-form-item>

     <el-form-item label="时间">
          <el-time-select
         v-model="value"
         :picker-options="{
        start: '08:30',
            step: '00:15',
           end: '18:30'
                 }"
           placeholder="选择时间">
            </el-time-select>
        </el-form-item>
     </el-form>
     <span slot="footer" class="dialog-footer">
        <el-button @click="goodDialogVisible = false">取 消</el-button>
        <el-button type="primary" >确 定</el-button>
        <!-- @click="dialogVisible = false" -->
      </span>

     </el-dialog>
    </div>
</template>
<script>
import cityData from './citydata.js'
export default {
  data () {
    return {
      goodList: [],
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      goodDialogVisible: false,
      // 查询参数
      cityData

    }
  },
  methods: {
    async getGoodList () {
      const { data: res } = await this.$http.get('good', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品列表失败！')
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
