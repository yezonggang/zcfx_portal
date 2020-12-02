<template>
  <div class="content">
    <div class="top">
      <div class="top-content">
        <el-row>
          <el-col :span="24" style="padding-left:20px">
            <div class="main-title">
              为您一站式讲解招投标业务流程问题、难题
            </div>
            <div class="sub-title">提供招投标业务增值服务</div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="main-content">
      <!-- <el-row>
        <el-col :span="24">
          <el-carousel height="350px">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3 class="small">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row> -->
      <el-row style="padding: 30px 0 20px">
        <el-col :span="4">
          <span style="font-size:32px;color:#333;font-family:Source SansSC Bold">首页推荐</span>
        </el-col>
        <el-col :span="10" :offset="10">
          <!-- <div class="notices">
            <i class="el-icon-message-solid"></i>
            <span>通知</span>
          </div> -->
        </el-col>
      </el-row>
      <el-row style="padding-bottom:60px">
        <el-col
          :span="6"
          v-for="item in list"
          :key="item.bvId"
          class="item-content"
        >
          <div
            class="item-img"
            @click="open(item.bvId, item.title)"
            ref="itemImg"
          >
            <img src="../../assets/zzfw/cover.png" alt="封面" width="100%" />
          </div>
          <div class="item-text">
            <p class="item-title" @click="open(item.bvId, item.title)">
              {{ item.title }}
            </p>
            <!-- <p class="item-description">{{ item.description }}</p> -->
          </div>
          <!-- 这里是点赞 留言数据 暂时不用 -->
          <!-- <div class="item-eval">
            <span>
              <i class="el-icon-thumb"></i>
              7777
            </span>
            <span>
              <i class="el-icon-chat-round"></i>
              7777
            </span>
            <span>
              <i class="el-icon-view"></i>
              7777
            </span>
          </div> -->
          <div class="item-userinfo">
            <span class="item-user-img">
              <img src="../../assets/zzfw/user.png" alt="头像" width="100%" />
            </span>
            <span class="item-user-name">{{ item.userName }}</span>
          </div>
        </el-col>
      </el-row>
      <!-- <el-row
        type="flex"
        justify="center"
        style="padding-bottom: 60px"
        v-for="index in pageInfo.totalPage"
        :key="index"
      >
        <el-button
          circle
          class="button-page"
          :type="pageInfo.currentPage == index ? 'primary' : ''"
          >{{ index }}</el-button
        >
      </el-row> -->
      <el-dialog
        :title="dialog.title"
        :visible.sync="dialog.centerDialogVisible"
        :fullscreen="false"
        top="4vh"
        width="1260px"
        center
      >
        <div style="display: flex; align-item: middle; justify-content: center">
          <iframe
            width="1200px"
            height="760px"
            :src="dialog.src"
            scrolling="no"
            border="0"
            frameborder="no"
            framespacing="0"
            allowfullscreen="true"
          >
          </iframe>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import indexFooter from "@/components/Footer/index";
import myfilter from "@/components/MultiSelect/myfilter";
export default {
  name: "zzfw",
  components: {
    indexFooter,
    myfilter,
  },
  data() {
    return {
      divHeight: "100%",
      dialog: {
        centerDialogVisible: false,
        src: "",
        title: "",
      },
      pageInfo: {
        pageSize: 16,
        totalCount: 3,
        totalPage: 1,
        currentPage: 1,
      },
      list: [
        {
          bvId: "BV1qt4y1S7w8",
          title: "刚子哥带你学招采",
          description: "-",
          img:
            "https://i1.hdslb.com/bfs/archive/13938841db91522789bfcb7adaf56a2ad1a5a702.jpg",
          userImg:
            "http://i0.hdslb.com/bfs/face/db6d1d10f7edd57a7e0e2fb2d3dc00c2d524056a.jpg",
          userName: "QrowWong",
        },
        // {
        //   bvId: "BV1nA411n7Cx",
        //   title: "似魔鬼的步伐",
        //   description: "-",
        //   img:
        //     "https://i1.hdslb.com/bfs/archive/ac5916c6e86f724eba0d51f7fe8b8db87a366eae.jpg",
        //   userImg:
        //     "http://i0.hdslb.com/bfs/face/db6d1d10f7edd57a7e0e2fb2d3dc00c2d524056a.jpg",
        //   userName: "QrowWong",
        // },
        {
          bvId: "BV1QK411N7aV",
          title: "招采科普测试视频",
          description: "-",
          img:
            "https://i2.hdslb.com/bfs/archive/7f9c9f8bdbf59e9ac560f3e962be86c689a19016.jpg",
          userImg:
            "http://i0.hdslb.com/bfs/face/db6d1d10f7edd57a7e0e2fb2d3dc00c2d524056a.jpg",
          userName: "QrowWong",
        },
      ],
    };
  },
  methods: {
    open(bvId, title) {
      this.dialog.title = title;
      this.dialog.src =
        "//player.bilibili.com/player.html?bvid=" + bvId + "&page=1";
      this.dialog.centerDialogVisible = true;
    },
  },
};
</script>

<style lang="css" scoped>
/* 背景div */
.content {
  margin-top: 0;
  width: 100%;
  background-color: #fff;
  min-height: 100vh;
}
.top {
  background-image: url(../../assets/zzfw/banner.png);
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  min-height: 20rem;
}
.top-content{
  margin: 0 auto;
  min-width: 1200px; 
  width: 62%;
}
/* 主要内容设置 */
.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 62%;
  min-width: 1200px;
}
.el-row {
  box-shadow: none;
  width: 100%;
  background-color: transparent;
}
/* 标题设置 */
.main-title {
  padding-top: 110px;
  color: #fff;
  line-height: 28px;
  font-size: 28px;
  font-family: Source SansSC Bold;
}
.sub-title{
  color: #fff;
  font-size: 22px;
  padding-top: 22px;
}
/* 轮播设置 */
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 350px;
  margin: 0;
  text-align: center;
}
/* 通知设置 */
.notices {
  border: solid 1px #ffeacd;
  border-radius: 4px;
  background-color: #fff5e6;
  padding: 10px;
  line-height: 20px;
  font-size: 14px;
}
.notices > i {
  color: #fc911a;
}
.notices > span {
  color: #999;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
/* 单个视频信息 */
.item-content {
  padding: 0.6rem;
  color: #999;
}
.item-img {
  overflow: hidden;
  width: 100%;
  cursor: pointer;
}
.item-text {
  padding: 0 0;
  font-size: 13px;
}
.item-title {
  margin: 20px 0;
  color: #333;
  font-family: Source SansSC;
  cursor: pointer;
  font-size: 22px;
  line-height: 22px;
}
/* 点赞 观看 留言 */
.item-eval {
  padding: 0 16px 20px;
  font-size: 13px;
}
.item-eval > span {
  margin-right: 6px;
}
/* 投稿人信息设置 */
.item-userinfo {
  /* border-top: #ccc 1px solid; */
  display: flex;
  align-items: flex-start;

  /* padding: 0 16px; */
  /* height: 60px; */
  /* line-height: 60px; */
}
.item-userinfo .item-user-img {
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  width: 22px;
  /* height: 22px; */
}
.item-userinfo .item-user-name {
  padding-left: 12px;
  font-size: 16px;
  line-height: 21px;
  color: #808080;
}
.button-page {
  width: 50px;
  height: 50px;
  font-size: 18px;
}
</style>