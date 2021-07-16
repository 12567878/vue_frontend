<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item @click.native="turnTo('outline')"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>已发布</el-breadcrumb-item>
      <el-breadcrumb-item>演出列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 视图 -->
    <el-card class="box-card">
      <!-- 演出列表区域 -->
      <el-table :data="showlist" border stripe>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="演出名称" prop="showName"></el-table-column>
        <el-table-column label="场次ID" prop="id" width="80px"></el-table-column>
        <el-table-column label="演出地点" prop="place"></el-table-column>
        <el-table-column label="日期" prop="day"></el-table-column>
        <el-table-column label="演出时间" prop="timeStart"></el-table-column>
        <el-table-column label="结束时间" prop="timeEnd"></el-table-column>
        <el-table-column label="操作" width="160px">
          <template slot-scope="scope">
            <el-tooltip
              effect="dark"
              content="下架场次"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="removeShowById(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="修改场次"
              placement="top"
              :enterable="false"
            >
            </el-tooltip>
            <el-button
              type="warning"
              icon="el-icon-edit"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      title="修改场次信息"
      :visible.sync="editDialogVisible"
      width="25%"
      @close="editDialogClosed"
    >
      <el-form :model="editForm" ref="editFormRef" label-width="80px">
        <el-form-item label="场次ID">
          <el-input v-model="editForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="演出名称">
          <el-input v-model="editForm.showname" disabled></el-input>
        </el-form-item>
        <el-form-item label="演出时间">
          <el-time-select
            label="演出时间"
            placeholder="演出时间"
            prop="timeStart"
            v-model="editForm.timeStart"
            :picker-options="{
              start: '00:00',
              step: '00:10',
              end: '24:59',
            }"
          >
          </el-time-select>
        </el-form-item>

        <el-form-item label="结束时间">
          <el-time-select
            label="结束时间"
            placeholder="结束时间"
            prop="timeEnd"
            v-model="editForm.timeEnd"
            :picker-options="{
              start: '00:00',
              step: '00:10',
              end: '24:59',
              minTime: editForm.timeStart,
            }"
          >
          </el-time-select>
        </el-form-item>

        <el-form-item label="分区" v-if="this.u > 0">
          <el-input
            v-if="this.u !== 0"
            v-model="editForm.areas[0].name"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="票价" v-if="this.u > 0">
          <el-input
            v-if="this.u !== 0"
            v-model="editForm.areas[0].price"
          ></el-input>
        </el-form-item>

        <el-form-item label="分区" v-if="this.u - 1 > 0">
          <el-input
            v-if="this.u - 1 !== 0"
            v-model="editForm.areas[1].name"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="票价" v-if="this.u - 1 > 0">
          <el-input
            v-if="this.u - 1 !== 0"
            v-model="editForm.areas[1].price"
          ></el-input>
        </el-form-item>

        <el-form-item label="分区" v-if="this.u - 2 > 0">
          <el-input
            v-if="this.u - 2 !== 0"
            v-model="editForm.areas[2].name"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="票价" v-if="this.u - 2 > 0">
          <el-input
            v-if="this.u - 2 !== 0"
            v-model="editForm.areas[2].price"
          ></el-input>
        </el-form-item>

        <el-form-item label="分区" v-if="this.u - 3 > 0">
          <el-input
            v-if="this.u - 3 !== 0"
            v-model="editForm.areas[3].name"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="票价" v-if="this.u - 3 > 0">
          <el-input
            v-if="this.u - 3 !== 0"
            v-model="editForm.areas[3].price"
          ></el-input>
        </el-form-item>

        <el-form-item label="分区" v-if="this.u - 4 > 0">
          <el-input
            v-if="this.u - 4 !== 0"
            v-model="editForm.areas[4].name"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="票价" v-if="this.u - 4 > 0">
          <el-input
            v-if="this.u - 4 !== 0"
            v-model="editForm.areas[4].price"
          ></el-input>
        </el-form-item>

        <el-form-item label="分区" v-if="this.u - 5 > 0">
          <el-input
            v-if="this.u - 5 !== 0"
            v-model="editForm.areas[5].name"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="票价" v-if="this.u - 5 > 0">
          <el-input
            v-if="this.u - 5 !== 0"
            v-model="editForm.areas[5].price"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editShowInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      t: 0,
      u: 0,
      showlist: [],
      editDialogVisible: false,
      //查询到的演出信息对象
      editForm: {
        id: "",
        showname: "",
        timeStart: "",
        timeEnd: "",
        areas: [
          {
            name: "",
            price: "",
          },
          {
            name: "",
            price: "",
          },
          {
            name: "",
            price: "",
          },
          {
            name: "",
            price: "",
          },
          {
            name: "",
            price: "",
          },
        ],
      },
    };
  },
  created: function () {
    this.getShowList();
  },
  methods: {
    async getShowList() {
      const url = "/QuerySlot/" + this.$route.params.sellerId;
      await axios
        .get(url)
        .then((response) => {
          if (response.status === 200) {
            this.showlist = response.data.value;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //根据id删除对应演出
    async removeShowById(id) {
      const url = "/UnderCarriage/" + id;
      const confirmResult = await this.$confirm(
        "此操作将下架该场次, 是否继续?",
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
        .put(url)
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            this.$message.success("下架场次成功！");
            this.getShowList();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async showEditDialog(id) {
      const url = "/SlotInfo/" + id;
      await axios
        .get(url)
        .then((response) => {
          if (response.status === 200) {
            this.editForm.id = id;
            this.editForm.showname = response.data.value.name;
            this.editForm.timeStart = response.data.value.timeStart;
            this.editForm.timeEnd = response.data.value.timeEnd;
            this.editDialogVisible = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      const url2 = "/ParticularSlot/" + id;
      await axios
        .get(url2)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.status);
            this.u = response.data.value.areas.length;
            console.log("u=" + this.u);
            if (this.u === 1) {
              this.editForm.areas[0].name = response.data.value.areas[0].name;
              this.editForm.areas[0].price = response.data.value.areas[0].price;
              console.log("p" + this.editForm.areas[0].price);
            }
            if (this.u === 2) {
              this.editForm.areas[0].name = response.data.value.areas[0].name;
              this.editForm.areas[0].price = response.data.value.areas[0].price;
              this.editForm.areas[1].name = response.data.value.areas[1].name;
              this.editForm.areas[1].price = response.data.value.areas[1].price;
            }
            if (this.u === 3) {
              this.editForm.areas[0].name = response.data.value.areas[0].name;
              this.editForm.areas[0].price = response.data.value.areas[0].price;
              this.editForm.areas[1].name = response.data.value.areas[1].name;
              this.editForm.areas[1].price = response.data.value.areas[1].price;
              this.editForm.areas[2].name = response.data.value.areas[2].name;
              this.editForm.areas[2].price = response.data.value.areas[2].price;
            }
            if (this.u === 4) {
              this.editForm.areas[0].name = response.data.value.areas[0].name;
              this.editForm.areas[0].price = response.data.value.areas[0].price;
              this.editForm.areas[1].name = response.data.value.areas[1].name;
              this.editForm.areas[1].price = response.data.value.areas[1].price;
              this.editForm.areas[2].name = response.data.value.areas[2].name;
              this.editForm.areas[2].price = response.data.value.areas[2].price;
              this.editForm.areas[3].name = response.data.value.areas[3].name;
              this.editForm.areas[3].price = response.data.value.areas[3].price;
              console.log("p5" + this.editForm.areas[3].price);
            }
            if (this.u === 5) {
              console.log("yes");
              this.editForm.areas[0].name = response.data.value.areas[0].name;
              this.editForm.areas[0].price = response.data.value.areas[0].price;
              console.log("yess");
              this.editForm.areas[1].name = response.data.value.areas[1].name;
              this.editForm.areas[1].price = response.data.value.areas[1].price;
              console.log("yesss");
              this.editForm.areas[2].name = response.data.value.areas[2].name;
              this.editForm.areas[2].price = response.data.value.areas[2].price;
              this.editForm.areas[3].name = response.data.value.areas[3].name;
              this.editForm.areas[3].price = response.data.value.areas[3].price;
              this.editForm.areas[4].name = response.data.value.areas[4].name;
              this.editForm.areas[4].price = response.data.value.areas[4].price;
              console.log("p5" + this.editForm.areas[3].price);
            }
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

    editShowInfo() {
      const url =
        "/ChangeSlotTime?slotId=" +
        this.editForm.id +
        "&timeStart=" +
        this.editForm.timeStart +
        "&timeEnd=" +
        this.editForm.timeEnd;
      axios
        .put(url)
        .then((response) => {
          if (response.status === 200) {
            console.log("1");
          }
        })
        .catch((err) => {
          console.log(err);
        });

      if (this.u == 1) {
        const url2 =
          "/ChangeTicketPrice?slotId=" +
          this.editForm.id +
          "&areaName=" +
          this.editForm.areas[0].name +
          "&price=" +
          this.editForm.areas[0].price;
        axios
          .put(url2)
          .then((response) => {
            if (response.status === 200) {
              console.log("2");
              this.editDialogVisible = false;
              this.$message.success("修改场次成功！");
              this.getShowList();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

      if (this.u == 2) {
        const url2 =
          "/ChangeTicketPrice?slotId=" +
          this.editForm.id +
          "&areaName=" +
          this.editForm.areas[0].name +
          "&price=" +
          this.editForm.areas[0].price;
        axios
          .put(url2)
          .then((response) => {
            if (response.status === 200) {
              console.log("2");
              this.editDialogVisible = false;
              this.getShowList();
            }
          })
          .catch((err) => {
            console.log(err);
          });

        const url3 =
          "/ChangeTicketPrice?slotId=" +
          this.editForm.id +
          "&areaName=" +
          this.editForm.areas[1].name +
          "&price=" +
          this.editForm.areas[1].price;
        axios
          .put(url3)
          .then((response) => {
            if (response.status === 200) {
              console.log("2");
              this.editDialogVisible = false;
              this.$message.success("修改场次成功！");
              this.getShowList();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

      if (this.u == 3) {
        const url2 =
          "/ChangeTicketPrice?slotId=" +
          this.editForm.id +
          "&areaName=" +
          this.editForm.areas[0].name +
          "&price=" +
          this.editForm.areas[0].price;
        axios
          .put(url2)
          .then((response) => {
            if (response.status === 200) {
              console.log("2");
              this.editDialogVisible = false;
              this.getShowList();
            }
          })
          .catch((err) => {
            console.log(err);
          });

        const url3 =
          "/ChangeTicketPrice?slotId=" +
          this.editForm.id +
          "&areaName=" +
          this.editForm.areas[1].name +
          "&price=" +
          this.editForm.areas[1].price;
        axios
          .put(url3)
          .then((response) => {
            if (response.status === 200) {
              console.log("2");
              this.editDialogVisible = false;
              this.getShowList();
            }
          })
          .catch((err) => {
            console.log(err);
          });

        const url4 =
          "/ChangeTicketPrice?slotId=" +
          this.editForm.id +
          "&areaName=" +
          this.editForm.areas[2].name +
          "&price=" +
          this.editForm.areas[2].price;
        axios
          .put(url4)
          .then((response) => {
            if (response.status === 200) {
              console.log("2");
              this.editDialogVisible = false;
              this.$message.success("修改场次成功！");
              this.getShowList();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

      if (this.u == 4) {
        const url2 =
          "/ChangeTicketPrice?slotId=" +
          this.editForm.id +
          "&areaName=" +
          this.editForm.areas[0].name +
          "&price=" +
          this.editForm.areas[0].price;
        axios
          .put(url2)
          .then((response) => {
            if (response.status === 200) {
              console.log("2");
              this.editDialogVisible = false;
              this.getShowList();
            }
          })
          .catch((err) => {
            console.log(err);
          });

        const url3 =
          "/ChangeTicketPrice?slotId=" +
          this.editForm.id +
          "&areaName=" +
          this.editForm.areas[1].name +
          "&price=" +
          this.editForm.areas[1].price;
        axios
          .put(url3)
          .then((response) => {
            if (response.status === 200) {
              console.log("2");
              this.editDialogVisible = false;
              this.getShowList();
            }
          })
          .catch((err) => {
            console.log(err);
          });

        const url4 =
          "/ChangeTicketPrice?slotId=" +
          this.editForm.id +
          "&areaName=" +
          this.editForm.areas[2].name +
          "&price=" +
          this.editForm.areas[2].price;
        axios
          .put(url4)
          .then((response) => {
            if (response.status === 200) {
              console.log("2");
              this.editDialogVisible = false;
              this.getShowList();
            }
          })
          .catch((err) => {
            console.log(err);
          });

        const url5 =
          "/ChangeTicketPrice?slotId=" +
          this.editForm.id +
          "&areaName=" +
          this.editForm.areas[3].name +
          "&price=" +
          this.editForm.areas[3].price;
        axios
          .put(url5)
          .then((response) => {
            if (response.status === 200) {
              console.log("2");
              this.editDialogVisible = false;
              this.$message.success("修改场次成功！");
              this.getShowList();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

      if (this.u == 5) {
        const url2 =
          "/ChangeTicketPrice?slotId=" +
          this.editForm.id +
          "&areaName=" +
          this.editForm.areas[0].name +
          "&price=" +
          this.editForm.areas[0].price;
        axios
          .put(url2)
          .then((response) => {
            if (response.status === 200) {
              console.log("2");
              this.editDialogVisible = false;
              this.getShowList();
            }
          })
          .catch((err) => {
            console.log(err);
          });

        const url3 =
          "/ChangeTicketPrice?slotId=" +
          this.editForm.id +
          "&areaName=" +
          this.editForm.areas[1].name +
          "&price=" +
          this.editForm.areas[1].price;
        axios
          .put(url3)
          .then((response) => {
            if (response.status === 200) {
              console.log("2");
              this.editDialogVisible = false;
              this.getShowList();
            }
          })
          .catch((err) => {
            console.log(err);
          });

        const url4 =
          "/ChangeTicketPrice?slotId=" +
          this.editForm.id +
          "&areaName=" +
          this.editForm.areas[2].name +
          "&price=" +
          this.editForm.areas[2].price;
        axios
          .put(url4)
          .then((response) => {
            if (response.status === 200) {
              console.log("2");
              this.editDialogVisible = false;
              this.getShowList();
            }
          })
          .catch((err) => {
            console.log(err);
          });

        const url5 =
          "/ChangeTicketPrice?slotId=" +
          this.editForm.id +
          "&areaName=" +
          this.editForm.areas[3].name +
          "&price=" +
          this.editForm.areas[3].price;
        axios
          .put(url5)
          .then((response) => {
            if (response.status === 200) {
              console.log("2");
              this.editDialogVisible = false;
              this.getShowList();
            }
          })
          .catch((err) => {
            console.log(err);
          });

        const url6 =
          "/ChangeTicketPrice?slotId=" +
          this.editForm.id +
          "&areaName=" +
          this.editForm.areas[4].name +
          "&price=" +
          this.editForm.areas[4].price;
        axios
          .put(url6)
          .then((response) => {
            if (response.status === 200) {
              console.log("2");
              this.editDialogVisible = false;
              this.$message.success("修改场次成功！");
              this.getShowList();
            }
          })
          .catch((err) => {
            console.log(err);
          });
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

</style>