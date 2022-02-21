<template>
  <div class="mine_wrap">
    <header>
      <div class="title">
        <h1>我的</h1>
        <Button type="default" class="out_log">退出登录</Button>
      </div>
      <div class="user_info">
        <div class="nick"><img src="../../assets/3.png" /></div>
        <div class="info">
          <span class="name">{{ username }}</span>
          <span class="number">学号：{{ number }}</span>
        </div>
      </div>
    </header>
    <main>
      <section class="part_wrap">
        <h3 class="title">题库管理</h3>
        <ul class="item_wrap">
          <li class="item">
            <Icon
              class="icon"
              name="https://b.yzcdn.cn/vant/icon-demo-1126.png"
            />
            <span class="item_title">金考典题库管理</span>
          </li>
          <li class="item">
            <Icon
              class="icon"
              name="https://b.yzcdn.cn/vant/icon-demo-1126.png"
            />
            <span class="item_title">魔考题库管理</span>
          </li>
          <li class="item">
            <Icon
              class="icon"
              name="https://b.yzcdn.cn/vant/icon-demo-1126.png"
            />
            <span class="item_title">毕过题库管理</span>
          </li>
        </ul>
      </section>
      <section class="part_wrap">
        <h3 class="title">充值管理</h3>
        <ul class="item_wrap">
          <li class="item">
            <Icon
              class="icon"
              name="https://b.yzcdn.cn/vant/icon-demo-1126.png"
            />
            <span class="item_title">充值记录</span>
          </li>
          <li class="item">
            <Icon
              class="icon"
              name="https://b.yzcdn.cn/vant/icon-demo-1126.png"
            />
            <span class="item_title">购买记录</span>
          </li>
        </ul>
      </section>
    </main>
    <footer>
      <span>购买有记录，切勿低价销售</span>
    </footer>
  </div>
</template>

<script>
import { ref } from "vue";
import { Button, Icon } from "vant";

export default {
  name: "Mine",
  components: {
    Button,
    Icon,
  },
  setup() {
    const username = ref("学院_47587588 V");
    const number = ref("37848959590");
    return {
      username,
      number,
    };
  },
};
</script>

<style lang="scss" scoped>
.mine_wrap {
  width: 100%;
  height: 100%;
  position: relative;
  &::before {
    position: absolute;
    content: "";
    height: 264px;
    background: linear-gradient(180deg, #eff9ff 0%, #fff 100%);
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
  }
}
header {
  .title {
    display: flex;
    justify-content: space-between;
    padding: 14px 10px 0 16px;
    h1 {
      font-size: 24px;
      font-weight: bold;
      line-height: 0px;
      color: #000000;
    }
    .out_log {
      font-size: 16px;
      font-weight: bold;
      line-height: 0px;
      color: #ff6464;
      border: none;
      background: none;
    }
  }
  .user_info {
    margin-top: 33px;
    margin-left: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .nick {
      width: 59px;
      height: 59px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 11px;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .name {
        font-size: 20px;
        font-weight: 800;
        color: #000000;
      }
      .number {
        font-size: 14px;
        font-weight: 800;
        color: #999999;
      }
    }
  }
}
main {
  padding: 44px 10px 0 16px;
  .part_wrap {
    .title {
      font-size: 16px;
      line-height: 1;
      font-weight: bold;
      color: #000000;
      position: relative;
      text-align: left;
      padding-left: 9px;
      margin: 2px 0 10px;
      &::before {
        position: absolute;
        content: "";
        top: 0;
        bottom: 0;
        left: 0;
        width: 4px;
        background: linear-gradient(180deg, #34a0ff 0%, #013ad5 100%);
        border-radius: 2px;
      }
    }
    .item_wrap {
      .item {
        display: flex;
        align-items: center;
        padding: 22px 12.85px 22px 15px;
        background: #ffffff;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.16);
        border-radius: 6px;
        margin-bottom: 13px;
        .icon {
          width: 18px;
          height: 16.75px;
          margin-right: 9px;
          ::v-deep .van-icon__image {
            width: 100%;
            height: 100%;
          }
        }
        .item_title {
          font-size: 16px;
          font-weight: bold;
          color: #000000;
        }
      }
    }
  }
}
footer {
  margin-top: 109px;
  margin-bottom: 20px;
  span {
    font-size: 14px;
    font-weight: bold;
    color: #999999;
  }
}
</style>
