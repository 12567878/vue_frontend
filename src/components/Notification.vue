<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item @click.native="turnTo('outline')"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>历史通知</el-breadcrumb-item>
      <el-breadcrumb-item>通知列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card" shadow="always">
    <div class="note" >点击左侧可以展开通知详情</div>
      <el-table
        ref="filterTable"
        :data="notices"
        stripe
        height="520"
        style="width: 100%"
      >
      <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item class="content" label="详细内容">
            <span>{{ props.row.content }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>

        <el-table-column
          prop="time"
          label="发布日期"
          sortable
          width="300"
          column-key="time"
        >
        </el-table-column>

        <el-table-column prop="title" label="标题" width="700">
        </el-table-column>
      </el-table>
    </el-card>

     


  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      notices: [{

      }],
      tag: [],
      hasNotice: false,
      successVisible: false,
    };
  },
  created: function () {
    this.getAllNotices();
  },
  methods: {
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },

    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    async getAllNotices() {
      const url = "/SellerNotice";
      await axios
        .get(url)
        .then((response) => {
          if (response.status === 200) {
            this.notices = response.data.value;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      if (this.notices.length !== 0) {
        this.hasNotice = true;
      }
    },
    turnTo(routeName) {
      this.$router.push(
        "/" + routeName + "/" + sessionStorage.getItem("selId")
      );
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

.el-card {
  margin-left: 15px;
  margin-top: 15px;
  margin-right: 15px;
}

.el-button {
  margin-left: 10px;
  margin-top: 30px;
  margin-bottom: 30px;
}

.content{
  background-color: rgba(48, 120, 156, 0.15);
}
</style>