<template>
<div class="body">
<main-header :showauthor="false"></main-header>
<div class="user">
  <div class="profile">
    <div class="usermsg">
      <div class="defaultimg">
        <span v-if="!user.image" class="fa fa-user-circle"></span>
        <img v-else style="width: 120px;height: 120px;border-radius: 50%" :src="user.image" alt="">
      </div>
      <div class="nickname">{{user.nickname}}</div>
      <div class="carrots">
        <span>0</span>
        <img src="~assets/img/carrot.png" width="50px;height:50px;" alt="">
      </div>
    </div>
    <div class="list">
      <ul>
        <router-link to="/homepage" tag="li"><i class="fa fa-tv"></i>回到首页</router-link>
        <router-link :to="{path:'profile'}" tag="li"><i class="fa fa-user-o"></i>个人信息</router-link>
        <router-link :to="{path:'changeimg'}" tag="li"><i class="fa fa-image"></i>修改头像</router-link>
        <li></li>
      </ul>
    </div>
  </div>
  <div class="panel">
    <router-view></router-view>
  </div>
</div>
</div>
</template>

<script>
import MainHeader from "@/components/base/header/header";
export default {
  components: {
    MainHeader
  },
  data() {
    return {
      user: ''
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
  }
};
</script>

<style lang="scss" scoped>
@import '~common/style/variable';
.body {
  background-color: #f2f2f2;
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  .user {
    display: flex;
    flex-flow: row nowrap;
    flex: 1;
    .profile {
      min-width: 15%;
      background-color: #333;
      .usermsg {
        padding: 10px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        .defaultimg {
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            font-size: 120px;
            color: grey;
          }
        }
        .nickname {
          padding: 15px 0;
          font-size: 25px;
          color: $defaultButtonColor;
        }
        .carrots {
          padding: 10px 0;
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            color: $defaultYellow;
          }
        }
      }
      .list {
        .router-link-active {
          border-left: 8px solid $defaultBlue;
        }
        li {
          padding: 15px 0;
          display: flex;
          justify-content: center;
          font-weight: bold;
          color: $defaultYellow;
          transition: all 0.5s;
          cursor: pointer;
          &:hover {
            border-left: 8px solid $defaultBlue;
          }
          i {
            margin-right: 5px;
            margin-top: 4px;
            color: $defaultButtonColor;
          }
        }
      }
    }
    .panel {
      flex: 1;
    }
  }
}
</style>
