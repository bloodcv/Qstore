<template>
  <div class="mine_wrap">
    <header>
      <div class="title">
        <h1>我的</h1>
        <Button>退出登录</Button>
      </div>
      <div class="user_info">
        <div class="nick"><img src="" /></div>
        <div class="info">
          <span class="name">{{ name }}</span>
          <span class="number">学号：{{ number }}</span>
        </div>
      </div>
    </header>
    <main>
      <section class="part_wrap">
        <h3 class="title">题库管理</h3>
        <ul class="item_wrap">
          <li class="part_item">
            <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
            <span>金考典题库管理</span>
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

export default {
  name: "Mine",
  setup() {
    const username = ref("");
    const number = ref("");
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
  }
}
</style>
