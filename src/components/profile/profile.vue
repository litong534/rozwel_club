<template>
  <div class="main" v-if="userData">
    <div class="title">个人信息</div>
    <div class="table">
      <div class="row">
        <div class="elem">邮箱:
          <input type="text" v-model="userData.email" class="default_input" disabled />
        </div>
        <div class="elem">昵称:
          <input type="text" v-model="userData.nickname" class="default_input"  />
        </div>
        <div class="elem">真实姓名:
          <input type="text" v-model="userData.name" class="default_input"  />
        </div>
        <div class="elem">性别:
          <el-select v-model="userData.sex">
            <el-option
              v-for="item in sex"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="elem">生日:
          <el-date-picker
            v-model="userData.birth"
            type="date"
            :default-value="userData.birth"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
      </div>
      <div class="row">
        <div class="elem">星座:
          <el-select v-model="userData.constellation">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="elem">所在地:
          <input type="text" v-model="userData.location" class="default_input"  />
        </div>
        <div class="elem">移动电话:
          <input type="text" v-model="userData.mobile" class="default_input"  />
        </div>
        <div class="elem">学校:
          <input type="text" v-model="userData.school" class="default_input"  />
        </div>
        <div class="elem">公司:
          <input type="text" v-model="userData.company" class="default_input"  />
        </div>
      </div>
    </div>
    <div class="btn_container">
      <button @click="submit" class="commit">确定</button>
    </div>
  </div>
</template>

<script>
import { getConstellation, getSex, mongoTimeFormat } from "@/common/js/common";
import { getUserData, setUserData } from "@/api/user/user";
export default {
  data() {
    return {
      userData: "",
      options: getConstellation(),
      sex: getSex(),
      showPicker: false
    };
  },
  methods: {
    submit() {
      this._setUserData();
    },
    togglePicker() {
      this.showPicker = !this.showPicker;
    },
    _getUserData() {
      getUserData(localStorage.getItem("user").email)
        .then(res => {
          this.userData = res.data;
        })
        .catch(e => console.log(e));
    },
    _setUserData() {
      setUserData(this.userData)
        .then(res => {
          this.$snotify.success("更新成功");
          let user = JSON.parse(localStorage.getItem('user'));
          user.nickname = res.data.nickname;
          localStorage.setItem('user',JSON.stringify(user));
          setTimeout(() => {
            location.href = '/user/profile';
          },1700);
        })
        .catch(e => console.log(e));
    }
  },
  created() {
    this._getUserData();
  }
};
</script>
<style lang="scss" scoped>
@import "~common/style/variable";
.main {
  color: $defaultBlue;
  height: 100%;
  .title {
    font-size: 18px;
    padding: 15px 0 0 15px;
  }
  .btn_container {
    width: 300px;
    margin: 0 auto;
    .commit {
      @include default_btn(#ef4300,1px solid #ff730e);
      margin: 0 auto;

      &:hover {
        @include default_btn_hover;
      }

      &:active {
        @include default_btn_active(#ef4300);
      }
    }
  }
  .table {
    color: #333;
    display: flex;
    flex-flow: row nowrap;
    width: 60%;
    margin: 0 auto;
    margin-top: 50px;
    .row {
      width: 100%;
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-end;
      .elem {
        margin-bottom: 20px;
        margin-right: 20px;
        min-width: 325px;
        display: flex;
        flex-flow: column;
        .el-date-editor.el-input,
        .el-date-editor.el-input__inner {
          width: 325px;
        }
        .default_input {
          width: 301px;
          height: 16px;
          line-height: 16px;
          background-color: $defaultBlue;
          color: #fff;
          font-size: 14px;
          font-weight: bold;
          border-radius: 5px;
          padding: 10px 10px 10px 10px;
          border: 2px solid $defaultBlue;
          outline: none;
        }
      }
    }
  }
}
</style>
