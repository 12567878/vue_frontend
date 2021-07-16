<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item @click.native="turnTo('outline')">首页</el-breadcrumb-item>
      <el-breadcrumb-item>已发布</el-breadcrumb-item>
      <el-breadcrumb-item>周边列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 视图 -->
    <el-card class="box-card">
      <!-- 演出列表区域 -->
      <el-table :data="this.goodsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="周边ID" prop="id"></el-table-column>
        <el-table-column label="周边名称" prop="goodsName"></el-table-column>
        <el-table-column label="价格" prop="price"></el-table-column>
        <el-table-column label="库存" prop="available"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              effect="dark"
              content="删除周边"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="removeGoodsById(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="修改周边"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-edit"
                @click="showEditDialog(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      title="修改周边"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form
        :model="editForm"
        :rules="Rules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="周边ID">
          <el-input v-model="editForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="周边名称">
          <el-input v-model="editForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input-number
            v-model="editForm.price"
            @change="handleChange"
            :min="0"
            :max="100000"
            label="请填写价格"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="库存" prop="available">
          <el-input-number
            v-model="editForm.available"
            @change="handleChange"
            :min="0"
            :max="100000"
            label="请填写库存"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editGoodsInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      goodsList: [],
      total: 0,
      editDialogVisible: false,
      editForm: {
        name: "",
        price: "",
        available: "",
        id: "",
      },

      info: [
        {
          sellerId: "",
          goodsId: "",
        },
      ],
      //修改表单验证规则对象
      editFormRules: {
        price: [
          {
            required: true,
            message: "请输入价格",
            trigger: "blur"},
            { min: 0,
            max: 10000,
            message:'价格非法，请重新输入！',
            trigger:'blur'
          },
        ],
        available: [
          {
            required: true,
            message: "请输入库存",
            trigger: "blur",},
            { min: 0,
            max: 10000,
            message:'库存非法，请重新输入！',
            trigger:'blur'
          },
        ],
      },
    };
  },

  created: function () {
    this.getGoodsList();
  },

  methods: {
    async getGoodsList() {
      const url = "/SellerViewGoods/" + this.$route.params.sellerId;
      await axios
        .get(url)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data.value);
            this.goodsList = response.data.value;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //根据id删除对应周边记录
    async removeGoodsById(id) {
      id = id.substr(1);
      console.log(id);
      const url = "/DeleteGoods?goodsId=" + id;
      const confirmResult = await this.$confirm(
        "此操作将永久删除该周边, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      console.log(confirmResult);

      if (confirmResult !== "confirm") return this.$message.info("已取消");

      await axios
        .delete(url)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.status);
            this.$message.success("删除周边成功！");
            this.getGoodsList();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async showEditDialog(id) {
      id = id.substr(1);
      console.log(id);
      const url = "/GoodsInfo";
      await axios
        .post(url, {
          sellerId: this.$route.params.sellerId,
          goodsId: id,
        })
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data.value.name),
              (this.editForm.name = response.data.value.name);
            this.editForm.price = response.data.value.peice;
            this.editForm.available = response.data.value.available;
            this.editForm.id = id;
            this.editDialogVisible = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },

    editGoodsInfo() {
      const url = "/UpdateGoods/";
      axios
        .put(url, {
          id: this.editForm.id,
          price: this.editForm.price,
          available: this.editForm.available,
        })
        .then((response) => {
          if (response.status === 200) {
            this.editDialogVisible = false;
            this.getGoodsList();
          }
        })
        .catch((err) => {
          console.log(err);
        });
        this.$message.success("修改成功！")
    },
    turnTo(routeName){
      this.$router.push("/"+routeName+"/"+sessionStorage.getItem('selId'))
    },
  },
};
</script>


<style scoped>


.el-breadcrumb{
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 20px;
}

</style>