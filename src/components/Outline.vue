<template>
  <div class="zero-box" >
    <el-row class="first-box" :gutter="40">
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <el-col :span="8">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>您已入驻</span>
                <el-button style="float: right; padding: 1px 0" type="text">
                  <i class="el-icon-video-camera-solid"></i>
                </el-button>
              </div>
              <div v-text="a + '天'"></div>
            </el-card>
          </el-col></div
      ></el-col>
    </el-row>

    <el-row class="second-box" :gutter="40">
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <el-col :span="8">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>售卖总场次</span>
                <el-button style="float: right; padding: 3px 0" type="text">
                  <i class="el-icon-video-camera-solid"></i>
                </el-button>
              </div>
              <div v-text="b+'场'"></div>
            </el-card>
          </el-col></div
      ></el-col>

      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <el-col :span="8">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>售卖周边数</span>
                <el-button style="float: right; padding: 3px 0" type="text">
                  <i class="el-icon-video-camera-solid"></i>
                </el-button>
              </div>
              <div v-text="c+'个'"></div>
            </el-card>
          </el-col></div
      ></el-col>
    </el-row>


    <el-row   class="third-box"  :gutter="40">
    
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <el-col :span="8">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>您的收入</span>
                <el-button style="float: right; padding: 3px 0" type="text">
                  <i class="el-icon-video-camera-solid"></i>
                </el-button>
              </div>
              <div v-text="d+'元'"></div>
            </el-card>
          </el-col></div
      ></el-col>

      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <el-col :span="8">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>售卖总演出数</span>
                <el-button style="float: right; padding: 3px 0" type="text">
                  <i class="el-icon-video-camera-solid"></i>
                </el-button>
              </div>
              <div v-text="e+'个'"></div>
            </el-card>
          </el-col></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      a:0,
      b:0,
      c:0,
      d:0,
      e:0,
    };
  },
  created: function () {
    this.getSeller();
  },

  methods: {
    async getSeller() {
      const url = "/QuerySellerInformation/" + this.$route.params.sellerId
      await axios
        .get(url)
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            this.a = response.data.value[0].settleDay;
            if(response.data.value[0].settleDay <1)
            {
              this.a=0;
            }
            this.b = response.data.value[0].slotAmount;
             if(response.data.value[0].slotAmount <1)
            {
              this.b=0;
            }
            console.log(response.data.value[0].orderGoodsAmount)
            this.c = response.data.value[0].orderGoodsAmount;
             if(response.data.value[0].OrderGoodsAmount <1)
            {
              this.c=0;
            }
            this.d = response.data.value[0].earnings;
            if(response.data.value[0].earnings <1)
            {
              this.d=0;
            }
            this.e = response.data.value[0].orderShowAmount;
            if(response.data.value[0].orderShowAmount <1)
            {
              this.e=0;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    turnTo(routeName){
      this.$router.push("/"+routeName+"/"+sessionStorage.getItem('selId'))
    },
  }
}
</script>

<style scoped>


.el-breadcrumb{
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 20px;
}

.text {
  font-size: 16px;
  font-weight: 8px;
}

.item {
  margin-bottom: 10px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  border-radius: 30px;
  margin-left: 40px;
  margin-top: 60px;
  width: 300px;
  height:150px;
  background: rgba(255, 255, 255, 0.61);
  font-size:25px;
  color:rgb(38, 56, 100);
  font-weight: bold;
}

.el-icon-video-camera-solid{
 color:black;
 size: mini;
}


.zero-box{
  width: 100%;
  height:86vh;

  background-image: url("https://i.loli.net/2021/07/14/e5qfCkh2gPQmGIu.jpg");
}

</style>