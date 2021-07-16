<template>
    <div>
        <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
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
          <el-button type="primary" @click="addressDialogVisible = true" >添加订单</el-button>
          <!-- @click="addDialogVisible = true" -->
        </el-col>
      </el-row>
      <el-table  border stripe >
          <!-- :data="orderList" -->
          <el-table-column type="index" label="#"></el-table-column>
         <el-table-column label="订单编号" ></el-table-column>
         <!-- prop="order_number" -->
         <el-table-column label="订单价格" ></el-table-column>
         <!-- prop="order_price" -->
        <el-table-column label="是否付款">
            <template >
                <!-- slot-scope="scope" -->
            <el-tag type="danger" size="mini" >未付款</el-tag>
            <!-- v-if="scope.row.pay_status" -->
            <el-tag type="success" size="mini" >已付款</el-tag>
            <!-- v-else -->
          </template>
        </el-table-column>
            <el-table-column label="是否发货" ></el-table-column>
            <!-- prop="is_send" -->
        <el-table-column label="下单时间" ></el-table-column>
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
     :visible.sync="addressDialogVisible"
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
     </el-form>
     <span slot="footer" class="dialog-footer">
        <el-button @click="addressDialogVisible = false">取 消</el-button>
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
      orderList: [],
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      addressDialogVisible: false,
      // 查询参数
      cityData

    }
  }

}
</script>
<style lang="less" scoped>

</style>
