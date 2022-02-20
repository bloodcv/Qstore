<template>
  <div class="login_wrap">
    <header>
      <span>欢迎您</span>
      <h1>账号登录</h1>
    </header>
    <main>
      <Form @submit="onSubmit">
        <CellGroup inset>
          <Field
            v-model="username"
            left-icon="graphic"
            name="用户名"
            placeholder="输入账号"
            :rules="[{ required: true, message: '请填写账号' }]"
          />
          <Field
            v-model="password"
            left-icon="lock"
            type="password"
            name="密码"
            placeholder="输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </CellGroup>
        <div class="forget_pass">
          <router-link to="/mine">忘记密码?</router-link>
        </div>
        <Button block type="primary" native-type="submit" class="sub_btn"
          >登录</Button
        >
      </Form>
    </main>
    <footer>
      <span>您还没有注册，请</span
      ><router-link to="/mine">立即注册</router-link>
    </footer>
  </div>
</template>

<script>
import { ref } from "vue";
import { Form, Field, CellGroup, Button } from "vant";

export default {
  name: "Login",
  components: {
    Form,
    Field,
    CellGroup,
    Button,
  },
  setup() {
    const username = ref("");
    const password = ref("");
    const onSubmit = (values) => {
      console.log("submit", values);
    };

    return {
      username,
      password,
      onSubmit,
    };
  },
};
</script>

<style lang="scss" scoped>
.login_wrap {
  width: 100%;
  height: 100%;
  background: url("../../assets/1.png") no-repeat 110% -3px/185px 233px;
  position: relative;
}
header {
  padding: 168px 0 0 29px;
  text-align: left;
  span {
    font-size: 14px;
    font-weight: 800;
    line-height: 20px;
    color: #000000;
  }
  h1 {
    margin: 0;
    padding: 0;
    font-size: 36px;
    font-weight: 800;
    color: #000000;
  }
}
main {
  padding: 0 28px;
  margin-top: 44px;
  ::v-deep .van-form {
    .van-cell-group {
      margin: 0;
      .van-cell {
        background-color: #f3f3f3;
        border-radius: 24px;
        margin-bottom: 23px;
        &:nth-child(2) {
          margin-bottom: 12px;
        }
      }
    }
  }
  .forget_pass {
    text-align: right;
    font-size: 14px;
    font-weight: 800;
    line-height: 20px;
    color: #999999;
    margin-bottom: 55px;
  }
  .sub_btn {
    background: linear-gradient(270deg, #ff7700 0%, #ffa058 100%);
    border: none;
    border-radius: 24px;
    padding: 11px 60.33px 11px 35px;
    width: fit-content;
    margin-left: auto;
    position: relative;
    ::after {
      position: absolute;
      content: "";
      width: 20.33px;
      height: 6.33px;
      right: 31px;
      top: 50%;
      transform: translateY(-50%);
      background: url("../../assets/2.png") no-repeat center/cover;
    }
  }
}
footer {
  position: absolute;
  width: 100%;
  height: fit-content;
  bottom: 40px;
  font-size: 14px;
  font-weight: 800;
  line-height: 20px;
  color: #ff7d0d;
  span {
    color: #000000;
  }
  a {
    text-decoration: underline;
    margin-left: 5px;
  }
}
</style>
